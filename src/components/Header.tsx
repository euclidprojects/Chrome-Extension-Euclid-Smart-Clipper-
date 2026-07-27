import React from 'react';
import {
  Scissors,
  CheckCircle2,
  RefreshCw,
  Settings,
  LayoutDashboard,
  Maximize2,
  Sidebar,
  UserCheck,
  Video,
  PenTool,
  Bookmark,
  FileText,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { EuclidUser, SyncStatus } from '../types';

interface HeaderProps {
  user: EuclidUser | null;
  syncStatus: SyncStatus;
  activeView: 'popup' | 'sidepanel' | 'dashboard' | 'video' | 'annotation' | 'recording' | 'settings';
  setActiveView: (view: any) => void;
  onConnectAccount: () => void;
  onOpenSmartNotes: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  syncStatus,
  activeView,
  setActiveView,
  onConnectAccount,
  onOpenSmartNotes,
}) => {
  return (
    <header className="bg-[#0F1115]/90 backdrop-blur-md text-white border-b border-slate-800/80 px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="relative group cursor-pointer" onClick={() => setActiveView('popup')}>
          <div className="w-10 h-10 rounded-xl bg-indigo-600 p-1 shadow-[0_0_15px_rgba(99,102,241,0.35)] border border-indigo-400/30 flex items-center justify-center transition-transform group-hover:scale-105">
            <img src="/icons/icon32.png" alt="Euclid Logo" className="w-7 h-7 object-contain brightness-110" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0F1115] animate-pulse shadow-[0_0_8px_#4ade80]" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
              EUCLID SMART CLIPPER
            </h1>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              v1.0
            </span>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Euclid Smart Notes Companion</p>
        </div>
      </div>

      {/* Center Interface Mode Toggles (Bento Pills) */}
      <div className="hidden sm:flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveView('popup')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            activeView === 'popup'
              ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="Extension Popup Mode"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Clip</span>
        </button>

        <button
          onClick={() => setActiveView('sidepanel')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            activeView === 'sidepanel'
              ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="Side Panel Workspace"
        >
          <Sidebar className="w-3.5 h-3.5" />
          <span>Side Panel</span>
        </button>

        <button
          onClick={() => setActiveView('video')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            activeView === 'video'
              ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="YouTube & Video Notes Workspace"
        >
          <Video className="w-3.5 h-3.5" />
          <span>Video Notes</span>
        </button>

        <button
          onClick={() => setActiveView('annotation')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            activeView === 'annotation'
              ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="Screenshot & Annotation Suite"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Annotate</span>
        </button>

        <button
          onClick={() => setActiveView('dashboard')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            activeView === 'dashboard'
              ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="Full Extension Dashboard"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Library</span>
        </button>
      </div>

      {/* Right Controls: Account, Sync, Settings & Smart Notes External Link */}
      <div className="flex items-center gap-3">
        {/* Connection Badge */}
        {user?.connectedToSmartNotes ? (
          <button
            onClick={onOpenSmartNotes}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-all group"
            title="Open Euclid Smart Notes Web App"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <span className="text-white group-hover:text-indigo-300">Smart Notes Sync Active</span>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 ml-0.5" />
          </button>
        ) : (
          <button
            onClick={onConnectAccount}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Connect Euclid ID</span>
          </button>
        )}

        {/* Sync Indicator */}
        <div
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center justify-center"
          title={`Sync status: ${syncStatus}`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'uploading' ? 'animate-spin text-indigo-400' : 'text-slate-400'}`} />
        </div>

        {/* Settings button */}
        <button
          onClick={() => setActiveView('settings')}
          className={`p-2 rounded-xl border transition-all ${
            activeView === 'settings'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
