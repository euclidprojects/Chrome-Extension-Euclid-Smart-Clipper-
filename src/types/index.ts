export type ClipType =
  | 'screenshot'
  | 'youtube_note'
  | 'bookmark'
  | 'simplified_article'
  | 'full_page';

export type CaptureJobType =
  | 'visible_page'
  | 'selected_area'
  | 'full_page'
  | 'video_frame'
  | 'element';

export type CaptureJobStatus =
  | 'selecting'
  | 'capturing'
  | 'processing'
  | 'editing'
  | 'saving'
  | 'complete'
  | 'failed'
  | 'cancelled';

export interface CaptureJob {
  id: string;
  type: CaptureJobType;
  tabId?: number;
  sourceUrl: string;
  sourceTitle: string;
  createdAt: number;
  status: CaptureJobStatus;
  imageBlobKey?: string;
  dataUrl?: string;
  annotatedDataUrl?: string;
  originalWidth?: number;
  originalHeight?: number;
  selectionRect?: {
    x: number;
    y: number;
    width: number;
    height: number;
    viewportX?: number;
    viewportY?: number;
    viewportWidth?: number;
    viewportHeight?: number;
    devicePixelRatio?: number;
  };
  videoTimestamp?: number;
  formattedVideoTime?: string;
  userRemark?: string;
  notebookId?: string;
  folderId?: string;
  tagIds?: string[];
  annotations?: EuclidAnnotation[];
  cropData?: { x: number; y: number; width: number; height: number };
  error?: string;
}

export interface SaveClipRequest {
  clipType: ClipType;
  title: string;
  sourceUrl: string;
  canonicalUrl?: string;
  content?: string;
  annotations?: EuclidAnnotation[];
  attachments?: EuclidAttachment[];
  transcript?: TranscriptItem[];
  videoNotes?: VideoTimestampNote[];
  notebookId?: string;
  folderId?: string;
  tagIds?: string[];
  existingNoteId?: string;
  noteColor?: string;
  userRemark?: string;
  saveMode?: 'local' | 'sync';
}

export type EuclidNoteType =
  | 'standard'
  | 'web_clip'
  | 'article'
  | 'bookmark'
  | 'screenshot'
  | 'annotated_screenshot'
  | 'youtube'
  | 'video'
  | 'recording'
  | 'audio'
  | 'pdf'
  | 'research'
  | 'code'
  | 'quote'
  | 'task';

export type SyncStatus =
  | 'local_only'
  | 'queued'
  | 'uploading'
  | 'synced'
  | 'conflict'
  | 'failed'
  | 'deleted_remotely';

export interface EuclidUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  plan?: 'free' | 'pro' | 'education' | 'team';
  storageUsed?: number;
  storageLimit?: number;
  connectedToSmartNotes: boolean;
  lastSyncedAt?: string;
}

export interface EuclidNotebook {
  id: string;
  userId: string;
  name: string;
  color?: string;
  icon?: string;
  description?: string;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EuclidFolder {
  id: string;
  userId: string;
  notebookId?: string;
  parentId?: string | null;
  name: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EuclidTag {
  id: string;
  userId: string;
  name: string;
  color?: string;
  group?: string;
  createdAt: string;
}

export interface EuclidAttachment {
  id: string;
  attachmentId?: string;
  userId: string;
  noteId: string;
  filename: string;
  originalFilename: string;
  mimeType: string;
  fileSize: number;
  storagePath: string;
  downloadURL: string;
  thumbnailURL?: string;
  width?: number;
  height?: number;
  duration?: number;
  sourceURL?: string;
  createdAt: string;
  updatedAt: string;
}

export type AnnotationType =
  | 'highlight'
  | 'underline'
  | 'strikethrough'
  | 'comment'
  | 'sticky_note'
  | 'freehand'
  | 'arrow'
  | 'rectangle'
  | 'circle'
  | 'text_box'
  | 'blur'
  | 'pixelate'
  | 'timestamp'
  | 'bookmark';

export interface EuclidAnnotation {
  id: string;
  userId: string;
  noteId: string;
  attachmentId?: string;
  sourceUrl?: string;
  type: AnnotationType;
  color: string;
  text?: string;
  comment?: string;
  selectedText?: string;
  startOffset?: number;
  endOffset?: number;
  xpath?: string;
  cssSelector?: string;
  boundingRect?: { x: number; y: number; width: number; height: number };
  pageNumber?: number;
  videoTimestamp?: number;
  drawingData?: any;
  shapeData?: any;
  createdAt: string;
  updatedAt: string;
}

export interface VideoTimestampNote {
  id: string;
  timestamp: number; // in seconds
  formattedTime: string; // e.g. "03:42"
  title: string;
  content: string;
  screenshotUrl?: string;
  category?: 'note' | 'highlight' | 'question' | 'task' | 'bookmark' | 'chapter';
  importance?: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface TranscriptItem {
  id: string;
  start: number;
  duration: number;
  text: string;
  isHighlighted?: boolean;
  userNote?: string;
}

export interface EuclidVideoNote {
  videoId: string;
  platform: 'youtube' | 'vimeo' | 'html5' | 'educational' | 'local';
  videoTitle: string;
  channelName?: string;
  channelUrl?: string;
  videoUrl: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  duration: number; // in seconds
  timestampNotes: VideoTimestampNote[];
  transcript?: TranscriptItem[];
  chapters?: { time: number; title: string }[];
}

export interface EuclidRecording {
  id: string;
  title: string;
  type: 'tab' | 'window' | 'screen' | 'audio' | 'webcam';
  duration: number;
  hasWebcam: boolean;
  hasMic: boolean;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  chapters?: { time: number; title: string }[];
  captions?: { start: number; end: number; text: string }[];
}

export interface EuclidNote {
  id: string;
  user_id: string;
  title: string;
  content: string; // HTML or Markdown
  plainTextContent?: string;
  markdownContent?: string;
  sanitizedHtmlContent?: string;
  folder_id?: string | null;
  notebook_id?: string | null;
  color?: string;
  is_pinned?: boolean;
  is_favorite?: boolean;
  is_archived?: boolean;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;

  // Extended Metadata for Clipper
  noteType: EuclidNoteType;
  sourceUrl?: string;
  canonicalUrl?: string;
  sourceTitle?: string;
  sourceDomain?: string;
  sourceAuthor?: string;
  sourcePublishedAt?: string;
  sourceFavicon?: string;
  sourceThumbnail?: string;
  clipFormat?: ClipType;
  wordCount?: number;
  readingTime?: number;
  tags?: string[];
  
  // Video fields
  videoData?: EuclidVideoNote;
  
  // Recording fields
  recordingData?: EuclidRecording;

  // Annotations & attachments
  annotations?: EuclidAnnotation[];
  attachments?: EuclidAttachment[];

  // Sync details
  extensionCreated?: boolean;
  extensionVersion?: string;
  syncStatus: SyncStatus;
  contentFingerprint?: string;
  lastSyncedAt?: string;
}

export interface EuclidSyncJob {
  id: string;
  noteId: string;
  action: 'create' | 'update' | 'delete';
  payload: Partial<EuclidNote>;
  retryCount: number;
  status: 'pending' | 'in_progress' | 'failed' | 'completed';
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EuclidTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  contentTemplate: string;
  frontMatterTemplate?: string;
  variables: string[];
}
