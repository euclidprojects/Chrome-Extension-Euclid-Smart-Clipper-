import React from 'react';
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
  HelpCircle,
  CheckCircle2,
  Crop,
  EyeOff,
  Eye,
  Eraser,
  Undo,
  Redo,
  Trash2,
  X,
  LogOut,
  Grid,
} from 'lucide-react';

export type AnnotationGroup = 'markup' | 'draw' | 'notes' | 'edit' | 'more';

export type AnnotationToolId =
  | 'highlight'
  | 'highlighter_pen'
  | 'underline'
  | 'strikethrough'
  | 'freehand'
  | 'arrow'
  | 'line'
  | 'rectangle'
  | 'circle'
  | 'text_box'
  | 'sticky_note'
  | 'comment'
  | 'numbered_marker'
  | 'question'
  | 'task_marker'
  | 'crop'
  | 'blur'
  | 'pixelate'
  | 'eraser'
  | 'undo'
  | 'redo'
  | 'delete_selected'
  | 'toggle_visibility'
  | 'exit_mode'
  | 'none';

export interface AnnotationToolDefinition {
  id: AnnotationToolId;
  group: AnnotationGroup;
  label: string;
  tooltip: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  destructive?: boolean;
}

export interface AnnotationGroupDefinition {
  id: AnnotationGroup;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ANNOTATION_GROUPS: AnnotationGroupDefinition[] = [
  { id: 'markup', label: 'Markup', icon: Highlighter },
  { id: 'draw', label: 'Draw', icon: PenTool },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'edit', label: 'Edit', icon: Crop },
  { id: 'more', label: 'More', icon: Grid },
];

export const ALL_ANNOTATION_TOOLS: AnnotationToolDefinition[] = [
  // 1. MARKUP GROUP
  {
    id: 'highlight',
    group: 'markup',
    label: 'Highlight',
    tooltip: 'Highlight text',
    icon: Highlighter,
    shortcut: 'H',
  },
  {
    id: 'highlighter_pen',
    group: 'markup',
    label: 'Highlighter Pen',
    tooltip: 'Highlighter pen',
    icon: Edit3,
  },
  {
    id: 'underline',
    group: 'markup',
    label: 'Underline',
    tooltip: 'Underline text',
    icon: Underline,
    shortcut: 'U',
  },
  {
    id: 'strikethrough',
    group: 'markup',
    label: 'Strikethrough',
    tooltip: 'Strikethrough text',
    icon: Strikethrough,
    shortcut: 'Shift + S',
  },

  // 2. DRAW GROUP
  {
    id: 'freehand',
    group: 'draw',
    label: 'Freehand Pen',
    tooltip: 'Freehand pen',
    icon: PenTool,
    shortcut: 'P',
  },
  {
    id: 'arrow',
    group: 'draw',
    label: 'Arrow',
    tooltip: 'Draw arrow',
    icon: ArrowRight,
    shortcut: 'A',
  },
  {
    id: 'line',
    group: 'draw',
    label: 'Straight Line',
    tooltip: 'Draw line',
    icon: Minus,
  },
  {
    id: 'rectangle',
    group: 'draw',
    label: 'Rectangle',
    tooltip: 'Draw rectangle',
    icon: Square,
    shortcut: 'R',
  },
  {
    id: 'circle',
    group: 'draw',
    label: 'Circle',
    tooltip: 'Draw circle',
    icon: Circle,
    shortcut: 'C',
  },
  {
    id: 'text_box',
    group: 'draw',
    label: 'Text Box',
    tooltip: 'Add text box',
    icon: Type,
    shortcut: 'T',
  },

  // 3. NOTES GROUP
  {
    id: 'sticky_note',
    group: 'notes',
    label: 'Sticky Note',
    tooltip: 'Add sticky note',
    icon: StickyNote,
    shortcut: 'N',
  },
  {
    id: 'comment',
    group: 'notes',
    label: 'Comment',
    tooltip: 'Add comment',
    icon: MessageSquare,
  },
  {
    id: 'numbered_marker',
    group: 'notes',
    label: 'Numbered Marker',
    tooltip: 'Add numbered marker',
    icon: Hash,
  },
  {
    id: 'question',
    group: 'notes',
    label: 'Question',
    tooltip: 'Add question',
    icon: HelpCircle,
  },
  {
    id: 'task_marker',
    group: 'notes',
    label: 'Task Marker',
    tooltip: 'Add task',
    icon: CheckCircle2,
  },

  // 4. EDIT GROUP
  {
    id: 'crop',
    group: 'edit',
    label: 'Crop',
    tooltip: 'Crop',
    icon: Crop,
  },
  {
    id: 'blur',
    group: 'edit',
    label: 'Blur',
    tooltip: 'Blur area',
    icon: EyeOff,
  },
  {
    id: 'pixelate',
    group: 'edit',
    label: 'Pixelate',
    tooltip: 'Pixelate area',
    icon: Square,
  },
  {
    id: 'eraser',
    group: 'edit',
    label: 'Eraser',
    tooltip: 'Eraser',
    icon: Eraser,
  },
  {
    id: 'undo',
    group: 'edit',
    label: 'Undo',
    tooltip: 'Undo',
    icon: Undo,
    shortcut: 'Ctrl + Z',
  },
  {
    id: 'redo',
    group: 'edit',
    label: 'Redo',
    tooltip: 'Redo',
    icon: Redo,
    shortcut: 'Ctrl + Shift + Z',
  },
  {
    id: 'delete_selected',
    group: 'edit',
    label: 'Delete Selected',
    tooltip: 'Delete selected annotation',
    icon: Trash2,
    shortcut: 'Delete',
    destructive: true,
  },

  // 5. MORE GROUP
  {
    id: 'toggle_visibility',
    group: 'more',
    label: 'Show / Hide Annotations',
    tooltip: 'Show annotations',
    icon: Eye,
  },
  {
    id: 'exit_mode',
    group: 'more',
    label: 'Exit Annotation Mode',
    tooltip: 'Exit annotation mode',
    icon: LogOut,
    shortcut: 'Escape',
  },
];

export const PRESET_COLORS = [
  { name: 'Yellow', hex: '#FDE047', label: 'Classic Yellow' },
  { name: 'Green', hex: '#4ADE80', label: 'Emerald Green' },
  { name: 'Blue', hex: '#60A5FA', label: 'Ocean Blue' },
  { name: 'Red', hex: '#F87171', label: 'Crimson Red' },
  { name: 'Purple', hex: '#C084FC', label: 'Royal Purple' },
  { name: 'Orange', hex: '#FB923C', label: 'Amber Orange' },
];
