import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CaptureJob,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidNote,
} from '../types';
import {
  initializeLocalDefaults,
  localNoteRepo,
  localNotebookRepo,
  localFolderRepo,
  localTagRepo,
  localCaptureJobRepo,
} from '../storage/indexedDB';
import { ScreenshotEditorView } from '../components/ScreenshotEditorView';
import { RefreshCw, AlertCircle } from 'lucide-react';
import './screenshot-editor.css';

const EditorApp: React.FC = () => {
  const [job, setJob] = useState<CaptureJob | null>(null);
  const [notebooks, setNotebooks] = useState<EuclidNotebook[]>([]);
  const [folders, setFolders] = useState<EuclidFolder[]>([]);
  const [tags, setTags] = useState<EuclidTag[]>([]);
  const [existingNotes, setExistingNotes] = useState<EuclidNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEditorData() {
      try {
        await initializeLocalDefaults();

        const params = new URLSearchParams(window.location.search);
        const jobId = params.get('jobId');

        const loadedNotebooks = await localNotebookRepo.getAll();
        const loadedFolders = await localFolderRepo.getAll();
        const loadedTags = await localTagRepo.getAll();
        const loadedNotes = await localNoteRepo.getAll();

        setNotebooks(loadedNotebooks);
        setFolders(loadedFolders);
        setTags(loadedTags);
        setExistingNotes(loadedNotes);

        if (jobId) {
          let loadedJob = await localCaptureJobRepo.getById(jobId);
          if (!loadedJob && typeof chrome !== 'undefined' && chrome.storage) {
            try {
              const storageObj = chrome.storage.session
                ? await chrome.storage.session.get(jobId)
                : await chrome.storage.local.get(jobId);
              if (storageObj && storageObj[jobId]) {
                loadedJob = storageObj[jobId] as CaptureJob;
              }
            } catch (e) {
              console.warn('Storage fetch fallback:', e);
            }
          }

          if (loadedJob) {
            setJob(loadedJob);
            setIsLoading(false);
            return;
          }
        }

        // Fallback demo capture job if no jobId or opened directly
        const fallbackJob: CaptureJob = {
          id: 'job_demo_' + Date.now(),
          type: 'selected_area',
          sourceUrl: 'https://en.wikipedia.org/wiki/Euclid',
          sourceTitle: 'Euclid — Father of Geometry & Axiomatic Systems',
          createdAt: Date.now(),
          status: 'editing',
          dataUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
        };
        setJob(fallbackJob);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Error loading editor data:', err);
        setError(err?.message || 'Failed to initialize Euclid Screenshot Editor.');
        setIsLoading(false);
      }
    }

    loadEditorData();
  }, []);

  const handleSaveNote = async (note: EuclidNote): Promise<string | boolean> => {
    await localNoteRepo.save(note);
    if (job) {
      await localCaptureJobRepo.update(job.id, { status: 'complete' });
    }
    return note.id;
  };

  const handleCreateNotebook = async (name: string, color: string) => {
    const newNb: EuclidNotebook = {
      id: 'nb_' + Date.now(),
      userId: 'local-user',
      name,
      color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await localNotebookRepo.save(newNb);
    setNotebooks((prev) => [...prev, newNb]);
  };

  const handleCreateFolder = async (name: string, notebookId: string) => {
    const newFolder: EuclidFolder = {
      id: 'folder_' + Date.now(),
      userId: 'local-user',
      notebookId,
      parentId: null,
      name,
      color: '#10b981',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await localFolderRepo.save(newFolder);
    setFolders((prev) => [...prev, newFolder]);
  };

  const handleCreateTag = async (name: string, color: string) => {
    const newTag: EuclidTag = {
      id: 'tag_' + Date.now(),
      userId: 'local-user',
      name,
      color,
      createdAt: new Date().toISOString(),
    };
    await localTagRepo.save(newTag);
    setTags((prev) => [...prev, newTag]);
  };

  const handleOpenSmartNotesNote = (noteId: string) => {
    window.open(`https://notes.app.euclidprojects.org/note/${noteId}`, '_blank');
  };

  const handleRetake = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({
        type: 'START_REGION_SELECTION',
      }).catch(() => {});
      window.close();
    } else {
      alert('Retake action triggered');
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-[#071018] text-slate-200 flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
        <p className="font-bold text-[14px] text-amber-300">Loading Euclid Screenshot Editor…</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="w-screen h-screen bg-[#071018] text-slate-200 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="font-bold text-[15px] text-red-300">
          {error || 'Screenshot capture data could not be found. Please retake the screenshot.'}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleRetake}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-[13px]"
          >
            Retake Screenshot
          </button>
          <button
            onClick={() => window.close()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-[13px]"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <ScreenshotEditorView
      job={job}
      notebooks={notebooks}
      folders={folders}
      tags={tags}
      existingNotes={existingNotes}
      onSaveNote={handleSaveNote}
      onCreateNotebook={handleCreateNotebook}
      onCreateFolder={handleCreateFolder}
      onCreateTag={handleCreateTag}
      onOpenSmartNotesNote={handleOpenSmartNotesNote}
      onRetake={handleRetake}
    />
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  rootEl.classList.remove('euclid-popup-root');
  rootEl.classList.add('euclid-screenshot-editor-root', 'is-full-workspace');
  createRoot(rootEl).render(<EditorApp />);
}
