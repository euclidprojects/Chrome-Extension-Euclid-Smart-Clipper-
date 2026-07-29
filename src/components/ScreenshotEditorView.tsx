import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Camera,
  RotateCcw,
  Download,
  Copy,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Plus,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
  Crop,
  Video,
  Sliders,
  Palette,
  Type,
  FileText,
  Check,
  Trash2,
  Undo,
  Redo,
  Info,
  Tag as TagIcon,
  Folder as FolderIcon,
  Maximize,
  HelpCircle,
  Clock,
  Globe,
  FileCheck,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  CaptureJob,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidNote,
  EuclidAnnotation,
} from '../types';
import { auth } from '../lib/firebase';
import { firebaseSyncService, SaveScreenshotParams } from '../services/firebaseService';
import { AnnotationToolbar } from './annotation/AnnotationToolbar';
import {
  AnnotationToolId,
  ALL_ANNOTATION_TOOLS,
  PRESET_COLORS,
} from './annotation/annotationConfig';

interface ScreenshotEditorViewProps {
  job: CaptureJob;
  notebooks: EuclidNotebook[];
  folders: EuclidFolder[];
  tags: EuclidTag[];
  existingNotes: EuclidNote[];
  onSaveNote: (note: EuclidNote) => Promise<string | boolean>;
  onCreateNotebook: (name: string, color: string) => void;
  onCreateFolder: (name: string, notebookId: string) => void;
  onCreateTag: (name: string, color: string) => void;
  onOpenSmartNotesNote: (noteId: string) => void;
  onRetake?: () => void;
}

export const ScreenshotEditorView: React.FC<ScreenshotEditorViewProps> = ({
  job,
  notebooks,
  folders,
  tags,
  existingNotes,
  onSaveNote,
  onCreateNotebook,
  onCreateFolder,
  onCreateTag,
  onOpenSmartNotesNote,
  onRetake,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Loaded Image & Image Readiness
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 1280, height: 720 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFitToScreen, setIsFitToScreen] = useState(true);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Collapsible Side Panels
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);

  // Active Tool & Contextual Settings
  const [activeTool, setActiveTool] = useState<AnnotationToolId>('highlight');
  const [selectedColor, setSelectedColor] = useState('#FDE047');
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [fontSize, setFontSize] = useState<number>(14);
  const [opacity, setOpacity] = useState<number>(0.8);
  const [privacyStrength, setPrivacyStrength] = useState<'low' | 'medium' | 'high'>('medium');
  const [areAnnotationsVisible, setAreAnnotationsVisible] = useState(true);

  // Drawing & History state
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [annotations, setAnnotations] = useState<EuclidAnnotation[]>(job.annotations || []);
  const [history, setHistory] = useState<EuclidAnnotation[][]>([job.annotations || []]);
  const [historyIdx, setHistoryIdx] = useState(0);

  // Destination & Form State
  const [noteTitle, setNoteTitle] = useState(job.sourceTitle || 'Captured Screenshot');
  const [userRemark, setUserRemark] = useState(job.userRemark || '');
  const [selectedNotebookId, setSelectedNotebookId] = useState<string>(
    job.notebookId || localStorage.getItem('euclid_last_notebook') || notebooks[0]?.id || ''
  );
  const [selectedFolderId, setSelectedFolderId] = useState<string>(
    job.folderId || localStorage.getItem('euclid_last_folder') || ''
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(job.tagIds || ['tag-web']);
  const [destMode, setDestMode] = useState<'create_new' | 'add_to_existing'>('create_new');
  const [targetNoteId, setTargetNoteId] = useState('');

  // Inline Creation State
  const [showNewNotebookInput, setShowNewNotebookInput] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // Save Progress
  const [isSaving, setIsSaving] = useState(false);
  const [saveStepMessage, setSaveStepMessage] = useState('');
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load screenshot image and process crops if selectionRect exists
  useEffect(() => {
    if (!job.dataUrl) return;

    setIsImageLoaded(false);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // If selectionRect is provided and valid, crop the selection area
      if (job.selectionRect && job.selectionRect.width > 10 && job.selectionRect.height > 10 && !job.cropData) {
        const cropCanvas = document.createElement('canvas');
        const rect = job.selectionRect;
        const dpr = rect.devicePixelRatio || window.devicePixelRatio || 1;

        const sx = rect.viewportX !== undefined ? rect.viewportX * dpr : rect.x;
        const sy = rect.viewportY !== undefined ? rect.viewportY * dpr : rect.y;
        const sw = rect.viewportWidth !== undefined ? rect.viewportWidth * dpr : rect.width;
        const sh = rect.viewportHeight !== undefined ? rect.viewportHeight * dpr : rect.height;

        cropCanvas.width = sw;
        cropCanvas.height = sh;

        const ctx = cropCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
          const croppedImg = new Image();
          croppedImg.onload = () => {
            setImageObj(croppedImg);
            setImgDimensions({ width: Math.round(sw), height: Math.round(sh) });
            setIsImageLoaded(true);
          };
          croppedImg.src = cropCanvas.toDataURL('image/png');
          return;
        }
      }

      setImageObj(img);
      setImgDimensions({ width: img.naturalWidth || 1280, height: img.naturalHeight || 720 });
      setIsImageLoaded(true);
    };
    img.src = job.dataUrl;
  }, [job.dataUrl, job.selectionRect]);

  // Fit to screen calculation based on viewport dimensions
  const handleFitToScreen = useCallback(() => {
    if (!containerRef.current || !imgDimensions.width || !imgDimensions.height) return;
    const cw = containerRef.current.clientWidth - 64;
    const ch = containerRef.current.clientHeight - 64;
    if (cw > 0 && ch > 0) {
      const scaleX = cw / imgDimensions.width;
      const scaleY = ch / imgDimensions.height;
      const fitScale = Math.min(scaleX, scaleY, 1.0);
      setZoomLevel(Math.max(0.1, Math.min(fitScale, 5.0)));
      setPanOffset({ x: 0, y: 0 });
      setIsFitToScreen(true);
    }
  }, [imgDimensions]);

  // Auto-fit on initial load & container resize
  useEffect(() => {
    if (isImageLoaded) {
      handleFitToScreen();
    }
  }, [isImageLoaded, handleFitToScreen]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (isFitToScreen) {
        handleFitToScreen();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isFitToScreen, handleFitToScreen]);

  // Handle Wheel Zoom (Ctrl/Cmd + Wheel)
  useEffect(() => {
    const viewport = containerRef.current;
    if (!viewport) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        setZoomLevel((prev) => Math.max(0.1, Math.min(5.0, prev * zoomFactor)));
        setIsFitToScreen(false);
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, []);

  // Redraw Canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imgDimensions.width;
    canvas.height = imgDimensions.height;

    // Draw background image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

    if (!areAnnotationsVisible) return;

    // Draw annotations
    annotations.forEach((ann) => {
      ctx.save();
      if (ann.type === 'highlight') {
        ctx.fillStyle = ann.color || '#FDE047';
        ctx.globalAlpha = opacity;
        if (ann.shapeData) {
          ctx.fillRect(ann.shapeData.x, ann.shapeData.y, ann.shapeData.w, ann.shapeData.h);
        }
      } else if (ann.type === 'rectangle') {
        ctx.strokeStyle = ann.color || '#FDE047';
        ctx.lineWidth = strokeWidth;
        if (ann.shapeData) {
          ctx.strokeRect(ann.shapeData.x, ann.shapeData.y, ann.shapeData.w, ann.shapeData.h);
        }
      } else if (ann.type === 'circle') {
        ctx.strokeStyle = ann.color || '#FDE047';
        ctx.lineWidth = strokeWidth;
        if (ann.shapeData) {
          ctx.beginPath();
          ctx.ellipse(
            ann.shapeData.x + ann.shapeData.w / 2,
            ann.shapeData.y + ann.shapeData.h / 2,
            Math.abs(ann.shapeData.w / 2),
            Math.abs(ann.shapeData.h / 2),
            0,
            0,
            2 * Math.PI
          );
          ctx.stroke();
        }
      } else if (ann.type === 'arrow' || ann.type === 'line') {
        ctx.strokeStyle = ann.color || '#FDE047';
        ctx.lineWidth = strokeWidth;
        if (ann.shapeData) {
          ctx.beginPath();
          ctx.moveTo(ann.shapeData.x, ann.shapeData.y);
          ctx.lineTo(ann.shapeData.x + ann.shapeData.w, ann.shapeData.y + ann.shapeData.h);
          ctx.stroke();
        }
      } else if (ann.type === 'blur') {
        if (ann.shapeData) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(ann.shapeData.x, ann.shapeData.y, ann.shapeData.w, ann.shapeData.h);
        }
      } else if (ann.type === 'freehand' && ann.points && ann.points.length > 1) {
        ctx.strokeStyle = ann.color || '#FDE047';
        ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.moveTo(ann.points[0].x, ann.points[0].y);
        for (let i = 1; i < ann.points.length; i++) {
          ctx.lineTo(ann.points[i].x, ann.points[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    });
  }, [imageObj, imgDimensions, annotations, areAnnotationsVisible, opacity, strokeWidth]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Add Annotation to state and history
  const addAnnotation = (newAnn: EuclidAnnotation) => {
    const updated = [...annotations, newAnn];
    setAnnotations(updated);
    const newHist = history.slice(0, historyIdx + 1);
    newHist.push(updated);
    setHistory(newHist);
    setHistoryIdx(newHist.length - 1);
  };

  // Mouse / Drawing Events on Canvas
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDrawing(true);
    setStartPos({ x, y });
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const endX = (e.clientX - rect.left) * scaleX;
    const endY = (e.clientY - rect.top) * scaleY;

    const width = endX - startPos.x;
    const height = endY - startPos.y;

    if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

    let type: any = 'rectangle';
    if (activeTool === 'highlight') type = 'highlight';
    if (activeTool === 'circle') type = 'circle';
    if (activeTool === 'arrow') type = 'arrow';
    if (activeTool === 'blur') type = 'blur';

    const newAnn: EuclidAnnotation = {
      id: 'ann_' + Date.now(),
      userId: 'local-user',
      noteId: job.id,
      type,
      color: selectedColor,
      shapeData: { x: startPos.x, y: startPos.y, w: width, h: height },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addAnnotation(newAnn);
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIdx > 0) {
      const prevIdx = historyIdx - 1;
      setHistoryIdx(prevIdx);
      setAnnotations(history[prevIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const nextIdx = historyIdx + 1;
      setHistoryIdx(nextIdx);
      setAnnotations(history[nextIdx]);
    }
  };

  // Download / Copy
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Euclid_Screenshot_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopyImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        alert('Annotated screenshot copied to clipboard!');
      }
    });
  };

  // Primary Save Action Handler
  const handleSaveClip = async () => {
    if (isSaving) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveStepMessage('Uploading screenshot…');

    try {
      if (auth?.authStateReady) {
        await auth.authStateReady();
      }
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Please sign in before saving to Smart Notes.');
      }

      console.log('[Smart Notes] Save started');
      console.log(`[Smart Notes] Authenticated user: ${user.uid}`);

      const canvas = canvasRef.current;
      const annotatedDataUrl = canvas ? canvas.toDataURL('image/png') : job.dataUrl;
      const selectedTagNames = tags.filter((t) => selectedTagIds.includes(t.id)).map((t) => t.name);

      const savePayload: SaveScreenshotParams = {
        screenshotDataUrl: annotatedDataUrl,
        title: noteTitle || job.sourceTitle || 'Captured Screenshot',
        sourceUrl: job.sourceUrl,
        sourceTitle: job.sourceTitle,
        notebookId: selectedNotebookId,
        folderId: selectedFolderId || null,
        tags: selectedTagNames,
        userRemark: userRemark,
        annotations: annotations,
        capturedAt: new Date(job.createdAt || Date.now()).toISOString(),
      };

      const response = await firebaseSyncService.saveScreenshotToSmartNotes(savePayload);

      if (!response.success || !response.noteId) {
        throw new Error(response.error || 'Failed to save screenshot to Euclid Smart Notes.');
      }

      console.log('[Smart Notes] Save completed:', response);
      setSaveStepMessage('Saved to Smart Notes');
      setSavedNoteId(response.noteId);

      if (onSaveNote) {
        try {
          const localNote: EuclidNote = {
            id: response.noteId,
            user_id: user.uid,
            title: savePayload.title || 'Captured Screenshot',
            content: userRemark || '',
            plainTextContent: userRemark || '',
            markdownContent: userRemark || '',
            noteType: 'annotated_screenshot',
            sourceUrl: job.sourceUrl,
            sourceTitle: job.sourceTitle,
            clipFormat: 'screenshot',
            syncStatus: 'synced',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          await onSaveNote(localNote);
        } catch (e) {
          console.warn('[Smart Notes] Parent note update callback:', e);
        }
      }
    } catch (err: any) {
      console.error('[Smart Notes] Screenshot save failed:', {
        code: err?.code,
        message: err?.message,
        stack: err?.stack,
      });

      if (err?.code === 'permission-denied') {
        setSaveStepMessage('Permission denied');
        setSaveError('Firebase denied permission to save this note.');
      } else if (
        err instanceof ReferenceError &&
        err.message.includes('XMLHttpRequest')
      ) {
        setSaveStepMessage('Firebase context error');
        setSaveError('Firebase is running in an unsupported extension context.');
      } else {
        setSaveStepMessage('Save failed');
        setSaveError(err?.message || 'The screenshot could not be saved.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const getJobModeBadge = () => {
    switch (job.type) {
      case 'selected_area': return 'Selected Area';
      case 'visible_page': return 'Visible Page';
      case 'full_page': return 'Full Page';
      case 'video_frame': return 'Video Frame';
      case 'element': return 'Element Capture';
      default: return 'Screenshot';
    }
  };

  const currentToolDef = ALL_ANNOTATION_TOOLS.find((t) => t.id === activeTool);
  const filteredFolders = folders.filter((f) => !f.notebookId || f.notebookId === selectedNotebookId);

  return (
    <div className="screenshot-editor w-screen h-screen bg-[#0A0D12] text-slate-100 overflow-hidden font-sans select-none grid grid-rows-[auto_auto_minmax(0,1fr)_auto]">
      
      {/* ROW 1: COMPACT FULL-WIDTH HEADER */}
      <header className="h-[52px] px-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-700/60 flex items-center justify-between shrink-0 shadow-xl z-30 min-w-0">
        <div className="flex items-center gap-3 min-w-0 flex-1 editor-source-info">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 border border-amber-300/60 shadow-[0_0_12px_rgba(251,191,36,0.3)] flex items-center justify-center shrink-0">
            <Sparkles className="w-4.5 h-4.5 text-amber-300" />
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-extrabold text-[12px] text-amber-300 uppercase tracking-wider shrink-0 hidden sm:inline">
                Screenshot Editor
              </span>
              <span className="text-slate-500 shrink-0 hidden sm:inline">•</span>
              <h1 className="editor-source-title font-extrabold text-[13px] text-white tracking-tight truncate" title={job.sourceTitle || 'Captured Screenshot'}>
                {job.sourceTitle || 'Captured Screenshot'}
              </h1>
              
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider shrink-0 shadow-sm" title={`Capture Mode: ${getJobModeBadge()}`}>
                {getJobModeBadge()}
              </span>

              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900/80 text-emerald-300 border border-emerald-500/40 shrink-0">
                {imgDimensions.width} × {imgDimensions.height} px
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-300/90 font-mono min-w-0">
              <span className="editor-source-url truncate" title={job.sourceUrl}>{job.sourceUrl || 'https://notes.app.euclidprojects.org'}</span>
              <span className="shrink-0 text-emerald-600">•</span>
              <span className="shrink-0 text-slate-400">{new Date(job.createdAt || Date.now()).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Header Right Controls */}
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Unsaved</span>
          </div>

          <button
            type="button"
            onClick={() => window.close()}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
            title="Close Editor Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ROW 2: ANNOTATION TOOLBAR */}
      <div className="px-3 py-1.5 bg-[#0D121A] border-b border-slate-800/80 z-20 shrink-0">
        <AnnotationToolbar
          activeTool={activeTool}
          onSelectTool={(t) => setActiveTool(t)}
          areAnnotationsVisible={areAnnotationsVisible}
          onToggleVisibility={(v) => setAreAnnotationsVisible(v)}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onDeleteSelected={() => setAnnotations([])}
          onExitMode={() => setActiveTool('none')}
          selectedColor={selectedColor}
          onSelectColor={(c) => setSelectedColor(c)}
          annotationsCount={annotations.length}
          onClearAll={() => setAnnotations([])}
          onResetZoom={handleFitToScreen}
        />
      </div>

      {/* ROW 3: MAIN 3-COLUMN WORKSPACE */}
      <div className={`editor-main min-height-0 flex-1 grid overflow-hidden transition-all duration-200 ${
        isLeftCollapsed && isRightCollapsed
          ? 'grid-cols-[0px_minmax(0,1fr)_0px]'
          : isLeftCollapsed
          ? 'grid-cols-[0px_minmax(0,1fr)_minmax(240px,300px)]'
          : isRightCollapsed
          ? 'grid-cols-[minmax(190px,240px)_minmax(0,1fr)_0px]'
          : 'grid-cols-[minmax(190px,240px)_minmax(0,1fr)_minmax(240px,300px)]'
      }`}>
        
        {/* COLUMN 1: LEFT TOOL SETTINGS PANEL */}
        <div className={`editor-tool-settings bg-[#0D121A] border-r border-slate-800/80 p-3.5 flex flex-col gap-3 overflow-y-auto shrink-0 transition-all ${
          isLeftCollapsed ? 'hidden' : 'block'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-[12px] font-extrabold text-amber-300 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Tool Settings</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLeftCollapsed(true)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
              title="Collapse Tool Settings"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Active Tool Info Box */}
          <div className="bg-[#05080c] p-2.5 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span>Active Tool</span>
              {currentToolDef?.shortcut && (
                <kbd className="px-1.5 py-0.5 bg-slate-900 text-amber-300 text-[9px] font-mono rounded border border-slate-700">
                  {currentToolDef.shortcut}
                </kbd>
              )}
            </div>
            <p className="font-extrabold text-[13px] text-amber-300 flex items-center gap-1.5 pt-0.5">
              {currentToolDef ? (
                <>
                  <currentToolDef.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{currentToolDef.label}</span>
                </>
              ) : (
                <span className="italic text-slate-500">None selected</span>
              )}
            </p>
            {currentToolDef?.tooltip && (
              <p className="text-[11px] text-slate-400 pt-1 leading-snug">{currentToolDef.tooltip}</p>
            )}
          </div>

          {/* Color Picker Swatches */}
          <div className="space-y-2 bg-[#05080c] p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span className="flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                <span>Color</span>
              </span>
              <span className="text-amber-300 font-mono text-[10px]">
                {PRESET_COLORS.find((c) => c.hex === selectedColor)?.name || selectedColor}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#090d12] rounded-lg border border-slate-800">
              {PRESET_COLORS.map((color) => {
                const isSel = selectedColor === color.hex;
                return (
                  <button
                    key={color.hex}
                    type="button"
                    title={color.label}
                    onClick={() => setSelectedColor(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    className={`h-7 rounded-md border transition-all cursor-pointer flex items-center justify-center ${
                      isSel
                        ? 'border-white scale-105 ring-2 ring-emerald-500 shadow-sm'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    {isSel && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stroke Width Controls */}
          {['freehand', 'line', 'arrow', 'rectangle', 'circle'].includes(activeTool) && (
            <div className="space-y-1.5 bg-[#05080c] p-2.5 rounded-xl border border-slate-800 text-[11px]">
              <span className="font-bold text-slate-300 block">Stroke Width</span>
              <div className="grid grid-cols-4 gap-1">
                {[2, 4, 8, 12].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setStrokeWidth(w)}
                    className={`py-1 rounded font-mono font-bold text-[10px] border cursor-pointer ${
                      strokeWidth === w
                        ? 'bg-emerald-600 text-white border-amber-300'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {w}px
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Font Size Controls */}
          {['text_box', 'sticky_note', 'comment'].includes(activeTool) && (
            <div className="space-y-1.5 bg-[#05080c] p-2.5 rounded-xl border border-slate-800 text-[11px]">
              <span className="font-bold text-slate-300 block">Font Size</span>
              <div className="grid grid-cols-3 gap-1">
                {[12, 14, 18].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFontSize(s)}
                    className={`py-1 rounded font-mono font-bold text-[10px] border cursor-pointer ${
                      fontSize === s
                        ? 'bg-emerald-600 text-white border-amber-300'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Strength */}
          {['blur', 'pixelate'].includes(activeTool) && (
            <div className="space-y-1.5 bg-[#05080c] p-2.5 rounded-xl border border-slate-800 text-[11px]">
              <span className="font-bold text-slate-300 block">Blur Strength</span>
              <div className="grid grid-cols-3 gap-1">
                {(['low', 'medium', 'high'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setPrivacyStrength(st)}
                    className={`py-1 rounded font-bold text-[10px] capitalize border cursor-pointer ${
                      privacyStrength === st
                        ? 'bg-emerald-600 text-white border-amber-300'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Hint */}
          <div className="mt-auto pt-2 bg-[#05080c] p-2.5 rounded-xl border border-slate-800 space-y-1 text-[10px] text-slate-400">
            <div className="font-bold text-emerald-400 flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Canvas Controls</span>
            </div>
            <p>• Ctrl + Wheel to Zoom</p>
            <p>• Hold Space to Pan</p>
            <p>• Esc to clear tool selection</p>
          </div>
        </div>

        {/* COLUMN 2: CENTER LARGE SCREENSHOT CANVAS */}
        <div
          ref={containerRef}
          className="canvas-viewport flex-1 relative min-w-0 min-height-0 overflow-auto flex items-center justify-center bg-[#0b1017] p-6"
        >
          {isLeftCollapsed && (
            <button
              onClick={() => setIsLeftCollapsed(false)}
              className="absolute top-3 left-3 z-20 px-2.5 py-1.5 bg-[#0D121A] hover:bg-slate-800 text-amber-300 border border-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-xl cursor-pointer"
              title="Expand Tool Settings"
            >
              <PanelLeftOpen className="w-4 h-4 text-emerald-400" />
              <span>Settings</span>
            </button>
          )}

          {isRightCollapsed && (
            <button
              onClick={() => setIsRightCollapsed(false)}
              className="absolute top-3 right-3 z-20 px-2.5 py-1.5 bg-[#0D121A] hover:bg-slate-800 text-amber-300 border border-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-xl cursor-pointer"
              title="Expand Clip Details"
            >
              <span>Clip Details</span>
              <PanelRightOpen className="w-4 h-4 text-emerald-400" />
            </button>
          )}

          {!isImageLoaded ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
              <p className="font-bold text-[13px] text-amber-300">Decoding screenshot workspace…</p>
            </div>
          ) : (
            <div
              className="canvas-stage relative flex-none transition-transform duration-75 ease-out shadow-[0_0_50px_rgba(0,0,0,0.85)] rounded-lg border border-slate-800/80 bg-black overflow-hidden"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                transformOrigin: 'center center',
              }}
            >
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="block max-w-none max-h-none select-none cursor-crosshair"
              />
            </div>
          )}
        </div>

        {/* COLUMN 3: RIGHT CLIP DETAILS & DESTINATION PANEL */}
        <div className={`bg-[#0D121A] border-l border-slate-800/80 flex flex-col overflow-y-auto shrink-0 divide-y divide-slate-800/80 transition-all ${
          isRightCollapsed ? 'hidden' : 'block'
        }`}>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Clip Details</span>
              </span>

              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 bg-[#060A0F] p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setDestMode('create_new')}
                    className={`px-2 py-0.5 rounded ${destMode === 'create_new' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                  >
                    New
                  </button>
                  <button
                    type="button"
                    onClick={() => setDestMode('add_to_existing')}
                    className={`px-2 py-0.5 rounded ${destMode === 'add_to_existing' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                  >
                    Existing
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsRightCollapsed(true)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
                  title="Collapse Clip Details"
                >
                  <PanelRightClose className="w-4 h-4" />
                </button>
              </div>
            </div>

            {destMode === 'add_to_existing' ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Search existing notes..."
                  value={targetNoteId}
                  onChange={(e) => setTargetNoteId(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#060A0F] border border-slate-800 rounded-lg text-[12px] text-slate-100 outline-none focus:border-emerald-500"
                />
                <div className="max-h-36 overflow-y-auto space-y-1 rounded-lg border border-slate-800 p-1 bg-[#060A0F]">
                  {existingNotes.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setTargetNoteId(n.id)}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] truncate ${
                        targetNoteId === n.id ? 'bg-emerald-950 text-amber-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {n.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Note Title */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Note Title</label>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="w-full h-9 px-3 bg-[#060A0F] border border-slate-800 rounded-xl text-[13px] font-bold text-slate-100 outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Notebook */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-400">Notebook</label>
                    <button
                      onClick={() => setShowNewNotebookInput(!showNewNotebookInput)}
                      className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Create</span>
                    </button>
                  </div>
                  {showNewNotebookInput ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="New notebook..."
                        value={newNotebookName}
                        onChange={(e) => setNewNotebookName(e.target.value)}
                        className="flex-1 h-8 px-2 bg-[#060A0F] border border-slate-800 rounded-lg text-[11px]"
                      />
                      <button
                        onClick={() => {
                          if (newNotebookName.trim()) {
                            onCreateNotebook(newNotebookName.trim(), '#10b981');
                            setNewNotebookName('');
                            setShowNewNotebookInput(false);
                          }
                        }}
                        className="px-2.5 h-8 bg-emerald-600 text-white rounded-lg font-bold text-[11px]"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <select
                      value={selectedNotebookId}
                      onChange={(e) => setSelectedNotebookId(e.target.value)}
                      className="w-full h-9 px-3 bg-[#060A0F] border border-slate-800 rounded-xl text-[12px] font-semibold text-slate-200 outline-none focus:border-emerald-500"
                    >
                      {notebooks.map((nb) => (
                        <option key={nb.id} value={nb.id}>
                          📓 {nb.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Folder */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-400">Folder</label>
                    <button
                      onClick={() => setShowNewFolderInput(!showNewFolderInput)}
                      className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Create</span>
                    </button>
                  </div>
                  {showNewFolderInput ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="New folder..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="flex-1 h-8 px-2 bg-[#060A0F] border border-slate-800 rounded-lg text-[11px]"
                      />
                      <button
                        onClick={() => {
                          if (newFolderName.trim() && selectedNotebookId) {
                            onCreateFolder(newFolderName.trim(), selectedNotebookId);
                            setNewFolderName('');
                            setShowNewFolderInput(false);
                          }
                        }}
                        className="px-2.5 h-8 bg-emerald-600 text-white rounded-lg font-bold text-[11px]"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <select
                      value={selectedFolderId}
                      onChange={(e) => setSelectedFolderId(e.target.value)}
                      className="w-full h-9 px-3 bg-[#060A0F] border border-slate-800 rounded-xl text-[12px] font-semibold text-slate-200 outline-none focus:border-emerald-500"
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

                {/* Tags */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-400">Tags</label>
                    <button
                      onClick={() => setShowNewTagInput(!showNewTagInput)}
                      className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Create</span>
                    </button>
                  </div>
                  {showNewTagInput && (
                    <div className="flex items-center gap-1 mb-1.5">
                      <input
                        type="text"
                        placeholder="New tag..."
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        className="flex-1 h-8 px-2 bg-[#060A0F] border border-slate-800 rounded-lg text-[11px]"
                      />
                      <button
                        onClick={() => {
                          if (newTagName.trim()) {
                            onCreateTag(newTagName.trim(), '#84cc16');
                            setNewTagName('');
                            setShowNewTagInput(false);
                          }
                        }}
                        className="px-2.5 h-8 bg-emerald-600 text-white rounded-lg font-bold text-[11px]"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 p-2 bg-[#060A0F] border border-slate-800 rounded-xl max-h-24 overflow-y-auto">
                    {tags.map((t) => {
                      const isSel = selectedTagIds.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            if (isSel) setSelectedTagIds(selectedTagIds.filter((id) => id !== t.id));
                            else setSelectedTagIds([...selectedTagIds, t.id]);
                          }}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border transition-all flex items-center gap-1 ${
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

                {/* Remark */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Add remark</label>
                  <textarea
                    rows={3}
                    placeholder="Add citation remark, key summary or note..."
                    value={userRemark}
                    onChange={(e) => setUserRemark(e.target.value)}
                    className="w-full p-2.5 bg-[#060A0F] border border-slate-800 rounded-xl text-[12px] text-slate-200 placeholder:text-slate-500 outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ROW 4: STICKY BOTTOM ACTION BAR */}
      <footer className="h-[52px] px-4 bg-[#0D121A] border-t border-slate-800/80 flex items-center justify-between shrink-0 z-30">
        {/* Left: Zoom & View Controls */}
        <div className="flex items-center gap-1 bg-[#060A0F] border border-slate-800 rounded-xl p-1 text-[11px] font-bold">
          <button
            onClick={() => {
              setZoomLevel((z) => Math.max(0.1, z - 0.15));
              setIsFitToScreen(false);
            }}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-emerald-800/50 transition-colors"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 text-center text-amber-300 font-mono text-[11px]">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => {
              setZoomLevel((z) => Math.min(5.0, z + 0.15));
              setIsFitToScreen(false);
            }}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-emerald-800/50 transition-colors"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          
          <div className="w-[1px] h-4 bg-slate-800 mx-0.5" />

          <button
            onClick={handleFitToScreen}
            className="px-2 py-0.5 rounded text-slate-300 hover:text-white hover:bg-emerald-800/50 transition-colors text-[10px]"
            title="Fit to Screen"
          >
            Fit Screen
          </button>

          <button
            onClick={() => {
              setZoomLevel(1.0);
              setPanOffset({ x: 0, y: 0 });
              setIsFitToScreen(false);
            }}
            className="px-2 py-0.5 rounded text-slate-300 hover:text-white hover:bg-emerald-800/50 transition-colors text-[10px]"
            title="Actual Size 100%"
          >
            100%
          </button>
        </div>

        {/* Middle: Actions */}
        <div className="flex items-center gap-2">
          {onRetake && (
            <button
              type="button"
              onClick={onRetake}
              className="h-8 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>Retake</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownloadImage}
            className="h-8 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download PNG"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={handleCopyImage}
            className="h-8 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy Image to Clipboard"
          >
            <Copy className="w-3.5 h-3.5 text-amber-300" />
            <span>Copy Image</span>
          </button>
        </div>

        {/* Right: Cancel & EXACTLY ONE Primary Save Clip Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.close()}
            className="h-9 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-[12px] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {savedNoteId ? (
            <button
              type="button"
              onClick={() => onOpenSmartNotesNote(savedNoteId)}
              className="h-9 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-[12px] flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Open in Euclid Smart Notes</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              data-testid="save-clip"
              onClick={handleSaveClip}
              disabled={isSaving}
              className="h-9 px-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-[13px] rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-amber-300/40 flex items-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span className="text-amber-200 font-bold">{saveStepMessage || 'Saving clip…'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300/40" />
                  <span>Save Clip</span>
                </>
              )}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
