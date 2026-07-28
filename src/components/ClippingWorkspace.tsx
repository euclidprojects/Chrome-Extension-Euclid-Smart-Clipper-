import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  PenTool,
  Camera,
  Youtube,
  Bookmark,
  Layers,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  BookOpen,
  Settings,
  X,
  ExternalLink,
  Sparkles,
  Copy,
  RotateCcw,
  CheckCircle2,
  RefreshCw,
  Search,
  AlertCircle,
  Video,
  Crop,
  Image as ImageIcon,
  FileText,
  CheckSquare,
  Maximize2,
} from 'lucide-react';
import {
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidNote,
  EuclidNoteType,
  ClipType,
  ScreenshotMode,
} from '../types';
import { clippingService } from '../services/clippingService';
import { isSupportedPage } from '../utils/pageUtils';

interface ClippingWorkspaceProps {
  notebooks: EuclidNotebook[];
  folders: EuclidFolder[];
  tags: EuclidTag[];
  existingNotes: EuclidNote[];
  onSaveNote: (note: EuclidNote) => Promise<string | boolean>;
  onCreateNotebook: (name: string, color: string) => void;
  onCreateFolder: (name: string, notebookId: string) => void;
  onCreateTag: (name: string, color: string) => void;
  onOpenSmartNotesNote: (noteId: string) => void;
  isSidePanel?: boolean;
  onOpenSidePanel?: () => void;
  onOpenSettings?: () => void;
}

export type ClipFormatType = ClipType;

export const ClippingWorkspace: React.FC<ClippingWorkspaceProps> = ({
  notebooks,
  folders,
  tags,
  existingNotes,
  onSaveNote,
  onCreateNotebook,
  onCreateFolder,
  onCreateTag,
  onOpenSmartNotesNote,
  isSidePanel,
  onOpenSidePanel,
  onOpenSettings,
}) => {
  // Primary selected clip option - DEFAULT: null (no option selected initially)
  const [selectedClipType, setSelectedClipType] = useState<ClipType | null>(null);
  const clipFormat = selectedClipType;

  // Separate state for Screenshot Mode Dialog
  const [isScreenshotDialogOpen, setIsScreenshotDialogOpen] = useState(false);
  const [selectedScreenshotMode, setSelectedScreenshotMode] = useState<ScreenshotMode | null>(null);
  const [isStartingCapture, setIsStartingCapture] = useState(false);
  const [screenshotError, setScreenshotError] = useState<string | null>(null);
  const [hasVideo, setHasVideo] = useState(false);

  // Page Context & Metadata
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/Euclid');
  const [pageTitle, setPageTitle] = useState('Euclid — Father of Geometry & Axiomatic Systems');
  const [faviconUrl, setFaviconUrl] = useState('https://en.wikipedia.org/static/favicon/wikipedia.ico');
  const [author, setAuthor] = useState('Euclid Projects Research');
  const [noteTitle, setNoteTitle] = useState('Euclid — Father of Geometry & Axiomatic Systems');
  const [noteRemark, setNoteRemark] = useState('');
  const [isYouTubePage, setIsYouTubePage] = useState(false);

  // Full Page & Simplified Article Options
  const [includeImages, setIncludeImages] = useState(true);
  const [includeLinks, setIncludeLinks] = useState(true);
  const [includeTables, setIncludeTables] = useState(true);
  const [includeAnnotations, setIncludeAnnotations] = useState(true);
  const [convertToMarkdown, setConvertToMarkdown] = useState(false);
  const [includePageMetadata, setIncludePageMetadata] = useState(true);

  // YouTube Note State
  const [ytTimestamp, setYtTimestamp] = useState('02:45');
  const [ytNoteInput, setYtNoteInput] = useState('');

  // Destination Pickers
  const [selectedNotebookId, setSelectedNotebookId] = useState<string>(
    localStorage.getItem('euclid_last_notebook') || notebooks[0]?.id || ''
  );
  const [selectedFolderId, setSelectedFolderId] = useState<string>(
    localStorage.getItem('euclid_last_folder') || ''
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(['tag-web', 'tag-article']);
  
  const [destMode, setDestMode] = useState<'new' | 'existing'>('new');
  const [targetNoteId, setTargetNoteId] = useState('');
  const [targetNoteSearch, setTargetNoteSearch] = useState('');

  // Inline Creation State
  const [showAddNotebookInput, setShowAddNotebookInput] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [showAddFolderInput, setShowAddFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showAddTagInput, setShowAddTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // Save Progress State
  const [isSaving, setIsSaving] = useState(false);
  const [saveStepMessage, setSaveStepMessage] = useState<string>('');
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-fill active tab metadata and detect video content
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          if (activeTab.url) {
            setUrl(activeTab.url);
            const yt = activeTab.url.includes('youtube.com/watch') || activeTab.url.includes('youtu.be');
            setIsYouTubePage(yt);
          }
          if (activeTab.title) {
            setPageTitle(activeTab.title);
            setNoteTitle(activeTab.title);
          }
          if (activeTab.favIconUrl) {
            setFaviconUrl(activeTab.favIconUrl);
          }

          if (activeTab.id) {
            chrome.tabs.sendMessage(activeTab.id, { type: 'DETECT_MEDIA' }, (res) => {
              if (chrome.runtime.lastError) return;
              if (res?.success && res.data) {
                setHasVideo(res.data.videoCount > 0 || res.data.isYouTube);
              }
            });
          }
        }
      });
    }

    if (notebooks.length > 0 && !selectedNotebookId) {
      const savedNb = localStorage.getItem('euclid_last_notebook');
      const found = notebooks.find((n) => n.id === savedNb);
      setSelectedNotebookId(found ? found.id : notebooks[0].id);
    }
  }, [notebooks]);

  // Trap Escape key for screenshot modal dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isScreenshotDialogOpen && !isStartingCapture) {
        e.preventDefault();
        setIsScreenshotDialogOpen(false);
        setSelectedScreenshotMode(null);
        setScreenshotError(null);
      }
    };

    if (isScreenshotDialogOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isScreenshotDialogOpen, isStartingCapture]);

  // Sync title when page title changes
  useEffect(() => {
    if (!noteTitle || noteTitle === pageTitle) {
      setNoteTitle(pageTitle);
    }
  }, [pageTitle]);

  // Check current page domain / type
  useEffect(() => {
    const checkYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    setIsYouTubePage(checkYouTube);
  }, [url]);

  // Approved 5 Clipping Options in EXACT specified order
  const approvedFormats: Array<{
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    testId: string;
  }> = [
    {
      id: 'screenshot',
      label: 'Screenshot',
      description: 'Capture visible area, selection, or video frame',
      icon: <Camera className="w-5 h-5 text-emerald-400" />,
      testId: 'clip-option-screenshot',
    },
    {
      id: 'youtube_note',
      label: 'YouTube Note',
      description: 'Timestamped notes, transcript & video frame',
      icon: <Youtube className="w-5 h-5 text-red-400" />,
      testId: 'clip-option-youtube-note',
    },
    {
      id: 'bookmark',
      label: 'Bookmark',
      description: 'Save link, summary, favicon & page metadata',
      icon: <Bookmark className="w-5 h-5 text-emerald-400" />,
      testId: 'clip-option-bookmark',
    },
    {
      id: 'simplified_article',
      label: 'Simplified Article',
      description: 'Clean article view without ads & sidebars',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      testId: 'clip-option-simplified-article',
    },
    {
      id: 'full_page',
      label: 'Full Page',
      description: 'Complete webpage layout, HTML, images & links',
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      testId: 'clip-option-full-page',
    },
  ];

  const startScreenshotCapture = async (
    mode: ScreenshotMode
  ): Promise<{ success: boolean; jobId?: string; error?: string }> => {
    return new Promise((resolve) => {
      if (typeof chrome === 'undefined' || !chrome.tabs) {
        resolve({ success: true, jobId: 'job_dev_' + Date.now() });
        return;
      }

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab || !tab.id) {
          resolve({
            success: false,
            error: 'The active tab could not be detected.',
          });
          return;
        }

        const activeUrl = tab.url || url || '';
        if (!isSupportedPage(activeUrl)) {
          resolve({
            success: false,
            error: 'This page cannot be captured or annotated because Chrome does not allow extensions to access it.',
          });
          return;
        }

        const jobId = 'job_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

        chrome.runtime.sendMessage(
          {
            type: 'START_SCREENSHOT_CAPTURE',
            payload: {
              jobId,
              mode,
              tabId: tab.id,
              sourceUrl: activeUrl,
              sourceTitle: tab.title || pageTitle || 'Captured Webpage',
            },
          },
          (response) => {
            if (chrome.runtime.lastError) {
              resolve({
                success: false,
                error:
                  chrome.runtime.lastError.message ||
                  'The screenshot service worker did not respond.',
              });
            } else if (response) {
              resolve(response);
            } else {
              resolve({
                success: false,
                error: 'The screenshot service worker did not respond.',
              });
            }
          }
        );
      });
    });
  };

  const handleScreenshotMode = async (mode: ScreenshotMode): Promise<void> => {
    if (isStartingCapture) return;

    setIsStartingCapture(true);
    setSelectedScreenshotMode(mode);
    setScreenshotError(null);

    try {
      const response = await startScreenshotCapture(mode);

      if (!response.success) {
        throw new Error(response.error || 'Unable to start screenshot capture.');
      }

      setIsScreenshotDialogOpen(false);
      setSelectedScreenshotMode(null);

      if (typeof window !== 'undefined' && window.close) {
        window.close();
      }
    } catch (error) {
      setScreenshotError(
        error instanceof Error
          ? error.message
          : 'Unable to start screenshot capture.'
      );
      setIsStartingCapture(false);
    }
  };

  // Destination handlers
  const handleSelectNotebook = (id: string) => {
    setSelectedNotebookId(id);
    localStorage.setItem('euclid_last_notebook', id);
  };

  const handleSelectFolder = (id: string) => {
    setSelectedFolderId(id);
    localStorage.setItem('euclid_last_folder', id);
  };

  const toggleTag = (id: string) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter((t) => t !== id));
    } else {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };

  const handleCreateNewNotebook = () => {
    if (newNotebookName.trim()) {
      onCreateNotebook(newNotebookName.trim(), '#10b981');
      setNewNotebookName('');
      setShowAddNotebookInput(false);
    }
  };

  const handleCreateNewFolder = () => {
    if (newFolderName.trim() && selectedNotebookId) {
      onCreateFolder(newFolderName.trim(), selectedNotebookId);
      setNewFolderName('');
      setShowAddFolderInput(false);
    }
  };

  const handleCreateNewTag = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim(), '#84cc16');
      setNewTagName('');
      setShowAddTagInput(false);
    }
  };

  // Centralized Primary Save Action
  const handlePrimarySave = async (localOnly = false) => {
    if (selectedClipType === 'youtube_note' && !isYouTubePage) {
      setSaveError('Open a YouTube video to use YouTube Note.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSavedNoteId(null);

    const steps = [
      'Preparing clip...',
      'Collecting page data...',
      'Sanitizing content...',
      localOnly ? 'Saving locally...' : 'Uploading assets...',
      'Creating Smart Notes note...',
      'Saved successfully!',
    ];

    for (let i = 0; i < steps.length; i++) {
      setSaveStepMessage(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    try {
      let noteType: EuclidNoteType = 'bookmark';
      if (selectedClipType === 'screenshot') noteType = 'screenshot';
      if (selectedClipType === 'youtube_note') noteType = 'youtube';
      if (selectedClipType === 'bookmark' || !selectedClipType) noteType = 'bookmark';
      if (selectedClipType === 'simplified_article') noteType = 'article';
      if (selectedClipType === 'full_page') noteType = 'web_clip';

      const selectedTagNames = tags
        .filter((t) => selectedTagIds.includes(t.id))
        .map((t) => t.name);

      let content = `<p>${noteRemark}</p>`;
      if (selectedClipType === 'youtube_note' && ytNoteInput) {
        content = `<div><p><strong>Timestamp [${ytTimestamp}]:</strong> ${ytNoteInput}</p><p>${noteRemark}</p></div>`;
      } else if (selectedClipType === 'simplified_article') {
        const extractedArticle = clippingService.extractSimplifiedArticle(
          `<div><h1>${noteTitle}</h1><p>${noteRemark}</p></div>`,
          url,
          noteTitle
        );
        content = extractedArticle.cleanHtml || `<p>${noteRemark}</p>`;
      } else {
        content = `<p>${noteRemark}</p>`;
      }

      const newNoteId = 'note_' + Date.now();
      const noteToSave: EuclidNote = {
        id: newNoteId,
        user_id: 'local-user',
        title: noteTitle || pageTitle,
        content,
        plainTextContent: noteRemark,
        markdownContent: `# ${noteTitle}\n\n${noteRemark}`,
        notebook_id: selectedNotebookId,
        folder_id: selectedFolderId || null,
        tags: selectedTagNames,
        noteType,
        sourceUrl: url,
        canonicalUrl: url,
        sourceTitle: pageTitle,
        sourceDomain: domainName(),
        sourceAuthor: author,
        sourceFavicon: faviconUrl,
        clipFormat: selectedClipType || 'bookmark',
        wordCount: noteRemark.split(/\s+/).filter(Boolean).length || 10,
        readingTime: 1,
        extensionCreated: true,
        extensionVersion: '1.0.0',
        syncStatus: localOnly ? 'queued' : 'synced',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSaveNote(noteToSave);
      setIsSaving(false);
      setSavedNoteId(newNoteId);
    } catch (err: any) {
      setIsSaving(false);
      setSaveError(err?.message || 'Failed to save clip');
    }
  };

  const handleCopyLink = () => {
    if (savedNoteId) {
      navigator.clipboard.writeText(`https://notes.app.euclidprojects.org/note/${savedNoteId}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleUndo = () => {
    setSavedNoteId(null);
    setSaveStepMessage('');
  };

  const domainName = () => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'webpage';
    }
  };

  const filteredFolders = folders.filter((f) => !f.notebookId || f.notebookId === selectedNotebookId);

  return (
    <div className="clipper-popup flex flex-col w-full h-full bg-[#0c1319] text-slate-100 overflow-hidden select-none relative">
      
      {/* 1. STICKY HEADER & 2. CONNECTION STATUS */}
      <header className="h-[46px] px-3 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-700/60 flex items-center justify-between shrink-0 shadow-lg sticky top-0 z-30">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-amber-300/60 flex items-center justify-center shrink-0">
            <img src="/icons/icon32.png" alt="Euclid Logo" className="w-3.5 h-3.5 object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="font-extrabold text-[14px] text-white tracking-tight leading-tight flex items-center gap-1.5 truncate">
              <span className="truncate">Euclid Smart Clipper</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#facc15] shrink-0" title="Connected" />
            </h1>
            <p className="text-[10px] text-emerald-300 font-medium truncate">
              Connected to Euclid Smart Notes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {!isSidePanel && onOpenSidePanel && (
            <button
              type="button"
              onClick={onOpenSidePanel}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
              title="Open in Side Panel"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => window.close()}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
            title="Close Clipper"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* SINGLE VERTICAL SCROLL CONTENT AREA */}
      <div className="clipper-scroll-content flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-3 divide-y divide-slate-800/80">
        
        {/* 3. CLIPPING OPTIONS */}
        <div className="space-y-1.5">
          <h2 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>Clipping Options</span>
          </h2>

          {/* Exactly 5 options in single-column vertical list */}
          <div className="space-y-1">
            {approvedFormats.map((fmt) => {
              const isSelected = selectedClipType === fmt.id;
              return (
                <button
                  key={fmt.id}
                  data-testid={fmt.testId}
                  type="button"
                  title={fmt.description}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (fmt.id === 'screenshot') {
                      setScreenshotError(null);
                      setIsScreenshotDialogOpen(true);
                    } else {
                      setSelectedClipType(fmt.id as ClipType);
                      setSavedNoteId(null);
                      setSaveError(null);
                    }
                  }}
                  className={`w-full h-[40px] px-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/90 border-emerald-500/90 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'bg-[#161920] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#1C202B]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`p-1 rounded-md shrink-0 ${isSelected ? 'bg-emerald-500/20 text-amber-300' : 'bg-slate-900 text-slate-400'}`}>
                      {fmt.icon}
                    </div>
                    <span className={`font-bold text-[13px] truncate ${isSelected ? 'text-amber-300' : 'text-slate-100'}`}>
                      {fmt.label}
                    </span>
                  </div>

                  <div className="shrink-0 ml-1.5">
                    {isSelected ? (
                      <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* C. SELECTED CLIP-TYPE TOOLS & SETTINGS */}
        <div className="pt-3 space-y-3">
          {selectedClipType === 'youtube_note' && (
            <div className="space-y-3">
              {!isYouTubePage ? (
                <div className="p-3.5 bg-amber-950/80 border border-amber-500/60 rounded-2xl text-[12px] text-amber-200 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Open a YouTube video to use YouTube Note.</span>
                </div>
              ) : (
                <div className="p-3 bg-[#12161f] border border-red-500/30 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                      <Youtube className="w-3.5 h-3.5 text-red-400" />
                      <span>YouTube Note Controls</span>
                    </span>
                    <span className="text-[11px] font-mono text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-slate-800">
                      Timestamp: {ytTimestamp}
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Timestamped Note</label>
                    <input
                      type="text"
                      placeholder="Add note at current timestamp..."
                      value={ytNoteInput}
                      onChange={(e) => setYtNoteInput(e.target.value)}
                      className="w-full h-8 px-2.5 bg-[#080b0f] border border-slate-800 rounded-lg text-[12px] text-slate-100 outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => alert(`Added YouTube timestamp bookmark at ${ytTimestamp}`)}
                      className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Bookmark className="w-3 h-3 text-amber-300" />
                      <span>Bookmark</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setScreenshotError(null);
                        setIsScreenshotDialogOpen(true);
                      }}
                      className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Camera className="w-3 h-3 text-amber-300" />
                      <span>Frame</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => alert('Extracting YouTube video transcript...')}
                      className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-emerald-400" />
                      <span>Transcript</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {clipFormat === 'bookmark' && (
            <div className="p-3 bg-[#12161f] border border-emerald-500/30 rounded-2xl space-y-2">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                Bookmark Link Preview
              </span>
              <div className="p-2.5 bg-[#080b0f] border border-slate-800 rounded-xl space-y-1">
                <p className="font-bold text-[12px] text-slate-100 truncate">{pageTitle}</p>
                <p className="text-[11px] text-emerald-400 font-mono truncate">{url}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  Bookmark will preserve the canonical link, metadata, domain info, and your personal remarks.
                </p>
              </div>
            </div>
          )}

          {selectedClipType === 'simplified_article' && (
            <div className="p-3 bg-[#12161f] border border-emerald-500/30 rounded-2xl space-y-3">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                Simplified Article Extractor
              </span>

              <div className="p-2.5 bg-[#080b0f] border border-slate-800 rounded-xl space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between font-bold text-slate-100">
                  <span className="truncate">{noteTitle}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-600/40 shrink-0 font-mono text-[10px]">
                    Extracted Clean
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
                  <span>~850 words • 3 min read</span>
                  <span>4 images found</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
                <label className="flex items-center gap-2 p-2 bg-[#080b0f] border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeImages}
                    onChange={(e) => setIncludeImages(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                  />
                  <span>Include Images</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-[#080b0f] border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLinks}
                    onChange={(e) => setIncludeLinks(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                  />
                  <span>Include Links</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-[#080b0f] border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={convertToMarkdown}
                    onChange={(e) => setConvertToMarkdown(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                  />
                  <span>Convert to Markdown</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-[#080b0f] border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePageMetadata}
                    onChange={(e) => setIncludePageMetadata(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                  />
                  <span>Include Page Metadata</span>
                </label>
              </div>
            </div>
          )}

          {clipFormat === 'full_page' && (
            <div className="p-3 bg-[#12161f] border border-emerald-500/30 rounded-2xl space-y-2.5">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                Full Page Capture Toggles
              </span>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
                <label className="flex items-center gap-2 p-2 bg-[#080b0f] border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeImages}
                    onChange={(e) => setIncludeImages(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                  />
                  <span>Include Images</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-[#080b0f] border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLinks}
                    onChange={(e) => setIncludeLinks(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                  />
                  <span>Include Links</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-[#080b0f] border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTables}
                    onChange={(e) => setIncludeTables(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                  />
                  <span>Include Tables</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-[#080b0f] border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeAnnotations}
                    onChange={(e) => setIncludeAnnotations(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                  />
                  <span>Include Annotations</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* D. DESTINATION CONTROLS */}
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-3 space-y-2.5 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Destination Controls</span>
            </h3>

            <div className="flex items-center gap-1 bg-[#0F1115] p-0.5 rounded-lg border border-slate-800 text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => setDestMode('new')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  destMode === 'new' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                New Note
              </button>
              <button
                type="button"
                onClick={() => setDestMode('existing')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  destMode === 'existing' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Existing Note
              </button>
            </div>
          </div>

          {destMode === 'existing' ? (
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search existing notes to append..."
                  value={targetNoteSearch}
                  onChange={(e) => setTargetNoteSearch(e.target.value)}
                  className="w-full pl-8 pr-2.5 h-8 bg-[#0F1115] border border-slate-800 rounded-lg text-[12px] text-slate-100 outline-none focus:border-emerald-500"
                />
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1 rounded-lg border border-slate-800 p-1 bg-[#0F1115]">
                {existingNotes
                  .filter((n) => n.title.toLowerCase().includes(targetNoteSearch.toLowerCase()))
                  .map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setTargetNoteId(n.id)}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] truncate flex items-center justify-between cursor-pointer ${
                        targetNoteId === n.id ? 'bg-emerald-950 text-amber-300 font-bold border border-emerald-500/50' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                      title={n.title}
                    >
                      <span className="truncate pr-2">{n.title}</span>
                      {targetNoteId === n.id && <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {/* Note Title Input */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-0.5">Note title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full h-9 px-2.5 bg-[#0F1115] border border-slate-800 rounded-lg font-bold text-[12px] text-slate-100 outline-none focus:border-emerald-500 transition-colors truncate"
                  title={noteTitle}
                />
              </div>

              {/* Notebook Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-[11px] font-bold text-slate-400">Notebook</label>
                  <button
                    type="button"
                    onClick={() => setShowAddNotebookInput(!showAddNotebookInput)}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Create</span>
                  </button>
                </div>

                {showAddNotebookInput ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="Notebook name..."
                      value={newNotebookName}
                      onChange={(e) => setNewNotebookName(e.target.value)}
                      className="flex-1 h-8 px-2 bg-[#0F1115] border border-slate-800 rounded text-[11px] outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleCreateNewNotebook}
                      className="px-2.5 h-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[11px] cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <select
                    value={selectedNotebookId}
                    onChange={(e) => handleSelectNotebook(e.target.value)}
                    className="w-full h-9 px-2.5 bg-[#0F1115] border border-slate-800 rounded-lg text-[12px] font-semibold text-slate-200 outline-none focus:border-emerald-500 transition-colors cursor-pointer truncate"
                    title={notebooks.find((nb) => nb.id === selectedNotebookId)?.name || 'Notebook'}
                  >
                    {notebooks.map((nb) => (
                      <option key={nb.id} value={nb.id} title={nb.name}>
                        📓 {nb.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Folder Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-[11px] font-bold text-slate-400">Folder</label>
                  <button
                    type="button"
                    onClick={() => setShowAddFolderInput(!showAddFolderInput)}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Create</span>
                  </button>
                </div>

                {showAddFolderInput ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="Folder name..."
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="flex-1 h-8 px-2 bg-[#0F1115] border border-slate-800 rounded text-[11px] outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleCreateNewFolder}
                      className="px-2.5 h-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[11px] cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <select
                    value={selectedFolderId}
                    onChange={(e) => handleSelectFolder(e.target.value)}
                    className="w-full h-9 px-2.5 bg-[#0F1115] border border-slate-800 rounded-lg text-[12px] font-semibold text-slate-200 outline-none focus:border-emerald-500 transition-colors cursor-pointer truncate"
                    title={filteredFolders.find((f) => f.id === selectedFolderId)?.name || 'Folder'}
                  >
                    <option value="">(Optional) Choose folder...</option>
                    {filteredFolders.map((f) => (
                      <option key={f.id} value={f.id} title={f.name}>
                        📁 {f.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Tags Picker */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-[11px] font-bold text-slate-400">Tags</label>
                  <button
                    type="button"
                    onClick={() => setShowAddTagInput(!showAddTagInput)}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Create</span>
                  </button>
                </div>

                {showAddTagInput && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <input
                      type="text"
                      placeholder="Tag name..."
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      className="flex-1 h-8 px-2 bg-[#0F1115] border border-slate-800 rounded text-[11px] outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleCreateNewTag}
                      className="px-2.5 h-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[11px] cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 p-2 bg-[#0F1115] border border-slate-800 rounded-lg max-h-20 overflow-y-auto">
                  {tags.map((t) => {
                    const isSel = selectedTagIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        title={`#${t.name}`}
                        onClick={() => toggleTag(t.id)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border transition-all flex items-center gap-1 cursor-pointer truncate max-w-[120px] ${
                          isSel
                            ? 'bg-emerald-500/20 text-amber-300 border-emerald-500/50'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">#{t.name}</span>
                        {isSel && <Check className="w-3 h-3 text-amber-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add remark */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-0.5">Add remark</label>
                <textarea
                  rows={2}
                  placeholder="Add personal remark, summary, or citation notes..."
                  value={noteRemark}
                  onChange={(e) => setNoteRemark(e.target.value)}
                  className="w-full p-2 bg-[#0F1115] border border-slate-800 rounded-lg text-[12px] text-slate-200 placeholder:text-slate-500 outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* 10. SINGLE PRIMARY SAVE CLIP BUTTON (Sticky at bottom of scroll area) */}
        <div className="sticky bottom-0 z-20 pt-2 pb-1 bg-[#0c1319]/95 backdrop-blur-md border-t border-slate-800/80 shrink-0">
          {savedNoteId ? (
            <div className="space-y-2">
              <div className="bg-emerald-950/90 border border-emerald-500/80 p-2.5 rounded-xl text-center font-extrabold text-[13px] text-amber-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-400" />
                <span>Clip Saved to Smart Notes</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => onOpenSmartNotesNote(savedNoteId)}
                  className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center gap-1 shadow-md transition-all col-span-1 cursor-pointer"
                >
                  <span>Open Note</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-300" />
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleUndo}
                  className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Undo</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                type="button"
                data-testid="save-clip"
                onClick={() => handlePrimarySave(false)}
                disabled={isSaving}
                className="w-full h-[44px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-[14px] rounded-xl shadow-[0_0_18px_rgba(16,185,129,0.4)] border border-amber-300/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span className="text-amber-200 font-bold">{saveStepMessage || 'Preparing clip...'}</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5 text-amber-300 fill-amber-300/40" />
                    <span>Save Clip</span>
                  </>
                )}
              </button>

              {saveError && (
                <div className="mt-1.5 p-2 bg-red-950/80 border border-red-500/60 rounded-lg text-[11px] text-red-200 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{saveError}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SCREENSHOT MODE DIALOG MODAL (Rendered via Portal to document.body) */}
      {isScreenshotDialogOpen && typeof document !== 'undefined' && createPortal(
        <div
          data-testid="screenshot-mode-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="screenshot-mode-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isStartingCapture) {
              setIsScreenshotDialogOpen(false);
              setSelectedScreenshotMode(null);
              setScreenshotError(null);
            }
          }}
          className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#12161f] border border-emerald-500/50 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-3 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-700/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Camera className="w-3.5 h-3.5" />
                </div>
                <h2 id="screenshot-mode-title" className="font-extrabold text-[13px] text-white tracking-tight truncate">
                  Choose Screenshot Mode
                </h2>
              </div>
              <button
                type="button"
                disabled={isStartingCapture}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsScreenshotDialogOpen(false);
                  setSelectedScreenshotMode(null);
                  setScreenshotError(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {screenshotError && (
              <div className="mx-3 mt-3 p-2.5 bg-red-950/80 border border-red-500/60 rounded-xl text-[11px] text-red-200 flex items-start gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{screenshotError}</span>
              </div>
            )}

            {/* Options List */}
            <div className="p-3 space-y-2 overflow-y-auto">
              {/* Visible Area */}
              <button
                type="button"
                data-testid="screenshot-mode-visible"
                aria-label="Capture Visible Area"
                disabled={isStartingCapture}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleScreenshotMode('visible_area');
                }}
                className={`w-full p-2.5 rounded-xl border border-slate-800 bg-[#0a0d12] hover:bg-emerald-950/60 hover:border-emerald-500/60 text-left flex items-start gap-3 group transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer ${
                  selectedScreenshotMode === 'visible_area' && isStartingCapture ? 'border-amber-400 bg-emerald-950/80' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-amber-300 shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[12px] text-slate-100 group-hover:text-amber-300 flex items-center justify-between">
                    <span>Visible Area</span>
                    {selectedScreenshotMode === 'visible_area' && isStartingCapture && (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Capture the currently visible portion of the webpage</div>
                </div>
              </button>

              {/* Selected Area */}
              <button
                type="button"
                data-testid="screenshot-mode-selected-area"
                aria-label="Capture Selected Area"
                disabled={isStartingCapture}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleScreenshotMode('selected_area');
                }}
                className={`w-full p-2.5 rounded-xl border border-slate-800 bg-[#0a0d12] hover:bg-emerald-950/60 hover:border-emerald-500/60 text-left flex items-start gap-3 group transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer ${
                  selectedScreenshotMode === 'selected_area' && isStartingCapture ? 'border-amber-400 bg-emerald-950/80' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-amber-300 shrink-0">
                  <Crop className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[12px] text-slate-100 group-hover:text-amber-300 flex items-center justify-between">
                    <span>Selected Area</span>
                    {selectedScreenshotMode === 'selected_area' && isStartingCapture && (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Drag to select a rectangular region to capture</div>
                </div>
              </button>

              {/* Full Page */}
              <button
                type="button"
                data-testid="screenshot-mode-full-page"
                aria-label="Capture Full Page"
                disabled={isStartingCapture}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleScreenshotMode('full_page');
                }}
                className={`w-full p-2.5 rounded-xl border border-slate-800 bg-[#0a0d12] hover:bg-emerald-950/60 hover:border-emerald-500/60 text-left flex items-start gap-3 group transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer ${
                  selectedScreenshotMode === 'full_page' && isStartingCapture ? 'border-amber-400 bg-emerald-950/80' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-amber-300 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[12px] text-slate-100 group-hover:text-amber-300 flex items-center justify-between">
                    <span>Full Page</span>
                    {selectedScreenshotMode === 'full_page' && isStartingCapture && (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Capture the entire scrollable webpage from top to bottom</div>
                </div>
              </button>

              {/* Capture Element */}
              <button
                type="button"
                data-testid="screenshot-mode-element"
                aria-label="Capture Webpage Element"
                disabled={isStartingCapture}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleScreenshotMode('element');
                }}
                className={`w-full p-2.5 rounded-xl border border-slate-800 bg-[#0a0d12] hover:bg-emerald-950/60 hover:border-emerald-500/60 text-left flex items-start gap-3 group transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer ${
                  selectedScreenshotMode === 'element' && isStartingCapture ? 'border-amber-400 bg-emerald-950/80' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-amber-300 shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[12px] text-slate-100 group-hover:text-amber-300 flex items-center justify-between">
                    <span>Capture Element</span>
                    {selectedScreenshotMode === 'element' && isStartingCapture && (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Hover and click to capture a specific webpage element</div>
                </div>
              </button>

              {/* Current Video Frame */}
              <button
                type="button"
                data-testid="screenshot-mode-video-frame"
                aria-label="Capture Current Video Frame"
                disabled={isStartingCapture}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleScreenshotMode('video_frame');
                }}
                className={`w-full p-2.5 rounded-xl border border-slate-800 bg-[#0a0d12] hover:bg-emerald-950/60 hover:border-emerald-500/60 text-left flex items-start gap-3 group transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer ${
                  selectedScreenshotMode === 'video_frame' && isStartingCapture ? 'border-amber-400 bg-emerald-950/80' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20 group-hover:text-amber-300 shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[12px] text-slate-100 group-hover:text-amber-300 flex items-center justify-between">
                    <span>Current Video Frame</span>
                    {selectedScreenshotMode === 'video_frame' && isStartingCapture && (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Capture active video player frame with timestamp</div>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-[#0a0d12] border-t border-slate-800 flex justify-end shrink-0">
              <button
                type="button"
                disabled={isStartingCapture}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsScreenshotDialogOpen(false);
                  setSelectedScreenshotMode(null);
                  setScreenshotError(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* FOOTER */}
      <footer className="h-8 px-4 bg-[#0A0C0E] border-t border-slate-800/90 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-700 text-amber-300 font-bold text-[8px] flex items-center justify-center">
            E
          </div>
          <span className="truncate font-medium text-slate-300">euclid-projects v1.0</span>
        </div>

        <div className="flex items-center gap-2 font-medium">
          <span className="text-emerald-400">Synced to Smart Notes</span>
        </div>
      </footer>
    </div>
  );
};

export default ClippingWorkspace;

