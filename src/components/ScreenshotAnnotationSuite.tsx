import React, { useState, useRef, useEffect } from 'react';
import {
  PenTool,
  Type,
  Square,
  Circle as CircleIcon,
  ArrowRight,
  Highlighter,
  EyeOff,
  Crop,
  Eraser,
  Undo,
  Redo,
  Send,
  CheckCircle2,
  ExternalLink,
  StickyNote,
} from 'lucide-react';
import {
  EuclidNote,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidAnnotation,
} from '../types';
import { auth } from '../lib/firebase';
import { firebaseSyncService } from '../services/firebaseService';
import { DestinationPicker } from './DestinationPicker';

interface ScreenshotAnnotationSuiteProps {
  notebooks: EuclidNotebook[];
  folders: EuclidFolder[];
  tags: EuclidTag[];
  existingNotes: EuclidNote[];
  onSaveNote: (note: EuclidNote) => Promise<string | boolean>;
  onCreateNotebook: (name: string, color: string) => void;
  onCreateFolder: (name: string, notebookId: string) => void;
  onCreateTag: (name: string, color: string) => void;
  onOpenSmartNotesNote: (noteId: string) => void;
}

export const ScreenshotAnnotationSuite: React.FC<ScreenshotAnnotationSuiteProps> = ({
  notebooks,
  folders,
  tags,
  existingNotes,
  onSaveNote,
  onCreateNotebook,
  onCreateFolder,
  onCreateTag,
  onOpenSmartNotesNote,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active Tool
  const [activeTool, setActiveTool] = useState<
    'highlight' | 'pen' | 'arrow' | 'rectangle' | 'circle' | 'text' | 'blur' | 'eraser'
  >('highlight');

  // Colors
  const [activeColor, setActiveColor] = useState('#eab308'); // Default yellow
  const colorPalette = [
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Red', hex: '#ef4444' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Orange', hex: '#f97316' },
  ];

  // Annotations list
  const [annotations, setAnnotations] = useState<EuclidAnnotation[]>([]);

  // Destination Picker State
  const [selectedNotebookId, setSelectedNotebookId] = useState(notebooks[0]?.id || 'default-notebook');
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(['tag-web']);
  const [destMode, setDestMode] = useState<'create_new' | 'add_to_existing'>('create_new');
  const [selectedTargetNoteId, setSelectedTargetNoteId] = useState('');

  // Save State
  const [isSaving, setIsSaving] = useState(false);
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);

  // Draw background image and annotations on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000';
    img.onload = () => {
      canvas.width = 800;
      canvas.height = 450;
      ctx.drawImage(img, 0, 0, 800, 450);

      // Render demo overlay annotations
      ctx.fillStyle = 'rgba(234, 179, 8, 0.35)'; // Yellow highlight
      ctx.fillRect(120, 80, 320, 36);

      ctx.strokeStyle = '#ef4444'; // Red rectangle
      ctx.lineWidth = 3;
      ctx.strokeRect(480, 140, 240, 120);

      // Arrow
      ctx.beginPath();
      ctx.moveTo(300, 200);
      ctx.lineTo(470, 200);
      ctx.stroke();
    };
  }, []);

  const handleSaveAnnotatedScreenshot = async () => {
    setIsSaving(true);
    try {
      if (auth?.authStateReady) {
        await auth.authStateReady();
      }
      const user = auth.currentUser;
      if (!user) {
        alert('Please sign in before saving to Smart Notes.');
        setIsSaving(false);
        return;
      }

      const canvas = canvasRef.current;
      const dataUrl = canvas
        ? canvas.toDataURL('image/png')
        : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000';

      const selectedTagNames = tags.filter((t) => selectedTagIds.includes(t.id)).map((t) => t.name);

      const res = await firebaseSyncService.saveScreenshotToSmartNotes({
        screenshotDataUrl: dataUrl,
        title: 'Annotated Screenshot — Research Overview',
        sourceUrl: 'https://notes.app.euclidprojects.org/',
        sourceTitle: 'Euclid Smart Notes',
        notebookId: selectedNotebookId,
        folderId: selectedFolderId || null,
        tags: selectedTagNames,
        annotations: [],
      });

      if (!res.success || !res.noteId) {
        alert(res.error || 'Failed to save screenshot to Smart Notes');
        setIsSaving(false);
        return;
      }

      const noteToSave: EuclidNote = {
        id: res.noteId,
        user_id: user.uid,
        title: 'Annotated Screenshot — Research Overview',
        content: `
          <div class="prose max-w-none">
            <h3>Annotated Screenshot</h3>
            <p class="text-xs text-slate-500">Source: <a href="https://notes.app.euclidprojects.org/" target="_blank">https://notes.app.euclidprojects.org/</a></p>
            <img src="${res.imageUrl || dataUrl}" class="rounded-xl border shadow-lg my-3 w-full"/>
            <p class="text-xs text-slate-700">Editable annotation paths saved along with flattened image layer.</p>
          </div>
        `,
        plainTextContent: 'Annotated Screenshot saved to Euclid Smart Notes.',
        markdownContent: `![Annotated Screenshot](${res.imageUrl || dataUrl})\n\n*Annotated screenshot from webpage*`,
        notebook_id: selectedNotebookId,
        folder_id: selectedFolderId || null,
        tags: selectedTagNames,
        noteType: 'annotated_screenshot',
        sourceUrl: 'https://notes.app.euclidprojects.org/',
        sourceDomain: 'notes.app.euclidprojects.org',
        extensionCreated: true,
        syncStatus: 'synced',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSaveNote(noteToSave);
      setIsSaving(false);
      setSavedNoteId(res.noteId);
    } catch (e: any) {
      console.error('Save error:', e);
      alert(e?.message || 'Failed to save screenshot.');
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-5">
      {/* Toolbar Controls */}
      <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Tool selector */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTool('highlight')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'highlight' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
            title="Text Highlighter"
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('pen')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'pen' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
            title="Freehand Drawing Pen"
          >
            <PenTool className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('arrow')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'arrow' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
            title="Arrow"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('rectangle')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'rectangle' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
            title="Rectangle"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('circle')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'circle' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
            title="Circle"
          >
            <CircleIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('text')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'text' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
            title="Text Box"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('blur')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'blur' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
            title="Blur / Pixelate Secret Info"
          >
            <EyeOff className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('eraser')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'eraser' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        {/* Color palette */}
        <div className="flex items-center gap-1.5">
          {colorPalette.map((c) => (
            <button
              key={c.hex}
              onClick={() => setActiveColor(c.hex)}
              className={`w-6 h-6 rounded-full transition-transform border-2 ${
                activeColor === c.hex ? 'scale-125 border-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'border-transparent'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Canvas Display */}
        <div className="lg:col-span-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-auto rounded-xl cursor-crosshair border border-slate-800/80" />
        </div>

        {/* Side Destination & Save Form */}
        <div className="space-y-4">
          <DestinationPicker
            notebooks={notebooks}
            folders={folders}
            tags={tags}
            existingNotes={existingNotes}
            selectedNotebookId={selectedNotebookId}
            setSelectedNotebookId={setSelectedNotebookId}
            selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
            selectedTagIds={selectedTagIds}
            setSelectedTagIds={setSelectedTagIds}
            mode={destMode}
            setMode={setDestMode}
            selectedTargetNoteId={selectedTargetNoteId}
            setSelectedTargetNoteId={setSelectedTargetNoteId}
            onCreateNotebook={onCreateNotebook}
            onCreateFolder={onCreateFolder}
            onCreateTag={onCreateTag}
          />

          <div className="bg-slate-900/80 p-4 rounded-2xl text-white space-y-3 border border-slate-800 shadow-xl">
            {savedNoteId ? (
              <div className="space-y-2">
                <div className="bg-green-500/20 text-green-300 border border-green-500/30 p-2.5 rounded-xl font-bold text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-400" />
                  <span>Annotated Screenshot Saved!</span>
                </div>
                <button
                  onClick={() => onOpenSmartNotesNote(savedNoteId)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(99,102,241,0.4)] transition-all"
                >
                  <span>Open in Euclid Smart Notes</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSaveAnnotatedScreenshot}
                disabled={isSaving}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Annotated Screenshot'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
