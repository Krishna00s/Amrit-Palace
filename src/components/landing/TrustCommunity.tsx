import React, { useState } from 'react';

interface TrustCommunityProps {
  onOpenBooking: () => void;
}

export const TrustCommunity: React.FC<TrustCommunityProps> = ({ onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <section id="meet" className="w-full bg-white text-neutral-900 py-16 md:py-24 overflow-hidden select-none border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-2">
          Hospitality Excellence
        </span>

        {/* Headline (matching StayGo "Trusted Stays, Seamless Booking Explore Now!") */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-[1.2] font-['Plus_Jakarta_Sans',sans-serif]">
          Unmatched Hospitality, Seamless Gatherings. Welcome to Amrit Palace!
        </h2>

        <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-500 max-w-xl leading-relaxed font-light">
          Whether you are arriving for a restful stay, an intimate family meal, or a grand 1,000-guest wedding, every detail is handled with care.
        </p>

        {/* Primary CTA Button (matching StayGo Get Started pill) */}
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

        {/* Trust Accreditation Pillars (clean editorial logos matching StayGo brand row) */}
        <div className="w-full max-w-4xl mt-12 mb-14 pt-8 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center text-neutral-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-neutral-900">4.8 ★</span>
            <span className="text-[11px] text-neutral-400 font-normal">500+ Reviews</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-neutral-900">10,000+</span>
            <span className="text-[11px] text-neutral-400 font-normal">Guests Hosted</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-neutral-900">500+</span>
            <span className="text-[11px] text-neutral-400 font-normal">Car Parking Capacity</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-neutral-900">1,000</span>
            <span className="text-[11px] text-neutral-400 font-normal">Max Banquet Guests</span>
          </div>
        </div>

        {/* Staggered Curved Photo Gallery Row with Dark Center Community Card (exact StayGo layout) */}
        <div className="w-full relative flex items-center justify-center gap-3 sm:gap-4 md:gap-5 px-2 overflow-x-auto py-4">
          {/* Card 1: Far Left (slight tilt/scale) */}
          <div className="w-[140px] sm:w-[170px] md:w-[190px] h-[190px] sm:h-[220px] md:h-[250px] rounded-2xl overflow-hidden shrink-0 shadow-md transform -translate-y-2 hover:translate-y-0 transition-transform">
            <img
              src="/images/entrance-facade-real.jpg"
              alt="Amrit Palace entrance facade and parking"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Card 2: Left Center */}
          <div className="w-[150px] sm:w-[180px] md:w-[210px] h-[210px] sm:h-[240px] md:h-[270px] rounded-2xl overflow-hidden shrink-0 shadow-lg transform translate-y-2 hover:translate-y-0 transition-transform">
            <img
              src="/images/wedding-real.jpg"
              alt="Real Indian wedding celebration at Amrit Palace"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Center Card: Dark Interactive Community Card (exact StayGo center dark card) */}
          <div className="w-[260px] sm:w-[300px] md:w-[330px] h-[230px] sm:h-[260px] md:h-[285px] rounded-3xl bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-between shrink-0 shadow-2xl border border-white/10 z-10">
            <div>
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block mb-2" />
              <p className="text-sm sm:text-base font-semibold leading-snug text-neutral-100">
                Join our guest community for occasion planning & seasonal updates.
              </p>
            </div>

            {/* Email Contact Pill */}
            <form onSubmit={handleSubmit} className="relative mt-3">
              <input
                type="email"
                required
                placeholder="reservations@amritpalace.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-neutral-900 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 pr-10"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white text-neutral-950 hover:bg-amber-400 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Submit Email"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
            {isSubmitted && (
              <span className="text-[10px] text-amber-300">Thank you! We will connect shortly.</span>
            )}
          </div>

          {/* Card 3: Right Center */}
          <div className="w-[150px] sm:w-[180px] md:w-[210px] h-[210px] sm:h-[240px] md:h-[270px] rounded-2xl overflow-hidden shrink-0 shadow-lg transform translate-y-2 hover:translate-y-0 transition-transform">
            <img
              src="/images/birthday-real.jpg"
              alt="Birthday celebration at Amrit Palace"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Card 4: Far Right */}
          <div className="w-[140px] sm:w-[170px] md:w-[190px] h-[190px] sm:h-[220px] md:h-[250px] rounded-2xl overflow-hidden shrink-0 shadow-md transform -translate-y-2 hover:translate-y-0 transition-transform">
            <img
              src="/images/lobby-lounge-real.jpg"
              alt="Grand lobby lounge of Amrit Palace"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
