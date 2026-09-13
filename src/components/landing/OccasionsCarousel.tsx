import React, { useRef } from 'react';

interface OccasionCard {
  id: string;
  title: string;
  location: string;
  categoryTag: string;
  image: string;
  description: string;
}

interface OccasionsCarouselProps {
  onOpenBooking: (occasion?: string) => void;
}

const OCCASIONS: OccasionCard[] = [
  {
    id: 'stay-room',
    title: 'Comfortable AC Guest Rooms',
    location: 'Main Road, Lohardaga',
    categoryTag: 'Master Bed & AC',
    image: '/images/room-ac-real.jpg',
    description: 'Clean, peaceful accommodation with king master bed, powerful air conditioning, and convenient transit access.',
  },
  {
    id: 'wedding-gala',
    title: 'Royal Weddings & Receptions',
    location: 'Grand Ballroom & Lawns',
    categoryTag: '500+ Car Parking',
    image: '/images/wedding-real.jpg',
    description: 'Spacious celebration venues, mandap setups, and banquet halls with vast parking so every guest arrives with ease.',
  },
  {
    id: 'family-dining',
    title: 'Multi-Cuisine Family Dining',
    location: 'Amrit Dining Restaurant',
    categoryTag: 'Fresh Delicacies',
    image: '/images/dining-ballroom-real.jpg',
    description: 'Fresh North Indian dishes, tandoori specialties, and celebration buffets prepared with genuine warmth.',
  },
  {
    id: 'birthday-parties',
    title: 'Joyful Birthdays & Milestones',
    location: 'Celebration Lounge',
    categoryTag: 'Family Gatherings',
    image: '/images/birthday-real.jpg',
    description: 'Festive decorations, balloon arches, music setup, and delicious food tailored for children and family anniversaries.',
  },
  {
    id: 'corporate-meets',
    title: 'Business Conferences & Meets',
    location: 'Executive Conference Room',
    categoryTag: 'AV & Power Backup',
    image: '/images/meeting-conference-real.jpg',
    description: 'Quiet, air-conditioned professional meeting space with presentation screens, reliable power backup, and catering.',
  },
];

export const OccasionsCarousel: React.FC<OccasionsCarouselProps> = ({ onOpenBooking }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="celebrate" className="w-full bg-white text-neutral-900 pb-16 md:pb-24 select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header with Circular < > Carousel Controls (exact StayGo layout) */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-1">
              Curated Spaces
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Curated for Every Occasion
            </h2>
          </div>

          {/* Carousel Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Previous Occasion"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              aria-label="Next Occasion"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Row */}
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {OCCASIONS.map((occasion) => (
            <div
              key={occasion.id}
              onClick={() => onOpenBooking(occasion.title)}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start group cursor-pointer flex flex-col"
            >
              {/* Rounded Image Container */}
              <div className="relative h-[220px] sm:h-[240px] rounded-2xl overflow-hidden mb-3.5 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src={occasion.image}
                  alt={occasion.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-amber-300 border border-white/10">
                  {occasion.categoryTag}
                </div>
              </div>

              {/* Title & Location */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
                    {occasion.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1 font-light">
                    <svg className="w-3 h-3 text-neutral-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {occasion.location}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed font-light">
                {occasion.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
