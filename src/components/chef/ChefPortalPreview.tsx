import React, { useState } from 'react';
import { dataStore } from '../../services/dataStore';
import type { OrderStatus } from '../../types';
import {
  ChefHat,
  Clock,
  CheckCircle2,
  Package,
  ArrowLeft,
  AlertCircle,
  Play,
  Check,
  Send,
} from 'lucide-react';

interface ChefPortalPreviewProps {
  onBackToPublic: () => void;
}

export const ChefPortalPreview: React.FC<ChefPortalPreviewProps> = ({
  onBackToPublic,
}) => {
  const [orders, setOrders] = useState(() => dataStore.getOrders());
  const [inventory, setInventory] = useState(() => dataStore.getInventory());

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    dataStore.updateOrderStatus(orderId, status);
    setOrders(dataStore.getOrders());
  };

  const handleQuickDeduct = (orderId: string, orderNumber: string) => {
    const res = dataStore.recordIngredientConsumption({
      orderId,
      orderNumber,
      consumptions: [
        { inventoryItemId: 'inv_paneer', quantityUsed: 0.3 },
        { inventoryItemId: 'inv_butter', quantityUsed: 0.08 },
      ],
      reason: `Chef Prep for Order #${orderNumber}`,
    });
    if (res.success) {
      alert('Recorded 0.3kg Paneer & 0.08kg Butter consumed. Stock updated!');
      setOrders(dataStore.getOrders());
      setInventory(dataStore.getInventory());
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
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs text-neutral-300 font-medium">Chef Kitchen Portal • Connected Demo</span>
        </div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-orange-950/30 border border-white/10 p-6 sm:p-8 mb-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs text-orange-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1.5">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Head Chef Console</span>
            </span>
            <h1
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider"
            >
              Chef Rajesh Kumar
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Amrit Palace Royal Kitchen • Order Execution & Ingredient Usage
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-right">
            <span className="text-[11px] text-neutral-400 block uppercase">Active Kitchen Orders</span>
            <span className="text-xl font-bold text-amber-300">{orders.length} in queue</span>
          </div>
        </div>
      </div>

      {/* Main Kitchen Orders Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Live Kitchen Order Queue</span>
          </h3>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-3xl bg-neutral-950/90 border border-white/10 hover:border-amber-500/30 transition-all space-y-4 backdrop-blur-xl shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-amber-300">{order.orderNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white">
                      Room {order.roomNumber}
                    </span>
                    <span className="text-xs text-neutral-400">{order.guestName}</span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      order.status === 'PREPARING'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                        : order.status === 'READY'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : order.status === 'DELIVERED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs text-neutral-200">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-amber-400 text-[11px]">
                          {item.quantity}x
                        </span>
                        <span className="font-medium text-white">{item.name}</span>
                      </div>
                      <span className="text-neutral-400">₹{item.totalPrice}</span>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <p className="text-xs text-amber-200/90 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5">
                    <strong>Guest Note:</strong> {order.notes}
                  </p>
                )}

                {/* Interactive Status Controls for Testing */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    {order.status === 'PLACED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'ACCEPTED')}
                        className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-sky-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Order</span>
                      </button>
                    )}

                    {(order.status === 'PLACED' || order.status === 'ACCEPTED') && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'PREPARING')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Start Preparing</span>
                      </button>
                    )}

                    {order.status === 'PREPARING' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'READY')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Ready</span>
                      </button>
                    )}

                    {order.status === 'READY' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                        className="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-teal-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Mark Delivered</span>
                      </button>
                    )}
                  </div>

                  {!order.ingredientsDeducted ? (
                    <button
                      onClick={() => handleQuickDeduct(order.id, order.orderNumber)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-all"
                    >
                      <Package className="w-3.5 h-3.5 text-orange-400" />
                      <span>Log Stock Consumed</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Stock Deducted</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Kitchen Stock Snapshot */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>Kitchen Inventory Snapshot</span>
          </h3>

          <div className="p-5 rounded-3xl bg-neutral-950/90 border border-white/10 backdrop-blur-xl space-y-3">
            {inventory.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-neutral-300">{item.name}</span>
                <div className="text-right">
                  <span
                    className={`font-semibold ${
                      item.currentQuantity <= item.minimumQuantity ? 'text-rose-400' : 'text-amber-300'
                    }`}
                  >
                    {item.currentQuantity} {item.unit}
                  </span>
                </div>
              </div>
            ))}

            <p className="text-[11px] text-neutral-500 pt-2">
              Whenever the chef logs consumed stock, quantities update instantly and appear in the Admin 45-day audit ledger.
            </p>
          </div>
        </div>
      </div>

      {/* Checkpoint Notice */}
      <div className="mt-10 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3 text-xs text-neutral-300">
        <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-orange-300 block mb-0.5">
            Checkpoint 1 Foundation Active:
          </span>
          <p className="text-neutral-400 leading-relaxed">
            You can test live status transitions right here. When you change an order to Ready or Delivered, switch
            to the Guest portal to see the status bar update immediately! Checkpoint 3 will fully expand the custom ingredient drawer.
          </p>
        </div>
      </div>
    </div>
  );
};
