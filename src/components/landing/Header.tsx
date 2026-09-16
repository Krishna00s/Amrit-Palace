import React, { useState, useEffect } from 'react';
import { scrollTo } from '../../motion';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Stay', href: '#stay' },
    { name: 'Dine', href: '#dine' },
    { name: 'Celebrate', href: '#celebrate' },
    { name: 'Meet', href: '#meet' },
    { name: 'Our Story', href: '#story' },
    { name: 'FAQs', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md py-3.5 shadow-xl shadow-black/50 border-b border-white/10'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo / Wordmark (matching reference Image 1) */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 text-white group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-[#F8BD5C] flex items-center justify-center text-neutral-950 font-black text-xs tracking-tight shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
            AP
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-[15px] font-bold tracking-wider text-white font-['Plus_Jakarta_Sans',sans-serif] leading-tight">
              AMRIT PALACE
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-medium leading-tight">
              LOHARDAGA
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (matching reference Image 1) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs lg:text-[13px] tracking-wide text-neutral-300 hover:text-white transition-colors font-medium relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#F8BD5C] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button (matching reference Image 1 amber pill) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-[#F8BD5C] hover:bg-[#EAA748] text-neutral-950 font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Book Your Stay
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-base text-neutral-200 hover:text-amber-400 py-1 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 font-semibold text-sm shadow-md"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
