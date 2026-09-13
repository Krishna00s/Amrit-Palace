import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOccasion?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultOccasion = 'AC Room Stay',
}) => {
  const [occasion, setOccasion] = useState(defaultOccasion);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setOccasion(defaultOccasion);
  }, [defaultOccasion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setGuestName('');
      setPhone('');
      setNotes('');
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-white/15 p-6 sm:p-8 text-white shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4 text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Reservation Request Received</h3>
            <p className="text-sm text-neutral-300 max-w-xs leading-relaxed font-light">
              Thank you, <span className="font-semibold text-white">{guestName}</span>. Our hospitality desk will call you at <span className="font-semibold text-white">{phone}</span> to confirm your booking details.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-amber-400 block mb-1">
                Amrit Palace • Lohardaga
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Plan Your Stay or Occasion
              </h2>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                Direct booking with guaranteed best arrangements and parking convenience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Occasion Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Occasion Type
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800/80 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="AC Room Stay">AC Guest Room Stay (Master Bed & AC)</option>
                  <option value="Wedding & Reception">Royal Wedding & Grand Reception</option>
                  <option value="Family Dining">Multi-Cuisine Family Dining</option>
                  <option value="Birthday & Celebration">Birthday Party & Family Gathering</option>
                  <option value="Corporate Meeting">Corporate Meeting & Conference</option>
                </select>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Guests / Rooms
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2 guests / 1 room"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Specific Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need early check-in, banquet catering preferences, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-800/80 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
                >
                  Submit Reservation Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
