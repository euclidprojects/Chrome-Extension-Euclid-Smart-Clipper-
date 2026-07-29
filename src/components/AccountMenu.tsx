import React, { useState, useRef, useEffect } from 'react';
import {
  User as UserIcon,
  LogOut,
  Settings,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  ShieldCheck,
  HardDrive,
  Sparkles,
} from 'lucide-react';
import { EuclidUser, SyncStatus } from '../types';

interface AccountMenuProps {
  user: EuclidUser;
  syncStatus?: SyncStatus | string;
  onSignOut: () => void;
  onOpenSettings?: () => void;
  onOpenSmartNotes?: () => void;
  compact?: boolean;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({
  user,
  syncStatus = 'synced',
  onSignOut,
  onOpenSettings,
  onOpenSmartNotes,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name?: string | null) => {
    if (!name) return 'E';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleOpenSmartNotesClick = () => {
    setIsOpen(false);
    if (onOpenSmartNotes) {
      onOpenSmartNotes();
    } else {
      window.open('https://notes.app.euclidprojects.org', '_blank');
    }
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    if (onOpenSettings) {
      onOpenSettings();
    } else {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
        window.open(chrome.runtime.getURL('index.html'), '_blank');
      }
    }
  };

  const handleSignOutClick = () => {
    setIsOpen(false);
    onSignOut();
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-1 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer text-left ${
          compact ? 'px-1.5' : 'px-2.5 py-1'
        }`}
        title={`Signed in as ${user.displayName || user.email}`}
      >
        {/* User Profile Image or Initials */}
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-6 h-6 rounded-full object-cover border border-emerald-500/40 shrink-0"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0 border border-amber-300/60 shadow-sm">
            {getInitials(user.displayName)}
          </div>
        )}

        {!compact && (
          <div className="min-w-0 max-w-[120px] hidden sm:block">
            <p className="text-[11px] font-bold text-slate-100 truncate leading-tight">
              {user.displayName || 'Euclid User'}
            </p>
            <p className="text-[9px] text-slate-400 truncate leading-tight">{user.email}</p>
          </div>
        )}

        {/* Sync Status Icon */}
        <div className="flex items-center gap-1 shrink-0">
          <span
            className={`w-2 h-2 rounded-full ${
              syncStatus === 'uploading'
                ? 'bg-amber-400 animate-ping'
                : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
            }`}
            title={`Sync status: ${syncStatus}`}
          />
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-60 rounded-2xl bg-[#0d151c] border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-50 p-2 space-y-2 text-slate-200 divide-y divide-slate-800/80">
          {/* User Profile Header Card */}
          <div className="p-2 space-y-1">
            <div className="flex items-center gap-2.5">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full object-cover border border-emerald-500/50 shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 border border-amber-300/60">
                  {getInitials(user.displayName)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{user.displayName || 'Euclid User'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            {/* Sync Status Badge */}
            <div className="mt-2 pt-1 flex items-center justify-between text-[10px] bg-slate-900/90 px-2 py-1 rounded-lg border border-slate-800/80">
              <span className="text-slate-400 font-medium">Synchronization:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Synced with Euclid</span>
              </span>
            </div>
          </div>

          {/* Account Menu Options */}
          <div className="pt-1.5 space-y-0.5 text-xs font-semibold">
            {/* Profile */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setShowProfileModal(true);
              }}
              className="w-full h-8 px-2.5 rounded-xl hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Profile</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 uppercase font-extrabold">
                Pro
              </span>
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={handleSettingsClick}
              className="w-full h-8 px-2.5 rounded-xl hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-indigo-400" />
                <span>Settings</span>
              </div>
            </button>

            {/* Open Euclid Smart Notes */}
            <button
              type="button"
              onClick={handleOpenSmartNotesClick}
              className="w-full h-8 px-2.5 rounded-xl hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Open Euclid Smart Notes</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </button>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOutClick}
              className="w-full h-8 px-2.5 rounded-xl hover:bg-red-950/80 hover:text-red-300 text-red-400 flex items-center gap-2 transition-colors cursor-pointer border-t border-slate-800/60 mt-1 pt-1"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Details Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-sm w-full p-4 space-y-4 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-emerald-400" />
                <span>Euclid User Profile</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-emerald-500/50" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center border border-amber-300/60">
                    {getInitials(user.displayName)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-sm text-white">{user.displayName || 'Euclid User'}</p>
                  <p className="text-slate-400 text-[11px]">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1.5 p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                <div className="flex justify-between text-slate-400">
                  <span>User ID:</span>
                  <span className="font-mono text-slate-200 text-[10px]">{user.uid}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Account Plan:</span>
                  <span className="text-emerald-400 font-bold uppercase">Pro Plan</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Smart Notes Sync:</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowProfileModal(false)}
              className="w-full h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
