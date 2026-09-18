import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { gsap, useGSAP, getDeviceCapability } from '../../motion';

interface OccasionCard {
  id: string;
  title: string;
  location: string;
  categoryTag: string;
  mobileImage: string;
  desktopImage: string;
  fallbackImage: string;
  description: string;
}

interface OccasionsCarouselProps {
  onOpenBooking: (occasion?: string) => void;
}

const OCCASIONS: OccasionCard[] = [
  {
    id: 'stay-room',
    title: 'Comfortable AC Guest Rooms',
    location: 'Main Road, Lohardaga',
    categoryTag: 'Master Bed & AC',
    mobileImage: '/images/experiences/stay-mobile.webp',
    desktopImage: '/images/experiences/stay-desktop.webp',
    fallbackImage: '/images/room-ac-real.jpg',
    description: 'Clean, peaceful accommodation with king master bed, powerful air conditioning, and convenient transit access.',
  },
  {
    id: 'wedding-gala',
    title: 'Royal Weddings & Receptions',
    location: 'Grand Ballroom & Lawns',
    categoryTag: '20+ Car Parking',
    mobileImage: '/images/experiences/wedding-mobile.webp',
    desktopImage: '/images/experiences/wedding-desktop.webp',
    fallbackImage: '/images/wedding-real.jpg',
    description: 'Spacious celebration venues, mandap setups, and banquet halls with dedicated on-site parking so every guest arrives with ease.',
  },
  {
    id: 'family-dining',
    title: 'Multi-Cuisine Family Dining',
    location: 'Amrit Dining Restaurant',
    categoryTag: 'Fresh Delicacies',
    mobileImage: '/images/experiences/dining-mobile.webp',
    desktopImage: '/images/experiences/dining-desktop.webp',
    fallbackImage: '/images/dining-ballroom-real.jpg',
    description: 'Fresh North Indian dishes, tandoori specialties, and celebration buffets prepared with genuine warmth.',
  },
  {
    id: 'birthday-parties',
    title: 'Joyful Birthdays & Milestones',
    location: 'Celebration Lounge',
    categoryTag: 'Family Gatherings',
    mobileImage: '/images/experiences/birthday-mobile.webp',
    desktopImage: '/images/experiences/birthday-desktop.webp',
    fallbackImage: '/images/birthday-real.jpg',
    description: 'Festive decorations, balloon arches, music setup, and delicious food tailored for children and family anniversaries.',
  },
  {
    id: 'corporate-meets',
    title: 'Business Conferences & Meets',
    location: 'Executive Conference Room',
    categoryTag: 'AV & Power Backup',
    mobileImage: '/images/experiences/meetings-mobile.webp',
    desktopImage: '/images/experiences/meetings-desktop.webp',
    fallbackImage: '/images/meeting-conference-real.jpg',
    description: 'Quiet, air-conditioned professional meeting space with presentation screens, reliable power backup, and catering.',
  },
];

// Extended dataset to provide seamless cyclic track with neighboring peeks on both sides
const EXTENDED_OCCASIONS = [...OCCASIONS, ...OCCASIONS, ...OCCASIONS];
const INITIAL_INDEX = OCCASIONS.length; // 5 (Card 0 of the middle set)

export const OccasionsCarousel: React.FC<OccasionsCarouselProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [viewportWidth, setViewportWidth] = useState<number>(1216);
  const [currentIndex, setCurrentIndex] = useState<number>(INITIAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Measure viewport container width to calibrate sub-pixel card geometry
  useEffect(() => {
    const updateWidth = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      }
    };
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Geometry configuration:
  // Desktop: exactly 3 full cards in center + two ~20% peeks
  // Tablet: 2 full cards in center + two ~16% peeks
  // Mobile: 1 full card in center + two ~12.5% peeks
  const isDesktop = viewportWidth >= 1024;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const config = useMemo(() => {
    if (isDesktop) {
      const gap = 24;
      const peekRatio = 0.20; // 20% peek width
      const divisor = 3 + 2 * peekRatio; // 3.4
      const cardWidth = Math.max(260, (viewportWidth - 4 * gap) / divisor);
      const peekWidth = cardWidth * peekRatio;
      return { gap, cardWidth, peekWidth, visibleFull: 3 };
    } else if (isTablet) {
      const gap = 20;
      const peekRatio = 0.16;
      const divisor = 2 + 2 * peekRatio; // 2.32
      const cardWidth = Math.max(240, (viewportWidth - 3 * gap) / divisor);
      const peekWidth = cardWidth * peekRatio;
      return { gap, cardWidth, peekWidth, visibleFull: 2 };
    } else {
      const gap = 16;
      const peekRatio = 0.125;
      const divisor = 1 + 2 * peekRatio; // 1.25
      const cardWidth = Math.max(220, (viewportWidth - 2 * gap) / divisor);
      const peekWidth = cardWidth * peekRatio;
      return { gap, cardWidth, peekWidth, visibleFull: 1 };
    }
  }, [viewportWidth, isDesktop, isTablet]);

  // Compute translateX offset so that Card `currentIndex` starts at (peekWidth + gap)
  const trackOffset = (config.peekWidth + config.gap) - currentIndex * (config.cardWidth + config.gap);

  // Soft Edge Vignette Mask:
  // Center cards stay 100% sharp and solid; only the extreme outer edges of the peek cards fade softly
  const maskStyle: React.CSSProperties = useMemo(() => ({
    maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
  }), []);

  // 1. SECTION ENTRANCE ANIMATION (NON-SCRUBBED, SEQUENTIAL, ONE-TIME PERMANENT)
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const capability = getDeviceCapability();

      // Respect prefers-reduced-motion
      if (capability.isReducedMotion || capability.tier === 'REDUCED_MOTION') {
        if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
        const cards = sectionRef.current.querySelectorAll('.card-entrance-item');
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      // Independent sequential timeline:
      // 1. Heading appears first
      // 2. Cards rise sequentially one-by-one from slightly below
      // NOT tied to scroll progress; runs freely to completion once triggered
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }

      // Query the cards inside the section scope
      const cards = sectionRef.current.querySelectorAll('.card-entrance-item');
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '-=0.08'
        );
      }
    },
    { scope: sectionRef }
  );

  // Carousel Navigation: Next & Prev
  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Normalize index on transition end to preserve infinite cyclic navigation
  const handleTransitionEnd = () => {
    if (currentIndex >= OCCASIONS.length * 2 || currentIndex < OCCASIONS.length) {
      setIsTransitioning(false);
      const normalized = ((currentIndex % OCCASIONS.length) + OCCASIONS.length) % OCCASIONS.length + OCCASIONS.length;
      setCurrentIndex(normalized);
    }
  };

  // Touch Swipe Support for Mobile & Tablet
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current < -40) {
      handleNext();
    } else if (touchDeltaX.current > 40) {
      handlePrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <section
      id="celebrate"
      ref={sectionRef}
      aria-label="Curated Spaces for Every Occasion"
      className="w-full bg-white text-neutral-900 pb-16 md:pb-24 select-none relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header with Circular < > Carousel Controls */}
        <div ref={headerRef} className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-1">
              Curated Spaces
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Curated for Every Occasion
            </h2>
          </div>

          {/* Carousel Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              aria-label="Previous Occasion"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center justify-center transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              aria-label="Next Occasion"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Editorial Carousel Viewport (Strictly overflow-hidden with soft edge mask) */}
        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden"
          style={maskStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Cohesive Navigation Track (Translates with GPU transform; separate from vertical entrance) */}
          <div
            className="flex items-stretch"
            style={{
              gap: `${config.gap}px`,
              transform: `translate3d(${trackOffset}px, 0, 0)`,
              transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {EXTENDED_OCCASIONS.map((occasion, idx) => (
              <div
                key={`${occasion.id}-${idx}`}
                style={{ width: `${config.cardWidth}px` }}
                className="shrink-0 flex flex-col"
              >
                {/* Dedicated Entrance Animation Wrapper (y-axis + opacity only; zero conflict with x-axis track) */}
                <div
                  className="card-entrance-item flex flex-col h-full w-full group cursor-pointer"
                  onClick={() => onOpenBooking(occasion.title)}
                >
                  {/* Rounded Image Container */}
                  <div className="relative h-[220px] sm:h-[240px] rounded-2xl overflow-hidden mb-3.5 shadow-sm group-hover:shadow-md transition-shadow bg-neutral-100">
                    <picture>
                      <source
                        type="image/webp"
                        media="(max-width: 768px)"
                        srcSet={occasion.mobileImage}
                      />
                      <source
                        type="image/webp"
                        srcSet={occasion.desktopImage}
                      />
                      <img
                        src={occasion.fallbackImage}
                        alt={occasion.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={480}
                      />
                    </picture>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-amber-300 border border-white/10">
                      {occasion.categoryTag}
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
                        {occasion.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1 font-light">
                        <svg className="w-3 h-3 text-neutral-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {occasion.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed font-light">
                    {occasion.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
