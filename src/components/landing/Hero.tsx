import React, { useEffect, useRef } from 'react';
import { KineticServices } from './KineticServices';
import { scrollTo } from '../../motion';

interface HeroProps {
  onOpenBooking?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const wordmarkLayerRef = useRef<HTMLDivElement>(null);
  const fgLayerRef = useRef<HTMLDivElement>(null);
  const contentGroupRef = useRef<HTMLDivElement>(null);
  const bottomGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateHeroMotion = () => {
      const y = window.scrollY;
      // Only process when Hero is on or near screen
      if (y <= 1200) {
        if (bgLayerRef.current) {
          bgLayerRef.current.style.transform = `translateY(${(y * 0.18).toFixed(2)}px)`;
        }
        if (wordmarkLayerRef.current) {
          wordmarkLayerRef.current.style.transform = `translateY(${(y * 0.12).toFixed(2)}px)`;
        }
        if (fgLayerRef.current) {
          fgLayerRef.current.style.transform = `translateY(${(y * 0.18).toFixed(2)}px)`;
        }
        if (contentGroupRef.current) {
          const opacity = Math.max(0, 1 - y / 480);
          contentGroupRef.current.style.opacity = opacity.toFixed(3);
          contentGroupRef.current.style.transform = `translateY(${(y * 0.14).toFixed(2)}px)`;
        }
        if (bottomGroupRef.current) {
          const opacity = Math.max(0, 1 - y / 300);
          bottomGroupRef.current.style.opacity = opacity.toFixed(3);
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeroMotion);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateHeroMotion();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo('#spaces');
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[700px] max-h-[1080px] flex flex-col justify-between overflow-hidden bg-neutral-950 select-none">
      {/* 1. Real Amrit Palace Dusk Photograph Base Layer with Atmospheric Vignettes */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          transform: 'translateY(0px)',
          willChange: 'transform',
        }}
      >
        <img
          src="/images/hero-amrit-exterior.jpg"
          alt="Hotel Amrit Palace illuminated dusk exterior in Lohardaga, Jharkhand"
          className="w-full h-full object-cover object-[76%_center] lg:object-[74%_center]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1024}
          height={576}
        />
        {/* Subtle atmospheric vignette at the bottom and top edge only — preserves natural blue-hour sky */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,9,18,0.35)_0%,transparent_14%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_0%_100%,rgba(4,9,18,0.45)_0%,transparent_80%)] pointer-events-none" />
      </div>

      {/* 2. Architectural Wordmark Layer: AMRIT in back, PALACE in front overlapping 2-5% on bottom */}
      <div
        ref={wordmarkLayerRef}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden hidden md:block"
        style={{
          transform: 'translateY(0px)',
          willChange: 'transform',
        }}
      >
        {/* AMRIT: In the back (z-10), moved higher up in the open twilight sky */}
        <div className="absolute z-10 top-[13.5%] sm:top-[13%] md:top-[13%] left-[35%] sm:left-[36%] md:left-[36.5%] -translate-x-1/2 text-center">
          <span className="text-[7.5vw] sm:text-[6.5vw] lg:text-[5.4vw] font-black tracking-[0.32em] text-[#FAF7F2]/[0.44] font-['Plus_Jakarta_Sans',sans-serif] leading-none whitespace-nowrap block select-none [text-shadow:2px_3px_0px_rgba(0,0,0,0.9),4px_6px_16px_rgba(0,0,0,0.8)]">
            AMRIT
          </span>
        </div>

        {/* PALACE: In front (z-20), sitting right under AMRIT with 2-5% overlap on AMRIT's bottom, with crisp linear shadow and complete E letterform */}
        <div className="absolute z-20 top-[19%] sm:top-[18.5%] md:top-[18.5%] left-[8.5%] sm:left-[9%] md:left-[9.5%]">
          <span className="text-[9.8vw] sm:text-[8.6vw] lg:text-[7.0vw] font-black tracking-[0.30em] text-[#FAF7F2]/[0.58] font-['Plus_Jakarta_Sans',sans-serif] leading-none whitespace-nowrap block select-none [text-shadow:3px_4px_0px_rgba(0,0,0,0.95),6px_8px_0px_rgba(0,0,0,0.35),8px_12px_24px_rgba(0,0,0,0.8)]">
            PALACE
          </span>
        </div>
      </div>

      {/* 3. Physical Architecture Foreground Occlusion Layer (Real buildings in front of typography) */}
      <div
        ref={fgLayerRef}
        className="absolute inset-0 z-12 pointer-events-none hidden md:block"
        style={{
          transform: 'translateY(0px)',
          willChange: 'transform',
        }}
      >
        <img
          src="/images/hero-buildings-foreground.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[76%_center] lg:object-[74%_center]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1024}
          height={576}
        />
      </div>

      {/* Spacer to push content down below fixed header */}
      <div className="pt-24 sm:pt-28" />

      {/* 3. Primary Editorial Content Group & Repositioned Kinetic Ticker */}
      <div
        ref={contentGroupRef}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mt-auto mb-4 sm:mb-6 md:mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        style={{
          opacity: 1,
          transform: 'translateY(0px)',
          willChange: 'transform, opacity',
        }}
      >
        <div className="max-w-xl">
          {/* Eyebrow Location */}
          <div className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-3 sm:mb-3.5">
            LOHARDAGA, JHARKHAND
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem] xl:text-[4.75rem] font-bold tracking-[-0.03em] leading-[1.08] mb-3.5 sm:mb-4">
            <span className="text-white block drop-shadow-sm">A Place for</span>
            <span className="text-[#F8BD5C] block drop-shadow-sm">Every Occasion</span>
          </h1>

          {/* Supporting Category Line */}
          <div className="text-xs sm:text-sm font-normal text-neutral-300 tracking-wide">
            Stay <span className="mx-2 sm:mx-2.5 text-neutral-500">•</span> Dine <span className="mx-2 sm:mx-2.5 text-neutral-500">•</span> Celebrate <span className="mx-2 sm:mx-2.5 text-neutral-500">•</span> Meet
          </div>
        </div>

        {/* Repositioned Kinetic Services Ticker:
            Noticeably further to the RIGHT, slightly further DOWN into the negative space,
            with comfortable breathing room around it, balanced across all viewports */}
        <div className="min-h-[48px] sm:min-h-[52px] flex items-center lg:mb-1.5 xl:mb-2 lg:mr-8 xl:mr-16">
          <KineticServices />
        </div>
      </div>

      {/* 4. Balanced Bottom Details: Left Anchor + Lower-Right CTA & Micro-Copy */}
      <div
        ref={bottomGroupRef}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 sm:pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        style={{
          opacity: 1,
          willChange: 'opacity',
        }}
      >
        {/* Bottom-Left Micro-Copy: Clearly Visible Lower Anchor */}
        <div className="flex items-center gap-2.5">
          <div className="w-[1.5px] h-7 bg-amber-400/80 self-stretch shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-neutral-200 leading-tight">
              HOSPITALITY
            </span>
            <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-neutral-400 leading-tight">
              BEYOND STAYS
            </span>
          </div>
        </div>

        {/* Lower-Right Section: Single Refined CTA + Right Micro-Copy */}
        <div className="flex flex-col items-start sm:items-end gap-3 sm:gap-3.5">
          {/* Simple, Refined CTA Button */}
          <button
            onClick={handleScrollToServices}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#F8BD5C] hover:bg-[#F5A623] text-neutral-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            aria-label="Check Our Services"
          >
            <span>Check Our Services</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Bottom-Right Micro-Copy: Clearly Visible */}
          <div className="flex items-center gap-2.5 text-left sm:text-right">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-neutral-200 leading-tight">
                WHERE
              </span>
              <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-neutral-400 leading-tight">
                OCCASIONS FEEL LIKE HOME
              </span>
            </div>
            <div className="w-[1.5px] h-7 bg-amber-400/80 self-stretch shrink-0 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
