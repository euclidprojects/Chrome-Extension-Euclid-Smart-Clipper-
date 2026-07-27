import React, { useState, useEffect } from 'react';
import {
  FileText,
  Globe,
  Scissors,
  Bookmark,
  Camera,
  Image as ImageIcon,
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
  User,
  HelpCircle,
  RefreshCw,
  Search,
  CheckSquare,
  Square,
  FilePlus,
  Layers,
  ArrowRight,
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
}) => {
  // Simulated page context state
  const [pageContext, setPageContext] = useState<'article' | 'youtube' | 'pdf' | 'selection'>('article');
  
  // Format choice
  const [clipFormat, setClipFormat] = useState<ClipFormatType>('simplified');
  const [showMoreFormats, setShowMoreFormats] = useState(false);

  // Simulated Page Metadata
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

  // Inline Creation Modals/Inputs
  const [showAddNotebookInput, setShowAddNotebookInput] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  
  const [showAddFolderInput, setShowAddFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [showAddTagInput, setShowAddTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // Advanced Options Collapsed Accordion
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

  // Add Inline Handlers
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
      'Extracting article content...',
      localOnly ? 'Saving locally...' : 'Uploading screenshot & assets...',
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

    // Build html / markdown content
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

  // Format definitions
  const allFormats: Array<{
    id: ClipFormatType;
    label: string;
    description: string;
    icon: React.ReactNode;
    category: 'primary' | 'secondary';
  }> = [
    {
      id: 'simplified',
      label: 'Simplified Article',
      description: 'Clean body text without ads or clutter',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      category: 'primary',
    },
    {
      id: 'full_article',
      label: 'Full Article',
      description: 'Complete article with inline graphics',
      icon: <Globe className="w-4 h-4 text-emerald-400" />,
      category: 'primary',
    },
    {
      id: 'selection',
      label: 'Selected Text',
      description: 'Save highlighted text excerpt',
      icon: <Scissors className="w-4 h-4 text-emerald-400" />,
      category: 'primary',
    },
    {
      id: 'bookmark',
      label: 'Bookmark',
      description: 'Quick link reference & metadata',
      icon: <Bookmark className="w-4 h-4 text-emerald-400" />,
      category: 'primary',
    },
    {
      id: 'screenshot',
      label: 'Screenshot',
      description: 'Capture visible area or element',
      icon: <Camera className="w-4 h-4 text-emerald-400" />,
      category: 'primary',
    },
    {
      id: 'full_page',
      label: 'Full Page',
      description: 'Entire web page layout snapshot',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      category: 'secondary',
    },
    {
      id: 'image',
      label: 'Image',
      description: 'Extract primary page images',
      icon: <ImageIcon className="w-4 h-4 text-emerald-400" />,
      category: 'secondary',
    },
    {
      id: 'pdf',
      label: 'PDF Note',
      description: 'PDF document & page highlights',
      icon: <FileCode className="w-4 h-4 text-emerald-400" />,
      category: 'secondary',
    },
    {
      id: 'youtube',
      label: 'YouTube Note',
      description: 'Timestamped video note & transcript',
      icon: <Youtube className="w-4 h-4 text-red-400" />,
      category: 'secondary',
    },
    {
      id: 'video',
      label: 'Video Note',
      description: 'HTML5 video snapshot & timeline',
      icon: <Video className="w-4 h-4 text-emerald-400" />,
      category: 'secondary',
    },
  ];

  // Prioritize top 4 formats depending on context
  const getPrioritizedFormats = () => {
    if (pageContext === 'youtube') {
      return ['youtube', 'video', 'bookmark', 'screenshot'];
    } else if (pageContext === 'pdf') {
      return ['pdf', 'selection', 'bookmark', 'screenshot'];
    } else if (pageContext === 'selection') {
      return ['selection', 'simplified', 'bookmark', 'screenshot'];
    }
    return ['simplified', 'full_article', 'selection', 'bookmark'];
  };

  const prioritizedIds = getPrioritizedFormats();
  const primaryFormatsList = allFormats.filter((f) => prioritizedIds.includes(f.id));
  const secondaryFormatsList = allFormats.filter((f) => !prioritizedIds.includes(f.id));

  const domainName = () => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'webpage';
    }
  };

  const filteredFolders = folders.filter((f) => !f.notebookId || f.notebookId === selectedNotebookId);

  return (
    <div className="w-full flex justify-center py-2 px-2">
      {/* Container: 360px preferred width, min 330px, max 400px, responsive in side panel */}
      <div className={`w-full ${isSidePanel ? 'max-w-full' : 'max-w-[380px] min-w-[330px]'} bg-[#121418] text-slate-100 rounded-2xl border border-emerald-950/60 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[calc(100vh-24px)] font-sans text-xs`}>
        
        {/* Chrome Side Panel Navigation Tabs (Only when in sidepanel mode) */}
        {isSidePanel && (
          <div className="bg-[#0D0F12] border-b border-slate-800/80 px-2 pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 shrink-0">
            <div className="flex gap-1">
              {(['clip', 'notes', 'annotations', 'video', 'transcript'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSidePanelTab(tab)}
                  className={`px-2.5 py-1.5 rounded-t-lg transition-all capitalize ${
                    sidePanelTab === tab
                      ? 'bg-[#121418] text-emerald-400 font-bold border-t-2 border-emerald-500'
                      : 'hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 1. COMPACT HEADER (48–56px High) */}
        <header className="h-[52px] px-3.5 bg-emerald-950/70 border-b border-emerald-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-[0_0_12px_rgba(16,185,129,0.4)] border border-lime-400/40 flex items-center justify-center shrink-0">
              <img src="/icons/icon32.png" alt="Euclid Logo" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <h1 className="font-extrabold text-xs text-white tracking-tight flex items-center gap-1">
                <span>Euclid Smart Clipper</span>
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse shadow-[0_0_6px_#a3e635]" />
              </h1>
              <p className="text-[10px] text-emerald-300 font-medium flex items-center gap-1">
                <span>Connected to Smart Notes</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => alert('Euclid Clipper Settings & Preferences')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-900/40 transition-colors"
              title="Clipper Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => alert('Clipper closed')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-900/40 transition-colors"
              title="Close Clipper"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Simulated Page Context Switcher Bar (For testing article/YouTube/PDF/selection context) */}
        <div className="bg-[#0B0D10] px-3 py-1 border-b border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
          <span className="font-semibold text-slate-500">Page Context:</span>
          <div className="flex items-center gap-1">
            {(['article', 'youtube', 'pdf', 'selection'] as const).map((ctx) => (
              <button
                key={ctx}
                onClick={() => setPageContext(ctx)}
                className={`px-1.5 py-0.5 rounded capitalize font-mono transition-colors ${
                  pageContext === ctx ? 'bg-emerald-500/20 text-lime-300 border border-emerald-500/40 font-bold' : 'hover:text-slate-300'
                }`}
              >
                {ctx}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE MAIN BODY */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
          
          {/* 2. CURRENT-PAGE PREVIEW */}
          <div className="bg-[#171A21] border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5 shadow-md">
            <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
              <img
                src={faviconUrl}
                alt="Favicon"
                className="w-4 h-4 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Globe className="w-3.5 h-3.5 text-emerald-400 hidden" />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-xs text-slate-100 line-clamp-2 leading-tight">
                {pageTitle}
              </h2>
              <p className="text-[11px] text-emerald-400 font-mono mt-0.5 truncate flex items-center gap-1">
                <span>{domainName()}</span>
                {author && <span className="text-slate-500">• {author}</span>}
              </p>
            </div>

            {/* Small Thumbnail Preview */}
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=120"
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 3. CLIP FORMAT SECTION */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <span>Clip format</span>
              </h3>
              <span className="text-[10px] text-lime-400/90 font-medium">Auto-detected: {pageContext}</span>
            </div>

            <div className="space-y-1">
              {primaryFormatsList.map((fmt) => {
                const isSelected = clipFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => {
                      setClipFormat(fmt.id);
                      setSavedNoteId(null);
                    }}
                    className={`w-full h-[40px] px-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500/80 text-white shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                        : 'bg-[#171A21] border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-[#1C2029]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-500/20 text-lime-300' : 'bg-slate-900 text-slate-400'}`}>
                        {fmt.icon}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-bold text-xs truncate ${isSelected ? 'text-lime-300' : 'text-slate-200'}`}>
                          {fmt.label}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{fmt.description}</p>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center font-bold shadow-sm">
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

            {/* Collapsible Accordion for More Formats */}
            <div className="pt-0.5">
              <button
                onClick={() => setShowMoreFormats(!showMoreFormats)}
                className="w-full py-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1 transition-colors"
              >
                <span>{showMoreFormats ? 'Fewer clip formats' : 'More clip formats'}</span>
                {showMoreFormats ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showMoreFormats && (
                <div className="space-y-1 mt-1 pt-1 border-t border-slate-800/60">
                  {secondaryFormatsList.map((fmt) => {
                    const isSelected = clipFormat === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        onClick={() => {
                          setClipFormat(fmt.id);
                          setSavedNoteId(null);
                        }}
                        className={`w-full h-[38px] px-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-500/80 text-white shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                            : 'bg-[#171A21] border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-[#1C2029]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-500/20 text-lime-300' : 'bg-slate-900 text-slate-400'}`}>
                            {fmt.icon}
                          </div>
                          <div className="min-w-0">
                            <p className={`font-bold text-xs truncate ${isSelected ? 'text-lime-300' : 'text-slate-200'}`}>
                              {fmt.label}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center font-bold">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 4. ORGANIZATION SECTION ("Save to") */}
          <div className="bg-[#171A21] border border-slate-800 rounded-xl p-3 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save to</span>
              </h3>

              <div className="flex items-center gap-1 bg-[#121418] p-0.5 rounded-lg border border-slate-800 text-[10px] font-semibold">
                <button
                  onClick={() => setDestMode('new')}
                  className={`px-2 py-0.5 rounded transition-all ${
                    destMode === 'new' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  New Note
                </button>
                <button
                  onClick={() => setDestMode('existing')}
                  className={`px-2 py-0.5 rounded transition-all ${
                    destMode === 'existing' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Existing Note
                </button>
              </div>
            </div>

            {destMode === 'existing' ? (
              /* Append to Existing Note Search */
              <div className="space-y-1.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search existing notes to append..."
                    value={targetNoteSearch}
                    onChange={(e) => setTargetNoteSearch(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 bg-[#121418] border border-slate-800 rounded-lg text-xs text-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="max-h-28 overflow-y-auto space-y-1 rounded-lg border border-slate-800 p-1 bg-[#121418]">
                  {existingNotes
                    .filter((n) => n.title.toLowerCase().includes(targetNoteSearch.toLowerCase()))
                    .map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setTargetNoteId(n.id)}
                        className={`w-full text-left p-1.5 rounded text-xs flex items-center justify-between ${
                          targetNoteId === n.id ? 'bg-emerald-950 text-lime-300 font-bold border border-emerald-500/50' : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <span className="truncate pr-2">{n.title}</span>
                        {targetNoteId === n.id && <Check className="w-3.5 h-3.5 text-lime-400" />}
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              /* Notebook, Folder & Tags Stacked Dropdowns */
              <div className="space-y-2">
                {/* Notebook Dropdown */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-300">Notebook</label>
                    <button
                      onClick={() => setShowAddNotebookInput(!showAddNotebookInput)}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Create notebook</span>
                    </button>
                  </div>

                  {showAddNotebookInput ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="Notebook name..."
                        value={newNotebookName}
                        onChange={(e) => setNewNotebookName(e.target.value)}
                        className="flex-1 p-1.5 bg-[#121418] border border-slate-800 rounded-lg text-xs outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={handleCreateNewNotebook}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <select
                      value={selectedNotebookId}
                      onChange={(e) => handleSelectNotebook(e.target.value)}
                      className="w-full h-9 px-2.5 bg-[#121418] border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 outline-none focus:border-emerald-500"
                    >
                      <option value="">Choose notebook...</option>
                      {notebooks.map((nb) => (
                        <option key={nb.id} value={nb.id}>
                          📓 {nb.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Folder Dropdown */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-300">Folder</label>
                    <button
                      onClick={() => setShowAddFolderInput(!showAddFolderInput)}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Create folder</span>
                    </button>
                  </div>

                  {showAddFolderInput ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="Folder name..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="flex-1 p-1.5 bg-[#121418] border border-slate-800 rounded-lg text-xs outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={handleCreateNewFolder}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <select
                      value={selectedFolderId}
                      onChange={(e) => handleSelectFolder(e.target.value)}
                      className="w-full h-9 px-2.5 bg-[#121418] border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 outline-none focus:border-emerald-500"
                    >
                      <option value="">(Optional) Choose folder...</option>
                      {filteredFolders.map((f) => (
                        <option key={f.id} value={f.id}>
                          📁 {f.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Tags Picker */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-300">Tags</label>
                    <button
                      onClick={() => setShowAddTagInput(!showAddTagInput)}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Create tag</span>
                    </button>
                  </div>

                  {showAddTagInput ? (
                    <div className="flex items-center gap-1 mb-1">
                      <input
                        type="text"
                        placeholder="Tag name..."
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        className="flex-1 p-1.5 bg-[#121418] border border-slate-800 rounded-lg text-xs outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={handleCreateNewTag}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                      >
                        Add
                      </button>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1 bg-[#121418] border border-slate-800 rounded-lg">
                    {tags.map((t) => {
                      const isSel = selectedTagIds.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleTag(t.id)}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border transition-all flex items-center gap-1 ${
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
              </div>
            )}
          </div>

          {/* 5. TITLE AND NOTE FIELDS */}
          <div className="space-y-2">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Note title</label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full h-9 px-2.5 bg-[#171A21] border border-slate-800 rounded-xl font-bold text-xs text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-300">Add a note</label>
                <button
                  type="button"
                  onClick={() => window.open('https://notes.app.euclidprojects.org/', '_blank')}
                  className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                >
                  <span>Continue editing in Smart Notes</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <textarea
                rows={isNoteFocused || noteComment ? 3 : 1}
                onFocus={() => setIsNoteFocused(true)}
                placeholder="Add personal notes, summary or keywords..."
                value={noteComment}
                onChange={(e) => setNoteComment(e.target.value)}
                className="w-full p-2 bg-[#171A21] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* 6. ADVANCED OPTIONS (Collapsed Section) */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#171A21]">
            <button
              type="button"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="w-full px-3 py-2 text-xs font-bold text-slate-300 flex items-center justify-between hover:bg-slate-800/40 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Options</span>
              </span>
              {showAdvancedOptions ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {showAdvancedOptions && (
              <div className="p-3 pt-1 border-t border-slate-800 space-y-2 text-[11px] text-slate-300">
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
                    <span className="group-hover:text-white">{label}</span>
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

        {/* 7. PRIMARY SAVE ACTION (Sticky Bottom Action Area) */}
        <div className="p-3.5 bg-[#0F1115] border-t border-slate-800/90 space-y-2 shrink-0 shadow-2xl">
          {savedNoteId ? (
            /* Post-Completion State */
            <div className="space-y-2">
              <div className="bg-emerald-950/90 border border-emerald-500/60 p-2.5 rounded-xl text-center text-xs font-bold text-lime-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>Saved to Euclid Smart Notes</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                <button
                  onClick={() => onOpenSmartNotesNote(savedNoteId)}
                  className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all col-span-1"
                >
                  <span>Open Note</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={handleCopyLink}
                  className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center gap-1 transition-all"
                >
                  <Copy className="w-3 h-3 text-emerald-400" />
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>

                <button
                  onClick={handleUndo}
                  className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center justify-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3 h-3 text-amber-400" />
                  <span>Undo</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active Save Form State */
            <div className="space-y-2">
              {/* Primary Emerald-Green & Yellow Accent Save Button */}
              <button
                onClick={() => handlePrimarySave(false)}
                disabled={isSaving}
                className="w-full h-[46px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75 border border-lime-400/30"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-lime-300" />
                    <span className="text-lime-200 font-bold">{saveStepMessage || 'Preparing clip...'}</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5 text-yellow-300 fill-yellow-300/30" />
                    <span>Save to Euclid Smart Notes</span>
                  </>
                )}
              </button>

              {/* Secondary Actions */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 px-1">
                <button
                  onClick={() => handlePrimarySave(true)}
                  disabled={isSaving}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Save locally
                </button>
                <button
                  onClick={() => setNoteComment('')}
                  className="hover:text-slate-200 transition-colors"
                >
                  Clear form
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 8. COMPACT FOOTER */}
        <footer className="h-9 px-3 bg-[#0B0D0F] border-t border-slate-800/90 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-emerald-700 text-lime-300 font-bold text-[9px] flex items-center justify-center">
              E
            </div>
            <span className="truncate max-w-[120px] font-medium text-slate-300">euclid-projects</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-2 font-medium">
            <span className="text-emerald-400">Synced</span>
            <button
              onClick={() => alert('Euclid Smart Clipper Help & Guides')}
              className="text-slate-400 hover:text-white flex items-center gap-0.5"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Help</span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};
