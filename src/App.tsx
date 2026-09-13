import React, { useState } from 'react';
import type { UserRole } from './types';
import { dataStore } from './services/dataStore';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { Header } from './components/landing/Header';
import { Hero } from './components/landing/Hero';
import { OurStory } from './components/landing/OurStory';
import { SignatureSpaces } from './components/landing/SignatureSpaces';
import { OccasionsCarousel } from './components/landing/OccasionsCarousel';
import { TrustCommunity } from './components/landing/TrustCommunity';
import { Testimonials } from './components/landing/Testimonials';
import { FAQ } from './components/landing/FAQ';
import { FooterHero } from './components/landing/FooterHero';
import { BookingModal } from './components/landing/BookingModal';
import { GuestPortalPreview } from './components/guest/GuestPortalPreview';
import { ChefPortalPreview } from './components/chef/ChefPortalPreview';
import { AdminPortalPreview } from './components/admin/AdminPortalPreview';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => dataStore.getActiveRole());
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState('AC Room Stay');

  const handleOpenBooking = (occasion = 'AC Room Stay') => {
    setSelectedOccasion(occasion);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 selection:bg-amber-500/30 selection:text-amber-950 font-['Plus_Jakarta_Sans',sans-serif] antialiased overflow-x-hidden">
      {/* Demo Platform Role Switcher (Preserving Connected Hotel Ecosystem) */}
      <RoleSwitcher
        currentRole={currentRole}
        onRoleChange={(role) => setCurrentRole(role)}
      />

      {/* Conditional Portal / Public Landing Rendering */}
      {currentRole === 'VISITOR' && (
        <>
          {/* Sticky Header with Navigation & Action Button */}
          <Header onOpenBooking={() => handleOpenBooking('AC Room Stay')} />

          <main>
            {/* Dark Cinematic Hero with Real Amrit Palace Twilight Exterior & Booking Bar */}
            <Hero onOpenBooking={() => handleOpenBooking('AC Room Stay')} />

            {/* White Editorial Intro: "Our Story" with 4.8★, 500+ Reviews, 10,000+ Guests Hosted */}
            <OurStory />

            {/* Signature Spaces Asymmetric Grid: Grand Ballroom, AC Guest Room, Dining */}
            <SignatureSpaces onOpenBooking={() => handleOpenBooking('Wedding & Reception')} />

            {/* Curated for Every Occasion Horizontal Carousel with < > controls */}
            <OccasionsCarousel onOpenBooking={(occ) => handleOpenBooking(occ || 'AC Room Stay')} />

            {/* Trust, Accreditations & Staggered Photo Gallery with Dark Community Card */}
            <TrustCommunity onOpenBooking={() => handleOpenBooking('Wedding & Reception')} />

            {/* 30+ Multi-Lingual Testimonials (English, Hindi, Hinglish) across 5 Pillars */}
            <Testimonials />

            {/* FAQ Accordion paired with Tall Real Property Atmosphere Photo */}
            <FAQ />

            {/* Final Dark Brand Moment & Comprehensive Footer */}
            <FooterHero onOpenBooking={() => handleOpenBooking('AC Room Stay')} />
          </main>

          {/* Global Interactive Booking & Planning Modal */}
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={handleCloseBooking}
            defaultOccasion={selectedOccasion}
          />
        </>
      )}

      {currentRole === 'CLIENT' && (
        <GuestPortalPreview
          onBackToPublic={() => setCurrentRole('VISITOR')}
          onOpenMenu={() => {}}
        />
      )}

      {currentRole === 'CHEF' && (
        <ChefPortalPreview
          onBackToPublic={() => setCurrentRole('VISITOR')}
        />
      )}

      {currentRole === 'ADMIN' && (
        <AdminPortalPreview
          onBackToPublic={() => setCurrentRole('VISITOR')}
        />
      )}
    </div>
  );
};

export default App;