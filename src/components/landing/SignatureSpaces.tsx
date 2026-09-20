import React, { useRef } from 'react';
import { gsap, useGSAP, getDeviceCapability } from '../../motion';

interface SignatureSpacesProps {
  onOpenBooking: (occasion?: string) => void;
}

interface ExperienceItem {
  id: string;
  anchorId?: string;
  tag: string;
  title: string;
  copy: string;
  desktopImage: string;
  mobileImage: string;
  fallbackImage: string;
  alt: string;
  badge?: string;
  defaultOccasion: string;
  loading: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'wedding',
    anchorId: 'wedding',
    tag: '01 · CEREMONIES & RECEPTIONS',
    title: 'Wedding at Amrit Palace',
    copy: 'A spacious setting for ceremonies, gatherings and celebrations shared with family and friends.',
    desktopImage: '/images/experiences/wedding-desktop.webp',
    mobileImage: '/images/experiences/wedding-mobile.webp',
    fallbackImage: '/images/wedding-celebration-real.jpg',
    alt: 'Traditional wedding reception at Amrit Palace Lohardaga',
    badge: '★ 4.9 · Premier Celebration Venue',
    defaultOccasion: 'Wedding & Reception',
    loading: 'eager',
    fetchPriority: 'high',
  },
  {
    id: 'meetings',
    anchorId: 'meet',
    tag: '02 · CORPORATE & SEMINARS',
    title: 'Meetings / Conferences',
    copy: 'A practical setting for meetings, conferences, presentations and professional gatherings.',
    desktopImage: '/images/experiences/meetings-desktop.webp',
    mobileImage: '/images/experiences/meetings-mobile.webp',
    fallbackImage: '/images/meeting-conference-real.jpg',
    alt: 'Conference and corporate meeting hall at Amrit Palace',
    badge: 'High-Speed AV · AC Hall',
    defaultOccasion: 'Corporate Event / Meeting',
    loading: 'eager',
    fetchPriority: 'high',
  },
  {
    id: 'stay',
    anchorId: 'stay',
    tag: '03 · ACCOMMODATION',
    title: 'Stay at Amrit Palace',
    copy: 'Settle into a comfortable AC room with a master bed and the essentials for an easy stay.',
    desktopImage: '/images/experiences/stay-desktop.webp',
    mobileImage: '/images/experiences/stay-mobile.webp',
    fallbackImage: '/images/room-ac-guest.jpg',
    alt: 'Clean comfortable AC guest room with king master bed at Amrit Palace',
    badge: 'Master Bed · Powerful AC · Clean Linens',
    defaultOccasion: 'AC Room Stay',
    loading: 'eager',
    fetchPriority: 'auto',
  },
  {
    id: 'dining',
    anchorId: 'dine',
    tag: '04 · DINING & CATERING',
    title: 'Dining & Catering',
    copy: 'Enjoy a meal at Amrit Palace or bring food and hospitality into the heart of your celebration.',
    desktopImage: '/images/experiences/dining-desktop.webp',
    mobileImage: '/images/experiences/dining-mobile.webp',
    fallbackImage: '/images/dining-ballroom-real.jpg',
    alt: 'Amrit Palace dining room with authentic banquet tables and buffet service',
    badge: 'Authentic Multi-Cuisine Buffets',
    defaultOccasion: 'Dining / Catering',
    loading: 'eager',
    fetchPriority: 'auto',
  },
  {
    id: 'birthday',
    tag: '05 · SOCIAL CELEBRATIONS',
    title: 'Birthday Celebrations',
    copy: 'Bring everyone together for a birthday worth remembering, from intimate gatherings to lively celebrations.',
    desktopImage: '/images/experiences/birthday-desktop.webp',
    mobileImage: '/images/experiences/birthday-mobile.webp',
    fallbackImage: '/images/birthday-gathering-real.jpg',
    alt: 'Birthday celebration setup with festive balloon arches at Amrit Palace',
    badge: 'Decor, Sound & Dining Support',
    defaultOccasion: 'Birthday Celebration',
    loading: 'lazy',
    fetchPriority: 'auto',
  },
  {
    id: 'event-space',
    tag: '06 · THE EVENT SPACE',
    title: 'A Space for Every Gathering',
    copy: 'A spacious venue that can transform around the occasion — from formal gatherings to joyful celebrations.',
    desktopImage: '/images/experiences/event-space-desktop.webp',
    mobileImage: '/images/experiences/event-space-mobile.webp',
    fallbackImage: '/images/banquet-ballroom-real.jpg',
    alt: 'Grand Royal Ballroom at Amrit Palace illuminated with crystal chandeliers',
    badge: 'Up to 500+ People · 20+ Parking Spaces',
    defaultOccasion: 'Grand Event / Banquet',
    loading: 'lazy',
  },
  {
    id: 'celebrate',
    tag: '07 · PRIVATE EVENTS',
    title: 'Celebrate Your Way',
    copy: 'From anniversaries and family gatherings to private parties and special ceremonies, make the space your own occasion.',
    desktopImage: '/images/experiences/celebrate-desktop.webp',
    mobileImage: '/images/experiences/celebrate-mobile.webp',
    fallbackImage: '/images/courtyard-evening.jpg',
    alt: 'Evening atmosphere and courtyard gathering space at Amrit Palace',
    badge: 'Flexible Layouts & Courtyard',
    defaultOccasion: 'Family Gathering / Private Event',
    loading: 'lazy',
  },
  {
    id: 'custom',
    tag: '08 · CUSTOM OCCASIONS',
    title: 'Your Occasion',
    copy: "Have something different in mind? Tell us what you're planning and we'll help shape the experience around it.",
    desktopImage: '/images/experiences/custom-desktop.webp',
    mobileImage: '/images/experiences/custom-mobile.webp',
    fallbackImage: '/images/entrance-facade-real.jpg',
    alt: 'Illuminated architectural facade of Hotel Amrit Palace welcoming guests',
    badge: 'Dedicated Event Coordination',
    defaultOccasion: 'Custom Occasion',
    loading: 'lazy',
  },
];

export const SignatureSpaces: React.FC<SignatureSpacesProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const capability = getDeviceCapability();

      // Respect reduced motion accessibility
      if (capability.isReducedMotion || capability.tier === 'REDUCED_MOTION') {
        return;
      }

      const mm = gsap.matchMedia();

      // 1. DESKTOP (>= 1024px): Asymmetric multi-directional assembly trajectories with scrub
      mm.add('(min-width: 1024px)', () => {
        const trajectories = [
          { x: 35, y: 40 },   // 01 Wedding: right + down -> left + up
          { x: 0, y: -45 },   // 02 Meetings: above -> down
          { x: 30, y: -30 },  // 03 Stay: upper-right -> down + left
          { x: -35, y: 15 },  // 04 Dining: slightly left -> right
          { x: 0, y: 40 },    // 05 Birthday: below -> upward
          { x: -30, y: 35 },  // 06 Event Space: left + down -> up + right
          { x: 0, y: -30 },   // 07 Celebrate: above -> down
          { x: 35, y: -25 },  // 08 Your Occasion: right + up -> left + down
        ];

        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const traj = trajectories[i] || { x: 0, y: 30 };

          gsap.fromTo(
            card,
            {
              x: traj.x,
              y: traj.y,
              opacity: 0.25,
              scale: 0.98,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true,
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });

      // 2. MOBILE & TABLET (< 1024px): Clean, lightweight vertical motion
      // Cards start slightly below -> move up into final position with zero touch scrub overhead!
      mm.add('(max-width: 1023px)', () => {
        const isConstrained = capability.tier === 'CONSTRAINED';
        const travelDistance = isConstrained ? 18 : 24;

        cardsRef.current.forEach((card) => {
          if (!card) return;

          gsap.fromTo(
            card,
            {
              y: travelDistance,
              opacity: 0.45,
              scale: 0.99,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true,
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative w-full bg-transparent text-neutral-900 pt-20 sm:pt-24 pb-20 sm:pb-28 select-none overflow-hidden"
    >
      {/* Anchor targets to preserve all existing nav link compatibility */}
      <div id="spaces" className="absolute -top-24 left-0 pointer-events-none" />
      <div id="services" className="absolute -top-24 left-0 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase font-bold text-neutral-400 block mb-2.5">
              EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.03em] text-neutral-950 font-['Plus_Jakarta_Sans',sans-serif] leading-[1.12]">
              ONE PLACE.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600">
                EVERY OCCASION.
              </span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base md:text-lg mt-3.5 leading-relaxed font-normal">
              From a comfortable stay to a room full of celebration, Amrit Palace brings together the
              spaces, food and hospitality for every kind of occasion.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onOpenBooking('Wedding & Reception')}
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-neutral-300 hover:border-neutral-950 bg-white hover:bg-neutral-950 text-neutral-900 hover:text-white transition-all duration-300 text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Plan Your Occasion</span>
              <span className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-0.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Asymmetric Editorial Experience Board (12-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7">
          {/* ============================================================ */}
          {/* TIER 1: Grand Flagship Pair (Weddings 7 cols + Meetings 5 cols) */}
          {/* ============================================================ */}

          {/* 01 — WEDDING AT AMRIT PALACE (Hero Left Anchor Card) */}
          <div
            id={EXPERIENCES[0].anchorId}
            ref={(el) => { cardsRef.current[0] = el; }}
            onClick={() => onOpenBooking(EXPERIENCES[0].defaultOccasion)}
            className="md:col-span-12 lg:col-span-7 group relative h-[420px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 bg-neutral-900"
          >
            <picture>
              <source
                type="image/webp"
                media="(max-width: 768px)"
                srcSet={EXPERIENCES[0].mobileImage}
              />
              <source
                type="image/webp"
                srcSet={EXPERIENCES[0].desktopImage}
              />
              <img
                src={EXPERIENCES[0].fallbackImage}
                alt={EXPERIENCES[0].alt}
                loading={EXPERIENCES[0].loading}
                fetchPriority={EXPERIENCES[0].fetchPriority}
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                width={1200}
                height={800}
              />
            </picture>
            {/* Cinematic Multilayer Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

            {/* Top Badge & Corner Arrow */}
            <div className="absolute top-0 left-0 right-0 p-6 sm:p-7 flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                {EXPERIENCES[0].tag}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              {EXPERIENCES[0].badge && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/20 backdrop-blur-sm text-amber-300 text-[11px] font-semibold mb-2">
                  {EXPERIENCES[0].badge}
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-tight">
                {EXPERIENCES[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 mt-2 max-w-lg leading-relaxed font-light">
                {EXPERIENCES[0].copy}
              </p>
            </div>
          </div>

          {/* 02 — MEETINGS & CONFERENCES (Upper-Right 5-Column Card) */}
          <div
            id={EXPERIENCES[1].anchorId}
            ref={(el) => { cardsRef.current[1] = el; }}
            onClick={() => onOpenBooking(EXPERIENCES[1].defaultOccasion)}
            className="md:col-span-12 lg:col-span-5 group relative h-[420px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 bg-neutral-900"
          >
            <picture>
              <source
                type="image/webp"
                media="(max-width: 768px)"
                srcSet={EXPERIENCES[1].mobileImage}
              />
              <source
                type="image/webp"
                srcSet={EXPERIENCES[1].desktopImage}
              />
              <img
                src={EXPERIENCES[1].fallbackImage}
                alt={EXPERIENCES[1].alt}
                loading={EXPERIENCES[1].loading}
                fetchPriority={EXPERIENCES[1].fetchPriority}
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                width={1200}
                height={800}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute top-0 left-0 right-0 p-6 sm:p-7 flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                {EXPERIENCES[1].tag}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              {EXPERIENCES[1].badge && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/20 backdrop-blur-sm text-amber-300 text-[11px] font-semibold mb-2">
                  {EXPERIENCES[1].badge}
                </div>
              )}
              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-white tracking-tight leading-tight">
                {EXPERIENCES[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 mt-2 leading-relaxed font-light">
                {EXPERIENCES[1].copy}
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TIER 2: Asymmetric Accommodation & Dining/Social Mosaic     */}
          {/* (Stay: 5 cols Tall Portrait + Column of Dining & Birthday 7 cols) */}
          {/* ============================================================ */}

          {/* 03 — STAY AT AMRIT PALACE (Tall Editorial Accommodation Card) */}
          <div
            id={EXPERIENCES[2].anchorId}
            ref={(el) => { cardsRef.current[2] = el; }}
            onClick={() => onOpenBooking(EXPERIENCES[2].defaultOccasion)}
            className="md:col-span-12 lg:col-span-5 group relative h-[500px] sm:h-[560px] lg:h-[600px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 bg-neutral-900"
          >
            <picture>
              <source
                type="image/webp"
                media="(max-width: 768px)"
                srcSet={EXPERIENCES[2].mobileImage}
              />
              <source
                type="image/webp"
                srcSet={EXPERIENCES[2].desktopImage}
              />
              <img
                src={EXPERIENCES[2].fallbackImage}
                alt={EXPERIENCES[2].alt}
                loading={EXPERIENCES[2].loading}
                fetchPriority={EXPERIENCES[2].fetchPriority}
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                width={1200}
                height={800}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute top-0 left-0 right-0 p-6 sm:p-7 flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                {EXPERIENCES[2].tag}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              {EXPERIENCES[2].badge && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/20 backdrop-blur-sm text-amber-300 text-[11px] font-semibold mb-2">
                  {EXPERIENCES[2].badge}
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {EXPERIENCES[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 mt-2 max-w-sm leading-relaxed font-light">
                {EXPERIENCES[2].copy}
              </p>
            </div>
          </div>

          {/* 7-Column Stacked Column: 04 Dining & 05 Birthday */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-6 sm:gap-7 justify-between">
            {/* 04 — DINING & CATERING (Wide Panoramic Card) */}
            <div
              id={EXPERIENCES[3].anchorId}
              ref={(el) => { cardsRef.current[3] = el; }}
              onClick={() => onOpenBooking(EXPERIENCES[3].defaultOccasion)}
              className="group relative h-[240px] sm:h-[268px] lg:h-[285px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 bg-neutral-900"
            >
              <picture>
                <source
                  type="image/webp"
                  media="(max-width: 768px)"
                  srcSet={EXPERIENCES[3].mobileImage}
                />
                <source
                  type="image/webp"
                  srcSet={EXPERIENCES[3].desktopImage}
                />
                <img
                  src={EXPERIENCES[3].fallbackImage}
                  alt={EXPERIENCES[3].alt}
                  loading={EXPERIENCES[3].loading}
                  fetchPriority={EXPERIENCES[3].fetchPriority}
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  width={1200}
                  height={800}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              <div className="absolute top-0 left-0 right-0 p-5 sm:p-6 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                  {EXPERIENCES[3].tag}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  {EXPERIENCES[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 mt-1 max-w-lg leading-relaxed font-light">
                  {EXPERIENCES[3].copy}
                </p>
              </div>
            </div>

            {/* 05 — BIRTHDAY CELEBRATIONS */}
            <div
              id={EXPERIENCES[4].anchorId}
              ref={(el) => { cardsRef.current[4] = el; }}
              onClick={() => onOpenBooking(EXPERIENCES[4].defaultOccasion)}
              className="group relative h-[240px] sm:h-[268px] lg:h-[285px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 bg-neutral-900"
            >
              <picture>
                <source
                  type="image/webp"
                  media="(max-width: 768px)"
                  srcSet={EXPERIENCES[4].mobileImage}
                />
                <source
                  type="image/webp"
                  srcSet={EXPERIENCES[4].desktopImage}
                />
                <img
                  src={EXPERIENCES[4].fallbackImage}
                  alt={EXPERIENCES[4].alt}
                  loading={EXPERIENCES[4].loading}
                  fetchPriority={EXPERIENCES[4].fetchPriority}
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  width={1200}
                  height={800}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              <div className="absolute top-0 left-0 right-0 p-5 sm:p-6 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                  {EXPERIENCES[4].tag}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  {EXPERIENCES[4].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 mt-1 max-w-lg leading-relaxed font-light">
                  {EXPERIENCES[4].copy}
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TIER 3: Asymmetric Lower Trio (Event Space 6 cols + 3 + 3) */}
          {/* ============================================================ */}

          {/* 06 — THE EVENT SPACE (Ballroom 6-Column Card) */}
          <div
            id={EXPERIENCES[5].anchorId}
            ref={(el) => { cardsRef.current[5] = el; }}
            onClick={() => onOpenBooking(EXPERIENCES[5].defaultOccasion)}
            className="md:col-span-12 lg:col-span-6 group relative h-[380px] sm:h-[430px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 bg-neutral-900"
          >
            <picture>
              <source
                type="image/webp"
                media="(max-width: 768px)"
                srcSet={EXPERIENCES[5].mobileImage}
              />
              <source
                type="image/webp"
                srcSet={EXPERIENCES[5].desktopImage}
              />
              <img
                src={EXPERIENCES[5].fallbackImage}
                alt={EXPERIENCES[5].alt}
                loading={EXPERIENCES[5].loading}
                fetchPriority={EXPERIENCES[5].fetchPriority}
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                width={1200}
                height={800}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute top-0 left-0 right-0 p-6 sm:p-7 flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                {EXPERIENCES[5].tag}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
              {EXPERIENCES[5].badge && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/20 backdrop-blur-sm text-amber-300 text-[11px] font-semibold mb-2">
                  {EXPERIENCES[5].badge}
                </div>
              )}
              <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-white tracking-tight leading-tight">
                {EXPERIENCES[5].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 mt-2 max-w-md leading-relaxed font-light">
                {EXPERIENCES[5].copy}
              </p>
            </div>
          </div>

          {/* 07 — CELEBRATE YOUR WAY (3-Column Card) */}
          <div
            id={EXPERIENCES[6].anchorId}
            ref={(el) => { cardsRef.current[6] = el; }}
            onClick={() => onOpenBooking(EXPERIENCES[6].defaultOccasion)}
            className="md:col-span-6 lg:col-span-3 group relative h-[380px] sm:h-[430px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 bg-neutral-900"
          >
            <picture>
              <source
                type="image/webp"
                media="(max-width: 768px)"
                srcSet={EXPERIENCES[6].mobileImage}
              />
              <source
                type="image/webp"
                srcSet={EXPERIENCES[6].desktopImage}
              />
              <img
                src={EXPERIENCES[6].fallbackImage}
                alt={EXPERIENCES[6].alt}
                loading={EXPERIENCES[6].loading}
                fetchPriority={EXPERIENCES[6].fetchPriority}
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                width={1200}
                height={800}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute top-0 left-0 right-0 p-5 sm:p-6 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                {EXPERIENCES[6].tag}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                {EXPERIENCES[6].title}
              </h3>
              <p className="text-xs text-neutral-200 mt-1.5 leading-relaxed font-light">
                {EXPERIENCES[6].copy}
              </p>
            </div>
          </div>

          {/* 08 — YOUR OCCASION (3-Column Interactive Bespoke Planning Card) */}
          <div
            id={EXPERIENCES[7].anchorId}
            ref={(el) => { cardsRef.current[7] = el; }}
            onClick={() => onOpenBooking(EXPERIENCES[7].defaultOccasion)}
            className="md:col-span-6 lg:col-span-3 group relative h-[380px] sm:h-[430px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10"
          >
            <picture>
              <source
                type="image/webp"
                media="(max-width: 768px)"
                srcSet={EXPERIENCES[7].mobileImage}
              />
              <source
                type="image/webp"
                srcSet={EXPERIENCES[7].desktopImage}
              />
              <img
                src={EXPERIENCES[7].fallbackImage}
                alt={EXPERIENCES[7].alt}
                loading={EXPERIENCES[7].loading}
                fetchPriority={EXPERIENCES[7].fetchPriority}
                decoding="async"
                className="w-full h-full object-cover object-center opacity-40 transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-50"
                width={1200}
                height={800}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="absolute top-0 left-0 right-0 p-5 sm:p-6 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30">
                {EXPERIENCES[7].tag}
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col justify-end">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                {EXPERIENCES[7].title}
              </h3>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed font-light mb-4">
                {EXPERIENCES[7].copy}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                <span>Start Planning</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
