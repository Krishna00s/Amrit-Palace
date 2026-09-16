/**
 * Amrit Palace Motion Foundation — Luxury Editorial Easings
 * 
 * Standardized easing curves reflecting a cinematic, high-end hospitality aesthetic.
 * Prefer gentle, physical, and restrained curves over bouncy or aggressive cartoon easings.
 */

export const EASE_CINEMATIC = 'power3.out';
export const EASE_EDITORIAL = 'expo.out';
export const EASE_SMOOTH = 'power2.inOut';
export const EASE_SNAPPY = 'power2.out';
export const EASE_GENTLE = 'sine.out';
export const EASE_SLOW_MO = 'power1.out';

export const EASINGS = {
  cinematic: EASE_CINEMATIC,
  editorial: EASE_EDITORIAL,
  smooth: EASE_SMOOTH,
  snappy: EASE_SNAPPY,
  gentle: EASE_GENTLE,
  slowMo: EASE_SLOW_MO,
} as const;

export type EasingType = keyof typeof EASINGS;
