import React, { useState, useEffect, useRef } from 'react';
import { AnnotationToolbar } from './annotation/AnnotationToolbar';
import { AnnotationToolId } from './annotation/annotationConfig';
import {
  Highlighter,
  Underline,
  Strikethrough,
  PenTool,
  Edit3,
  ArrowRight,
  Minus,
  Square,
  Circle,
  Type,
  StickyNote,
  MessageSquare,
  Hash,
  Crop,
  EyeOff,
  Eye,
  Eraser,
  Undo,
  Redo,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  RefreshCw,
  Copy,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Plus,
  Search,
  Move,
  BookOpen,
  Tag as TagIcon,
  Folder as FolderIcon,
  MapPin,
  Edit,
  Filter,
  Clock,
  AlertCircle,
  FileText,
  Bookmark,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  EuclidNote,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidAnnotation,
  AnnotationType,
} from '../types';
import { clippingService } from '../services/clippingService';

export interface AnnotationPanelProps {
  notebooks: EuclidNotebook[];
  folders: EuclidFolder[];
  tags: EuclidTag[];
  existingNotes: EuclidNote[];
  onSaveNote: (note: EuclidNote) => Promise<string | boolean>;
  onCreateNotebook: (name: string, color: string) => void;
  onCreateFolder: (name: string, notebookId: string) => void;
  onCreateTag: (name: string, color: string) => void;
  onOpenSmartNotesNote: (noteId: string) => void;
  isFloatingOverlay?: boolean;
  onClosePanel?: () => void;
  pageTitle?: string;
  pageUrl?: string;
  isUnsupportedPage?: boolean;
  hideHeaderAndSave?: boolean;
  hideDestinationControls?: boolean;
}

export const AnnotationPanel: React.FC<AnnotationPanelProps> = ({
  notebooks,
  folders,
  tags,
  existingNotes,
  onSaveNote,
  onCreateNotebook,
  onCreateFolder,
  onCreateTag,
  onOpenSmartNotesNote,
  isFloatingOverlay = false,
  onClosePanel,
  pageTitle: propPageTitle = 'Euclid — Father of Geometry & Axiomatic Systems',
  pageUrl: propPageUrl = 'https://en.wikipedia.org/wiki/Euclid',
  isUnsupportedPage = false,
  hideHeaderAndSave = false,
  hideDestinationControls = false,
}) => {
  // Floating Window Position & Collapse State
  const [panelPos, setPanelPos] = useState(() => {
    const saved = localStorage.getItem('euclid_annotation_panel_pos');
    return saved ? JSON.parse(saved) : { top: 20, right: 20 };
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; top: number; right: number }>({ x: 0, y: 0, top: 20, right: 20 });

  // Page Context & Title
  const [pageTitle, setPageTitle] = useState(propPageTitle);
  const [pageUrl, setPageUrl] = useState(propPageUrl);

  // Active Tool state (out of 23 tools/controls)
  const [activeTool, setActiveTool] = useState<AnnotationToolId>('highlight');

  // Annotation Visibility State
  const [areAnnotationsVisible, setAreAnnotationsVisible] = useState(true);

  // Colors
  const [selectedColor, setSelectedColor] = useState(() => {
    return localStorage.getItem('euclid_last_color') || '#FDE047'; // Yellow
  });

  const highlightColors = [
    { name: 'Yellow', hex: '#FDE047', label: 'Classic Yellow' },
    { name: 'Green', hex: '#4ADE80', label: 'Emerald Green' },
    { name: 'Blue', hex: '#60A5FA', label: 'Ocean Blue' },
    { name: 'Red', hex: '#F87171', label: 'Crimson Red' },
    { name: 'Purple', hex: '#C084FC', label: 'Royal Purple' },
    { name: 'Orange', hex: '#FB923C', label: 'Amber Orange' },
  ];

  // Annotations List State
  const [annotations, setAnnotations] = useState<EuclidAnnotation[]>([
    {
      id: 'ann-1',
      userId: 'local-user',
      noteId: 'pending',
      type: 'highlight',
      color: '#FDE047',
      selectedText: 'Euclid of Alexandria was a Greek mathematician, often referred to as the father of geometry.',
      comment: 'Key historical definition to cite in chapter 2',
      createdAt: new Date(Date.now() - 300000).toISOString(),
      updatedAt: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: 'ann-2',
      userId: 'local-user',
      noteId: 'pending',
      type: 'comment',
      color: '#4ADE80',
      text: 'Question regarding five core postulates',
      comment: 'Check parallel postulate relationship to non-Euclidean geometries.',
      createdAt: new Date(Date.now() - 120000).toISOString(),
      updatedAt: new Date(Date.now() - 120000).toISOString(),
    },
  ]);

  const [annotationFilter, setAnnotationFilter] = useState<
    'all' | 'highlights' | 'comments' | 'drawings' | 'shapes' | 'text_notes' | 'tasks' | 'questions'
  >('all');

  // Add Remark State
  const [userRemark, setUserRemark] = useState('');
  const [isRemarkFocused, setIsRemarkFocused] = useState(false);

  // Destination Controls State
  const [destMode, setDestMode] = useState<'create_new' | 'add_to_existing'>('create_new');
  const [selectedNotebookId, setSelectedNotebookId] = useState<string>(
    localStorage.getItem('euclid_last_notebook') || notebooks[0]?.id || 'nb-1'
  );
  const [selectedFolderId, setSelectedFolderId] = useState<string>(
    localStorage.getItem('euclid_last_folder') || ''
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(['tag-web', 'tag-article']);
  const [noteTitle, setNoteTitle] = useState(pageTitle);
  const [targetNoteId, setTargetNoteId] = useState('');
  const [targetNoteSearch, setTargetNoteSearch] = useState('');

  // Inline Creation Input Toggles
  const [showNewNotebookInput, setShowNewNotebookInput] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // Save Progress State
  const [isSaving, setIsSaving] = useState(false);
  const [saveStepMessage, setSaveStepMessage] = useState('');
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Remember color when changed
  const handleSelectColor = (hex: string) => {
    setSelectedColor(hex);
    localStorage.setItem('euclid_last_color', hex);
  };

  // Draggable Header Handlers
  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if (!isFloatingOverlay) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      top: panelPos.top,
      right: panelPos.right,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      const newTop = Math.max(10, Math.min(window.innerHeight - 100, dragStartRef.current.top + deltaY));
      const newRight = Math.max(10, Math.min(window.innerWidth - 300, dragStartRef.current.right - deltaX));
      
      const newPos = { top: newTop, right: newRight };
      setPanelPos(newPos);
      localStorage.setItem('euclid_annotation_panel_pos', JSON.stringify(newPos));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Handle Locate on Page
  const handleLocateAnnotation = (ann: EuclidAnnotation) => {
    if (typeof window !== 'undefined') {
      window.postMessage({ type: 'EUCLID_LOCATE_ANNOTATION', annotationId: ann.id }, '*');
    }
  };

  // Handle Delete Annotation
  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter((a) => a.id !== id));
  };

  // Toggle Tag
  const toggleTag = (id: string) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter((t) => t !== id));
    } else {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };

  // Inline Creation Handlers
  const handleCreateNotebook = () => {
    if (newNotebookName.trim()) {
      onCreateNotebook(newNotebookName.trim(), '#10b981');
      setNewNotebookName('');
      setShowNewNotebookInput(false);
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim() && selectedNotebookId) {
      onCreateFolder(newFolderName.trim(), selectedNotebookId);
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim(), '#84cc16');
      setNewTagName('');
      setShowNewTagInput(false);
    }
  };

  // MAIN SAVE CLIP ACTION
  const handleSaveClip = async (saveOption: 'cloud' | 'local_only' = 'cloud') => {
    if (isUnsupportedPage) {
      setSaveError('This page cannot be saved because Chrome restricts access to it.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSavedNoteId(null);

    const steps = [
      'Preparing clip…',
      'Collecting annotations…',
      'Extracting page content…',
      saveOption === 'local_only' ? 'Saving locally…' : 'Uploading assets…',
      'Creating Smart Notes note…',
      'Synchronizing annotations…',
      'Clip saved',
    ];

    for (let i = 0; i < steps.length; i++) {
      setSaveStepMessage(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 280));
    }

    try {
      const selectedTagNames = tags.filter((t) => selectedTagIds.includes(t.id)).map((t) => t.name);
      const newNoteId = 'note_clip_' + Date.now();

      const extractedArticle = clippingService.extractSimplifiedArticle(
        `<div><h1>${noteTitle}</h1><p>${userRemark}</p>${annotations.map((a) => `<p>${a.selectedText || a.text || ''}</p>`).join('')}</div>`,
        pageUrl,
        noteTitle
      );

      const noteToSave: EuclidNote = {
        id: newNoteId,
        user_id: 'local-user',
        title: noteTitle || pageTitle,
        content: extractedArticle.cleanHtml || `<p>${userRemark}</p>`,
        plainTextContent: (userRemark ? userRemark + '\n\n' : '') + annotations.map((a) => a.selectedText || a.text || '').join('\n'),
        markdownContent: (userRemark ? `# Remark\n${userRemark}\n\n` : '') + extractedArticle.markdown,
        notebook_id: selectedNotebookId,
        folder_id: selectedFolderId || null,
        tags: selectedTagNames,
        noteType: 'web_clip',
        sourceUrl: pageUrl,
        canonicalUrl: pageUrl,
        sourceTitle: pageTitle,
        sourceDomain: new URL(pageUrl || 'https://notes.app.euclidprojects.org').hostname,
        clipFormat: 'webpage_annotation',
        annotations: annotations,
        wordCount: extractedArticle.wordCount || 120,
        readingTime: 1,
        extensionCreated: true,
        extensionVersion: '1.0.0',
        syncStatus: saveOption === 'local_only' ? 'queued' : 'synced',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSaveNote(noteToSave);
      setIsSaving(false);
      setSavedNoteId(newNoteId);
    } catch (err: any) {
      setIsSaving(false);
      setSaveError(err?.message || 'Failed to save clip to Euclid Smart Notes.');
    }
  };

  const handleCopyNoteLink = () => {
    if (savedNoteId) {
      navigator.clipboard.writeText(`https://notes.app.euclidprojects.org/note/${savedNoteId}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleContinueAnnotating = () => {
    setSavedNoteId(null);
    setSaveStepMessage('');
  };

  const handleUndoSave = () => {
    setSavedNoteId(null);
    setSaveStepMessage('');
  };

  // Filtered Annotations
  const filteredAnnotations = annotations.filter((ann) => {
    if (annotationFilter === 'all') return true;
    if (annotationFilter === 'highlights') return ann.type === 'highlight' || ann.type === 'underline' || ann.type === 'strikethrough';
    if (annotationFilter === 'comments') return ann.type === 'comment' || ann.type === 'sticky_note';
    if (annotationFilter === 'drawings') return ann.type === 'freehand';
    if (annotationFilter === 'shapes') return ann.type === 'rectangle' || ann.type === 'circle' || ann.type === 'arrow' || ann.type === 'line';
    if (annotationFilter === 'text_notes') return ann.type === 'text_box';
    return true;
  });

  const filteredFolders = folders.filter((f) => !f.notebookId || f.notebookId === selectedNotebookId);

  return (
    <div
      className={`euclid-annotation-panel ${
        isFloatingOverlay
          ? 'fixed z-[999999] shadow-2xl rounded-2xl border border-emerald-700/80 bg-[#0c1319] text-slate-100 overflow-hidden select-none w-[370px]'
          : 'w-full bg-[#0c1319] text-slate-100 border border-slate-800 rounded-2xl overflow-hidden shadow-lg'
      }`}
      style={
        isFloatingOverlay
          ? {
              top: `${panelPos.top}px`,
              right: `${panelPos.right}px`,
              maxHeight: 'calc(100vh - 40px)',
            }
          : undefined
      }
    >
      {/* 1. HEADER (Dark Green / Emerald Header with Yellow Accents) */}
      {!hideHeaderAndSave && isFloatingOverlay && (
        <div
          onMouseDown={handleMouseDownHeader}
          className="px-4 py-3 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-700/70 flex items-center justify-between cursor-move shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 border border-amber-300/80 shadow-[0_0_10px_rgba(251,191,36,0.3)] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-[15px] text-white tracking-tight flex items-center gap-1.5 leading-tight">
                <span>Euclid Smart Clipper</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#facc15]" />
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isFloatingOverlay && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors"
                title={isCollapsed ? 'Expand Panel' : 'Collapse Panel'}
              >
                {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            )}
            {onClosePanel && (
              <button
                onClick={onClosePanel}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors"
                title="Close Annotation Panel"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div className="flex flex-col max-h-[calc(100vh-100px)] overflow-y-auto divide-y divide-slate-800/80">
          
          {/* 2. STICKY TOP MAIN SAVE CLIP BUTTON (Emerald-green background, white text, yellow save icon, 48px height) */}
          {!hideHeaderAndSave && (
            <div className="sticky top-0 z-20 p-3.5 bg-[#0a1015]/95 backdrop-blur-md border-b border-emerald-800/50 space-y-2 shrink-0">
              {savedNoteId ? (
                /* Success State Display */
                <div className="space-y-2">
                  <div className="bg-emerald-950/90 border border-emerald-500/80 p-3 rounded-xl text-center font-extrabold text-[14px] text-amber-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>Clip Saved to Smart Notes</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[12px] font-bold">
                    <button
                      onClick={() => onOpenSmartNotesNote(savedNoteId)}
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all col-span-1"
                    >
                      <span>Open Note</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleCopyNoteLink}
                      className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all col-span-1"
                    >
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>

                    <button
                      onClick={handleContinueAnnotating}
                      className="py-2 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center justify-center gap-1 transition-all col-span-1 text-[11px]"
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Continue Annotating</span>
                    </button>

                    <button
                      onClick={handleUndoSave}
                      className="py-2 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center justify-center gap-1 transition-all col-span-1 text-[11px]"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Undo Save</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Active Save Clip Button */
                <div>
                  <button
                    type="button"
                    onClick={() => handleSaveClip('cloud')}
                    disabled={isSaving || isUnsupportedPage}
                    className="w-full h-[48px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-[15px] rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-amber-300/40 flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {isSaving ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4.5 h-4.5 animate-spin text-amber-300" />
                        <span className="text-amber-200 font-bold">{saveStepMessage || 'Preparing clip…'}</span>
                      </div>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300/40" />
                        <span>Save Clip</span>
                      </>
                    )}
                  </button>

                  {saveError && (
                    <div className="mt-2 p-2 bg-red-950/80 border border-red-500/60 rounded-xl text-[11px] text-red-200 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{saveError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* UNSUPPORTED PAGE NOTICE */}
          {isUnsupportedPage && (
            <div className="p-3 bg-amber-950/70 border-b border-amber-600/50 text-[12px] text-amber-200 font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>This page cannot be annotated because Chrome does not allow extensions to access it.</span>
            </div>
          )}

          {/* 3. ANNOTATION TOOLBAR (Grouped & Reorganized) */}
          <div className="p-2.5 bg-[#0d151c]">
            <AnnotationToolbar
              activeTool={activeTool}
              onSelectTool={(toolId) => setActiveTool(toolId)}
              areAnnotationsVisible={areAnnotationsVisible}
              onToggleVisibility={(vis) => setAreAnnotationsVisible(vis)}
              onUndo={() => alert('Undo last annotation stroke')}
              onRedo={() => alert('Redo annotation stroke')}
              onDeleteSelected={() => {
                if (annotations.length > 0) {
                  handleDeleteAnnotation(annotations[0].id);
                }
              }}
              onExitMode={() => setActiveTool('none')}
              selectedColor={selectedColor}
              onSelectColor={handleSelectColor}
              annotationsCount={annotations.length}
            />
          </div>

          {/* 5. ADD REMARK & COMMENT FIELD */}
          <div className="p-3 space-y-2 bg-[#0c1319]">
            <label className="text-[12px] font-bold text-emerald-300 block">Add remark</label>
            <textarea
              rows={isRemarkFocused || userRemark.length > 0 ? 3 : 1}
              placeholder="Add remark, citation note, question or summary..."
              value={userRemark}
              onFocus={() => setIsRemarkFocused(true)}
              onChange={(e) => setUserRemark(e.target.value)}
              className="w-full p-2.5 bg-[#060a0e] border border-slate-800 rounded-xl text-[13px] text-slate-200 placeholder:text-slate-500 outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          {/* 6. ANNOTATION LIST WITH FILTERS & LOCATE BUTTON */}
          <div className="p-3 space-y-2 bg-[#0a1015]">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                <span>Annotations ({filteredAnnotations.length})</span>
              </span>

              {/* Filter Dropdown */}
              <select
                value={annotationFilter}
                onChange={(e: any) => setAnnotationFilter(e.target.value)}
                className="bg-[#060a0e] border border-slate-800 rounded-lg text-[11px] font-semibold text-slate-300 px-2 py-1 outline-none"
              >
                <option value="all">All Types</option>
                <option value="highlights">Highlights</option>
                <option value="comments">Comments</option>
                <option value="drawings">Drawings</option>
                <option value="shapes">Shapes</option>
              </select>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredAnnotations.length === 0 ? (
                <p className="text-[11px] text-slate-500 italic p-3 text-center bg-[#060a0e] rounded-xl border border-slate-800">
                  No annotations created on this page yet. Highlight text or draw to begin.
                </p>
              ) : (
                filteredAnnotations.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-2.5 bg-[#060a0e] border border-slate-800/80 rounded-xl text-[12px] space-y-1.5 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                          style={{ backgroundColor: ann.color }}
                        />
                        <span className="font-bold text-slate-200 uppercase text-[10px] tracking-wider">
                          {ann.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px]">
                        <button
                          onClick={() => handleLocateAnnotation(ann)}
                          className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/50 hover:bg-emerald-800 flex items-center gap-1 font-semibold"
                          title="Locate and emphasize on page"
                        >
                          <MapPin className="w-3 h-3 text-amber-300" />
                          <span>Locate</span>
                        </button>
                        <button
                          onClick={() => handleDeleteAnnotation(ann.id)}
                          className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800"
                          title="Delete annotation"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {ann.selectedText && (
                      <p className="text-slate-300 italic border-l-2 border-amber-300 pl-2 text-[12px] line-clamp-2">
                        "{ann.selectedText}"
                      </p>
                    )}

                    {ann.comment && (
                      <p className="text-emerald-300/90 text-[11px] font-medium">
                        💬 {ann.comment}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 7. DESTINATION CONTROLS (Notebook, Folder, Tags, Note Title) */}
          {!hideDestinationControls && (
            <div className="p-3 space-y-3 bg-[#0d151c]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Destination Controls</span>
                </span>

                <div className="flex items-center gap-1 bg-[#060a0e] p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
                  <button
                    onClick={() => setDestMode('create_new')}
                    className={`px-2 py-0.5 rounded ${destMode === 'create_new' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                  >
                    New Note
                  </button>
                  <button
                    onClick={() => setDestMode('add_to_existing')}
                    className={`px-2 py-0.5 rounded ${destMode === 'add_to_existing' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                  >
                    Existing Note
                  </button>
                </div>
              </div>

              {destMode === 'add_to_existing' ? (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    placeholder="Search existing notes..."
                    value={targetNoteSearch}
                    onChange={(e) => setTargetNoteSearch(e.target.value)}
                    className="w-full h-8 px-2.5 bg-[#060a0e] border border-slate-800 rounded-lg text-[12px] text-slate-200 outline-none focus:border-emerald-500"
                  />
                  <div className="max-h-24 overflow-y-auto space-y-1 rounded-lg border border-slate-800 p-1 bg-[#060a0e]">
                    {existingNotes
                      .filter((n) => n.title.toLowerCase().includes(targetNoteSearch.toLowerCase()))
                      .map((n) => (
                        <button
                          key={n.id}
                          onClick={() => setTargetNoteId(n.id)}
                          className={`w-full text-left px-2 py-1 rounded text-[11px] truncate ${
                            targetNoteId === n.id ? 'bg-emerald-950 text-amber-300 font-bold' : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          {n.title}
                        </button>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {/* Note Title */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-0.5">Note Title</label>
                    <input
                      type="text"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      className="w-full h-8 px-2.5 bg-[#060a0e] border border-slate-800 rounded-lg text-[12px] text-slate-100 font-bold outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Notebook Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <label className="text-[11px] font-bold text-slate-400">Notebook</label>
                      <button
                        onClick={() => setShowNewNotebookInput(!showNewNotebookInput)}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Create</span>
                      </button>
                    </div>

                    {showNewNotebookInput ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="New notebook name..."
                          value={newNotebookName}
                          onChange={(e) => setNewNotebookName(e.target.value)}
                          className="flex-1 h-7 px-2 bg-[#060a0e] border border-slate-800 rounded text-[11px]"
                        />
                        <button
                          onClick={handleCreateNotebook}
                          className="px-2 h-7 bg-emerald-600 text-white rounded font-bold text-[11px]"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <select
                        value={selectedNotebookId}
                        onChange={(e) => {
                          setSelectedNotebookId(e.target.value);
                          localStorage.setItem('euclid_last_notebook', e.target.value);
                        }}
                        className="w-full h-8 px-2.5 bg-[#060a0e] border border-slate-800 rounded-lg text-[12px] text-slate-200 outline-none focus:border-emerald-500 font-semibold"
                      >
                        {notebooks.map((nb) => (
                          <option key={nb.id} value={nb.id}>
                            📓 {nb.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Folder Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <label className="text-[11px] font-bold text-slate-400">Folder</label>
                      <button
                        onClick={() => setShowNewFolderInput(!showNewFolderInput)}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Create</span>
                      </button>
                    </div>

                    {showNewFolderInput ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="New folder name..."
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          className="flex-1 h-7 px-2 bg-[#060a0e] border border-slate-800 rounded text-[11px]"
                        />
                        <button
                          onClick={handleCreateFolder}
                          className="px-2 h-7 bg-emerald-600 text-white rounded font-bold text-[11px]"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <select
                        value={selectedFolderId}
                        onChange={(e) => {
                          setSelectedFolderId(e.target.value);
                          localStorage.setItem('euclid_last_folder', e.target.value);
                        }}
                        className="w-full h-8 px-2.5 bg-[#060a0e] border border-slate-800 rounded-lg text-[12px] text-slate-200 outline-none focus:border-emerald-500"
                      >
                        <option value="">(Optional) Folder...</option>
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
                    <div className="flex items-center justify-between mb-0.5">
                      <label className="text-[11px] font-bold text-slate-400">Tags</label>
                      <button
                        onClick={() => setShowNewTagInput(!showNewTagInput)}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Create</span>
                      </button>
                    </div>

                    {showNewTagInput && (
                      <div className="flex items-center gap-1 mb-1.5">
                        <input
                          type="text"
                          placeholder="New tag name..."
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          className="flex-1 h-7 px-2 bg-[#060a0e] border border-slate-800 rounded text-[11px]"
                        />
                        <button
                          onClick={handleCreateTag}
                          className="px-2 h-7 bg-emerald-600 text-white rounded font-bold text-[11px]"
                        >
                          Add
                        </button>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 p-1.5 bg-[#060a0e] border border-slate-800 rounded-lg max-h-20 overflow-y-auto">
                      {tags.map((t) => {
                        const isSel = selectedTagIds.includes(t.id);
                        return (
                          <button
                            key={t.id}
                            onClick={() => toggleTag(t.id)}
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border transition-all flex items-center gap-0.5 ${
                              isSel
                                ? 'bg-emerald-500/20 text-amber-300 border-emerald-500/50'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                            }`}
                          >
                            <span>#{t.name}</span>
                            {isSel && <X className="w-2.5 h-2.5 text-amber-300" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
