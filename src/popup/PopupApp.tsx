import React, { useState, useEffect } from 'react';
import { ClippingWorkspace } from '../components/ClippingWorkspace';
import { AuthScreen } from '../components/AuthScreen';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { OnboardingModal } from '../components/OnboardingModal';
import {
  EuclidNote,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidUser,
  SyncStatus,
} from '../types';
import {
  initializeLocalDefaults,
  localNoteRepo,
  localNotebookRepo,
  localFolderRepo,
  localTagRepo,
} from '../storage/indexedDB';
import { firebaseAuthService, firebaseSyncService } from '../services/firebaseService';

const DEFAULT_NOTEBOOKS: EuclidNotebook[] = [
  {
    id: 'nb_general',
    userId: 'local-user',
    name: 'General Research',
    color: '#10b981',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'nb_science',
    userId: 'local-user',
    name: 'Science & Math',
    color: '#3b82f6',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEFAULT_TAGS: EuclidTag[] = [
  { id: 'tag-web', userId: 'local-user', name: 'web-clip', color: '#10b981', createdAt: new Date().toISOString() },
  { id: 'tag-article', userId: 'local-user', name: 'article', color: '#f59e0b', createdAt: new Date().toISOString() },
  { id: 'tag-research', userId: 'local-user', name: 'research', color: '#6366f1', createdAt: new Date().toISOString() },
];

export default function PopupApp() {
  const [user, setUser] = useState<EuclidUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  const [notes, setNotes] = useState<EuclidNote[]>([]);
  const [notebooks, setNotebooks] = useState<EuclidNotebook[]>(DEFAULT_NOTEBOOKS);
  const [folders, setFolders] = useState<EuclidFolder[]>([]);
  const [tags, setTags] = useState<EuclidTag[]>(DEFAULT_TAGS);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Auth State Subscription
  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthChange((authUser) => {
      setUser(authUser);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Sign out handler
  const handleSignOut = async () => {
    await firebaseAuthService.signOut();
    setUser(null);
    setNotes([]); // Clear private user notes
  };

  // Inspected height debugging (logged once in non-production)
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      const rootEl = document.getElementById('root');
      console.debug('Popup dimensions', {
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight,
        bodyRect: document.body.getBoundingClientRect(),
        rootRect: rootEl?.getBoundingClientRect(),
      });
    }
  }, []);

  // Initialize Local IndexedDB safely without delaying initial layout
  useEffect(() => {
    let isMounted = true;
    async function initData() {
      try {
        await initializeLocalDefaults();
        const nbs = await localNotebookRepo.getAll();
        const fds = await localFolderRepo.getAll();
        const tgs = await localTagRepo.getAll();
        const nts = await localNoteRepo.getAll();

        if (isMounted) {
          if (nbs.length > 0) setNotebooks(nbs);
          if (fds.length > 0) setFolders(fds);
          if (tgs.length > 0) setTags(tgs);
          if (nts.length > 0) setNotes(nts);

          const hasVisited = localStorage.getItem('euclid_visited');
          if (!hasVisited) {
            setShowOnboarding(true);
            localStorage.setItem('euclid_visited', 'true');
          }
        }
      } catch (err) {
        console.warn('Popup storage init warning:', err);
      }
    }
    initData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveNote = async (note: EuclidNote): Promise<string | boolean> => {
    try {
      if (!user) {
        throw new Error('Authentication required to save clips.');
      }
      await localNoteRepo.save(note);
      if (user?.connectedToSmartNotes) {
        await firebaseSyncService.saveNoteToSmartNotes(note, user.uid);
      }
      const updated = await localNoteRepo.getAll();
      setNotes(updated);
      return note.id;
    } catch (err) {
      console.error('Save note error:', err);
      return false;
    }
  };

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
    const updated = await localNotebookRepo.getAll();
    setNotebooks(updated.length > 0 ? updated : [newNb]);
  };

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

  const handleOpenSmartNotesNote = (noteId: string) => {
    const targetUrl = `https://notes.app.euclidprojects.org/note/${noteId}`;
    window.open(targetUrl, '_blank');
  };

  const handleOpenSidePanel = () => {
    if (typeof chrome !== 'undefined' && chrome.sidePanel && chrome.sidePanel.open) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          // @ts-ignore
          chrome.sidePanel.open({ tabId: tabs[0].id });
        }
      });
    } else {
      window.open(chrome.runtime.getURL('sidepanel.html'), '_blank');
    }
  };

  const handleOpenSettings = () => {
    window.open(chrome.runtime.getURL('index.html'), '_blank');
  };

  if (isLoadingAuth) {
    return (
      <div className="euclid-popup-root w-full h-full min-h-[500px] flex flex-col bg-[#071018] text-slate-100 overflow-hidden">
        <AuthScreen onAuthenticated={() => {}} isLoadingSession={true} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="euclid-popup-root w-full h-full min-h-[520px] flex flex-col bg-[#071018] text-slate-100 overflow-hidden">
        <AuthScreen onAuthenticated={(authenticatedUser) => setUser(authenticatedUser)} />
      </div>
    );
  }

  return (
    <div className="euclid-popup-root w-full h-full flex flex-col bg-[#071018] text-slate-100 overflow-hidden">
      <ErrorBoundary fallbackMessage="Euclid Smart Clipper could not load this section. Reload the extension and try again.">
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
          onOpenSidePanel={handleOpenSidePanel}
          onOpenSettings={handleOpenSettings}
        />
        {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      </ErrorBoundary>
    </div>
  );
}

