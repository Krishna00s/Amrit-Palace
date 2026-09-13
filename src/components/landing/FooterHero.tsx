import React from 'react';

interface FooterHeroProps {
  onOpenBooking: () => void;
}

export const FooterHero: React.FC<FooterHeroProps> = ({ onOpenBooking }) => {
  return (
    <footer className="relative w-full bg-neutral-950 text-white pt-24 pb-12 overflow-hidden select-none">
      {/* Background Image: Real Amrit Palace Brand Reveal & Twilight Illumination */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/brand-reveal-real.jpg"
          alt="Amrit Palace evening brand atmosphere"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Centered Top Call to Action (matching StayGo finale) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs tracking-[0.25em] uppercase font-bold text-amber-400 block mb-3">
            Amrit Palace • Lohardaga
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            A Destination You’ll Never Forget.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-200">
              Moments You’ll Cherish Forever.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
            Your next family celebration, wedding gathering, or restful AC stay awaits in the heart of Jharkhand.
          </p>

          <button
            onClick={onOpenBooking}
            className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-600/30 hover:shadow-amber-500/50 transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            Reserve Your Occasion
          </button>
        </div>

        {/* Giant Watermark Typography (exact StayGo footer brand mark) */}
        <div className="w-full text-center my-8 sm:my-12 overflow-hidden select-none pointer-events-none">
          <span className="text-[12vw] sm:text-[13vw] font-black tracking-tighter uppercase text-white/[0.12] leading-none whitespace-nowrap block font-['Plus_Jakarta_Sans',sans-serif]">
            AMRIT PALACE
          </span>
        </div>

        {/* Footer Details: Address, Contact & Social Links (exact StayGo layout) */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 text-xs text-neutral-400">
          {/* Address & Contact Info */}
          <div className="flex flex-col gap-1.5 font-light">
            <span className="text-sm font-semibold text-white tracking-wider uppercase mb-1">
              Amrit Palace
            </span>
            <span>Near Power Grid & Bus Stand, Main Road</span>
            <span>Lohardaga, Jharkhand 835302, India</span>
            <span className="mt-2 text-neutral-300">
              Phone:{' '}
              <a href="tel:+919431100000" className="hover:text-amber-400 transition-colors">
                +91 94311 00000
              </a>
            </span>
            <span>
              Email:{' '}
              <a href="mailto:reservations@amritpalace.com" className="hover:text-amber-400 transition-colors">
                reservations@amritpalace.com
              </a>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
            <a
              href="https://www.instagram.com/amritpalacejh08/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Instagram
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              YouTube
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Location Map
            </a>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <span>© 2026 Amrit Palace. All Rights Reserved. A Place for Every Occasion.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Guest Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
