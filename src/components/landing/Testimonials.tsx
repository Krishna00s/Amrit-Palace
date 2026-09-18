import React, { useState, useMemo, useEffect } from 'react';
import { TESTIMONIALS, TESTIMONIAL_CATEGORIES, type Testimonial } from '../../data/testimonials';

export const Testimonials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<number>(0);

  const isPaused = isHovered || isManuallyPaused;

  // Filter reviews by selected category
  const filteredReviews = useMemo(() => {
    if (selectedCategory === 'All') return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  // Ensure index stays in bounds if category changes
  const activeReview: Testimonial = filteredReviews[currentIndex] || filteredReviews[0] || TESTIMONIALS[0];

  // 6-second auto-rotation with pause on hover/touch and reset on manual change
  useEffect(() => {
    if (isPaused || filteredReviews.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
      setResetToken((token) => token + 1);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, filteredReviews.length, resetToken]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
    setResetToken((token) => token + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
    setResetToken((token) => token + 1);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setResetToken((token) => token + 1);
  };

  const toggleManualPause = () => {
    setIsManuallyPaused((prev) => !prev);
  };

  // Helper for language label
  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'hi':
        return 'हिंदी';
      case 'hinglish':
        return 'Hinglish';
      default:
        return 'English';
    }
  };

  return (
    <section
      id="reviews"
      aria-label="Guest Reviews and Reputation"
      className="w-full bg-white text-neutral-900 py-16 md:py-24 select-none border-t border-neutral-100 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Eyebrow, Reputation Summary, Categories & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-2">
                Guest Voices & Reputation
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-[1.2] font-['Plus_Jakarta_Sans',sans-serif]">
                Here is what guests say about staying & celebrating with us.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-2.5 font-light leading-relaxed">
                Authentic reflections across grand weddings, family milestones, restful AC room stays, and corporate meetings in Lohardaga.
              </p>

              {/* Verified Trust & Rating Summary Block */}
              <div className="mt-5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-xs flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">4.8</span>
                    <span className="text-amber-500 text-base tracking-widest">★★★★★</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 mt-0.5">
                    500+ Verified Reviews
                  </span>
                </div>
                <div className="h-9 w-px bg-neutral-200" />
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-neutral-800">98% Recommendation</span>
                  <span className="text-[11px] text-neutral-500 font-light">Across Stays, Banquets & Dining</span>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                Filter By Experience
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TESTIMONIAL_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = cat === 'All'
                    ? TESTIMONIALS.length
                    : TESTIMONIALS.filter((t) => t.category === cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-neutral-950/15 text-neutral-950 font-mono font-bold' : 'bg-neutral-200/80 text-neutral-500 font-mono'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Carousel Navigation Controls & Auto-Rotation Progress */}
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-700 transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    aria-label="Previous Review"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center justify-center transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    aria-label="Next Review"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <span className="text-xs text-neutral-500 font-medium ml-1 font-mono">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(filteredReviews.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Auto-Rotation State / Manual Pause Toggle (WCAG 2.2.2 Compliance) */}
                <button
                  type="button"
                  onClick={toggleManualPause}
                  className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
                  aria-label={isPaused ? 'Resume review auto-rotation' : 'Pause review auto-rotation'}
                  title={isPaused ? 'Click to resume 6-second auto-cycle' : 'Click to pause 6-second auto-cycle'}
                >
                  <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                  <span>{isPaused ? 'Paused' : '6s Auto-Cycle'}</span>
                  <span className="text-[10px] text-neutral-400">
                    {isManuallyPaused ? '(Click to Play)' : isHovered ? '(Hovering)' : ''}
                  </span>
                </button>
              </div>

              {/* Visual Hairline Progress Indicator */}
              <div className="w-full h-1 bg-neutral-200/70 rounded-full overflow-hidden">
                <div
                  key={`${selectedCategory}-${currentIndex}-${resetToken}`}
                  className="h-full bg-amber-500 rounded-full progress-bar-fill"
                  style={{
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: High-End Editorial Quotation Stage Card */}
          <div
            className="lg:col-span-7 flex flex-col justify-between min-h-[360px] sm:min-h-[380px] p-6 sm:p-10 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-sm relative overflow-hidden transition-all duration-300"
            aria-live="polite"
          >
            {/* Large Decorative Amber Watermark Quote */}
            <div
              aria-hidden="true"
              className="absolute top-3 right-6 text-amber-500/15 text-7xl sm:text-8xl font-serif font-bold leading-none select-none pointer-events-none"
            >
              ““
            </div>

            {/* Dynamic Review Content with subtle vertical fade */}
            <div
              key={activeReview.id}
              className="animate-review-fade-in flex flex-col justify-between flex-1 z-10"
            >
              <div>
                {/* Top Meta: Occasion Badge + Star Rating + Language Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-900 border border-amber-500/20">
                      {activeReview.occasion}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-700 font-bold font-mono">
                      {getLanguageLabel(activeReview.language)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-500 text-sm">
                    {'★'.repeat(activeReview.rating)}
                    <span className="text-xs text-neutral-400 font-mono font-medium">({activeReview.rating}.0)</span>
                  </div>
                </div>

                {/* Review Headline */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-snug mb-3.5 font-['Plus_Jakarta_Sans',sans-serif]">
                  {activeReview.headline}
                </h3>

                {/* Review Body (Multi-Lingual: EN, HI, Hinglish) */}
                <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed font-normal mb-8">
                  "{activeReview.review}"
                </p>
              </div>

              {/* Author Badge, Location, Verified Status, and Date */}
              <div className="pt-5 border-t border-neutral-200/70 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-neutral-950 font-bold text-sm flex items-center justify-center shadow-xs select-none">
                    {activeReview.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                      <span>{activeReview.name}</span>
                      {activeReview.location && (
                        <span className="text-xs font-normal text-neutral-400">
                          • {activeReview.location}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5 font-light">
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Verified Guest Stay &amp; Event</span>
                    </div>
                  </div>
                </div>

                {/* Review Date */}
                {activeReview.date && (
                  <div className="text-xs text-neutral-400 font-medium font-mono">
                    {activeReview.date}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
