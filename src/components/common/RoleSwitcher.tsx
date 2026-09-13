import React, { useState } from 'react';
import type { UserRole } from '../../types';
import { dataStore } from '../../services/dataStore';
import { Shield, ChefHat, User, Sparkles, RefreshCw, X } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  const [isOpen, setIsOpen] = useState(currentRole !== 'VISITOR');
  const currentUser = dataStore.getCurrentUser();

  const handleSelectRole = (role: UserRole) => {
    dataStore.setActiveRole(role);
    onRoleChange(role);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data (bookings, orders, stock) to original seed state?')) {
      dataStore.resetToDefault();
      window.location.reload();
    }
  };

  if (!isOpen) {
    if (currentRole === 'VISITOR') {
      return null;
    }
    return (
      <aside className="fixed bottom-2.5 left-2.5 z-50 pointer-events-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="opacity-20 hover:opacity-100 transition-opacity bg-black/80 hover:bg-black text-white/70 hover:text-amber-300 text-[10px] px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg"
          title="Open Demo Portal Switcher"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Demo Roles</span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Demo Role Switcher"
      className="fixed bottom-3 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 transition-all duration-300"
    >
      <div className="pointer-events-auto bg-neutral-950/90 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl shadow-black/90 px-3.5 py-1.5 flex items-center gap-2.5 max-w-4xl text-xs text-neutral-300 ring-1 ring-black/50">
        {/* Brand Badge */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/15">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-[10px] text-amber-300/90 hidden sm:inline">
            Amrit Palace Demo
          </span>
        </div>

        {/* Current User Pill */}
        <div className="hidden md:flex items-center gap-1 text-[11px] text-neutral-400 pr-2 border-r border-white/10">
          <span className="text-neutral-500">Active View:</span>
          <span className="text-white font-medium">
            {currentRole === 'VISITOR' && 'Public Experience'}
            {currentRole === 'CLIENT' && (currentUser ? `${currentUser.name} (Room 204)` : 'Guest Portal')}
            {currentRole === 'CHEF' && 'Chef Rajesh (Kitchen)'}
            {currentRole === 'ADMIN' && 'Admin (Command Centre)'}
          </span>
        </div>

        {/* Role Selectors */}
        <div className="flex items-center gap-1">
            <button
              onClick={() => handleSelectRole('VISITOR')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                currentRole === 'VISITOR'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Public cinematic website"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Public</span>
            </button>

            <button
              onClick={() => handleSelectRole('CLIENT')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                currentRole === 'CLIENT'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Guest Portal (Priya Sharma)"
            >
              <User className="w-3 h-3 text-sky-400" />
              <span>Guest</span>
            </button>

            <button
              onClick={() => handleSelectRole('CHEF')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                currentRole === 'CHEF'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Chef Kitchen Queue"
            >
              <ChefHat className="w-3 h-3 text-orange-400" />
              <span>Chef</span>
            </button>

            <button
              onClick={() => handleSelectRole('ADMIN')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                currentRole === 'ADMIN'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Admin Command Centre"
            >
              <Shield className="w-3 h-3 text-purple-400" />
              <span>Admin</span>
            </button>
          </div>

        {/* Quick Reset State */}
        <button
          onClick={handleResetData}
          className="p-1 text-neutral-400 hover:text-amber-300 hover:bg-white/5 rounded-full transition-colors ml-1"
          title="Reset demo data to initial state"
        >
          <RefreshCw className="w-3 h-3" />
        </button>

        {/* Dismiss toggle */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-neutral-400 hover:text-white rounded-full transition-colors ml-0.5"
          title="Dismiss role switcher"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
