import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I reserve an AC guest room at Amrit Palace?',
    answer: 'You can reserve directly by clicking "Book Your Stay" on this page or contacting our front desk at +91 94311 02938. We feature comfortable AC rooms equipped with king master beds, clean linens, and attached modern bathrooms.',
  },
  {
    question: 'Can we host large weddings, receptions, and family ceremonies here?',
    answer: 'Yes! Amrit Palace offers spacious celebration halls and banquet areas capable of accommodating 500+ people, complete with customizable decor, stage lighting, and full catering support for marriages, sangeet, and tilak ceremonies.',
  },
  {
    question: 'What dining options and catering menus are available?',
    answer: 'Our in-house kitchen prepares fresh multi-cuisine North Indian delicacies, celebratory thalis, and custom event buffets. Vegetarian and non-vegetarian catering packages are available for all occasions.',
  },
  {
    question: 'Is there sufficient parking space for our event guests?',
    answer: 'Yes, Amrit Palace provides dedicated on-premises parking spaces for 20+ vehicles, ensuring your relatives and guests experience hassle-free parking.',
  },
  {
    question: 'Can we host corporate meetings and business conferences?',
    answer: 'Our air-conditioned executive meeting facilities feature presentation screens, boardroom seating, uninterrupted power backup, and dedicated beverage and lunch services for corporate gatherings.',
  },
  {
    question: 'Where is Amrit Palace located in Lohardaga and how do we reach?',
    answer: 'Amrit Palace is centrally located on the main connectivity route near the Bus Stand and Power Grid in Lohardaga, Jharkhand (PIN 835302), providing quick and effortless access from Ranchi, Gumla, and Latehar.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full bg-transparent text-neutral-900 py-16 md:py-24 select-none border-t border-black/[0.04] atmosphere-tint-faq">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: FAQ Accordion (matching StayGo layout) */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-neutral-400 block mb-2">
              FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
              Got Questions? We’re Here to Help.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 mb-8 font-light">
              Find quick answers about room reservations, wedding bookings, dining, and property amenities.
            </p>

            {/* Accordion List */}
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    >
                      <span className={`text-sm sm:text-base font-semibold transition-colors ${isOpen ? 'text-amber-600' : 'text-neutral-900 group-hover:text-amber-600'}`}>
                        {item.question}
                      </span>
                      <span className="ml-4 shrink-0 text-neutral-400 group-hover:text-neutral-900">
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-500' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light animate-in fade-in duration-200">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tall Portrait Image (exact StayGo layout) */}
          <div className="lg:col-span-5 h-[420px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-xl sticky top-24">
            <img
              src="/images/lobby-lounge-real.jpg"
              alt="Atmospheric hospitality at Amrit Palace"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
