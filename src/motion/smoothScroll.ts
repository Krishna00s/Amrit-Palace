/**
 * Amrit Palace — Smooth Scrolling Engine (Lenis + GSAP Ticker Synchronization)
 * 
 * Implements a unified, singleton-controlled smooth scrolling layer:
 * 1. Driven by the GSAP ticker (ONE unified animation clock).
 * 2. Synchronized with ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`).
 * 3. Preserves GSAP lag smoothing for resilient frame recovery.
 * 4. Adaptive hardware & accessibility fallbacks:
 *    - REDUCED_MOTION: Bypasses Lenis completely (100% native standard scrolling).
 *    - CONSTRAINED Touch: Bypasses Lenis on budget/constrained touch devices to preserve
 *      zero-latency native touch momentum and prevent CPU overhead.
 *    - HIGH / STANDARD: Fluid, weighted, responsive non-floaty wheel smoothing (`lerp: 0.1`, `syncTouch: false`).
 */

import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './index';
import { getDeviceCapability } from './performance';

export interface SmoothScrollOptions {
  lerp?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  autoResize?: boolean;
}

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let scrollTriggerCallback: (() => void) | null = null;
let isInitialized = false;

/**
 * Checks whether smooth scrolling should be activated on current client.
 * Returns false for REDUCED_MOTION or CONSTRAINED touch devices.
 */
export function shouldEnableSmoothScroll(): boolean {
  if (typeof window === 'undefined') return false;

  const capability = getDeviceCapability();

  // 1. Accessibility first: always honor reduced motion preference
  if (capability.isReducedMotion || capability.tier === 'REDUCED_MOTION') {
    return false;
  }

  // 2. Touch on constrained devices (budget Android, slow network, <=2 cores, <=2GB RAM):
  // Native touch momentum is strictly superior and avoids input latency or frame drops.
  if (capability.tier === 'CONSTRAINED' && capability.isTouch) {
    return false;
  }

  return true;
}

/**
 * Initializes the single Lenis instance synchronized with the GSAP ticker.
 */
export function initSmoothScroll(options: SmoothScrollOptions = {}): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Prevent duplicate initialization
  if (lenisInstance) {
    return lenisInstance;
  }

  if (!shouldEnableSmoothScroll()) {
    // Client prefers reduced motion or constrained touch: maintain native scrolling.
    return null;
  }

  const {
    lerp = 0.1, // Weighted, responsive linear interpolation; zero float or overshoot
    wheelMultiplier = 1.0,
    touchMultiplier = 1.0,
    autoResize = true,
  } = options;

  // Instantiate Lenis with modern v1.3.x API
  // autoRaf: false ensures NO independent RAF loop is spawned
  // syncTouch: false ensures touch devices retain 100% native momentum scrolling
  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    syncTouch: false,
    respectReducedMotion: true,
    lerp,
    wheelMultiplier,
    touchMultiplier,
    autoResize,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
  });

  lenisInstance = lenis;

  // 1. Single Animation Clock: GSAP ticker drives Lenis RAF
  // GSAP ticker passes time in seconds; Lenis expects milliseconds (time * 1000)
  tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  // 2. Synchronize Lenis scroll updates with GSAP ScrollTrigger
  scrollTriggerCallback = () => {
    ScrollTrigger.update();
  };
  lenis.on('scroll', scrollTriggerCallback);

  isInitialized = true;
  return lenisInstance;
}

/**
 * Safely destroys the active Lenis instance and detaches GSAP ticker callbacks.
 */
export function destroySmoothScroll(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  if (lenisInstance) {
    if (scrollTriggerCallback) {
      lenisInstance.off('scroll', scrollTriggerCallback);
      scrollTriggerCallback = null;
    }
    lenisInstance.destroy();
    lenisInstance = null;
  }

  isInitialized = false;
}

/**
 * Returns the active Lenis instance, or null if uninitialized/bypassed.
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Returns whether smooth scrolling is actively initialized.
 */
export function isSmoothScrollActive(): boolean {
  return isInitialized && lenisInstance !== null;
}

/**
 * Smoothly scrolls to a target (selector, element, or scroll position in px).
 * Seamlessly falls back to native scrolling if Lenis is disabled.
 */
export function scrollTo(
  target: string | HTMLElement | number,
  options: {
    offset?: number;
    immediate?: boolean;
    lock?: boolean;
    onComplete?: () => void;
  } = {}
): void {
  let resolvedTarget = target;
  if (target === '#home' || target === '#' || target === 'top') {
    resolvedTarget = 0;
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(resolvedTarget, options);
    return;
  }

  // Fallback for native scrolling (REDUCED_MOTION or CONSTRAINED)
  if (typeof window === 'undefined') return;

  const { offset = 0, immediate = false, onComplete } = options;
  const behavior: ScrollBehavior = immediate ? 'auto' : 'smooth';

  if (typeof target === 'number') {
    window.scrollTo({ top: Math.max(0, target + offset), behavior });
  } else if (typeof target === 'string') {
    if (target === '#' || target === '#home' || target === 'top') {
      window.scrollTo({ top: 0, behavior });
    } else {
      const element = document.querySelector<HTMLElement>(target);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior });
      }
    }
  } else if (target instanceof HTMLElement) {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior });
  }

  if (onComplete) {
    if (immediate) {
      onComplete();
    } else {
      setTimeout(onComplete, 400);
    }
  }
}

/**
 * Temporarily stops smooth scrolling (e.g. while modals or dialogs are open).
 */
export function stopSmoothScroll(): void {
  lenisInstance?.stop();
}

/**
 * Resumes smooth scrolling.
 */
export function startSmoothScroll(): void {
  lenisInstance?.start();
}
