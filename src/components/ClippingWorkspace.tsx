import React, { useState, useEffect } from 'react';
import {
  FileText,
  Globe,
  Scissors,
  Bookmark,
  Camera,
  ImageIcon,
  FileCode,
  Youtube,
  Video,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  BookOpen,
  Folder as FolderIcon,
  Tag as TagIcon,
  Settings,
  X,
  ExternalLink,
  Sparkles,
  Copy,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  Search,
  Sidebar,
  Layers,
  FilePlus,
} from 'lucide-react';
import {
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidNote,
  EuclidNoteType,
} from '../types';
import { clippingService } from '../services/clippingService';

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

export type ClipFormatType =
  | 'simplified'
  | 'full_article'
  | 'full_page'
  | 'selection'
  | 'bookmark'
  | 'screenshot'
  | 'image'
  | 'pdf'
  | 'youtube'
  | 'video';

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
  isSidePanel = false,
  onOpenSidePanel,
  onOpenSettings,
}) => {
  // Page context state
  const [pageContext, setPageContext] = useState<'article' | 'youtube' | 'pdf' | 'selection'>('article');
  
  // Format choice
  const [clipFormat, setClipFormat] = useState<ClipFormatType>('simplified');
  const [showMoreFormats, setShowMoreFormats] = useState(false);

  // Page Metadata
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/Euclid');
  const [pageTitle, setPageTitle] = useState('Euclid — Father of Geometry & Axiomatic Systems');
  const [faviconUrl, setFaviconUrl] = useState('https://en.wikipedia.org/static/favicon/wikipedia.ico');
  const [author, setAuthor] = useState('Euclid Projects Research');
  const [noteTitle, setNoteTitle] = useState('Euclid — Father of Geometry & Axiomatic Systems');
  const [noteComment, setNoteComment] = useState('');
  const [isNoteFocused, setIsNoteFocused] = useState(false);

  const [selectedText, setSelectedText] = useState(
    'Euclid of Alexandria was a Greek mathematician, often referred to as the father of geometry. His Elements is one of the most influential works in the history of mathematics.'
  );

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

  // Advanced Options Accordion
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [advOptions, setAdvOptions] = useState({
    includeSourceLink: true,
    includeMetadata: true,
    includeImages: true,
    includeAnnotations: true,
    includeTranscript: true,
    includeScreenshots: true,
    keepOfflineCopy: true,
    saveAsMarkdown: false,
    saveAsEditableWebClip: true,
  });

  // Save Progress State
  const [isSaving, setIsSaving] = useState(false);
  const [saveStepMessage, setSaveStepMessage] = useState<string>('');
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Side Panel Tab state (if rendered in side panel)
  const [sidePanelTab, setSidePanelTab] = useState<'clip' | 'notes' | 'annotations' | 'video' | 'transcript'>('clip');

  // Update note title automatically if page title changes unless user edited it
  useEffect(() => {
    if (!noteTitle || noteTitle === pageTitle) {
      setNoteTitle(pageTitle);
    }
  }, [pageTitle]);

  // Adjust default clip format when page context shifts
  useEffect(() => {
    if (pageContext === 'youtube') {
      setClipFormat('youtube');
      setUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      setPageTitle('Euclid Elements: The Foundations of Mathematics Revealed');
    } else if (pageContext === 'pdf') {
      setClipFormat('pdf');
      setUrl('https://euclidprojects.org/papers/elements_treatise.pdf');
      setPageTitle('Treatise on Euclidean Axioms and Geometric Proofs.pdf');
    } else if (pageContext === 'selection') {
      setClipFormat('selection');
    } else {
      setClipFormat('simplified');
      setUrl('https://en.wikipedia.org/wiki/Euclid');
      setPageTitle('Euclid — Father of Geometry & Axiomatic Systems');
    }
  }, [pageContext]);

  // Handle notebook selection & remember
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

  // Inline Handlers
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

  // Primary Save Action with Animated Multi-step Progress
  const handlePrimarySave = async (localOnly = false) => {
    setIsSaving(true);
    setSavedNoteId(null);

    const steps = [
      'Preparing clip...',
      'Extracting page content...',
      localOnly ? 'Saving locally...' : 'Uploading assets...',
      'Creating Smart Notes note...',
      'Saved successfully!',
    ];

    for (let i = 0; i < steps.length; i++) {
      setSaveStepMessage(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    let noteType: EuclidNoteType = 'web_clip';
    if (clipFormat === 'simplified' || clipFormat === 'full_article' || clipFormat === 'full_page') noteType = 'article';
    if (clipFormat === 'bookmark') noteType = 'bookmark';
    if (clipFormat === 'screenshot' || clipFormat === 'image') noteType = 'screenshot';
    if (clipFormat === 'youtube' || clipFormat === 'video') noteType = 'youtube';

    const currentContent = clippingService.extractSimplifiedArticle(
      `<div><h1>${noteTitle}</h1><p>${noteComment || 'Clipped with Euclid Smart Clipper'}</p><p>${selectedText}</p></div>`,
      url,
      noteTitle
    );

    const selectedTagNames = tags
      .filter((t) => selectedTagIds.includes(t.id))
      .map((t) => t.name);

    const newNoteId = 'note_' + Date.now();
    const noteToSave: EuclidNote = {
      id: newNoteId,
      user_id: 'local-user',
      title: noteTitle,
      content: currentContent.cleanHtml || currentContent.markdown || '',
      plainTextContent: noteComment + '\n' + selectedText,
      markdownContent: currentContent.markdown,
      notebook_id: selectedNotebookId,
      folder_id: selectedFolderId || null,
      tags: selectedTagNames,
      noteType,
      sourceUrl: url,
      canonicalUrl: url,
      sourceTitle: pageTitle,
      sourceDomain: new URL(url).hostname,
      sourceAuthor: author,
      clipFormat,
      wordCount: selectedText.split(/\s+/).length,
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

  // Complete List of All 9 Clipping Formats
  const allFormats: Array<{
    id: ClipFormatType;
    label: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'simplified',
      label: 'Simplified Article',
      description: 'Clean body text without ads or clutter',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'full_article',
      label: 'Full Article',
      description: 'Complete article with inline graphics',
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'full_page',
      label: 'Full Page',
      description: 'Entire web page layout snapshot',
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'selection',
      label: 'Selected Text',
      description: 'Save highlighted text excerpt',
      icon: <Scissors className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'bookmark',
      label: 'Bookmark',
      description: 'Quick link reference & metadata',
      icon: <Bookmark className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'screenshot',
      label: 'Screenshot',
      description: 'Capture visible area or element',
      icon: <Camera className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'youtube',
      label: 'YouTube Note',
      description: 'Timestamped video note & transcript',
      icon: <Youtube className="w-5 h-5 text-red-400" />,
    },
    {
      id: 'video',
      label: 'Video Note',
      description: 'HTML5 video snapshot & timeline',
      icon: <Video className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'pdf',
      label: 'PDF Note',
      description: 'PDF document & page highlights',
      icon: <FileCode className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const domainName = () => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'webpage';
    }
  };

  const filteredFolders = folders.filter((f) => !f.notebookId || f.notebookId === selectedNotebookId);

  return (
    <div className="clipper-popup">
      {/* 1. STICKY HEADER (Green background with white text & subtle yellow accent) */}
      <header className="h-[56px] px-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 border-b border-emerald-700/60 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-lime-400/50 flex items-center justify-center shrink-0">
            <img src="/icons/icon32.png" alt="Euclid Logo" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <h1 className="font-extrabold text-[17px] text-white tracking-tight leading-tight flex items-center gap-1.5">
              <span>Euclid Smart Clipper</span>
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#a3e635]" />
            </h1>
            <p className="text-[11px] text-emerald-200 font-medium flex items-center gap-1">
              <span>Connected to Euclid Smart Notes</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onOpenSettings ? onOpenSettings() : alert('Euclid Clipper Settings & Preferences')}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/50 transition-colors"
            title="Clipper Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.close()}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/50 transition-colors"
            title="Close Clipper"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Chrome Side Panel Navigation Tabs (Only when in sidepanel mode) */}
      {isSidePanel && (
        <div className="bg-[#0B0D10] border-b border-slate-800/80 px-3 pt-2 flex items-center justify-between text-[12px] font-semibold text-slate-400 shrink-0">
          <div className="flex gap-1">
            {(['clip', 'notes', 'annotations', 'video', 'transcript'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSidePanelTab(tab)}
                className={`px-3 py-1.5 rounded-t-lg transition-all capitalize ${
                  sidePanelTab === tab
                    ? 'bg-[#0F1115] text-emerald-400 font-bold border-t-2 border-emerald-500'
                    : 'hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Simulated Page Context Switcher Bar (For testing article/YouTube/PDF/selection context) */}
      <div className="bg-[#0A0C0E] px-4 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <span className="font-semibold text-slate-400">Page Context:</span>
        <div className="flex items-center gap-1.5">
          {(['article', 'youtube', 'pdf', 'selection'] as const).map((ctx) => (
            <button
              key={ctx}
              onClick={() => setPageContext(ctx)}
              className={`px-2 py-0.5 rounded font-mono transition-colors ${
                pageContext === ctx ? 'bg-emerald-500/20 text-lime-300 border border-emerald-500/40 font-bold' : 'hover:text-slate-300'
              }`}
            >
              {ctx}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT AREA (.clipper-content) */}
      <div className="clipper-content space-y-4">
        
        {/* PAGE INFORMATION CARD */}
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3 shadow-md hover:border-slate-700 transition-colors">
          <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
            <img
              src={faviconUrl}
              alt="Favicon"
              className="w-4 h-4 object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <Globe className="w-4 h-4 text-emerald-400 hidden" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-[14px] text-slate-100 line-clamp-3 leading-snug">
              {pageTitle}
            </h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-[12px] text-emerald-400 font-mono font-medium truncate">
                {domainName()}
              </span>
              {author && <span className="text-[12px] text-slate-500">• {author}</span>}
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase tracking-wider">
                {pageContext}
              </span>
            </div>
          </div>

          {/* Optional Thumbnail Preview */}
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=150"
              alt="Page Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CLIPPING OPTIONS (ONE SINGLE COLUMN LIST) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Clipping Options</span>
            </h3>
            <span className="text-[11px] text-lime-400/90 font-medium">Auto-detected context: {pageContext}</span>
          </div>

          {/* ONE COLUMN ONLY */}
          <div className="space-y-1.5">
            {allFormats.map((fmt) => {
              const isSelected = clipFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => {
                    setClipFormat(fmt.id);
                    setSavedNoteId(null);
                  }}
                  className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-950/90 border-emerald-500/90 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'bg-[#161920] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#1C202B]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-500/20 text-lime-300' : 'bg-slate-900 text-slate-400'}`}>
                      {fmt.icon}
                    </div>
                    <div className="min-w-0">
                      <p className={`font-bold text-[14px] truncate ${isSelected ? 'text-lime-300' : 'text-slate-100'}`}>
                        {fmt.label}
                      </p>
                      <p className="text-[12px] text-slate-400 truncate">{fmt.description}</p>
                    </div>
                  </div>

                  <div className="shrink-0 ml-2">
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DESTINATION & DETAILS FIELDS (FULL WIDTH) */}
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Destination & Details</span>
            </h3>

            <div className="flex items-center gap-1 bg-[#0F1115] p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setDestMode('new')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  destMode === 'new' ? 'bg-emerald-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                New Note
              </button>
              <button
                type="button"
                onClick={() => setDestMode('existing')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  destMode === 'existing' ? 'bg-emerald-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Existing Note
              </button>
            </div>
          </div>

          {destMode === 'existing' ? (
            /* Append to Existing Note Search */
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search existing notes to append..."
                  value={targetNoteSearch}
                  onChange={(e) => setTargetNoteSearch(e.target.value)}
                  className="w-full pl-9 pr-3 h-[42px] bg-[#0F1115] border border-slate-800 rounded-xl text-[14px] text-slate-100 outline-none focus:border-emerald-500"
                />
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1 rounded-xl border border-slate-800 p-1 bg-[#0F1115]">
                {existingNotes
                  .filter((n) => n.title.toLowerCase().includes(targetNoteSearch.toLowerCase()))
                  .map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setTargetNoteId(n.id)}
                      className={`w-full text-left p-2 rounded-lg text-[13px] flex items-center justify-between ${
                        targetNoteId === n.id ? 'bg-emerald-950 text-lime-300 font-bold border border-emerald-500/50' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <span className="truncate pr-2">{n.title}</span>
                      {targetNoteId === n.id && <Check className="w-4 h-4 text-lime-400" />}
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            /* Notebook, Folder & Tags Stacked Fields (Full Width) */
            <div className="space-y-3">
              {/* Note Title Input */}
              <div>
                <label className="text-[13px] font-bold text-slate-300 block mb-1">Note title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full h-[42px] px-3.5 bg-[#0F1115] border border-slate-800 rounded-xl font-bold text-[14px] text-slate-100 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Notebook Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[13px] font-bold text-slate-300">Notebook</label>
                  <button
                    type="button"
                    onClick={() => setShowAddNotebookInput(!showAddNotebookInput)}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create notebook</span>
                  </button>
                </div>

                {showAddNotebookInput ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Notebook name..."
                      value={newNotebookName}
                      onChange={(e) => setNewNotebookName(e.target.value)}
                      className="flex-1 h-[42px] px-3 bg-[#0F1115] border border-slate-800 rounded-xl text-[13px] outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleCreateNewNotebook}
                      className="px-3.5 h-[42px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-[13px]"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <select
                    value={selectedNotebookId}
                    onChange={(e) => handleSelectNotebook(e.target.value)}
                    className="w-full h-[42px] px-3.5 bg-[#0F1115] border border-slate-800 rounded-xl text-[14px] font-semibold text-slate-200 outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Choose notebook...</option>
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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[13px] font-bold text-slate-300">Folder</label>
                  <button
                    type="button"
                    onClick={() => setShowAddFolderInput(!showAddFolderInput)}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create folder</span>
                  </button>
                </div>

                {showAddFolderInput ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Folder name..."
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="flex-1 h-[42px] px-3 bg-[#0F1115] border border-slate-800 rounded-xl text-[13px] outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleCreateNewFolder}
                      className="px-3.5 h-[42px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-[13px]"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <select
                    value={selectedFolderId}
                    onChange={(e) => handleSelectFolder(e.target.value)}
                    className="w-full h-[42px] px-3.5 bg-[#0F1115] border border-slate-800 rounded-xl text-[14px] font-semibold text-slate-200 outline-none focus:border-emerald-500 transition-colors"
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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[13px] font-bold text-slate-300">Tags</label>
                  <button
                    type="button"
                    onClick={() => setShowAddTagInput(!showAddTagInput)}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create tag</span>
                  </button>
                </div>

                {showAddTagInput ? (
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Tag name..."
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      className="flex-1 h-[42px] px-3 bg-[#0F1115] border border-slate-800 rounded-xl text-[13px] outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleCreateNewTag}
                      className="px-3.5 h-[42px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-[13px]"
                    >
                      Add
                    </button>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-1.5 p-2 bg-[#0F1115] border border-slate-800 rounded-xl max-h-24 overflow-y-auto">
                  {tags.map((t) => {
                    const isSel = selectedTagIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTag(t.id)}
                        className={`text-[11px] px-2.5 py-1 rounded-full font-semibold border transition-all flex items-center gap-1 ${
                          isSel
                            ? 'bg-emerald-500/20 text-lime-300 border-emerald-500/50'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <span>#{t.name}</span>
                        {isSel && <Check className="w-3 h-3 text-lime-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add a note / Comments TextArea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[13px] font-bold text-slate-300">Add a note</label>
                  <button
                    type="button"
                    onClick={() => window.open('https://notes.app.euclidprojects.org/', '_blank')}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <span>Open Smart Notes</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  rows={3}
                  placeholder="Add personal notes, summary, key takeaways or annotations..."
                  value={noteComment}
                  onChange={(e) => setNoteComment(e.target.value)}
                  className="w-full p-3 bg-[#0F1115] border border-slate-800 rounded-xl text-[14px] text-slate-200 placeholder:text-slate-500 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}
        </div>

        {/* ADVANCED OPTIONS (COLLAPSIBLE ACCORDION) */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#161920]">
          <button
            type="button"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="w-full px-4 py-3 text-[13px] font-bold text-slate-300 flex items-center justify-between hover:bg-slate-800/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Advanced Options</span>
            </span>
            {showAdvancedOptions ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {showAdvancedOptions && (
            <div className="p-4 pt-1 border-t border-slate-800 space-y-2.5 text-[12px] text-slate-300">
              {(
                [
                  ['includeSourceLink', 'Include source link'],
                  ['includeMetadata', 'Include page metadata'],
                  ['includeImages', 'Include images'],
                  ['includeAnnotations', 'Include annotations'],
                  ['includeTranscript', 'Include transcript'],
                  ['includeScreenshots', 'Include screenshots'],
                  ['keepOfflineCopy', 'Keep offline copy'],
                  ['saveAsMarkdown', 'Save as Markdown'],
                  ['saveAsEditableWebClip', 'Save as editable web clip'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between cursor-pointer group">
                  <span className="group-hover:text-white font-medium">{label}</span>
                  <input
                    type="checkbox"
                    checked={advOptions[key]}
                    onChange={(e) => setAdvOptions({ ...advOptions, [key]: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 3. STICKY BOTTOM ACTION AREA */}
      <div className="p-4 bg-[#0F1115] border-t border-slate-800/90 space-y-2.5 shrink-0 shadow-2xl">
        {savedNoteId ? (
          /* Post-Save Completion State */
          <div className="space-y-2.5">
            <div className="bg-emerald-950/90 border border-emerald-500/60 p-3 rounded-xl text-center text-[13px] font-bold text-lime-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-4.5 h-4.5 text-lime-400" />
              <span>Saved to Euclid Smart Notes</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[12px] font-bold">
              <button
                type="button"
                onClick={() => onOpenSmartNotesNote(savedNoteId)}
                className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all col-span-1"
              >
                <span>Open Note</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center gap-1 transition-all"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <button
                type="button"
                onClick={handleUndo}
                className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center justify-center gap-1 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Undo</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Save Action */
          <div className="space-y-2.5">
            {/* Primary Save Button (Full Width, 48px Height, Green Bg, Yellow Accent Icon) */}
            <button
              type="button"
              onClick={() => handlePrimarySave(false)}
              disabled={isSaving}
              className="w-full h-[48px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-[14px] rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75 border border-lime-400/30 cursor-pointer"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-lime-300" />
                  <span className="text-lime-200 font-bold">{saveStepMessage || 'Preparing clip...'}</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300/30" />
                  <span>Save to Euclid Smart Notes</span>
                </>
              )}
            </button>

            {/* Secondary Actions */}
            <div className="flex items-center justify-between text-[12px] font-semibold text-slate-400 px-1">
              <button
                type="button"
                onClick={() => handlePrimarySave(true)}
                disabled={isSaving}
                className="hover:text-emerald-400 transition-colors"
              >
                Save locally
              </button>
              <button
                type="button"
                onClick={() => setNoteComment('')}
                className="hover:text-slate-200 transition-colors"
              >
                Clear form
              </button>
            </div>

            {/* Open Expanded Side Panel Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenSidePanel) {
                  onOpenSidePanel();
                } else if (typeof chrome !== 'undefined' && chrome.sidePanel && chrome.sidePanel.open) {
                  chrome.sidePanel.open({ windowId: 1 });
                } else {
                  alert('Opening Expanded Side Panel...');
                }
              }}
              className="w-full h-[40px] bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/70 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sidebar className="w-4 h-4 text-emerald-400" />
              <span>Open Expanded Side Panel</span>
            </button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="h-9 px-4 bg-[#0A0C0E] border-t border-slate-800/90 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-emerald-700 text-lime-300 font-bold text-[9px] flex items-center justify-center">
            E
          </div>
          <span className="truncate max-w-[140px] font-medium text-slate-300">euclid-projects v1.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        <div className="flex items-center gap-2.5 font-medium">
          <span className="text-emerald-400">Synced</span>
          <button
            type="button"
            onClick={() => alert('Euclid Smart Clipper Help & Guides')}
            className="text-slate-400 hover:text-white flex items-center gap-0.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
