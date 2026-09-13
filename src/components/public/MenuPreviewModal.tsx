import React, { useState } from 'react';
import { dataStore } from '../../services/dataStore';
import { X, Utensils, Clock, Sparkles } from 'lucide-react';

interface MenuPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderClick: () => void;
}

export const MenuPreviewModal: React.FC<MenuPreviewModalProps> = ({
  isOpen,
  onClose,
  onOrderClick,
}) => {
  const categories = dataStore.getMenuCategories();
  const [activeCat, setActiveCat] = useState<string>(categories[0]?.id || 'cat_starters');
  const items = dataStore.getMenuItems(activeCat);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-950/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase font-medium mb-1">
              <Utensils className="w-3.5 h-3.5" />
              <span>Royal Dining Experience</span>
            </div>
            <h3
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider"
            >
              The Amrit Palace Menu
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
              100% Pure Vegetarian Kitchen • Farm-fresh local ingredients & slow-simmered regional recipes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-white/10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCat === cat.id
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Dish List */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all group"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-black shadow">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-sm font-bold text-amber-300 flex-shrink-0">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      <span>{item.preparationTimeMinutes} mins</span>
                    </span>
                    <span className="text-emerald-400 font-medium">Pure Veg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Staying with us? Order directly from the Guest Portal to your room.</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOrderClick();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            Order In-Room Dining
          </button>
        </div>
      </div>
    </div>
  );
};
