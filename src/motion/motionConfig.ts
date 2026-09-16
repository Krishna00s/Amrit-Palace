/**
 * Amrit Palace Motion Foundation — Performance Configuration
 * 
 * Central ruleset governing animation intensity, particle budgets,
 * parallax depth, and rendering resolution across device tiers.
 */

import { getDeviceCapability, type PerformanceTier } from './performance';

export interface MotionConfig {
  tier: PerformanceTier;
  allowParallax: boolean;
  allowParticles: boolean;
  allowHeavyBlurs: boolean;
  maxParticleCount: number;
  maxDpr: number;
  transitionDurationMultiplier: number;
}

export function getMotionConfig(): MotionConfig {
  const cap = getDeviceCapability();

  switch (cap.tier) {
    case 'REDUCED_MOTION':
      return {
        tier: 'REDUCED_MOTION',
        allowParallax: false,
        allowParticles: false,
        allowHeavyBlurs: false,
        maxParticleCount: 0,
        maxDpr: 1.0,
        transitionDurationMultiplier: 0.2, // Snap quickly for accessibility
      };

    case 'CONSTRAINED':
      return {
        tier: 'CONSTRAINED',
        allowParallax: false, // Omit continuous parallax on budget devices
        allowParticles: false, // Save CPU/GPU on entry Android
        allowHeavyBlurs: false,
        maxParticleCount: 10,
        maxDpr: 1.0,
        transitionDurationMultiplier: 1.0,
      };

    case 'STANDARD':
      return {
        tier: 'STANDARD',
        allowParallax: true,
        allowParticles: true,
        allowHeavyBlurs: true,
        maxParticleCount: 25,
        maxDpr: cap.maxDpr,
        transitionDurationMultiplier: 1.0,
      };

    case 'HIGH':
    default:
      return {
        tier: 'HIGH',
        allowParallax: true,
        allowParticles: true,
        allowHeavyBlurs: true,
        maxParticleCount: 50,
        maxDpr: cap.maxDpr,
        transitionDurationMultiplier: 1.0,
      };
  }
}
