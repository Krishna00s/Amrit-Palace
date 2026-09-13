import React, { useState, useMemo } from 'react';
import { TESTIMONIALS, TESTIMONIAL_CATEGORIES, type Testimonial } from '../../data/testimonials';

export const Testimonials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Filter reviews by selected category
  const filteredReviews = useMemo(() => {
    if (selectedCategory === 'All') return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const activeReview: Testimonial = filteredReviews[currentIndex] || TESTIMONIALS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  return (
    <section id="reviews" className="w-full bg-white text-neutral-900 py-16 md:py-24 select-none border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Context & Navigation Controls (matching StayGo) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full gap-6">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-2">
                Guest Stories
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
                Here is what guests say about staying & celebrating with us.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-light leading-relaxed">
                Genuine experiences shared across weddings, family milestones, peaceful AC stays, and corporate meetings in Lohardaga.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {TESTIMONIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-neutral-950 font-semibold shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Carousel Navigation Controls & Counter */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label="Previous Review"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Next Review"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <span className="text-xs text-neutral-400 font-medium ml-2">
                {currentIndex + 1} / {filteredReviews.length} Reviews
              </span>
            </div>
          </div>

          {/* Right Column: Large Quotation Mark + Review Content (exact StayGo layout) */}
          <div className="lg:col-span-8 flex flex-col justify-between min-h-[300px] p-6 sm:p-10 rounded-3xl bg-neutral-50/70 border border-neutral-200/80 shadow-sm relative overflow-hidden transition-all duration-300">
            {/* Large Decorative Quote Icon */}
            <div className="text-amber-500/25 text-6xl sm:text-7xl font-serif font-bold leading-none mb-3 select-none">
              ““
            </div>

            {/* Headline */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 leading-snug mb-4">
              {activeReview.headline}
            </h3>

            {/* Review Body (supports English, Hindi, Hinglish authentically) */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed font-normal mb-8">
              {activeReview.review}
            </p>

            {/* Author Badge, Occasion Tag, and Star Rating */}
            <div className="pt-4 border-t border-neutral-200/70 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-neutral-950 font-bold text-sm flex items-center justify-center shadow-xs">
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
                  <span className="text-xs text-amber-600 font-medium">
                    {activeReview.occasion}
                  </span>
                </div>
              </div>

              {/* Star Rating & Language Tag */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-600 font-semibold">
                  {activeReview.language}
                </span>
                <div className="flex text-amber-500 text-sm">
                  {'★'.repeat(activeReview.rating)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
