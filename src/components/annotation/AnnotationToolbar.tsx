import React, { useState, useEffect } from 'react';
import {
  AnnotationGroup,
  AnnotationToolId,
  ANNOTATION_GROUPS,
  ALL_ANNOTATION_TOOLS,
  PRESET_COLORS,
} from './annotationConfig';
import {
  Check,
  Eye,
  EyeOff,
  LogOut,
  Sparkles,
  Trash2,
  Undo,
  Redo,
  ChevronUp,
  ChevronDown,
  Zap,
  RotateCcw,
  Crop,
  Eraser,
  Eye as EyeIcon,
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
  onClearAll?: () => void;
  onResetZoom?: () => void;
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
  onClearAll,
  onResetZoom,
}) => {
  // 1. Group State
  const [activeGroup, setActiveGroup] = useState<AnnotationGroup>('markup');

  // 2. Collapsible & Auto-collapse States
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('euclid_toolbar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [autoCollapseOnSelect, setAutoCollapseOnSelect] = useState<boolean>(() => {
    try {
      return localStorage.getItem('euclid_toolbar_autocollapse') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('euclid_toolbar_collapsed', String(isCollapsed));
    } catch {}
  }, [isCollapsed]);

  useEffect(() => {
    try {
      localStorage.setItem('euclid_toolbar_autocollapse', String(autoCollapseOnSelect));
    } catch {}
  }, [autoCollapseOnSelect]);

  // Separate Colors for Tool Types
  const [highlightColor, setHighlightColor] = useState('#FDE047');
  const [drawColor, setDrawColor] = useState('#4ADE80');
  const [shapeColor, setShapeColor] = useState('#60A5FA');
  const [textColor, setTextColor] = useState('#F87171');

  // Contextual Settings
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [fontSize, setFontSize] = useState<number>(14);
  const [opacity, setOpacity] = useState<number>(0.8);
  const [privacyStrength, setPrivacyStrength] = useState<'low' | 'medium' | 'high'>('medium');

  // Auto-switch group if active tool changes
  useEffect(() => {
    if (activeTool === 'none') return;
    const toolDef = ALL_ANNOTATION_TOOLS.find((t) => t.id === activeTool);
    if (toolDef && toolDef.group !== activeGroup) {
      setActiveGroup(toolDef.group);
    }
  }, [activeTool]);

  // Handle color selection sync
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

  // Select tool handler with auto-collapse option
  const handleSelectTool = (toolId: AnnotationToolId) => {
    onSelectTool(toolId);
    if (autoCollapseOnSelect) {
      setIsCollapsed(true);
    }
  };

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
          handleSelectTool('highlight');
        } else if (key === 'U') {
          e.preventDefault();
          handleSelectTool('underline');
        } else if (e.shiftKey && key === 'S') {
          e.preventDefault();
          handleSelectTool('strikethrough');
        } else if (key === 'P') {
          e.preventDefault();
          handleSelectTool('freehand');
        } else if (key === 'A') {
          e.preventDefault();
          handleSelectTool('arrow');
        } else if (key === 'R') {
          e.preventDefault();
          handleSelectTool('rectangle');
        } else if (key === 'C') {
          e.preventDefault();
          handleSelectTool('circle');
        } else if (key === 'T') {
          e.preventDefault();
          handleSelectTool('text_box');
        } else if (key === 'N') {
          e.preventDefault();
          handleSelectTool('sticky_note');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExitMode, onDeleteSelected, onUndo, onRedo, autoCollapseOnSelect]);

  const currentToolDef = ALL_ANNOTATION_TOOLS.find((t) => t.id === activeTool);
  const groupTools = ALL_ANNOTATION_TOOLS.filter((t) => t.group === activeGroup);

  // Determine if active tool supports color selection
  const isNotesGroup = activeGroup === 'notes';
  const supportsColor = ['highlight', 'highlighter_pen', 'underline', 'strikethrough', 'freehand', 'line', 'arrow', 'rectangle', 'circle', 'text_box', 'sticky_note', 'comment', 'numbered_marker', 'question', 'task_marker'].includes(activeTool) || isNotesGroup;

  return (
    <div
      className={`annotation-toolbar bg-[#080d12] border-b border-emerald-900/40 rounded-xl p-2 space-y-1.5 shadow-md ${
        isCollapsed ? 'is-collapsed' : ''
      }`}
    >
      {/* ROW 1: HEADER & GROUP TABS & CONTROLS */}
      <div className="annotation-toolbar-header flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">Annotation Tools</span>
        </div>

        {/* 5 Compact Group Tabs */}
        <div
          role="tablist"
          aria-label="Annotation Tool Groups"
          className="annotation-group-tabs flex-1 max-w-xl grid grid-cols-5 gap-1 bg-[#04070a] p-0.5 rounded-lg border border-slate-800"
        >
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
                onClick={() => {
                  setActiveGroup(group.id);
                  if (isCollapsed) setIsCollapsed(false);
                }}
                className={`annotation-group-tab min-h-[32px] px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm border border-amber-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
                title={`${group.label} Group`}
                aria-label={`${group.label} Group`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                <span className="truncate">{group.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Action Controls: Auto-collapse Toggle & Collapse Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setAutoCollapseOnSelect(!autoCollapseOnSelect)}
            title={autoCollapseOnSelect ? 'Auto-collapse enabled' : 'Automatically collapse the annotation toolbar after selecting a tool'}
            aria-label="Toggle auto-collapse"
            className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 border cursor-pointer transition-colors ${
              autoCollapseOnSelect
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/80'
                : 'bg-[#04070a] text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Zap className={`w-3 h-3 ${autoCollapseOnSelect ? 'text-amber-300 fill-amber-300/20' : 'text-slate-500'}`} />
            <span className="hidden md:inline">Auto-Collapse</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand annotation toolbar' : 'Collapse annotation toolbar'}
            aria-label={isCollapsed ? 'Expand annotation toolbar' : 'Collapse annotation toolbar'}
            className="p-1 rounded-md bg-[#04070a] hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer transition-colors"
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4 text-amber-300" />
            ) : (
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* EXPANDED TOOLBAR BODY */}
      {!isCollapsed && (
        <div className="annotation-toolbar-body space-y-1.5 pt-0.5">
          {/* ROW 2: ACTIVE GROUP TOOLS ROW */}
          <div
            role="tabpanel"
            id={`panel-${activeGroup}`}
            aria-labelledby={`tab-${activeGroup}`}
            className="annotation-tools-row flex items-center gap-1.5 overflow-x-auto overflow-y-hidden bg-[#04070a] p-1 rounded-lg border border-slate-800"
          >
            {/* MARKUP, DRAW, NOTES, EDIT TOOL BUTTONS */}
            {groupTools.map((tool) => {
              const isSel = activeTool === tool.id;
              const IconComp = tool.icon;
              return (
                <button
                  key={tool.id}
                  type="button"
                  aria-label={tool.tooltip}
                  title={`${tool.tooltip}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
                  onClick={() => handleSelectTool(tool.id)}
                  className={`annotation-tool-btn h-[34px] px-2.5 py-1 rounded-md transition-all flex items-center justify-center gap-1.5 border cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 shrink-0 ${
                    isSel
                      ? 'bg-emerald-600 text-white border-amber-300 shadow-sm'
                      : 'bg-[#0b1117] text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSel ? 'text-amber-300' : 'text-slate-300'}`} />
                  <span className="text-[11px] font-semibold whitespace-nowrap">{tool.label}</span>
                  {tool.shortcut && (
                    <kbd className="hidden lg:inline-block ml-1 px-1 py-0.2 bg-black/40 text-[9px] font-mono rounded text-slate-300 border border-white/10">
                      {tool.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })}

            {/* EDIT GROUP ACTIONS: UNDO, REDO, DELETE SELECTED */}
            {activeGroup === 'edit' && (
              <>
                <div className="w-[1px] h-6 bg-slate-800 mx-0.5 shrink-0" />
                <button
                  type="button"
                  aria-label="Undo"
                  title="Undo last action (Ctrl+Z)"
                  onClick={onUndo}
                  className="annotation-tool-btn h-[34px] px-2.5 py-1 bg-[#0b1117] hover:bg-slate-800 text-slate-300 hover:text-white rounded-md border border-slate-800 flex items-center justify-center gap-1 text-[11px] font-bold cursor-pointer shrink-0"
                >
                  <Undo className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Undo</span>
                </button>

                <button
                  type="button"
                  aria-label="Redo"
                  title="Redo last action (Ctrl+Shift+Z)"
                  onClick={onRedo}
                  className="annotation-tool-btn h-[34px] px-2.5 py-1 bg-[#0b1117] hover:bg-slate-800 text-slate-300 hover:text-white rounded-md border border-slate-800 flex items-center justify-center gap-1 text-[11px] font-bold cursor-pointer shrink-0"
                >
                  <Redo className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Redo</span>
                </button>

                <button
                  type="button"
                  aria-label="Delete selected annotation"
                  title="Delete selected annotation (Delete)"
                  onClick={onDeleteSelected}
                  className="annotation-tool-btn h-[34px] px-2.5 py-1 bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-red-100 rounded-md border border-red-700/60 flex items-center justify-center gap-1 text-[11px] font-extrabold cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Delete</span>
                </button>
              </>
            )}

            {/* MORE GROUP ACTIONS: SHOW/HIDE, RESET ZOOM, CLEAR ALL, EXIT */}
            {activeGroup === 'more' && (
              <>
                <button
                  type="button"
                  aria-label={areAnnotationsVisible ? 'Hide Annotations' : 'Show Annotations'}
                  title={areAnnotationsVisible ? 'Hide Annotations' : 'Show Annotations'}
                  onClick={() => onToggleVisibility(!areAnnotationsVisible)}
                  className={`annotation-tool-btn h-[34px] px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    areAnnotationsVisible ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {areAnnotationsVisible ? <Eye className="w-3.5 h-3.5 text-amber-300" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{areAnnotationsVisible ? 'Hide' : 'Show'}</span>
                </button>

                {onResetZoom && (
                  <button
                    type="button"
                    aria-label="Reset Zoom / Fit Screen"
                    title="Fit screenshot to screen"
                    onClick={onResetZoom}
                    className="annotation-tool-btn h-[34px] px-2.5 py-1 bg-[#0b1117] hover:bg-slate-800 text-slate-300 hover:text-white rounded-md border border-slate-800 flex items-center gap-1.5 text-[11px] font-bold cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fit Screen</span>
                  </button>
                )}

                {onClearAll && (
                  <button
                    type="button"
                    aria-label="Clear all annotations"
                    title="Clear all annotations on screenshot"
                    onClick={onClearAll}
                    className="annotation-tool-btn h-[34px] px-2.5 py-1 bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-red-100 rounded-md border border-red-800/80 flex items-center gap-1.5 text-[11px] font-bold cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Clear All</span>
                  </button>
                )}

                <button
                  type="button"
                  aria-label="Exit Annotation Mode"
                  title="Exit Annotation Mode (Escape)"
                  onClick={onExitMode}
                  className="annotation-tool-btn h-[34px] px-2.5 py-1 bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 hover:text-amber-200 rounded-md border border-amber-600/60 flex items-center gap-1.5 text-[11px] font-bold cursor-pointer shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exit</span>
                </button>
              </>
            )}
          </div>

          {/* ROW 3: COMPACT INLINE ACTIVE TOOL & QUICK SETTINGS BAR */}
          <div className="annotation-quick-settings bg-[#05080b] px-2.5 py-1 rounded-lg border border-slate-800/80 flex items-center justify-between gap-2 text-[11px] flex-wrap min-h-[30px]">
            {/* Inline Active Tool Indicator */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-slate-400 font-medium text-[11px]">Active:</span>
              {currentToolDef ? (
                <span className="font-extrabold text-amber-300 flex items-center gap-1">
                  <currentToolDef.icon className="w-3.5 h-3.5 text-amber-300" />
                  <span>{currentToolDef.label}</span>
                </span>
              ) : (
                <span className="text-slate-400 font-medium italic">None</span>
              )}
            </div>

            {/* Inline Color Palette Swatches */}
            {supportsColor && (
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-slate-400 text-[10px] font-medium hidden sm:inline">Color:</span>
                <div className="flex items-center gap-1.5">
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
                        className={`annotation-color-swatch w-[22px] h-[22px] rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                          isSel
                            ? 'border-white scale-110 ring-2 ring-emerald-500 shadow-sm'
                            : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        {isSel && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inline Contextual Settings */}
            <div className="flex items-center gap-2 shrink-0">
              {(['freehand', 'line', 'arrow', 'rectangle', 'circle'].includes(activeTool)) && (
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-slate-400 font-medium">Stroke:</span>
                  {[2, 4, 8].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setStrokeWidth(w)}
                      className={`px-1.5 py-0.5 rounded font-mono font-bold cursor-pointer ${
                        strokeWidth === w ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {w}px
                    </button>
                  ))}
                </div>
              )}

              {(['text_box', 'sticky_note', 'comment'].includes(activeTool)) && (
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-slate-400 font-medium">Font:</span>
                  {[12, 14, 18].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFontSize(s)}
                      className={`px-1.5 py-0.5 rounded font-mono font-bold cursor-pointer ${
                        fontSize === s ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {s}px
                    </button>
                  ))}
                </div>
              )}

              {(['blur', 'pixelate'].includes(activeTool)) && (
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-slate-400 font-medium">Strength:</span>
                  {(['low', 'medium', 'high'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setPrivacyStrength(st)}
                      className={`px-1.5 py-0.5 rounded font-bold capitalize cursor-pointer ${
                        privacyStrength === st ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}

              {(['highlight', 'highlighter_pen'].includes(activeTool)) && (
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-slate-400 font-medium">Opacity:</span>
                  {[0.5, 0.8, 1.0].map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setOpacity(op)}
                      className={`px-1.5 py-0.5 rounded font-mono font-bold cursor-pointer ${
                        opacity === op ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {Math.round(op * 100)}%
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
