import React, { useState } from 'react';
import { dataStore } from '../../services/dataStore';
import type { UserRole } from '../../types';
import { X, User, Phone, Lock, Sparkles, ChefHat, Shield, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [phone, setPhone] = useState('9876543210');
  const [password, setPassword] = useState('password123');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    const res = dataStore.login(phone.trim());
    if (res.success && res.user) {
      onAuthSuccess(res.user.role);
      onClose();
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    dataStore.setActiveRole(role);
    onAuthSuccess(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-950/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase font-medium mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Amrit Palace Portal</span>
        </div>
        <h3
          style={{ fontFamily: 'Cinzel, serif' }}
          className="text-2xl font-bold text-white uppercase tracking-wider"
        >
          Sign In
        </h3>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Access your stay, food orders, billing, or operational portals.
        </p>

        {/* 1-Click Demo Seeded Accounts (Great for evaluation) */}
        <div className="my-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-300 block">
            1-Click Demo Profiles:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('CLIENT')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:border-amber-400/40 border border-white/10 text-left transition-all group"
            >
              <User className="w-4 h-4 text-sky-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="block text-[11px] font-semibold text-white">Guest</span>
              <span className="block text-[9px] text-neutral-400">Priya (204)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('CHEF')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:border-amber-400/40 border border-white/10 text-left transition-all group"
            >
              <ChefHat className="w-4 h-4 text-orange-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="block text-[11px] font-semibold text-white">Chef</span>
              <span className="block text-[9px] text-neutral-400">Rajesh K.</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('ADMIN')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:border-amber-400/40 border border-white/10 text-left transition-all group"
            >
              <Shield className="w-4 h-4 text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="block text-[11px] font-semibold text-white">Admin</span>
              <span className="block text-[9px] text-neutral-400">General Mgr</span>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Mobile Phone</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Password / Demo Passcode</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
