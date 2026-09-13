import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, ArrowUp, Heart } from 'lucide-react';
import type { UserRole } from '../../types';

interface FooterProps {
  onNavigateSection: (section: 'arrival' | 'stay' | 'dining' | 'celebrate' | 'meet') => void;
  onOpenBooking: () => void;
  onOpenAuth: () => void;
  onSwitchPortal: (role: UserRole) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenBooking,
  onOpenAuth,
  onSwitchPortal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 w-full bg-neutral-950/95 border-t border-white/10 text-neutral-400 py-16 px-6 md:px-12 lg:px-20 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-transparent border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span
                  style={{ fontFamily: 'Cinzel, serif' }}
                  className="block text-xl font-bold tracking-[0.2em] text-white uppercase"
                >
                  Amrit Palace
                </span>
                <span className="block text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-light">
                  Lohardaga • Jharkhand
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md pt-2">
              A place for every occasion. We unite refined guest accommodation, pure vegetarian culinary mastery, and
              grand celebratory environments into a single, cohesive hospitality sanctuary.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300/90 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Pure Vegetarian Kitchen • 24/7 Hospitality</span>
            </div>
          </div>

          {/* Quick Experience Links */}
          <div className="space-y-3">
            <h4
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-white"
            >
              The Experience
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button
                  onClick={() => onNavigateSection('arrival')}
                  className="hover:text-amber-300 transition-colors"
                >
                  The Arrival & Property
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('stay')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Executive Master Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('dining')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Royal Dining & Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('celebrate')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Weddings & Banquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('meet')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Conferences & Meetings
                </button>
              </li>
            </ul>
          </div>

          {/* Connected Portals */}
          <div className="space-y-3">
            <h4
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-white"
            >
              Hotel Platform
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Book Executive Room
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSwitchPortal('CLIENT')}
                  className="hover:text-white transition-colors"
                >
                  Guest Experience Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSwitchPortal('CHEF')}
                  className="hover:text-white transition-colors"
                >
                  Chef Kitchen Queue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSwitchPortal('ADMIN')}
                  className="hover:text-white transition-colors"
                >
                  Admin Command Centre
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuth}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Sign In to Account
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contacts */}
          <div className="space-y-3">
            <h4
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-white"
            >
              Location & Contact
            </h4>
            <div className="space-y-2.5 text-xs font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Court Road, Lohardaga, Jharkhand 835302, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+91 94311 02938 / +91 98351 99201</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>reservations@amritpalace.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Check-in: 12:00 PM • Check-out: 11:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Zenova signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-neutral-500">
          <p>© {new Date().getFullYear()} Amrit Palace. All rights reserved. A Place for Every Occasion.</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              <span>by</span>
              <span className="text-white font-medium">Zenova</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-[11px]"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
