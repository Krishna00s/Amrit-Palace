import React, { useState, useEffect } from 'react';
import type { UserRole } from '../../types';
import { dataStore } from '../../services/dataStore';
import { Sparkles, Menu, X, Calendar, User, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAuth: () => void;
  onNavigateSection: (section: 'arrival' | 'stay' | 'dining' | 'celebrate' | 'meet' | 'contact') => void;
  onSwitchPortal: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAuth,
  onNavigateSection,
  onSwitchPortal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = dataStore.getCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled((window.scrollY || window.pageYOffset) > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: 'arrival' | 'stay' | 'dining' | 'celebrate' | 'meet' | 'contact') => {
    setMobileMenuOpen(false);
    onNavigateSection(section);
  };

  return (
    <>
      <header
        className={`fixed top-11 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none`}
      >
        <div
          className={`pointer-events-auto w-full transition-all duration-500 rounded-2xl border px-4 sm:px-6 py-3.5 flex items-center justify-between ${
            isScrolled
              ? 'bg-neutral-950/80 backdrop-blur-2xl border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              : 'bg-black/30 backdrop-blur-md border-white/10'
          }`}
        >
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleNavClick('arrival')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:border-amber-300 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span
                style={{ fontFamily: 'Cinzel, serif' }}
                className="block text-base sm:text-lg tracking-[0.2em] font-semibold text-white group-hover:text-amber-200 transition-colors uppercase"
              >
                Amrit Palace
              </span>
              <span className="block text-[9px] tracking-[0.28em] text-neutral-400 uppercase font-light -mt-0.5">
                Lohardaga • Jharkhand
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-light text-neutral-300">
            <button
              onClick={() => handleNavClick('stay')}
              className="hover:text-amber-300 transition-colors py-1 relative group"
            >
              <span>Stay</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => handleNavClick('dining')}
              className="hover:text-amber-300 transition-colors py-1 relative group"
            >
              <span>Dining</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => handleNavClick('celebrate')}
              className="hover:text-amber-300 transition-colors py-1 relative group"
            >
              <span>Celebrate</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => handleNavClick('meet')}
              className="hover:text-amber-300 transition-colors py-1 relative group"
            >
              <span>Meet</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-amber-300 transition-colors py-1 relative group"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Actions: Guest Portal & Book a Stay */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => onSwitchPortal('CLIENT')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-amber-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>My Stay</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>Guest Sign In</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-xl text-xs font-medium tracking-wide uppercase bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-1.5 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Stay</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 text-black font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Glass Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 sm:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-5 text-lg uppercase tracking-wider font-light">
            <button
              onClick={() => handleNavClick('arrival')}
              className="text-left text-neutral-300 hover:text-amber-300 py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>The Arrival</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
            <button
              onClick={() => handleNavClick('stay')}
              className="text-left text-neutral-300 hover:text-amber-300 py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Stay & Suites</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
            <button
              onClick={() => handleNavClick('dining')}
              className="text-left text-neutral-300 hover:text-amber-300 py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Dining & Menu</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
            <button
              onClick={() => handleNavClick('celebrate')}
              className="text-left text-neutral-300 hover:text-amber-300 py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Weddings & Celebrations</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
            <button
              onClick={() => handleNavClick('meet')}
              className="text-left text-neutral-300 hover:text-amber-300 py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Meetings & Conferences</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left text-neutral-300 hover:text-amber-300 py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>Contact & Location</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchPortal('CLIENT');
                }}
                className="w-full py-3 rounded-xl text-center text-sm font-medium bg-white/10 text-white border border-white/15"
              >
                Go to My Stay ({currentUser.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-3 rounded-xl text-center text-sm font-medium bg-white/10 text-white border border-white/15"
              >
                Guest Sign In
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl text-center text-sm font-semibold bg-amber-500 text-black uppercase tracking-wider"
            >
              Book an Executive Stay
            </button>
          </div>
        </div>
      )}
    </>
  );
};
