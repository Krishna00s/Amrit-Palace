/**
 * Amrit Palace Motion Foundation — Breakpoint Definitions & Responsive GSAP Helpers
 * 
 * Aligned with Tailwind CSS screen breakpoints.
 * Used for GSAP matchMedia contexts and responsive animation orchestration.
 */

import { gsap } from 'gsap';

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const MEDIA_QUERIES = {
  isMobile: '(max-width: 767px)',
  isTablet: '(min-width: 768px) and (max-width: 1023px)',
  isDesktop: '(min-width: 1024px)',
  isLargeDesktop: '(min-width: 1280px)',
  isTouch: '(pointer: coarse)',
  isFinePointer: '(pointer: fine)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
} as const;

/**
 * Creates a standard GSAP matchMedia context configured with Amrit Palace responsive breakpoints.
 * Always call mm.revert() or let useGSAP handle the scope cleanup.
 */
export function createAmritMatchMedia() {
  const mm = gsap.matchMedia();
  return mm;
}
