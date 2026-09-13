import React from 'react';
import {
  Sparkles,
  Bed,
  Utensils,
  PartyPopper,
  Briefcase,
  Tv,
  Wifi,
  Wind,
  Coffee,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

interface StoryOverlaysProps {
  scrollProgress: number;
  onOpenBooking: () => void;
  onOpenEventEnquiry: (occasion?: string) => void;
  onOpenMenuPreview: () => void;
}

export const StoryOverlays: React.FC<StoryOverlaysProps> = ({
  scrollProgress,
  onOpenBooking,
  onOpenEventEnquiry,
  onOpenMenuPreview,
}) => {
  // Helper to compute smooth opacity and transform based on progress window [start, peakStart, peakEnd, end]
  const getStageOpacity = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (scrollProgress < start || scrollProgress > end) return 0;
    if (scrollProgress >= peakStart && scrollProgress <= peakEnd) return 1;
    if (scrollProgress < peakStart) {
      return (scrollProgress - start) / (peakStart - start);
    }
    return 1 - (scrollProgress - peakEnd) / (end - peakEnd);
  };

  const stage1Opacity = getStageOpacity(-0.05, 0.0, 0.12, 0.16);
  const stage2Opacity = getStageOpacity(0.14, 0.18, 0.28, 0.33);
  const stage3Opacity = getStageOpacity(0.31, 0.36, 0.48, 0.53);
  const stage4Opacity = getStageOpacity(0.51, 0.56, 0.68, 0.72);
  const stage5Opacity = getStageOpacity(0.70, 0.74, 0.83, 0.87);
  const stage6Opacity = getStageOpacity(0.85, 0.89, 1.05, 1.1);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* STAGE 1: ARRIVAL (0% - 15%)                                    */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ease-out"
        style={{
          opacity: stage1Opacity,
          transform: `translateY(${(1 - stage1Opacity) * 30}px) scale(${0.96 + stage1Opacity * 0.04})`,
          visibility: stage1Opacity > 0.01 ? 'visible' : 'hidden',
        }}
      >
        <div className="max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs tracking-[0.25em] uppercase font-light mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Lohardaga’s Hospitality Landmark</span>
          </div>

          <h1
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.18em] text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] leading-[1.15]"
          >
            Amrit Palace
          </h1>

          <p
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-lg sm:text-2xl md:text-3xl font-light tracking-[0.3em] text-amber-200/90 mt-4 uppercase drop-shadow-md"
          >
            A Place for Every Occasion
          </p>

          <p className="max-w-2xl text-neutral-300 text-sm sm:text-base md:text-lg font-light mt-6 leading-relaxed drop-shadow-lg">
            Where celebratory warmth meets restful elegance. Experience thoughtful hospitality, authentic regional dining,
            and grand celebrations in the heart of Jharkhand.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <Bed className="w-4 h-4" />
              <span>Reserve a Room</span>
            </button>

            <button
              onClick={onOpenMenuPreview}
              className="px-6 py-3.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 backdrop-blur-xl border border-white/15 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-xl hover:border-amber-400/40"
            >
              <Utensils className="w-4 h-4 text-amber-300" />
              <span>Explore Dining</span>
            </button>
          </div>
        </div>

        {/* Bottom subtle guidance */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 text-neutral-400 text-xs tracking-[0.25em] uppercase font-light">
          <span>Scroll to uncover the journey</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-amber-400/80" />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAGE 2: STAY & COMFORT (15% - 32%)                            */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 flex items-center justify-start px-6 md:px-16 lg:px-24 transition-all duration-700 ease-out"
        style={{
          opacity: stage2Opacity,
          transform: `translateX(${(1 - stage2Opacity) * -40}px)`,
          visibility: stage2Opacity > 0.01 ? 'visible' : 'hidden',
        }}
      >
        <div className="max-w-xl w-full bg-black/60 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">01 / Stay</span>
            <span className="text-neutral-400 text-xs font-light tracking-wider">Lohardaga Suites</span>
          </div>

          <h2
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white uppercase"
          >
            Executive Master Room
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base font-light mt-3 leading-relaxed">
            Honest luxury crafted for peaceful repose. A climate-controlled master haven equipped with a plush king orthopedic
            mattress, ambient mood lighting, and prompt 24/7 in-room dining.
          </p>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 gap-3 my-6 pt-2">
            <div className="flex items-center gap-2.5 text-xs text-neutral-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Wind className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Split Inverter AC</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Bed className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>King Master Bed</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Tv className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>43" 4K Smart TV</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Wifi className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>High-Speed Wi-Fi</span>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Standard Rate</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-300">₹2,499</span>
              <span className="text-xs text-neutral-400 font-light"> / night + GST</span>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Book Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAGE 3: DINING & MENU (33% - 52%)                             */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24 transition-all duration-700 ease-out"
        style={{
          opacity: stage3Opacity,
          transform: `translateX(${(1 - stage3Opacity) * 40}px)`,
          visibility: stage3Opacity > 0.01 ? 'visible' : 'hidden',
        }}
      >
        <div className="max-w-xl w-full bg-black/60 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">02 / Dine</span>
            <span className="text-neutral-400 text-xs font-light tracking-wider">Culinary Artistry</span>
          </div>

          <h2
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white uppercase"
          >
            A Feast of Royal Flavours
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base font-light mt-3 leading-relaxed">
            Fresh cottage cheese simmered in hand-ground spices, overnight slow-cooked dal makhani, and fragrant dum biryani
            steeped in royal saffron. Food crafted to make every guest crave the next bite.
          </p>

          {/* Dish Feature Cards */}
          <div className="flex flex-col gap-2.5 my-5">
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=150&auto=format&fit=crop&q=80"
                  alt="Handi Paneer Khas"
                  className="w-12 h-12 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Handi Paneer Khas</h4>
                  <p className="text-[11px] text-neutral-400">Silken paneer in rich cashew-tomato reduction</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-amber-300 pr-2">₹320</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&auto=format&fit=crop&q=80"
                  alt="Amrit Dum Veg Biryani"
                  className="w-12 h-12 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Amrit Dum Veg Biryani</h4>
                  <p className="text-[11px] text-neutral-400">Aged basmati with saffron, herbs & burani raita</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-amber-300 pr-2">₹290</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-xs text-neutral-400 font-light">100% Pure Vegetarian Kitchen</span>
            <button
              onClick={onOpenMenuPreview}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAGE 4: CELEBRATE (53% - 70%)                                */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 flex items-center justify-start px-6 md:px-16 lg:px-24 transition-all duration-700 ease-out"
        style={{
          opacity: stage4Opacity,
          transform: `translateX(${(1 - stage4Opacity) * -40}px)`,
          visibility: stage4Opacity > 0.01 ? 'visible' : 'hidden',
        }}
      >
        <div className="max-w-xl w-full bg-black/60 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">03 / Celebrate</span>
            <span className="text-neutral-400 text-xs font-light tracking-wider">Banquets & Lawns</span>
          </div>

          <h2
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white uppercase"
          >
            Where Celebrations Unfold
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base font-light mt-3 leading-relaxed">
            From the sacred rituals of traditional Indian weddings with floral mandaps to joyful children’s birthdays and
            milestone anniversaries. We create an enchanting environment for your most sacred moments.
          </p>

          {/* Occasion Tags */}
          <div className="flex flex-wrap gap-2 my-6">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-1.5">
              <PartyPopper className="w-3.5 h-3.5" />
              <span>Royal Indian Weddings</span>
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grand Birthday Galas</span>
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5" />
              <span>Anniversaries & Ceremonies</span>
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <span className="text-xs text-neutral-400 block font-light">Capacity up to 500+ Guests</span>
              <span className="text-xs text-emerald-400 font-medium">Dedicated Event Coordinator</span>
            </div>

            <button
              onClick={() => onOpenEventEnquiry('WEDDING')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Plan an Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAGE 5: MEET (71% - 85%)                                     */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24 transition-all duration-700 ease-out"
        style={{
          opacity: stage5Opacity,
          transform: `translateX(${(1 - stage5Opacity) * 40}px)`,
          visibility: stage5Opacity > 0.01 ? 'visible' : 'hidden',
        }}
      >
        <div className="max-w-xl w-full bg-black/60 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">04 / Meet</span>
            <span className="text-neutral-400 text-xs font-light tracking-wider">Corporate Hospitality</span>
          </div>

          <h2
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white uppercase"
          >
            Executive Meetings & Conferences
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base font-light mt-3 leading-relaxed">
            Professional poise and contemporary technology. Host board meetings, regional conferences, seminars, and product
            briefings supported by high-definition audiovisual setups and tailored executive luncheon menus.
          </p>

          <div className="grid grid-cols-2 gap-3 my-6">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-200">
              <span className="font-semibold text-white block mb-1">Modern Audio-Visual</span>
              <span className="text-neutral-400 text-[11px]">HD Projector, Collar Mics & Sound Control</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-200">
              <span className="font-semibold text-white block mb-1">Executive Catering</span>
              <span className="text-neutral-400 text-[11px]">High-Tea, Refreshments & Buffet Services</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Quiet & Private Layouts</span>
            </div>

            <button
              onClick={() => onOpenEventEnquiry('CONFERENCE')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Book Conference</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAGE 6: BRAND MOMENT & FOOTER TRANSITION (86% - 100%)         */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ease-out"
        style={{
          opacity: stage6Opacity,
          transform: `scale(${0.95 + stage6Opacity * 0.05})`,
          visibility: stage6Opacity > 0.01 ? 'visible' : 'hidden',
        }}
      >
        <div className="max-w-3xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/25 to-transparent border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.3)] mb-6">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>

          <h2
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-[0_4px_40px_rgba(0,0,0,0.9)]"
          >
            Amrit Palace
          </h2>

          <p
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-lg sm:text-2xl font-light tracking-[0.35em] text-amber-200 mt-4 uppercase drop-shadow-md"
          >
            A Place for Every Occasion
          </p>

          <p className="text-neutral-300 text-sm sm:text-base max-w-xl font-light mt-5 drop-shadow-md">
            Come stay, dine, celebrate, and meet with us in Lohardaga. We welcome you with warmth, honour, and genuine hospitality.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-500/30 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <Bed className="w-4 h-4" />
              <span>Book Your Stay</span>
            </button>

            <button
              onClick={() => onOpenEventEnquiry('WEDDING')}
              className="px-7 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/90 backdrop-blur-xl border border-white/20 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-xl hover:border-amber-400/40"
            >
              <Briefcase className="w-4 h-4 text-amber-300" />
              <span>Plan an Occasion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
