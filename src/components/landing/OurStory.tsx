import React, { useState, useEffect, useRef } from 'react';

interface StoryWord {
  text: string;
  isHighlight?: boolean;
}

const STORY_WORDS: StoryWord[] = [
  { text: 'From' },
  { text: 'restful' },
  { text: 'stays' },
  { text: 'to' },
  { text: 'grand' },
  { text: 'celebrations,' },
  { text: 'we', isHighlight: true },
  { text: 'welcome', isHighlight: true },
  { text: 'you', isHighlight: true },
  { text: 'to' },
  { text: 'experience' },
  { text: 'heartfelt' },
  { text: 'hospitality' },
  { text: 'in' },
  { text: 'Lohardaga' },
  { text: 'where' },
  { text: 'every' },
  { text: 'special' },
  { text: 'occasion' },
  { text: 'finds' },
  { text: 'its' },
  { text: 'true' },
  { text: 'home.' },
];

export const OurStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scroll listener tied directly to section position
  useEffect(() => {
    if (isReducedMotion) {
      setProgress(1);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;

      if (totalScroll <= 0) {
        setProgress(1);
        return;
      }

      // rect.top <= 0 means the section has pinned in the viewport
      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScroll));
      setProgress(p);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isReducedMotion]);

  // Word reveal calculation
  const totalWords = STORY_WORDS.length;
  // Active window for narrative reveal: from 0.05 to 0.82
  const revealStart = 0.05;
  const revealEnd = 0.82;
  const range = revealEnd - revealStart;
  const step = range / (totalWords + 1);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative z-20 bg-white text-neutral-900 select-none border-t border-neutral-100"
    >
      {/* Scroll runway for progressive discovery */}
      <div className="relative h-[200vh] sm:h-[220vh]">
        {/* Sticky presentation viewport */}
        <div className="sticky top-0 h-screen min-h-[600px] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-8 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column: Label + Progress Line + Social Proof Card */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6 md:gap-8">
                <div>
                  <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                    Our Story
                  </span>

                  {/* Delicate discovery progress hairline */}
                  <div className="relative w-14 h-[2px] bg-neutral-200 mb-6 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-amber-500 transition-all duration-150 ease-out"
                      style={{ width: `${Math.round(progress * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Confident, Integrated Social Proof (4.8★, 500+ Reviews, 10,000+ Guests Hosted) */}
                <div className="p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 shadow-xs max-w-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-500 text-sm">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-xs font-bold text-neutral-900">4.8 out of 5</span>
                    <span className="text-[11px] text-neutral-400 font-normal">| 500+ Reviews</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Trusted by over <strong className="font-semibold text-neutral-900">10,000+ guests hosted</strong> across Jharkhand and beyond. Generous parking, thoughtful hospitality, and comfortable facilities are always our commitment.
                  </p>
                </div>
              </div>

              {/* Right Column: Progressive Scroll-Driven Editorial Typography + CTA Pill */}
              <div className="lg:col-span-8 flex flex-col items-start justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-medium leading-[1.35] tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {STORY_WORDS.map((word, i) => {
                    let wordProgress = 1;

                    if (!isReducedMotion) {
                      const wordStart = revealStart + i * step;
                      const wordEnd = wordStart + step * 2.2;

                      if (progress <= wordStart) {
                        wordProgress = 0;
                      } else if (progress >= wordEnd) {
                        wordProgress = 1;
                      } else {
                        const raw = (progress - wordStart) / (wordEnd - wordStart);
                        // Smooth ease-out curve
                        wordProgress = Math.sin((raw * Math.PI) / 2);
                      }
                    }

                    // Dynamic values per word based on scroll discovery
                    const opacity = 0.20 + 0.80 * wordProgress;
                    const blurPx = (1 - wordProgress) * 3.5;

                    // Interpolate color from muted neutral-400 (163, 163, 163) to neutral-900 (23, 23, 23)
                    const targetR = word.isHighlight ? 10 : 23;
                    const targetG = word.isHighlight ? 10 : 23;
                    const targetB = word.isHighlight ? 10 : 23;
                    const r = Math.round(163 - (163 - targetR) * wordProgress);
                    const g = Math.round(163 - (163 - targetG) * wordProgress);
                    const b = Math.round(163 - (163 - targetB) * wordProgress);

                    return (
                      <span
                        key={i}
                        className={`inline-block mr-[0.28em] select-none ${
                          word.isHighlight ? 'font-bold' : 'font-medium'
                        }`}
                        style={{
                          opacity,
                          filter: blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : 'none',
                          color: `rgb(${r}, ${g}, ${b})`,
                          transition: 'opacity 120ms ease-out, filter 120ms ease-out, color 120ms ease-out',
                          willChange: 'opacity, filter, color',
                        }}
                      >
                        {word.text}
                      </span>
                    );
                  })}
                </h2>

                {/* Pill button with amber circular arrow (reveals gracefully as narrative concludes) */}
                <div
                  className="mt-8 transition-all duration-300 ease-out"
                  style={{
                    opacity: isReducedMotion ? 1 : Math.max(0.3, Math.min(1, (progress - 0.70) / 0.18)),
                    transform: isReducedMotion
                      ? 'none'
                      : `translateY(${(1 - Math.min(1, Math.max(0, (progress - 0.70) / 0.18))) * 6}px)`,
                  }}
                >
                  <a
                    href="#celebrate"
                    className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border border-neutral-300 hover:border-neutral-900 transition-all duration-200 text-neutral-900 text-xs sm:text-sm font-semibold group cursor-pointer shadow-xs hover:shadow-md bg-white"
                  >
                    <span>Explore Amrit Palace</span>
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-hover:translate-x-0.5 shadow-xs">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
