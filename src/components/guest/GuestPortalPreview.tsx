import React from 'react';
import { dataStore } from '../../services/dataStore';
import {
  Bed,
  Utensils,
  CreditCard,
  Clock,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Calendar,
  Phone,
} from 'lucide-react';

interface GuestPortalPreviewProps {
  onBackToPublic: () => void;
  onOpenMenu: () => void;
}

export const GuestPortalPreview: React.FC<GuestPortalPreviewProps> = ({
  onBackToPublic,
  onOpenMenu,
}) => {
  const currentUser = dataStore.getCurrentUser();
  const bookings = dataStore.getBookings();
  const activeBooking = bookings.find((b) => b.status === 'CHECKED_IN' || b.status === 'CONFIRMED') || bookings[0];
  const orders = dataStore.getOrders();
  const activeOrder = orders.find((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED') || orders[0];
  const bill = dataStore.getActiveGuestBill();

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between py-4 mb-6 border-b border-white/10">
        <button
          onClick={onBackToPublic}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Experience</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-neutral-300 font-medium">Guest Portal • Connected Demo</span>
        </div>
      </div>

      {/* Guest Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-amber-950/30 border border-white/10 p-6 sm:p-8 mb-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome Back</span>
            </span>
            <h1
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider"
            >
              {currentUser?.name || 'Priya Sharma'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 flex items-center gap-3">
              <span>Suite 204 • Executive Master Room</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-neutral-500" />
                <span>{currentUser?.phone || '9876543210'}</span>
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMenu}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <Utensils className="w-4 h-4" />
              <span>Order Food</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Stay Overview, Live Order Tracking, Running Bill */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Current Stay */}
        <div className="bg-neutral-950/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Bed className="w-4 h-4" />
              <span>Your Stay</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Checked In
            </span>
          </div>

          {activeBooking ? (
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500">Booking Code:</span>
                <span className="font-mono text-white font-semibold">{activeBooking.bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Room:</span>
                <span className="text-white">Suite 204 (Executive)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Check-in:</span>
                <span className="text-white flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>{activeBooking.checkIn}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Check-out:</span>
                <span className="text-white flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>{activeBooking.checkOut}</span>
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-medium">
                <span className="text-neutral-400">Duration:</span>
                <span className="text-amber-300">{activeBooking.nights} Nights</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-neutral-400">No active stay found.</p>
          )}
        </div>

        {/* Column 2: Live In-Room Dining Order Tracker */}
        <div className="bg-neutral-950/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              <span>Live Order Tracker</span>
            </h3>
            {activeOrder && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeOrder.status}
              </span>
            )}
          </div>

          {activeOrder ? (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Order Reference:</span>
                <span className="font-mono text-white font-semibold">{activeOrder.orderNumber}</span>
              </div>

              {/* Progress Steps */}
              <div className="space-y-2 py-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className={activeOrder.status === 'PLACED' ? 'text-amber-400 font-bold' : 'text-neutral-400'}>
                    Placed
                  </span>
                  <span className={activeOrder.status === 'ACCEPTED' ? 'text-amber-400 font-bold' : 'text-neutral-400'}>
                    Accepted
                  </span>
                  <span className={activeOrder.status === 'PREPARING' ? 'text-amber-400 font-bold' : 'text-neutral-400'}>
                    Preparing
                  </span>
                  <span className={activeOrder.status === 'READY' ? 'text-amber-400 font-bold' : 'text-neutral-400'}>
                    Ready
                  </span>
                  <span className={activeOrder.status === 'DELIVERED' ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
                    Delivered
                  </span>
                </div>
                {/* Progress track */}
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{
                      width:
                        activeOrder.status === 'PLACED'
                          ? '20%'
                          : activeOrder.status === 'ACCEPTED'
                          ? '40%'
                          : activeOrder.status === 'PREPARING'
                          ? '65%'
                          : activeOrder.status === 'READY'
                          ? '85%'
                          : '100%',
                    }}
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                {activeOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-neutral-300">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-medium text-white">₹{it.totalPrice}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-neutral-400 text-xs">
              <Clock className="w-6 h-6 mx-auto text-neutral-600 mb-2" />
              <p>No active kitchen orders.</p>
              <button
                onClick={onOpenMenu}
                className="mt-3 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 font-medium"
              >
                Browse Room Dining Menu
              </button>
            </div>
          )}
        </div>

        {/* Column 3: Running Bill & Payments */}
        <div className="bg-neutral-950/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Running Bill</span>
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              {bill?.billNumber || 'AP-INV-2026'}
            </span>
          </div>

          {bill ? (
            <div className="space-y-3 text-xs">
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {bill.items.map((bi) => (
                  <div key={bi.id} className="flex justify-between text-neutral-300 py-1 border-b border-white/5">
                    <span className="truncate max-w-[180px]">{bi.description}</span>
                    <span className="font-semibold text-white">₹{bi.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1 text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium">₹{bill.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>₹{Math.round(bill.taxAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 text-sm font-bold text-amber-300">
                  <span>Remaining:</span>
                  <span>₹{Math.round(bill.remainingAmount).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('Razorpay Test Mode Checkout will be unlocked in Checkpoint 2!')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Settle Bill (Razorpay)</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-neutral-400">No open bill.</p>
          )}
        </div>
      </div>

      {/* Checkpoint Roadmap Notice */}
      <div className="mt-10 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-neutral-300">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300 block mb-0.5">
            Checkpoint 1 Foundation Active:
          </span>
          <p className="text-neutral-400 leading-relaxed">
            You are viewing the guest perspective powered by the live reactive data store. In Checkpoint 2, this portal
            will be fully expanded with dedicated cart drawers, real-time Razorpay test checkout modals, and multi-day booking management.
          </p>
        </div>
      </div>
    </div>
  );
};
