import React, { useState } from 'react';
import { dataStore } from '../../services/dataStore';
import type { EventEnquiry, EventOccasionType } from '../../types';
import { X, Calendar, User, Phone, Mail, Users, CheckCircle2, PartyPopper, ArrowRight } from 'lucide-react';

interface EventEnquiryModalProps {
  isOpen: boolean;
  initialOccasion?: string;
  onClose: () => void;
}

export const EventEnquiryModal: React.FC<EventEnquiryModalProps> = ({
  isOpen,
  initialOccasion = 'WEDDING',
  onClose,
}) => {
  const [occasionType, setOccasionType] = useState<EventOccasionType>(
    (initialOccasion as EventOccasionType) || 'WEDDING'
  );
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState(() =>
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );
  const [guestCount, setGuestCount] = useState(250);
  const [requirements, setRequirements] = useState('');
  const [submittedEnquiry, setSubmittedEnquiry] = useState<EventEnquiry | null>(null);

  if (!isOpen) return null;

  const getOccasionLabel = (type: EventOccasionType): string => {
    switch (type) {
      case 'WEDDING':
        return 'Traditional Royal Indian Wedding';
      case 'BIRTHDAY':
        return 'Grand Birthday Gala';
      case 'CONFERENCE':
        return 'Executive Corporate Conference';
      case 'ANNIVERSARY':
        return 'Family Milestone Anniversary';
      case 'CEREMONY':
        return 'Traditional Ceremony / Ritual';
      default:
        return 'Private Banquet Occasion';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    const enq = dataStore.createEventEnquiry({
      occasionType,
      occasionLabel: getOccasionLabel(occasionType),
      preferredDate,
      guestCount,
      contactName: contactName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      requirements: requirements.trim() || 'General inquiry regarding banquet and dining packages.',
    });

    setSubmittedEnquiry(enq);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-950/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedEnquiry ? (
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase font-medium mb-1">
              <PartyPopper className="w-3.5 h-3.5" />
              <span>Banquets & Celebrations</span>
            </div>
            <h3
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider"
            >
              Plan an Occasion
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
              Connect with our dedicated banquet manager to tailor decor, seating, and royal culinary buffets.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                  Type of Occasion
                </label>
                <select
                  value={occasionType}
                  onChange={(e) => setOccasionType(e.target.value as EventOccasionType)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="WEDDING">Traditional Indian Wedding (Mandap & Reception)</option>
                  <option value="BIRTHDAY">Birthday Party & Family Gathering</option>
                  <option value="CONFERENCE">Corporate Conference / Seminar / Boardroom</option>
                  <option value="ANNIVERSARY">Anniversary Celebration</option>
                  <option value="CEREMONY">Auspicious Ceremony / Social Occasion</option>
                  <option value="OTHER">Custom Special Event</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-amber-400" />
                    <span>Your Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Amit Verma"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>Mobile Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit phone number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-amber-400" />
                    <span>Approx. Guest Count</span>
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={1500}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-amber-400" />
                  <span>Email Address (Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                  Requirements & Vision
                </label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe your desired decor, lawn setup, pure veg catering menu preferences, audio-visual needs..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Submit Event Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs text-amber-400 uppercase tracking-widest font-medium">Enquiry Submitted</span>
            <h3
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-2xl font-bold text-white uppercase tracking-wider mt-1"
            >
              We’ve Received Your Vision
            </h3>

            <p className="text-neutral-300 text-xs sm:text-sm font-light mt-2 max-w-sm mx-auto">
              Thank you, <strong>{submittedEnquiry.contactName}</strong>. Our banquet management team will review your
              requirements and contact you at <strong>{submittedEnquiry.phone}</strong>.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Reference Code:</span>
                <span className="font-mono text-amber-300 font-bold">{submittedEnquiry.enquiryCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Occasion:</span>
                <span className="text-white font-medium">{submittedEnquiry.occasionLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Target Date:</span>
                <span className="text-white">{submittedEnquiry.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Guest Count:</span>
                <span className="text-white">{submittedEnquiry.guestCount} Guests</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
