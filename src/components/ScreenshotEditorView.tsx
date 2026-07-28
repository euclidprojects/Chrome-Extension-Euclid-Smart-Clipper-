import React, { useState, useRef, useEffect } from 'react';
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
} from 'lucide-react';
import {
  CaptureJob,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidNote,
  EuclidAnnotation,
} from '../types';
import { AnnotationToolbar } from './annotation/AnnotationToolbar';
import { AnnotationToolId } from './annotation/annotationConfig';

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

  // Loaded Image
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 1280, height: 720 });

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFitToScreen, setIsFitToScreen] = useState(true);

  // Active Tool state
  const [activeTool, setActiveTool] = useState<AnnotationToolId>('highlight');
  const [selectedColor, setSelectedColor] = useState('#FDE047');
  const [areAnnotationsVisible, setAreAnnotationsVisible] = useState(true);

  // Drawing stroke state
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [annotations, setAnnotations] = useState<EuclidAnnotation[]>(job.annotations || []);
  const [history, setHistory] = useState<EuclidAnnotation[][]>([job.annotations || []]);
  const [historyIdx, setHistoryIdx] = useState(0);

  // Form State
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

  // Inline inputs
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

  // Load image from job dataUrl
  useEffect(() => {
    if (!job.dataUrl) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // If selectionRect is provided and image needs cropping
      if (job.selectionRect && job.selectionRect.width > 10 && job.selectionRect.height > 10 && !job.cropData) {
        const cropCanvas = document.createElement('canvas');
        const rect = job.selectionRect;
        const dpr = rect.devicePixelRatio || window.devicePixelRatio || 1;

        // Clip source coordinates
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
            setImgDimensions({ width: sw, height: sh });
          };
          croppedImg.src = cropCanvas.toDataURL('image/png');
          return;
        }
      }

      setImageObj(img);
      setImgDimensions({ width: img.naturalWidth || 1280, height: img.naturalHeight || 720 });
    };
    img.src = job.dataUrl;
  }, [job.dataUrl, job.selectionRect]);

  // Redraw Canvas
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imgDimensions.width;
    canvas.height = imgDimensions.height;

    // Draw background screenshot image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

    if (!areAnnotationsVisible) return;

    // Render annotations
    annotations.forEach((ann) => {
      ctx.save();
      if (ann.type === 'highlight') {
        ctx.fillStyle = ann.color || '#FDE047';
        ctx.globalAlpha = 0.4;
        if (ann.shapeData) {
          ctx.fillRect(ann.shapeData.x, ann.shapeData.y, ann.shapeData.w, ann.shapeData.h);
        }
      } else if (ann.type === 'rectangle') {
        ctx.strokeStyle = ann.color || '#FDE047';
        ctx.lineWidth = 3;
        if (ann.shapeData) {
          ctx.strokeRect(ann.shapeData.x, ann.shapeData.y, ann.shapeData.w, ann.shapeData.h);
        }
      } else if (ann.type === 'circle') {
        ctx.strokeStyle = ann.color || '#FDE047';
        ctx.lineWidth = 3;
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
        ctx.lineWidth = 3;
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
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(ann.points[0].x, ann.points[0].y);
        for (let i = 1; i < ann.points.length; i++) {
          ctx.lineTo(ann.points[i].x, ann.points[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    });
  };

  useEffect(() => {
    redrawCanvas();
  }, [imageObj, imgDimensions, annotations, areAnnotationsVisible]);

  // Push new annotation
  const addAnnotation = (newAnn: EuclidAnnotation) => {
    const updated = [...annotations, newAnn];
    setAnnotations(updated);
    const newHist = history.slice(0, historyIdx + 1);
    newHist.push(updated);
    setHistory(newHist);
    setHistoryIdx(newHist.length - 1);
  };

  // Canvas Mouse Events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
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

  // Undo & Redo
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

  // Download & Copy Image
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

  // Main Save Clip Handler
  const handleSaveClip = async () => {
    setIsSaving(true);
    setSaveError(null);

    const steps = [
      'Exporting annotated image…',
      'Collecting capture metadata…',
      'Saving note to Euclid Smart Notes…',
      'Clip saved successfully!',
    ];

    for (const step of steps) {
      setSaveStepMessage(step);
      await new Promise((r) => setTimeout(r, 220));
    }

    try {
      const canvas = canvasRef.current;
      const annotatedDataUrl = canvas ? canvas.toDataURL('image/png') : job.dataUrl;

      const selectedTagNames = tags.filter((t) => selectedTagIds.includes(t.id)).map((t) => t.name);
      const newNoteId = 'note_' + Date.now();

      const noteToSave: EuclidNote = {
        id: newNoteId,
        user_id: 'local-user',
        title: noteTitle || job.sourceTitle || 'Captured Screenshot',
        content: `
          <div class="euclid-clip-body">
            <h3>${noteTitle}</h3>
            ${userRemark ? `<p class="font-medium text-emerald-900 my-2"><strong>Remark:</strong> ${userRemark}</p>` : ''}
            <div class="my-3">
              <img src="${annotatedDataUrl}" alt="${noteTitle}" class="rounded-xl border shadow-lg max-w-full h-auto"/>
            </div>
            <p class="text-xs text-slate-500">Source: <a href="${job.sourceUrl}" target="_blank" class="text-emerald-600 underline">${job.sourceTitle}</a></p>
          </div>
        `,
        plainTextContent: (userRemark ? `${userRemark}\n\n` : '') + `Source: ${job.sourceUrl}`,
        markdownContent: `# ${noteTitle}\n\n${userRemark ? `**Remark:** ${userRemark}\n\n` : ''}![${noteTitle}](${annotatedDataUrl})\n\n*Source: [${job.sourceTitle}](${job.sourceUrl})*`,
        notebook_id: selectedNotebookId,
        folder_id: selectedFolderId || null,
        tags: selectedTagNames,
        noteType: 'annotated_screenshot',
        sourceUrl: job.sourceUrl,
        canonicalUrl: job.sourceUrl,
        sourceTitle: job.sourceTitle,
        sourceDomain: new URL(job.sourceUrl || 'https://notes.app.euclidprojects.org').hostname,
        clipFormat: 'screenshot',
        annotations: annotations,
        extensionCreated: true,
        extensionVersion: '1.0.0',
        syncStatus: 'synced',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSaveNote(noteToSave);
      setIsSaving(false);
      setSavedNoteId(newNoteId);
    } catch (err: any) {
      setIsSaving(false);
      setSaveError(err?.message || 'Failed to save clip.');
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

  const filteredFolders = folders.filter((f) => !f.notebookId || f.notebookId === selectedNotebookId);

  return (
    <div className="flex flex-col w-screen h-screen bg-[#0A0D12] text-slate-100 overflow-hidden font-sans select-none">
      
      {/* 1. TOP HEADER BAR */}
      <header className="h-[52px] px-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-700/60 flex items-center justify-between shrink-0 shadow-xl z-30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 border border-amber-300/60 shadow-[0_0_12px_rgba(251,191,36,0.3)] flex items-center justify-center shrink-0">
            <Sparkles className="w-4.5 h-4.5 text-amber-300" />
          </div>
          <div className="min-w-0">
            <h1 className="font-extrabold text-[15px] text-white tracking-tight flex items-center gap-2 leading-tight">
              <span className="truncate">{job.sourceTitle || 'Captured Page'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider shrink-0">
                {getJobModeBadge()}
              </span>
            </h1>
            <p className="text-[11px] text-emerald-300 font-mono truncate">
              {job.sourceUrl} • {imgDimensions.width} × {imgDimensions.height} px
            </p>
          </div>
        </div>

        {/* Header Right Actions & Zoom Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-black/40 border border-emerald-700/50 rounded-xl p-1 gap-1 text-[11px] font-bold">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.4, z - 0.15))}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-emerald-800/50"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-12 text-center text-amber-300 font-mono">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(3, z + 0.15))}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-emerald-800/50"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-1.5 py-0.5 rounded text-slate-300 hover:text-white hover:bg-emerald-800/50 text-[10px]"
              title="Actual Size 100%"
            >
              100%
            </button>
          </div>

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
            <span>Copy</span>
          </button>

          <button
            type="button"
            onClick={() => window.close()}
            className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer ml-1"
            title="Close Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. MAIN SPLIT BODY: EDITOR WORKSPACE & RIGHT CONTROL SIDEBAR */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT WORKSPACE: CANVAS & ANNOTATION TOOLBAR */}
        <div className="flex-1 flex flex-col bg-[#090C10] overflow-hidden relative">
          
          {/* TOP ANNOTATION TOOLBAR (23 TOOLS) */}
          <div className="p-3 bg-[#0D121A] border-b border-slate-800/80 z-10 shrink-0">
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
            />
          </div>

          {/* INTERACTIVE CANVAS CONTAINER */}
          <div
            ref={containerRef}
            className="flex-1 overflow-auto p-6 flex items-center justify-center bg-radial from-slate-900/60 to-black"
          >
            <div
              className="transition-transform duration-100 ease-out shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-slate-800 rounded-lg overflow-hidden bg-black"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            >
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="cursor-crosshair block max-w-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: DESTINATION & SAVE CLIP PANEL */}
        <div className="w-[380px] bg-[#0E131B] border-l border-slate-800/80 flex flex-col shrink-0 overflow-y-auto divide-y divide-slate-800/80">
          
          {/* DESTINATION CONTROLS */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Destination Controls</span>
              </span>

              <div className="flex items-center gap-1 bg-[#060A0F] p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setDestMode('create_new')}
                  className={`px-2 py-0.5 rounded ${destMode === 'create_new' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                >
                  New Note
                </button>
                <button
                  type="button"
                  onClick={() => setDestMode('add_to_existing')}
                  className={`px-2 py-0.5 rounded ${destMode === 'add_to_existing' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                >
                  Existing Note
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

          {/* SINGLE PRIMARY SAVE CLIP BUTTON */}
          <div className="p-4 bg-[#0A0D12] border-t border-slate-800/80 sticky bottom-0 mt-auto">
            {savedNoteId ? (
              <div className="space-y-2.5">
                <div className="bg-emerald-950/90 border border-emerald-500/80 p-3 rounded-2xl text-center font-extrabold text-[14px] text-amber-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  <span>Clip Saved to Euclid Smart Notes</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[12px] font-bold">
                  <button
                    onClick={() => onOpenSmartNotesNote(savedNoteId)}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all col-span-2 cursor-pointer"
                  >
                    <span>Open in Euclid Smart Notes</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://notes.app.euclidprojects.org/note/${savedNoteId}`);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center gap-1 col-span-1 text-[11px] cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-300" />
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => window.close()}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center gap-1 col-span-1 text-[11px] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Close Editor</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={handleSaveClip}
                  disabled={isSaving}
                  className="w-full h-[48px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-[15px] rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-amber-300/40 flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4.5 h-4.5 animate-spin text-amber-300" />
                      <span className="text-amber-200 font-bold">{saveStepMessage || 'Saving clip…'}</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300/40" />
                      <span>Save Clip</span>
                    </>
                  )}
                </button>

                {saveError && (
                  <div className="mt-2 p-2.5 bg-red-950/80 border border-red-500/60 rounded-xl text-[11px] text-red-200 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{saveError}</span>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
