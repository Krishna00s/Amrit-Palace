/**
 * Amrit Palace Motion Foundation — Centralized React Hooks
 * 
 * Provides reactive hooks for:
 * - Reduced motion preference
 * - Hardware performance tier
 * - Centralized passive scroll tracking
 */

import { useState, useEffect } from 'react';
import { getDeviceCapability, type DeviceCapability, type PerformanceTier } from './performance';

/**
 * Returns true if the user has requested reduced motion via OS settings.
 * Updates dynamically if the user toggles accessibility settings during the session.
 */
export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => setIsReduced(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isReduced;
}

/**
 * Returns the evaluated device capability tier (HIGH, STANDARD, CONSTRAINED, REDUCED_MOTION).
 */
export function usePerformanceTier(): PerformanceTier {
  const isReducedMotion = useReducedMotion();
  if (isReducedMotion) {
    return 'REDUCED_MOTION';
  }
  return getDeviceCapability().tier;
}

/**
 * Full device capability information.
 */
export function useDeviceCapability(): DeviceCapability {
  const isReducedMotion = useReducedMotion();
  const current = getDeviceCapability();
  if (isReducedMotion) {
    return { ...current, tier: 'REDUCED_MOTION', isReducedMotion: true };
  }
  return current;
}

/**
 * Centralized passive scroll position hook.
 * Uses requestAnimationFrame throttling and passive listeners to eliminate scroll jank.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const updateScroll = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize with current scroll
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
