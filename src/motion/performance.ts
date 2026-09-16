/**
 * Amrit Palace Motion Foundation — Device Capability & Performance Tiers
 * 
 * Classifies client runtime into meaningful capability tiers:
 * - HIGH: Modern multi-core desktop/laptop or flagship mobile with ample RAM and GPU bandwidth.
 * - STANDARD: Mainstream devices capable of smooth standard animation.
 * - CONSTRAINED: Budget/older mobile devices (especially entry Android) or battery/data saver mode.
 * - REDUCED_MOTION: User has explicitly requested minimal motion via OS accessibility settings.
 * 
 * Uses meaningful browser/hardware signals without fragile user-agent sniffing.
 */

export type PerformanceTier = 'HIGH' | 'STANDARD' | 'CONSTRAINED' | 'REDUCED_MOTION';

export interface DeviceCapability {
  tier: PerformanceTier;
  isReducedMotion: boolean;
  isTouch: boolean;
  hardwareConcurrency: number;
  deviceMemoryGb: number | null;
  saveData: boolean;
  maxDpr: number;
  supportsIntersectionObserver: boolean;
}

/**
 * Evaluates current client hardware and environment signals.
 */
export function detectDeviceCapability(): DeviceCapability {
  if (typeof window === 'undefined') {
    return {
      tier: 'STANDARD',
      isReducedMotion: false,
      isTouch: false,
      hardwareConcurrency: 4,
      deviceMemoryGb: 4,
      saveData: false,
      maxDpr: 1.5,
      supportsIntersectionObserver: true,
    };
  }

  // 1. Accessibility: prefers-reduced-motion
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    return {
      tier: 'REDUCED_MOTION',
      isReducedMotion: true,
      isTouch: window.matchMedia('(pointer: coarse)').matches,
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      deviceMemoryGb: (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? null,
      saveData: Boolean((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData),
      maxDpr: 1.0,
      supportsIntersectionObserver: 'IntersectionObserver' in window,
    };
  }

  // 2. Network / Data-saver signal
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const isSaveData = Boolean(conn?.saveData);
  const isSlowNetwork = conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g';

  // 3. Hardware signals
  const cores = navigator.hardwareConcurrency || 4;
  const memoryGb = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? null;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const screenPixels = window.screen.width * window.screen.height;

  // 4. Determine Tier
  let tier: PerformanceTier;

  if (isSaveData || isSlowNetwork || cores <= 2 || (memoryGb !== null && memoryGb <= 2)) {
    tier = 'CONSTRAINED';
  } else if (cores <= 4 && (memoryGb !== null && memoryGb <= 4)) {
    // Typical mid/budget mobile, e.g. entry-to-mid Android
    tier = isTouch ? 'CONSTRAINED' : 'STANDARD';
  } else if (cores >= 8 && (memoryGb === null || memoryGb >= 8) && !isTouch && screenPixels >= 1920 * 1080) {
    tier = 'HIGH';
  } else {
    tier = 'STANDARD';
  }

  // 5. Recommended Maximum DPR for canvas/WebGL/compositing
  // Avoid burning GPU fillrate on budget 3x-4x mobile screens
  let maxDpr: number;
  if (tier === 'HIGH') {
    maxDpr = Math.min(2.0, window.devicePixelRatio || 1);
  } else if (tier === 'STANDARD') {
    maxDpr = Math.min(1.5, window.devicePixelRatio || 1);
  } else {
    maxDpr = 1.0;
  }

  return {
    tier,
    isReducedMotion: false,
    isTouch,
    hardwareConcurrency: cores,
    deviceMemoryGb: memoryGb,
    saveData: isSaveData,
    maxDpr,
    supportsIntersectionObserver: 'IntersectionObserver' in window,
  };
}

let cachedCapability: DeviceCapability | null = null;

export function getDeviceCapability(): DeviceCapability {
  if (!cachedCapability) {
    cachedCapability = detectDeviceCapability();
  }
  return cachedCapability;
}
