import React from 'react';

export const OurStory: React.FC = () => {
  return (
    <section
      id="story"
      className="relative z-20 bg-white text-neutral-900 py-16 md:py-24 select-none border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Label + Approved Social Proof Metrics */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full gap-8">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                Our Story
              </span>
              <div className="w-10 h-[2px] bg-amber-500 mb-6" />
            </div>

            {/* Confident, Integrated Social Proof (4.8★, 500+ Reviews, 10,000+ Guests Hosted) */}
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-sm max-w-sm">
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

          {/* Right Column: Editorial Statement + CTA Pill (matching StayGo composition) */}
          <div className="lg:col-span-8 flex flex-col items-start justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-medium leading-[1.3] text-neutral-400 font-['Plus_Jakarta_Sans',sans-serif]">
              From restful stays to grand celebrations,{' '}
              <span className="font-bold text-neutral-900">we welcome you</span>{' '}
              to experience heartfelt hospitality in Lohardaga where every special occasion finds its true home.
            </h2>

            {/* Pill button with amber circular arrow (matching StayGo Learn More pill) */}
            <div className="mt-8">
              <a
                href="#celebrate"
                className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border border-neutral-300 hover:border-neutral-900 transition-all duration-200 text-neutral-900 text-xs sm:text-sm font-semibold group cursor-pointer shadow-xs hover:shadow-md"
              >
                <span>Explore Amrit Palace</span>
                <span className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-hover:translate-x-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
