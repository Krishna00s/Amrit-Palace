import React, { useState } from 'react';
import { dataStore } from '../../services/dataStore';
import type { Booking } from '../../types';
import { X, Calendar, User, Phone, CheckCircle2, Bed, ArrowRight, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookingConfirmed,
}) => {
  const room = dataStore.getRoom();
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultCheckOut = new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0];

  const [guestName, setGuestName] = useState('Priya Sharma');
  const [guestPhone, setGuestPhone] = useState('9876543210');
  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const diffDays = Math.max(1, Math.ceil((dOut.getTime() - dIn.getTime()) / (1000 * 60 * 60 * 24)));
  const subtotal = diffDays * room.pricePerNight;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const booking = dataStore.createBooking({
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      checkIn,
      checkOut,
      guestCount,
      specialRequests: specialRequests.trim() || undefined,
    });

    setConfirmedBooking(booking);
  };

  const handleDone = () => {
    if (confirmedBooking) {
      onBookingConfirmed(confirmedBooking);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-950/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBooking ? (
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase font-medium mb-1">
              <Bed className="w-3.5 h-3.5" />
              <span>Direct Reservation</span>
            </div>
            <h3
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider"
            >
              Reserve Your Stay
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
              Experience the Executive Master Suite with climate control & personalized hospitality.
            </p>

            {/* Room mini card */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 my-5">
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-16 h-16 rounded-xl object-cover border border-white/10"
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">{room.name}</h4>
                <p className="text-xs text-neutral-400">King Bed • Air-Conditioned • Room 204</p>
                <p className="text-xs font-bold text-amber-300 mt-0.5">₹{room.pricePerNight.toLocaleString()} / night</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-amber-400" />
                    <span>Guest Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
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
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Check-In Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Check-Out Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                  Number of Guests
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value={1}>1 Guest (Single Occupancy)</option>
                  <option value={2}>2 Guests (Double Occupancy)</option>
                  <option value={3}>3 Guests (Includes Extra Rollaway Bed)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Late check-in, extra pillows, quiet floor"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-neutral-300 space-y-1.5">
                <div className="flex justify-between">
                  <span>Room Tariff ({diffDays} night{diffDays > 1 ? 's' : ''} × ₹{room.pricePerNight})</span>
                  <span className="font-medium text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Hospitality GST (5%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-amber-500/30 text-sm font-bold text-amber-300">
                  <span>Total Payable at Check-out</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Confirm Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs text-amber-400 uppercase tracking-widest font-medium">Reservation Confirmed</span>
            <h3
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-2xl font-bold text-white uppercase tracking-wider mt-1"
            >
              Welcome to Amrit Palace
            </h3>

            <p className="text-neutral-300 text-xs sm:text-sm font-light mt-2 max-w-sm mx-auto">
              Your stay has been confirmed for <strong>{confirmedBooking.guestName}</strong>.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Booking Reference:</span>
                <span className="font-mono text-amber-300 font-bold">{confirmedBooking.bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Room Allocated:</span>
                <span className="text-white font-medium">Suite 204 (Executive Master)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Dates:</span>
                <span className="text-white">{confirmedBooking.checkIn} to {confirmedBooking.checkOut}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-semibold">
                <span className="text-neutral-300">Total Billed:</span>
                <span className="text-emerald-400">₹{confirmedBooking.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleDone}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Enter Guest Dashboard</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-neutral-400 hover:text-white text-xs transition-colors"
              >
                Continue Exploring Amrit Palace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
