import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  RefreshCw,
  Key,
  Database,
  FileCode,
  Download,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Keyboard,
  Globe,
} from 'lucide-react';
import { EuclidUser, EuclidNotebook, EuclidFolder } from '../types';

interface SettingsViewProps {
  user: EuclidUser | null;
  notebooks: EuclidNotebook[];
  folders: EuclidFolder[];
  onConnectGoogle: () => void;
  onDisconnect: () => void;
  onExportData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  notebooks,
  folders,
  onConnectGoogle,
  onDisconnect,
  onExportData,
}) => {
  const [defaultNotebook, setDefaultNotebook] = useState(notebooks[0]?.id || 'default-notebook');
  const [conflictPolicy, setConflictPolicy] = useState<'keep_extension' | 'keep_smart_notes' | 'merge'>('keep_extension');
  const [templatePrefix, setTemplatePrefix] = useState(`---
title: "{{title}}"
source: "{{url}}"
author: "{{author}}"
clippedDate: "{{clippedDate}}"
tags:
  - "{{tags}}"
---`);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans text-xs text-slate-100">
      <div className="bg-[#16181D] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          <span>Euclid ID Account & Smart Notes Integration</span>
        </h2>

        <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between border border-slate-800 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]">
              {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'EU'}
            </div>
            <div>
              <p className="font-bold text-sm text-slate-100">{user?.displayName || 'Euclid Local Session'}</p>
              <p className="text-xs text-indigo-300">{user?.email || 'researcher@euclidprojects.org'}</p>
            </div>
          </div>

          {user?.connectedToSmartNotes ? (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Connected to Euclid Smart Notes</span>
              </span>
              <button
                onClick={onDisconnect}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onConnectGoogle}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
            >
              Connect Euclid ID
            </button>
          )}
        </div>

        <p className="text-slate-400 leading-relaxed">
          Euclid Smart Clipper synchronizes directly with your main Euclid Smart Notes notebooks, folders, and attachments at <a href="https://notes.app.euclidprojects.org/" target="_blank" className="text-indigo-400 underline font-semibold">https://notes.app.euclidprojects.org/</a> via Firebase project <code className="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded font-mono text-indigo-300">euclid-projects</code>.
        </p>
      </div>

      {/* Sync & Conflict Resolution Settings */}
      <div className="bg-[#16181D] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-indigo-400" />
          <span>Synchronization & Conflict Policies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Default Destination Notebook</label>
            <select
              value={defaultNotebook}
              onChange={(e) => setDefaultNotebook(e.target.value)}
              className="w-full p-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl font-medium outline-none focus:border-indigo-500"
            >
              {notebooks.map((nb) => (
                <option key={nb.id} value={nb.id}>
                  {nb.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Conflict Resolution Strategy</label>
            <select
              value={conflictPolicy}
              onChange={(e) => setConflictPolicy(e.target.value as any)}
              className="w-full p-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl font-medium outline-none focus:border-indigo-500"
            >
              <option value="keep_extension">Keep Extension Clipper Version</option>
              <option value="keep_smart_notes">Keep Smart Notes Version</option>
              <option value="merge">Merge Both as Separate Notes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Markdown Template Customizer */}
      <div className="bg-[#16181D] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span>Markdown Export Front-Matter Template</span>
        </h3>

        <textarea
          rows={5}
          value={templatePrefix}
          onChange={(e) => setTemplatePrefix(e.target.value)}
          className="w-full p-3 bg-slate-900 border border-slate-800 text-indigo-300 font-mono text-xs rounded-xl outline-none focus:border-indigo-500"
        />
        <p className="text-[11px] text-slate-400">
          Variables: <code className="bg-slate-900 px-1 font-mono text-indigo-300">{"{{title}}"}</code>, <code className="bg-slate-900 px-1 font-mono text-indigo-300">{"{{url}}"}</code>, <code className="bg-slate-900 px-1 font-mono text-indigo-300">{"{{author}}"}</code>, <code className="bg-slate-900 px-1 font-mono text-indigo-300">{"{{clippedDate}}"}</code>, <code className="bg-slate-900 px-1 font-mono text-indigo-300">{"{{tags}}"}</code>
        </p>
      </div>

      {/* Data Export */}
      <div className="bg-[#16181D] border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-slate-100">Backup & Offline Export</h3>
          <p className="text-xs text-slate-400">Export all local clips, notes, annotations, and metadata as JSON or Markdown ZIP archive.</p>
        </div>

        <button
          onClick={onExportData}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export All Clips</span>
        </button>
      </div>
    </div>
  );
};
