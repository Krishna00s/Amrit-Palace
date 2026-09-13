import React from 'react';

interface SignatureSpacesProps {
  onOpenBooking: () => void;
}

export const SignatureSpaces: React.FC<SignatureSpacesProps> = ({ onOpenBooking }) => {
  return (
    <section id="services" className="w-full bg-white text-neutral-900 pb-16 md:pb-24 select-none">
      <div id="spaces" className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header (matching StayGo "Our most Amazing Destination" + Explore Now pill) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-1">
              Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Discover Our Signature Spaces
            </h2>
          </div>

          <button
            onClick={onOpenBooking}
            className="self-start sm:self-auto inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full border border-neutral-300 hover:border-neutral-900 transition-all duration-200 text-neutral-900 text-xs sm:text-sm font-semibold group cursor-pointer shadow-xs hover:shadow-md"
          >
            <span>Reserve a Space</span>
            <span className="w-7 h-7 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-hover:translate-x-0.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </button>
        </div>

        {/* 1 Large Card Left + 2 Stacked Cards Right (exact StayGo layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Large Left Card: Grand Banquet & Lawns */}
          <div
            onClick={onOpenBooking}
            className="lg:col-span-7 group relative h-[380px] sm:h-[460px] md:h-[520px] rounded-3xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 hover:shadow-2xl"
          >
            <img
              src="/images/banquet-ballroom-real.jpg"
              alt="Grand Royal Ballroom at Amrit Palace with crystal chandeliers"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Content Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-[11px] font-semibold mb-2">
                  <span>★</span> 4.9 out of 5
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                  The Grand Royal Ballroom & Lawns
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 mt-1 flex items-center gap-1.5 font-light">
                  <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Lohardaga, Jharkhand • Up to 1,000 Guests & Vast Parking
                </p>
              </div>

              {/* Hover Arrow Circle */}
              <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110 shrink-0 ml-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2 Stacked Cards Right */}
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
            {/* Top Right Card: Real AC Guest Room */}
            <div
              id="stay"
              onClick={onOpenBooking}
              className="group relative h-[180px] sm:h-[220px] md:h-[248px] rounded-3xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <img
                src="/images/room-ac-real.jpg"
                alt="Amrit Palace AC guest room with master bed"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-[10px] font-semibold mb-1">
                    <span>★</span> 4.8 out of 5
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Amrit Palace AC Guest Rooms
                  </h4>
                  <p className="text-xs text-neutral-200 mt-0.5 flex items-center gap-1 font-light">
                    <span>Master Bed, AC, Clean Linens & TV</span>
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110 shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Right Card: Dining & Catering */}
            <div
              id="dine"
              onClick={onOpenBooking}
              className="group relative h-[180px] sm:h-[220px] md:h-[248px] rounded-3xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <img
                src="/images/dining-ballroom-real.jpg"
                alt="Amrit Palace dining room with banquet tables"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-[10px] font-semibold mb-1">
                    <span>★</span> 4.8 out of 5
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Amrit Dining & Catering
                  </h4>
                  <p className="text-xs text-neutral-200 mt-0.5 flex items-center gap-1 font-light">
                    <span>Authentic Multi-Cuisine Dishes & Event Buffets</span>
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110 shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
