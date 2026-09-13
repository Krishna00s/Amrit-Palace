import React, { useState } from 'react';
import { dataStore } from '../../services/dataStore';
import {
  Shield,
  TrendingUp,
  Bed,
  Utensils,
  Package,
  ArrowLeft,
  AlertCircle,
  Plus,
  Calendar,
} from 'lucide-react';

interface AdminPortalPreviewProps {
  onBackToPublic: () => void;
}

export const AdminPortalPreview: React.FC<AdminPortalPreviewProps> = ({
  onBackToPublic,
}) => {
  const [bookings] = useState(() => dataStore.getBookings());
  const [orders] = useState(() => dataStore.getOrders());
  const [transactions, setTransactions] = useState(() => dataStore.getInventoryTransactions());
  const [, setInventory] = useState(() => dataStore.getInventory());
  const [enquiries] = useState(() => dataStore.getEventEnquiries());

  const handleQuickAddStock = () => {
    const res = dataStore.addStock({
      inventoryItemId: 'inv_rice',
      quantityToAdd: 10,
      reason: 'Admin emergency restock — Local Mandi delivery',
    });
    if (res.success) {
      alert('Successfully added +10.0 kg Aged Basmati Rice. Transaction recorded in 45-day audit ledger!');
      setInventory(dataStore.getInventory());
      setTransactions(dataStore.getInventoryTransactions());
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between py-4 mb-6 border-b border-white/10">
        <button
          onClick={onBackToPublic}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Experience</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs text-neutral-300 font-medium">Admin Command Centre • Connected Demo</span>
        </div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-purple-950/30 border border-white/10 p-6 sm:p-8 mb-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs text-purple-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>General Manager Console</span>
            </span>
            <h1
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider"
            >
              Vikramaditya Singh
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Amrit Palace Operations • Bookings, Food Revenue & 45-Day Stock Audit
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleQuickAddStock}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Stock-In Test (+10kg Rice)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-neutral-400 block mb-1 flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-amber-400" />
            <span>Suite Occupancy</span>
          </span>
          <span className="text-xl font-bold text-white">100% Active</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">Suite 204 Occupied</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-neutral-400 block mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Billed Revenue</span>
          </span>
          <span className="text-xl font-bold text-amber-300">₹5,832</span>
          <span className="text-[10px] text-neutral-400 block mt-0.5">Room + In-Room Dining</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-neutral-400 block mb-1 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-sky-400" />
            <span>Dining Orders</span>
          </span>
          <span className="text-xl font-bold text-white">{orders.length} Orders</span>
          <span className="text-[10px] text-sky-400 block mt-0.5">Kitchen Preparing</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-neutral-400 block mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Event Enquiries</span>
          </span>
          <span className="text-xl font-bold text-white">{enquiries.length} Enquiries</span>
          <span className="text-[10px] text-purple-300 block mt-0.5">Weddings & Conferences</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bookings Table */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <Bed className="w-4 h-4" />
            <span>Live Guest Reservations</span>
          </h3>

          <div className="p-5 rounded-3xl bg-neutral-950/90 border border-white/10 backdrop-blur-xl space-y-3">
            {bookings.map((bkg) => (
              <div key={bkg.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">{bkg.guestName}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      bkg.status === 'CHECKED_IN'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {bkg.status}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>Code: {bkg.bookingCode}</span>
                  <span>Room: {bkg.roomNumber}</span>
                  <span>{bkg.checkIn} to {bkg.checkOut}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 45-Day Inventory Audit Ledger */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>45-Day Inventory Audit Ledger</span>
          </h3>

          <div className="p-5 rounded-3xl bg-neutral-950/90 border border-white/10 backdrop-blur-xl space-y-3 max-h-80 overflow-y-auto">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">{tx.itemName}</span>
                  <span
                    className={`font-mono font-bold text-xs ${
                      tx.type === 'STOCK_IN' ? 'text-emerald-400' : 'text-orange-400'
                    }`}
                  >
                    {tx.quantityChange > 0 ? `+${tx.quantityChange}` : tx.quantityChange} {tx.unit}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">{tx.reason}</p>
                <div className="flex justify-between text-[10px] text-neutral-500 pt-1 border-t border-white/5">
                  <span>Logged by: {tx.recordedByUserName}</span>
                  <span>Balance: {tx.resultingQuantity} {tx.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkpoint Notice */}
      <div className="mt-10 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-3 text-xs text-neutral-300">
        <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-purple-300 block mb-0.5">
            Checkpoint 1 Foundation Active:
          </span>
          <p className="text-neutral-400 leading-relaxed">
            All data here is synchronized in real-time with the Guest and Chef portals via <code>AmritDataStore</code>.
            In Checkpoint 4, this console will feature full table filters, dish menu CRUD editing, and comprehensive financial reports.
          </p>
        </div>
      </div>
    </div>
  );
};
