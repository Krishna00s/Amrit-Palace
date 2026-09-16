/**
 * Amrit Palace — Central Motion Architecture & GSAP Setup
 * 
 * Provides a unified, single-point initialization for GSAP, ScrollTrigger,
 * luxury easings, responsive breakpoints, device tiers, and lifecycle hooks.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// 1. Single central plugin registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // 2. Performance-tuned defaults for smooth 60/120fps animation without CPU hogging
  gsap.config({
    autoSleep: 60, // Sleeps idle animations after 60 frames to save battery
    nullTargetWarn: import.meta.env.DEV, // Restore useful diagnostics during development
  });

  // Lag smoothing prevents massive animation jumps after tab switching or garbage collection
  gsap.ticker.lagSmoothing(500, 33);
}

// 3. Export core instances
export { gsap, ScrollTrigger, useGSAP };

// 4. Export architectural modules
export * from './easings';
export * from './breakpoints';
export * from './performance';
export * from './motionConfig';
export * from './hooks';
export * from './smoothScroll';
export * from './prefetch';
