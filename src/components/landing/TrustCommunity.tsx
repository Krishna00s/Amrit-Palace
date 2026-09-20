import React, { useRef } from 'react';
import { gsap, useGSAP, getDeviceCapability } from '../../motion';

interface TrustCommunityProps {
  onOpenBooking: () => void;
}

export const TrustCommunity: React.FC<TrustCommunityProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const capability = getDeviceCapability();
      if (capability.tier === 'REDUCED_MOTION') return;

      const mm = gsap.matchMedia();

      // 1. ONE-TIME ENTRANCE ANIMATION (PERMANENT SETTLEMENT)
      // Once cards enter the viewport, they settle permanently and NEVER replay on scroll back.
      gsap.fromTo(
        cardsContainerRef.current?.children ? Array.from(cardsContainerRef.current.children) : [],
        {
          y: capability.tier === 'CONSTRAINED' ? 16 : 24,
          opacity: 0.35,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 88%',
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. LARGE-SCREEN SCROLL-REACTIVE IMAGE REVEAL (>= 1024px only)
      // Subtle vertical parallax through the container mask that responds directly to scroll direction.
      mm.add('(min-width: 1024px)', () => {
        const revealImages = sectionRef.current?.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
        if (!revealImages) return;

        revealImages.forEach((img) => {
          const container = img.closest('.overflow-hidden') || img.parentElement;
          if (!container) return;

          gsap.fromTo(
            img,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="meet"
      ref={sectionRef}
      className="w-full bg-transparent text-neutral-900 py-16 md:py-24 select-none border-t border-black/[0.04] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-2">
          Hospitality Excellence
        </span>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-[1.2] font-['Plus_Jakarta_Sans',sans-serif]">
          Unmatched Hospitality, Seamless Gatherings. Welcome to Amrit Palace!
        </h2>

        <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-500 max-w-xl leading-relaxed font-light">
          Whether you are arriving for a restful stay, an intimate family meal, or a celebration of up to 500+ people, every detail is handled with care.
        </p>

        {/* Primary CTA Button */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-600/30 hover:shadow-amber-500/50 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Plan Your Occasion</span>
            <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </button>
          <span className="text-[11px] text-neutral-400 font-light flex items-center gap-1 mt-1">
            <span>♡</span> Dedicated event coordinators & round-the-clock front desk
          </span>
        </div>

        {/* Corrected Statistics Bar (100% Contained, Zero False Claims) */}
        <div className="w-full max-w-4xl mt-12 mb-12 pt-8 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center text-neutral-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-neutral-900">4.8 ★</span>
            <span className="text-[11px] text-neutral-400 font-normal mt-0.5">500+ Reviews</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-neutral-900">10,000+</span>
            <span className="text-[11px] text-neutral-400 font-normal mt-0.5">Guests Hosted</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-neutral-900">20+</span>
            <span className="text-[11px] text-neutral-400 font-normal mt-0.5">Car Parking Spaces</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-neutral-900">500+</span>
            <span className="text-[11px] text-neutral-400 font-normal mt-0.5">People Capacity</span>
          </div>
        </div>

        {/* Asymmetric Photographic Story (GATHER · CELEBRATE · STAY · MEET · DINE · CONNECT) */}
        {/* Strictly contained in grid with ZERO horizontal overflow */}
        <div
          ref={cardsContainerRef}
          className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 items-stretch text-left"
        >
          {/* ============================================================ */}
          {/* LEFT WING: Gatherings & Celebrations (Cols: 3 on Desktop) */}
          {/* ============================================================ */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            {/* Card L1: Indian Wedding Ceremonies */}
            <div className="group relative h-[250px] sm:h-[280px] lg:h-[300px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 bg-neutral-900">
              <div data-scroll-reveal className="absolute inset-0 w-full h-full lg:h-[116%] lg:-top-[8%]">
                <picture>
                  <source type="image/webp" media="(max-width: 768px)" srcSet="/images/experiences/wedding-mobile.webp" />
                  <source type="image/webp" srcSet="/images/experiences/wedding-desktop.webp" />
                  <img
                    src="/images/wedding-celebration-real.jpg"
                    alt="Wedding celebrations and ceremonies at Amrit Palace"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    width={600}
                    height={400}
                  />
                </picture>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-white/10">
                  01 · Celebrations
                </span>
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Weddings & Receptions
                </h4>
                <p className="text-[11px] text-neutral-300 mt-0.5 line-clamp-1 font-light">
                  Spacious Mandap setups and joyful milestones.
                </p>
              </div>
            </div>

            {/* Card L2: Joyful Family Milestones */}
            <div className="group relative h-[220px] sm:h-[250px] lg:h-[270px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 bg-neutral-900">
              <div data-scroll-reveal className="absolute inset-0 w-full h-full lg:h-[116%] lg:-top-[8%]">
                <picture>
                  <source type="image/webp" media="(max-width: 768px)" srcSet="/images/experiences/birthday-mobile.webp" />
                  <source type="image/webp" srcSet="/images/experiences/birthday-desktop.webp" />
                  <img
                    src="/images/birthday-gathering-real.jpg"
                    alt="Family milestones and birthday gatherings at Amrit Palace"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    width={600}
                    height={400}
                  />
                </picture>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-white/10">
                  02 · Gatherings
                </span>
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Family Milestones
                </h4>
                <p className="text-[11px] text-neutral-300 mt-0.5 line-clamp-1 font-light">
                  Anniversaries, birthdays and private reunions.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CENTERPIECE: Diagonally Divided Dual-World Anchor Card */}
          {/* (Cols: 6 on Desktop, includes Call + WhatsApp Actions) */}
          {/* ============================================================ */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col rounded-3xl overflow-hidden shadow-xl border border-neutral-200/80 bg-neutral-950 text-white">
            {/* Upper Half: Dual-World Image Diagonally Divided */}
            <div className="relative h-[290px] sm:h-[340px] lg:h-[360px] overflow-hidden bg-neutral-900 group">
              {/* World 1 (Base Layer): The Room / Stay */}
              <picture>
                <source type="image/webp" media="(max-width: 768px)" srcSet="/images/experiences/stay-mobile.webp" />
                <source type="image/webp" srcSet="/images/experiences/stay-desktop.webp" />
                <img
                  src="/images/room-ac-guest.jpg"
                  alt="Comfortable AC master bed guest room at Amrit Palace"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                  width={800}
                  height={500}
                />
              </picture>

              {/* World 1 Top-Left Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-white/10 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Room / Stay
                </span>
              </div>

              {/* World 2 (Top Layer with Diagonal Split): The Banquet / Event Space */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  clipPath: 'polygon(36% 0%, 100% 0%, 100% 100%, 8% 100%)',
                }}
              >
                <picture>
                  <source type="image/webp" media="(max-width: 768px)" srcSet="/images/experiences/event-space-mobile.webp" />
                  <source type="image/webp" srcSet="/images/experiences/event-space-desktop.webp" />
                  <img
                    src="/images/banquet-ballroom-real.jpg"
                    alt="Grand illuminated Royal Banquet at Amrit Palace"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                    width={800}
                    height={500}
                  />
                </picture>

                {/* World 2 Bottom-Right Badge */}
                <div className="absolute bottom-4 right-4 z-30">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-white/10 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Banquet / Event Space
                  </span>
                </div>
              </div>

              {/* Subtle Luminous Diagonal Hairline Accent */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-30"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <line
                  x1="36"
                  y1="0"
                  x2="8"
                  y2="100"
                  stroke="rgba(245, 158, 11, 0.75)"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/20 pointer-events-none z-20" />
            </div>

            {/* Lower Half: Direct Contact Amrit Palace */}
            <div className="p-6 sm:p-8 bg-neutral-950 flex flex-col justify-between grow border-t border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-amber-400">
                    Direct Reservations & Enquiries
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Plan Your Stay or Event with Us
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 font-light leading-relaxed">
                  Speak directly with our front desk and banquet coordinators for room reservations, wedding dates, and catering arrangements.
                </p>
              </div>

              {/* Action Buttons: Verified Call + WhatsApp */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                {/* Verified Phone Call Button */}
                <a
                  href="tel:+919431102938"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call +91 94311 02938</span>
                </a>

                {/* Verified WhatsApp Action Button */}
                <a
                  href="https://wa.me/919431102938?text=Hello%20Amrit%20Palace%2C%20I%20would%20like%20to%20enquire%20about%20a%20booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-600/20 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                  </svg>
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>

              {/* Microcopy location footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-light">
                <span>Court Road, Lohardaga, Jharkhand</span>
                <span className="text-amber-400/90 font-normal">Fast response during business hours</span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT WING: Food & Dining (Cols: 3 on Desktop) */}
          {/* ============================================================ */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            {/* Card R1: Authentic Indian Plated Delicacies */}
            <div className="group relative h-[250px] sm:h-[280px] lg:h-[300px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 bg-neutral-900">
              <div data-scroll-reveal className="absolute inset-0 w-full h-full lg:h-[116%] lg:-top-[8%]">
                <picture>
                  <source type="image/webp" media="(max-width: 768px)" srcSet="/images/experiences/food-dining-mobile.webp" />
                  <source type="image/webp" srcSet="/images/experiences/food-dining-desktop.webp" />
                  <img
                    src="/images/experiences/food-dining-desktop.webp"
                    alt="Freshly prepared authentic Indian multi-cuisine delicacies at Amrit Palace"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    width={600}
                    height={400}
                  />
                </picture>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-white/10">
                  03 · Dining & Food
                </span>
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Plated Delicacies
                </h4>
                <p className="text-[11px] text-neutral-300 mt-0.5 line-clamp-1 font-light">
                  Fresh North Indian specialties & tandoor dishes.
                </p>
              </div>
            </div>

            {/* Card R2: Celebration Dining & Buffets */}
            <div className="group relative h-[220px] sm:h-[250px] lg:h-[270px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 bg-neutral-900">
              <div data-scroll-reveal className="absolute inset-0 w-full h-full lg:h-[116%] lg:-top-[8%]">
                <picture>
                  <source type="image/webp" media="(max-width: 768px)" srcSet="/images/experiences/dining-mobile.webp" />
                  <source type="image/webp" srcSet="/images/experiences/dining-desktop.webp" />
                  <img
                    src="/images/dining-ballroom-real.jpg"
                    alt="Celebration buffets and banquet dining at Amrit Palace"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    width={600}
                    height={400}
                  />
                </picture>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-white/10">
                  04 · Hospitality
                </span>
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Celebration Buffets
                </h4>
                <p className="text-[11px] text-neutral-300 mt-0.5 line-clamp-1 font-light">
                  Banquet catering tailored for weddings & meetings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
