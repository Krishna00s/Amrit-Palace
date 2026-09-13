import React from 'react';
import { Calendar, User, ChevronDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateSection?: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onNavigateSection,
}) => {
  return (
    <section className="relative w-full h-screen min-h-[700px] max-h-[1100px] overflow-hidden bg-[#060b13] select-none flex flex-col justify-between">
      {/* 1. PHOTOGRAPHIC BACKGROUND WITH CONTROLLED BLUE-HOUR LIGHTING */}
      <div className="absolute inset-0 z-0">
        <img
          src="/amrit-palace-exterior.jpg"
          alt="Amrit Palace Hotel Exterior at Dusk"
          className="w-full h-full object-cover object-[62%_center] md:object-[68%_center] scale-100 transform transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Vignette & Readability Gradients (Carefully balanced to preserve building luminosity) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, rgba(4, 9, 18, 0.88) 0%, rgba(4, 9, 18, 0.72) 32%, rgba(4, 9, 18, 0.35) 55%, rgba(4, 9, 18, 0.05) 78%, rgba(4, 9, 18, 0.25) 100%),
              linear-gradient(to bottom, rgba(4, 8, 16, 0.65) 0%, rgba(4, 8, 16, 0.15) 20%, transparent 40%, rgba(4, 8, 16, 0.4) 80%, rgba(4, 8, 16, 0.9) 100%)
            `,
          }}
        />

        {/* Ambient Warm Golden Glow Bleed from the building lights toward the center */}
        <div
          className="absolute top-1/4 right-[25%] w-[45vw] h-[55vh] rounded-full pointer-events-none opacity-25 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(246, 177, 88, 0.4) 0%, rgba(245, 166, 35, 0.1) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* 2. TOP NAVIGATION (MATCHING REFERENCE NAVBAR) */}
      <nav
        aria-label="Main Navigation"
        className="relative z-30 w-full px-6 md:px-12 lg:px-16 pt-7 pb-4 flex items-center justify-between"
      >
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onNavigateSection?.('arrival')}>
          <div className="w-10 h-10 rounded-full bg-[#f6b158] flex items-center justify-center text-neutral-950 font-bold text-sm tracking-wider shadow-md flex-shrink-0">
            AP
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.2em] text-white uppercase leading-tight font-sans">
              AMRIT PALACE
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.28em] text-neutral-400 uppercase leading-tight mt-0.5">
              LOHARDAGA
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-9 text-[13px] font-medium text-neutral-200 tracking-wide">
          <button
            onClick={() => onNavigateSection?.('stay')}
            className="hover:text-[#f6b158] transition-colors focus:outline-none"
          >
            Stay
          </button>
          <button
            onClick={() => onNavigateSection?.('dining')}
            className="hover:text-[#f6b158] transition-colors focus:outline-none"
          >
            Dine
          </button>
          <button
            onClick={() => onNavigateSection?.('celebrate')}
            className="hover:text-[#f6b158] transition-colors focus:outline-none"
          >
            Celebrate
          </button>
          <button
            onClick={() => onNavigateSection?.('meet')}
            className="hover:text-[#f6b158] transition-colors focus:outline-none"
          >
            Meet
          </button>
          <button
            onClick={() => onNavigateSection?.('story')}
            className="hover:text-[#f6b158] transition-colors focus:outline-none"
          >
            Our Story
          </button>
          <button
            onClick={() => onNavigateSection?.('faqs')}
            className="hover:text-[#f6b158] transition-colors focus:outline-none"
          >
            FAQs
          </button>
        </div>

        {/* Right: Book Your Stay Pill Button */}
        <div>
          <button
            onClick={onOpenBooking}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-[#f6b158] hover:bg-[#e59b2c] text-neutral-950 font-semibold text-xs sm:text-[13px] tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-300 active:scale-95 flex items-center justify-center whitespace-nowrap"
          >
            Book Your Stay
          </button>
        </div>
      </nav>

      {/* 3. GIANT "Amrit Palace" ATMOSPHERIC BACKGROUND WORDMARK */}
      <div
        className="absolute top-[17%] sm:top-[19%] md:top-[21%] left-6 md:left-12 lg:left-16 z-10 pointer-events-none select-none text-white/[0.08] font-bold tracking-tight whitespace-nowrap"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(4.8rem, 11.2vw, 11.5rem)',
          lineHeight: 0.9,
        }}
      >
        Amrit Palace
      </div>

      {/* 4. MAIN HEADLINE & FLOATING BOOKING BAR (LEFT ALIGNED) */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-16 my-auto pt-6 pb-12 flex flex-col items-start max-w-4xl">
        {/* Eyebrow */}
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-3.5 block font-sans">
          LOHARDAGA, JHARKHAND
        </span>

        {/* Headline */}
        <h1
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-[-0.02em] leading-[1.12] text-left"
        >
          <span className="text-white block">A Place for</span>
          <span className="text-[#f6b158] block">Every Occasion</span>
        </h1>

        {/* Supporting Category Line */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-normal text-neutral-300 tracking-wider mt-4 sm:mt-5">
          <span>Stay</span>
          <span className="text-neutral-500">•</span>
          <span>Dine</span>
          <span className="text-neutral-500">•</span>
          <span>Celebrate</span>
          <span className="text-neutral-500">•</span>
          <span>Meet</span>
        </div>

        {/* Horizontal Glass Booking Bar */}
        <div className="mt-7 sm:mt-8 w-full max-w-[650px] rounded-2xl bg-[#0f1724]/75 backdrop-blur-xl border border-white/15 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-0">
          {/* Check In */}
          <div
            onClick={onOpenBooking}
            className="flex-1 min-w-[130px] flex items-center gap-3 px-3 py-1.5 cursor-pointer hover:bg-white/5 rounded-xl transition-colors group"
          >
            <Calendar className="w-5 h-5 text-[#f6b158] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium leading-tight">
                Check In
              </span>
              <span className="text-xs sm:text-[13px] text-neutral-200 font-normal leading-snug mt-0.5">
                Select date
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-[1px] bg-white/15 mx-1" />

          {/* Check Out */}
          <div
            onClick={onOpenBooking}
            className="flex-1 min-w-[130px] flex items-center gap-3 px-3 py-1.5 cursor-pointer hover:bg-white/5 rounded-xl transition-colors group"
          >
            <Calendar className="w-5 h-5 text-[#f6b158] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium leading-tight">
                Check Out
              </span>
              <span className="text-xs sm:text-[13px] text-neutral-200 font-normal leading-snug mt-0.5">
                Select date
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-[1px] bg-white/15 mx-1" />

          {/* Guests */}
          <div
            onClick={onOpenBooking}
            className="flex-1 min-w-[120px] flex items-center gap-3 px-3 py-1.5 cursor-pointer hover:bg-white/5 rounded-xl transition-colors group"
          >
            <User className="w-5 h-5 text-[#f6b158] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium leading-tight">
                Guests
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs sm:text-[13px] text-neutral-200 font-normal leading-snug">
                  2 Guests
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full sm:w-auto pl-1 sm:pl-2">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-[#f6b158] hover:bg-[#e59b2c] text-neutral-950 font-semibold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all duration-200 whitespace-nowrap"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 text-neutral-950" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM CORNER DETAILS */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-16 pb-7 flex items-end justify-between pointer-events-none">
        {/* Bottom Left Detail */}
        <div className="border-l border-white/25 pl-3 text-left">
          <span className="block text-[9px] sm:text-[10px] font-medium tracking-[0.25em] text-neutral-400 uppercase leading-relaxed">
            HOSPITALITY
          </span>
          <span className="block text-[9px] sm:text-[10px] font-medium tracking-[0.25em] text-neutral-400 uppercase leading-relaxed">
            BEYOND STAYS
          </span>
        </div>

        {/* Bottom Right Detail */}
        <div className="border-r border-white/25 pr-3 text-right">
          <span className="block text-[9px] sm:text-[10px] font-medium tracking-[0.25em] text-neutral-400 uppercase leading-relaxed">
            WHERE
          </span>
          <span className="block text-[9px] sm:text-[10px] font-medium tracking-[0.25em] text-neutral-400 uppercase leading-relaxed">
            OCCASIONS FEEL LIKE HOME
          </span>
        </div>
      </div>
    </section>
  );
};
