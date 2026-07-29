import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ClippingWorkspace } from './components/ClippingWorkspace';
import { VideoNotesWorkspace } from './components/VideoNotesWorkspace';
import { ScreenshotAnnotationSuite } from './components/ScreenshotAnnotationSuite';
import { DashboardView } from './components/DashboardView';
import { SettingsView } from './components/SettingsView';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthScreen } from './components/AuthScreen';
import {
  EuclidNote,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidUser,
  SyncStatus,
} from './types';
import {
  getDB,
  initializeLocalDefaults,
  localNoteRepo,
  localNotebookRepo,
  localFolderRepo,
  localTagRepo,
} from './storage/indexedDB';
import { firebaseAuthService, firebaseSyncService } from './services/firebaseService';

export default function App() {
  // App View Mode
  const [activeView, setActiveView] = useState<
    'popup' | 'sidepanel' | 'dashboard' | 'video' | 'annotation' | 'recording' | 'settings'
  >('popup');

  // User & Sync State
  const [user, setUser] = useState<EuclidUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');

  // Core Data
  const [notes, setNotes] = useState<EuclidNote[]>([]);
  const [notebooks, setNotebooks] = useState<EuclidNotebook[]>([]);
  const [folders, setFolders] = useState<EuclidFolder[]>([]);
  const [tags, setTags] = useState<EuclidTag[]>([]);

  // Onboarding
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Auth Subscription
  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthChange((authUser) => {
      setUser(authUser);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore Notes Subscription for authenticated user
  useEffect(() => {
    if (!user || !user.uid) return;

    const unsubscribe = firebaseSyncService.subscribeToUserNotes(user.uid, async (remoteNotes) => {
      console.log(`[Smart Notes] Real-time listener received ${remoteNotes.length} notes from Firestore`);
      for (const remoteNote of remoteNotes) {
        try {
          await localNoteRepo.save(remoteNote);
        } catch (err) {
          console.warn('[Smart Notes] Local repo merge warning:', err);
        }
      }
      const updatedNotes = await localNoteRepo.getAll();
      setNotes(updatedNotes);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const handleSignOut = async () => {
    await firebaseAuthService.signOut();
    setUser(null);
    setNotes([]);
  };

  // Manage #root, html, body class based on activeView
  useEffect(() => {
    const rootEl = document.getElementById('root');
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    if (activeView === 'popup') {
      rootEl?.classList.remove('is-full-workspace');
      htmlEl?.classList.remove('is-full-workspace');
      bodyEl?.classList.remove('is-full-workspace');
    } else {
      rootEl?.classList.add('is-full-workspace');
      htmlEl?.classList.add('is-full-workspace');
      bodyEl?.classList.add('is-full-workspace');
    }
  }, [activeView]);

  // Initialize Local IndexedDB & Seed Defaults
  useEffect(() => {
    async function initApp() {
      await initializeLocalDefaults();
      const nbs = await localNotebookRepo.getAll();
      const fds = await localFolderRepo.getAll();
      const tgs = await localTagRepo.getAll();
      const nts = await localNoteRepo.getAll();

      setNotebooks(nbs);
      setFolders(fds);
      setTags(tgs);
      setNotes(nts);

      // Check if first run
      const hasVisited = localStorage.getItem('euclid_visited');
      if (!hasVisited) {
        setShowOnboarding(true);
        localStorage.setItem('euclid_visited', 'true');
      }
    }
    initApp();
  }, []);

  // Save Note Handler
  const handleSaveNote = async (note: EuclidNote): Promise<string | boolean> => {
    setSyncStatus('uploading');

    // 1. Save to local IndexedDB
    await localNoteRepo.save(note);

    // 2. Sync to Firebase if connected
    if (user?.connectedToSmartNotes) {
      await firebaseSyncService.saveNoteToSmartNotes(note, user.uid);
    }

    // Update state
    const updated = await localNoteRepo.getAll();
    setNotes(updated);
    setSyncStatus('synced');

    return note.id;
  };

  // Create Notebook
  const handleCreateNotebook = async (name: string, color: string) => {
    const newNb: EuclidNotebook = {
      id: 'nb_' + Date.now(),
      userId: user?.uid || 'local-user',
      name,
      color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await localNotebookRepo.save(newNb);
    setNotebooks(await localNotebookRepo.getAll());
  };

  // Create Folder
  const handleCreateFolder = async (name: string, notebookId: string) => {
    const newFolder: EuclidFolder = {
      id: 'folder_' + Date.now(),
      userId: user?.uid || 'local-user',
      notebookId,
      parentId: null,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await localFolderRepo.save(newFolder);
    setFolders(await localFolderRepo.getAll());
  };

  // Create Tag
  const handleCreateTag = async (name: string, color: string) => {
    const newTag: EuclidTag = {
      id: 'tag_' + Date.now(),
      userId: user?.uid || 'local-user',
      name,
      color,
      createdAt: new Date().toISOString(),
    };
    await localTagRepo.save(newTag);
    setTags(await localTagRepo.getAll());
  };

  // Delete Note
  const handleDeleteNote = async (noteId: string) => {
    await localNoteRepo.delete(noteId);
    setNotes(await localNoteRepo.getAll());
  };

  // Toggle Favorite
  const handleToggleFavorite = async (noteId: string) => {
    const existing = await localNoteRepo.getById(noteId);
    if (existing) {
      existing.is_favorite = !existing.is_favorite;
      await localNoteRepo.save(existing);
      setNotes(await localNoteRepo.getAll());
    }
  };

  // Open Exact Note in Euclid Smart Notes
  const handleOpenSmartNotesNote = (noteId: string) => {
    const targetUrl = `https://notes.app.euclidprojects.org/note/${noteId}`;
    window.open(targetUrl, '_blank');
  };

  // Google Sign-In
  const handleConnectGoogle = async () => {
    const resUser = await firebaseAuthService.signInWithGoogle();
    setUser(resUser);
  };

  const handleDisconnect = async () => {
    await firebaseAuthService.signOut();
    setUser(null);
  };

  // Export Data JSON
  const handleExportData = () => {
    const exportData = {
      user,
      notes,
      notebooks,
      folders,
      tags,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `euclid_smart_clipper_export_${Date.now()}.json`;
    a.click();
  };

  // Dedicated Main Popup View Mode
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#071018] text-slate-100 flex flex-col items-center justify-center">
        <AuthScreen onAuthenticated={() => {}} isLoadingSession={true} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#071018] text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0d151c] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <AuthScreen onAuthenticated={(authenticatedUser) => setUser(authenticatedUser)} />
        </div>
      </div>
    );
  }

  if (activeView === 'popup') {
    return (
      <div className="clipper-popup">
        <ClippingWorkspace
          user={user}
          onSignOut={handleSignOut}
          notebooks={notebooks}
          folders={folders}
          tags={tags}
          existingNotes={notes}
          onSaveNote={handleSaveNote}
          onCreateNotebook={handleCreateNotebook}
          onCreateFolder={handleCreateFolder}
          onCreateTag={handleCreateTag}
          onOpenSmartNotesNote={handleOpenSmartNotesNote}
          isSidePanel={false}
          onOpenSidePanel={() => setActiveView('sidepanel')}
          onOpenSettings={() => setActiveView('settings')}
        />
        {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      </div>
    );
  }

  // Expanded Workspace View Modes (Side Panel, Video, Annotation, Dashboard, Settings)
  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-200 flex flex-col font-sans">
      <Header
        user={user}
        syncStatus={syncStatus}
        activeView={activeView}
        setActiveView={setActiveView}
        onConnectAccount={handleConnectGoogle}
        onOpenSmartNotes={() => window.open('https://notes.app.euclidprojects.org/', '_blank')}
        onSignOut={handleSignOut}
      />

      <main className="flex-1 pb-10">
        {activeView === 'sidepanel' ? (
          <ClippingWorkspace
            user={user}
            onSignOut={handleSignOut}
            notebooks={notebooks}
            folders={folders}
            tags={tags}
            existingNotes={notes}
            onSaveNote={handleSaveNote}
            onCreateNotebook={handleCreateNotebook}
            onCreateFolder={handleCreateFolder}
            onCreateTag={handleCreateTag}
            onOpenSmartNotesNote={handleOpenSmartNotesNote}
            isSidePanel={true}
            onOpenSidePanel={() => setActiveView('sidepanel')}
            onOpenSettings={() => setActiveView('settings')}
          />
        ) : activeView === 'video' ? (
          <VideoNotesWorkspace
            notebooks={notebooks}
            folders={folders}
            tags={tags}
            existingNotes={notes}
            onSaveNote={handleSaveNote}
            onCreateNotebook={handleCreateNotebook}
            onCreateFolder={handleCreateFolder}
            onCreateTag={handleCreateTag}
            onOpenSmartNotesNote={handleOpenSmartNotesNote}
          />
        ) : activeView === 'annotation' ? (
          <ScreenshotAnnotationSuite
            notebooks={notebooks}
            folders={folders}
            tags={tags}
            existingNotes={notes}
            onSaveNote={handleSaveNote}
            onCreateNotebook={handleCreateNotebook}
            onCreateFolder={handleCreateFolder}
            onCreateTag={handleCreateTag}
            onOpenSmartNotesNote={handleOpenSmartNotesNote}
          />
        ) : activeView === 'dashboard' ? (
          <DashboardView
            notes={notes}
            notebooks={notebooks}
            folders={folders}
            tags={tags}
            onOpenSmartNotesNote={handleOpenSmartNotesNote}
            onDeleteNote={handleDeleteNote}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <SettingsView
            user={user}
            notebooks={notebooks}
            folders={folders}
            onConnectGoogle={handleConnectGoogle}
            onDisconnect={handleDisconnect}
            onExportData={handleExportData}
          />
        )}
      </main>

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
    </div>
  );
}
