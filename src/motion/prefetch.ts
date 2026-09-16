/**
 * Amrit Palace — Intelligent Asset Prefetching Pipeline
 * 
 * Prewarms browser image cache for near-fold sections (Our Story -> Experiences)
 * during idle moments without contending with critical initial-load resources.
 */

export function prefetchNearFoldAssets(): void {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth <= 768;
  const nearFoldImages = isMobile
    ? [
        '/images/experiences/wedding-mobile.webp',
        '/images/experiences/meetings-mobile.webp',
        '/images/experiences/stay-mobile.webp',
        '/images/experiences/dining-mobile.webp',
      ]
    : [
        '/images/experiences/wedding-desktop.webp',
        '/images/experiences/meetings-desktop.webp',
        '/images/experiences/stay-desktop.webp',
        '/images/experiences/dining-desktop.webp',
      ];

  const prefetch = () => {
    nearFoldImages.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  };

  // Schedule during requestIdleCallback or shortly after initial mount
  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(prefetch, { timeout: 1200 });
  } else {
    setTimeout(prefetch, 600);
  }
}
