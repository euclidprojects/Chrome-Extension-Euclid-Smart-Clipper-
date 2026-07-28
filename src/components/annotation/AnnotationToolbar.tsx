import React, { useState, useEffect } from 'react';
import {
  AnnotationGroup,
  AnnotationToolId,
  ANNOTATION_GROUPS,
  ALL_ANNOTATION_TOOLS,
  PRESET_COLORS,
  AnnotationToolDefinition,
} from './annotationConfig';
import {
  Check,
  Eye,
  EyeOff,
  LogOut,
  Sliders,
  Sparkles,
  Info,
  Trash2,
  Undo,
  Redo,
} from 'lucide-react';

export interface AnnotationToolbarProps {
  activeTool: AnnotationToolId;
  onSelectTool: (toolId: AnnotationToolId) => void;
  areAnnotationsVisible: boolean;
  onToggleVisibility: (visible: boolean) => void;
  onUndo: () => void;
  onRedo: () => void;
  onDeleteSelected: () => void;
  onExitMode: () => void;
  selectedColor: string;
  onSelectColor: (hex: string) => void;
  annotationsCount?: number;
}

export const AnnotationToolbar: React.FC<AnnotationToolbarProps> = ({
  activeTool,
  onSelectTool,
  areAnnotationsVisible,
  onToggleVisibility,
  onUndo,
  onRedo,
  onDeleteSelected,
  onExitMode,
  selectedColor,
  onSelectColor,
  annotationsCount = 0,
}) => {
  // 1. Group State (Markup default)
  const [activeGroup, setActiveGroup] = useState<AnnotationGroup>('markup');

  // 2. Separate Colors for Highlighting, Drawing, Shapes, and Text Notes
  const [highlightColor, setHighlightColor] = useState('#FDE047');
  const [drawColor, setDrawColor] = useState('#4ADE80');
  const [shapeColor, setShapeColor] = useState('#60A5FA');
  const [textColor, setTextColor] = useState('#F87171');

  // Contextual Tool Settings
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [fontSize, setFontSize] = useState<number>(14);
  const [opacity, setOpacity] = useState<number>(0.8);
  const [privacyStrength, setPrivacyStrength] = useState<'low' | 'medium' | 'high'>('medium');

  // Auto-switch tab if tool changes externally
  useEffect(() => {
    if (activeTool === 'none') return;
    const toolDef = ALL_ANNOTATION_TOOLS.find((t) => t.id === activeTool);
    if (toolDef && toolDef.group !== activeGroup) {
      setActiveGroup(toolDef.group);
    }
  }, [activeTool]);

  // Sync color when active tool changes
  useEffect(() => {
    if (['highlight', 'highlighter_pen', 'underline', 'strikethrough'].includes(activeTool)) {
      onSelectColor(highlightColor);
    } else if (['freehand', 'line', 'arrow'].includes(activeTool)) {
      onSelectColor(drawColor);
    } else if (['rectangle', 'circle'].includes(activeTool)) {
      onSelectColor(shapeColor);
    } else if (['text_box', 'sticky_note', 'comment', 'numbered_marker', 'question', 'task_marker'].includes(activeTool)) {
      onSelectColor(textColor);
    }
  }, [activeTool]);

  // Handle color change for current tool type
  const handleColorChange = (hex: string) => {
    if (['highlight', 'highlighter_pen', 'underline', 'strikethrough'].includes(activeTool)) {
      setHighlightColor(hex);
    } else if (['freehand', 'line', 'arrow'].includes(activeTool)) {
      setDrawColor(hex);
    } else if (['rectangle', 'circle'].includes(activeTool)) {
      setShapeColor(hex);
    } else if (['text_box', 'sticky_note', 'comment', 'numbered_marker', 'question', 'task_marker'].includes(activeTool)) {
      setTextColor(hex);
    }
    onSelectColor(hex);
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form controls
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onExitMode();
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Only trigger delete if not typing
        e.preventDefault();
        onDeleteSelected();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          onRedo();
        } else {
          onUndo();
        }
        return;
      }

      const key = e.key.toUpperCase();
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (key === 'H') {
          e.preventDefault();
          onSelectTool('highlight');
        } else if (key === 'U') {
          e.preventDefault();
          onSelectTool('underline');
        } else if (e.shiftKey && key === 'S') {
          e.preventDefault();
          onSelectTool('strikethrough');
        } else if (key === 'P') {
          e.preventDefault();
          onSelectTool('freehand');
        } else if (key === 'A') {
          e.preventDefault();
          onSelectTool('arrow');
        } else if (key === 'R') {
          e.preventDefault();
          onSelectTool('rectangle');
        } else if (key === 'C') {
          e.preventDefault();
          onSelectTool('circle');
        } else if (key === 'T') {
          e.preventDefault();
          onSelectTool('text_box');
        } else if (key === 'N') {
          e.preventDefault();
          onSelectTool('sticky_note');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectTool, onExitMode, onDeleteSelected, onUndo, onRedo]);

  // Current Active Tool Object
  const currentToolDef = ALL_ANNOTATION_TOOLS.find((t) => t.id === activeTool);

  // Tools in active group
  const groupTools = ALL_ANNOTATION_TOOLS.filter((t) => t.group === activeGroup);

  return (
    <div className="annotation-toolbar bg-[#080d12] border border-slate-800 rounded-xl p-2.5 space-y-2.5 shadow-md">
      
      {/* 1. TOP HEADER & GROUP TABS */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Annotation Toolbar</span>
          </span>
          <span className="text-amber-400 font-mono text-[10px] bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-600/40">
            23 Tools
          </span>
        </div>

        {/* 5 Group Tabs */}
        <div role="tablist" aria-label="Annotation Tool Groups" className="annotation-tabs grid grid-cols-5 gap-1 bg-[#04070a] p-1 rounded-lg border border-slate-800/80">
          {ANNOTATION_GROUPS.map((group) => {
            const isSelected = activeGroup === group.id;
            const IconComponent = group.icon;
            return (
              <button
                key={group.id}
                role="tab"
                id={`tab-${group.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${group.id}`}
                tabIndex={isSelected ? 0 : -1}
                type="button"
                onClick={() => setActiveGroup(group.id)}
                className={`annotation-tab min-h-[34px] px-1 py-1 rounded-md text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm border border-amber-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
                title={`${group.label} Group`}
                aria-label={`${group.label} Group`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                <span className="truncate leading-tight text-[10px]">{group.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ACTIVE TOOL STATUS BANNER */}
      <div className="flex items-center justify-between bg-[#0e161f] px-2.5 py-1.5 rounded-lg border border-slate-800/80 text-[11px]">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-slate-400 font-medium shrink-0">Active Tool:</span>
          {currentToolDef ? (
            <span className="font-bold text-amber-300 truncate flex items-center gap-1">
              <currentToolDef.icon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="truncate">{currentToolDef.label}</span>
            </span>
          ) : (
            <span className="text-slate-400 font-medium italic">None selected</span>
          )}
        </div>

        {currentToolDef?.shortcut && (
          <kbd className="px-1.5 py-0.5 bg-slate-900 text-amber-300/90 text-[9px] font-mono rounded border border-slate-700 shrink-0">
            {currentToolDef.shortcut}
          </kbd>
        )}
      </div>

      {/* 3. GROUP TOOL CONTENT PANELS */}
      <div role="tabpanel" id={`panel-${activeGroup}`} aria-labelledby={`tab-${activeGroup}`} className="space-y-2">
        
        {/* GROUP 1: MARKUP */}
        {activeGroup === 'markup' && (
          <div className="grid grid-cols-4 gap-1.5 bg-[#04070a] p-1.5 rounded-lg border border-slate-800">
            {groupTools.map((tool) => {
              const isSel = activeTool === tool.id;
              const IconComp = tool.icon;
              return (
                <button
                  key={tool.id}
                  type="button"
                  aria-label={tool.tooltip}
                  title={`${tool.tooltip}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
                  onClick={() => onSelectTool(tool.id)}
                  className={`min-h-[42px] p-2 rounded-lg transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 ${
                    isSel
                      ? 'bg-emerald-600 text-white border-amber-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'bg-[#0b1117] text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSel ? 'text-amber-300' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-semibold truncate max-w-full">{tool.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* GROUP 2: DRAW (Compact 3-column Grid) */}
        {activeGroup === 'draw' && (
          <div className="grid grid-cols-3 gap-1.5 bg-[#04070a] p-1.5 rounded-lg border border-slate-800">
            {groupTools.map((tool) => {
              const isSel = activeTool === tool.id;
              const IconComp = tool.icon;
              return (
                <button
                  key={tool.id}
                  type="button"
                  aria-label={tool.tooltip}
                  title={`${tool.tooltip}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
                  onClick={() => onSelectTool(tool.id)}
                  className={`min-h-[42px] p-2 rounded-lg transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 ${
                    isSel
                      ? 'bg-emerald-600 text-white border-amber-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'bg-[#0b1117] text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSel ? 'text-amber-300' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-semibold truncate max-w-full">{tool.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* GROUP 3: NOTES */}
        {activeGroup === 'notes' && (
          <div className="grid grid-cols-3 gap-1.5 bg-[#04070a] p-1.5 rounded-lg border border-slate-800">
            {groupTools.map((tool) => {
              const isSel = activeTool === tool.id;
              const IconComp = tool.icon;
              return (
                <button
                  key={tool.id}
                  type="button"
                  aria-label={tool.tooltip}
                  title={`${tool.tooltip}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
                  onClick={() => onSelectTool(tool.id)}
                  className={`min-h-[42px] p-2 rounded-lg transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 ${
                    isSel
                      ? 'bg-emerald-600 text-white border-amber-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'bg-[#0b1117] text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSel ? 'text-amber-300' : 'text-amber-400/90'}`} />
                  <span className="text-[10px] font-semibold truncate max-w-full">{tool.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* GROUP 4: EDIT & PRIVACY */}
        {activeGroup === 'edit' && (
          <div className="space-y-1.5 bg-[#04070a] p-1.5 rounded-lg border border-slate-800">
            {/* Row 1: Crop, Blur, Pixelate, Eraser */}
            <div className="grid grid-cols-4 gap-1.5">
              {['crop', 'blur', 'pixelate', 'eraser'].map((tId) => {
                const tool = groupTools.find((t) => t.id === tId);
                if (!tool) return null;
                const isSel = activeTool === tool.id;
                const IconComp = tool.icon;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    aria-label={tool.tooltip}
                    title={tool.tooltip}
                    onClick={() => onSelectTool(tool.id)}
                    className={`min-h-[42px] p-1.5 rounded-lg transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 ${
                      isSel
                        ? 'bg-emerald-600 text-white border-amber-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                        : 'bg-[#0b1117] text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isSel ? 'text-amber-300' : 'text-slate-300'}`} />
                    <span className="text-[10px] font-semibold truncate max-w-full">{tool.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Row 2: Undo, Redo, Delete Selected (Visually separated in red) */}
            <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-slate-800/80">
              {/* Undo */}
              <button
                type="button"
                aria-label="Undo"
                title="Undo last action (Ctrl+Z)"
                onClick={onUndo}
                className="min-h-[38px] px-2 py-1 bg-[#0b1117] hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 flex items-center justify-center gap-1 text-[11px] font-bold cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-amber-400"
              >
                <Undo className="w-3.5 h-3.5 text-emerald-400" />
                <span>Undo</span>
              </button>

              {/* Redo */}
              <button
                type="button"
                aria-label="Redo"
                title="Redo last action (Ctrl+Shift+Z)"
                onClick={onRedo}
                className="min-h-[38px] px-2 py-1 bg-[#0b1117] hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 flex items-center justify-center gap-1 text-[11px] font-bold cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-amber-400"
              >
                <Redo className="w-3.5 h-3.5 text-emerald-400" />
                <span>Redo</span>
              </button>

              {/* Delete Selected (Distinct Red Styling) */}
              <button
                type="button"
                aria-label="Delete selected annotation"
                title="Delete selected annotation (Delete)"
                onClick={onDeleteSelected}
                className="min-h-[38px] px-2 py-1 bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-red-100 rounded-lg border border-red-700/60 flex items-center justify-center gap-1 text-[11px] font-extrabold cursor-pointer transition-colors shadow-sm outline-none focus:ring-2 focus:ring-red-400"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="truncate">Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* GROUP 5: MORE / VIEW */}
        {activeGroup === 'more' && (
          <div className="space-y-2 bg-[#04070a] p-2 rounded-lg border border-slate-800">
            {/* Single Toggle: Show / Hide Annotations */}
            <div className="bg-[#0b1117] p-2 rounded-lg border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {areAnnotationsVisible ? (
                  <Eye className="w-4 h-4 text-emerald-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <p className="font-bold text-[12px] text-slate-200">
                    {areAnnotationsVisible ? 'Show Annotations' : 'Hide Annotations'}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {areAnnotationsVisible ? 'Annotations are visible on page' : 'Annotations hidden from page view'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label={areAnnotationsVisible ? 'Hide Annotations' : 'Show Annotations'}
                title={areAnnotationsVisible ? 'Hide Annotations' : 'Show Annotations'}
                onClick={() => onToggleVisibility(!areAnnotationsVisible)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                  areAnnotationsVisible
                    ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-500'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {areAnnotationsVisible ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Exit Annotation Mode (Distinct bottom button with label) */}
            <button
              type="button"
              aria-label="Exit Annotation Mode"
              title="Exit Annotation Mode (Escape)"
              onClick={onExitMode}
              className="w-full h-[38px] bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 hover:text-amber-200 rounded-lg border border-amber-600/60 font-bold text-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-amber-400"
            >
              <LogOut className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Exit Annotation Mode</span>
            </button>
          </div>
        )}

      </div>

      {/* 4. CONTEXTUAL SETTINGS FOR ACTIVE TOOL */}
      <div className="pt-1 space-y-2 border-t border-slate-800/80">
        
        {/* A. COLOR PICKER (Contextual Label & Preset Swatches) */}
        <div className="space-y-1.5 bg-[#05080b] p-2 rounded-lg border border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
            <span>
              {['highlight', 'highlighter_pen', 'underline', 'strikethrough'].includes(activeTool)
                ? 'Highlight Color'
                : ['rectangle', 'circle'].includes(activeTool)
                ? 'Shape Color'
                : ['text_box', 'sticky_note', 'comment', 'numbered_marker', 'question', 'task_marker'].includes(activeTool)
                ? 'Text Color'
                : 'Drawing Color'}
            </span>
            <span className="text-amber-300 font-mono text-[10px]">
              {PRESET_COLORS.find((c) => c.hex === selectedColor)?.name || selectedColor}
            </span>
          </div>

          <div className="flex items-center justify-between gap-1 p-1 bg-[#090d12] rounded-md border border-slate-800">
            {PRESET_COLORS.map((color) => {
              const isSel = selectedColor === color.hex;
              return (
                <button
                  key={color.hex}
                  type="button"
                  aria-label={color.label}
                  title={color.label}
                  onClick={() => handleColorChange(color.hex)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-6 h-6 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                    isSel
                      ? 'border-white scale-110 ring-2 ring-emerald-500 shadow-sm'
                      : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {isSel && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* B. CONTEXTUAL SLIDERS / OPTIONS */}
        {(['freehand', 'line', 'arrow', 'rectangle', 'circle'].includes(activeTool)) && (
          <div className="flex items-center justify-between bg-[#05080b] p-2 rounded-lg border border-slate-800/80 text-[11px]">
            <span className="text-slate-300 font-bold">Stroke Width:</span>
            <div className="flex items-center gap-1">
              {[2, 4, 8].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setStrokeWidth(w)}
                  className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] cursor-pointer ${
                    strokeWidth === w ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {w}px
                </button>
              ))}
            </div>
          </div>
        )}

        {(['text_box', 'sticky_note', 'comment'].includes(activeTool)) && (
          <div className="flex items-center justify-between bg-[#05080b] p-2 rounded-lg border border-slate-800/80 text-[11px]">
            <span className="text-slate-300 font-bold">Font Size:</span>
            <div className="flex items-center gap-1">
              {[12, 14, 18].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFontSize(s)}
                  className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] cursor-pointer ${
                    fontSize === s ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>
        )}

        {(['blur', 'pixelate'].includes(activeTool)) && (
          <div className="flex items-center justify-between bg-[#05080b] p-2 rounded-lg border border-slate-800/80 text-[11px]">
            <span className="text-slate-300 font-bold">Strength:</span>
            <div className="flex items-center gap-1">
              {(['low', 'medium', 'high'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setPrivacyStrength(st)}
                  className={`px-2 py-0.5 rounded font-bold text-[10px] capitalize cursor-pointer ${
                    privacyStrength === st ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
