import { openDB, DBSchema, IDBPDatabase } from 'idb';
import {
  EuclidNote,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidSyncJob,
  EuclidAttachment,
  EuclidTemplate,
  CaptureJob,
} from '../types';

interface EuclidDBSchema extends DBSchema {
  notes: {
    key: string;
    value: EuclidNote;
    indexes: {
      'by-updated': string;
      'by-type': string;
      'by-sync': string;
      'by-folder': string;
      'by-notebook': string;
    };
  };
  notebooks: {
    key: string;
    value: EuclidNotebook;
  };
  folders: {
    key: string;
    value: EuclidFolder;
    indexes: { 'by-notebook': string };
  };
  tags: {
    key: string;
    value: EuclidTag;
  };
  syncJobs: {
    key: string;
    value: EuclidSyncJob;
    indexes: { 'by-status': string };
  };
  attachments: {
    key: string;
    value: EuclidAttachment;
    indexes: { 'by-note': string };
  };
  captureJobs: {
    key: string;
    value: CaptureJob;
    indexes: { 'by-created': number };
  };
  settings: {
    key: string;
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<EuclidDBSchema>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<EuclidDBSchema>('euclid_smart_clipper_db', 2, {
      upgrade(db) {
        // Notes Store
        if (!db.objectStoreNames.contains('notes')) {
          const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
          noteStore.createIndex('by-updated', 'updated_at');
          noteStore.createIndex('by-type', 'noteType');
          noteStore.createIndex('by-sync', 'syncStatus');
          noteStore.createIndex('by-folder', 'folder_id');
          noteStore.createIndex('by-notebook', 'notebook_id');
        }

        // Notebooks Store
        if (!db.objectStoreNames.contains('notebooks')) {
          db.createObjectStore('notebooks', { keyPath: 'id' });
        }

        // Folders Store
        if (!db.objectStoreNames.contains('folders')) {
          const folderStore = db.createObjectStore('folders', { keyPath: 'id' });
          folderStore.createIndex('by-notebook', 'notebookId');
        }

        // Tags Store
        if (!db.objectStoreNames.contains('tags')) {
          db.createObjectStore('tags', { keyPath: 'id' });
        }

        // Sync Jobs Store
        if (!db.objectStoreNames.contains('syncJobs')) {
          const syncStore = db.createObjectStore('syncJobs', { keyPath: 'id' });
          syncStore.createIndex('by-status', 'status');
        }

        // Attachments Store
        if (!db.objectStoreNames.contains('attachments')) {
          const attachStore = db.createObjectStore('attachments', { keyPath: 'id' });
          attachStore.createIndex('by-note', 'noteId');
        }

        // Capture Jobs Store
        if (!db.objectStoreNames.contains('captureJobs')) {
          const captureStore = db.createObjectStore('captureJobs', { keyPath: 'id' });
          captureStore.createIndex('by-created', 'createdAt');
        }

        // Settings Store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings');
        }
      },
    });
  }
  return dbPromise;
}

// Initial Seed Data for local-first execution
export async function initializeLocalDefaults() {
  const db = await getDB();

  // Seed default notebook if empty
  const notebooks = await db.getAll('notebooks');
  if (notebooks.length === 0) {
    const defaultNotebook: EuclidNotebook = {
      id: 'default-notebook',
      userId: 'local-user',
      name: 'General Research',
      color: '#10b981',
      description: 'Default destination for web clips and research notes',
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await db.put('notebooks', defaultNotebook);

    const quickFolder: EuclidFolder = {
      id: 'quick-clips',
      userId: 'local-user',
      notebookId: 'default-notebook',
      parentId: null,
      name: 'Quick Clips',
      color: '#84cc16',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await db.put('folders', quickFolder);

    // Default tags
    const defaultTags: EuclidTag[] = [
      { id: 'tag-web', userId: 'local-user', name: 'WebClip', color: '#10b981', group: 'Sources', createdAt: new Date().toISOString() },
      { id: 'tag-youtube', userId: 'local-user', name: 'YouTube', color: '#ef4444', group: 'Media', createdAt: new Date().toISOString() },
      { id: 'tag-article', userId: 'local-user', name: 'Article', color: '#3b82f6', group: 'Content', createdAt: new Date().toISOString() },
      { id: 'tag-todo', userId: 'local-user', name: 'ActionItem', color: '#f59e0b', group: 'Tasks', createdAt: new Date().toISOString() },
    ];
    for (const tag of defaultTags) {
      await db.put('tags', tag);
    }
  }
}

// Helper Repositories
export const localNoteRepo = {
  async getAll(): Promise<EuclidNote[]> {
    const db = await getDB();
    const notes = await db.getAll('notes');
    return notes.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  },

  async getById(id: string): Promise<EuclidNote | undefined> {
    const db = await getDB();
    return db.get('notes', id);
  },

  async save(note: EuclidNote): Promise<void> {
    const db = await getDB();
    await db.put('notes', note);
  },

  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('notes', id);
  },

  async search(query: string): Promise<EuclidNote[]> {
    const all = await this.getAll();
    const q = query.toLowerCase().trim();
    if (!q) return all;
    return all.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        (n.plainTextContent && n.plainTextContent.toLowerCase().includes(q)) ||
        (n.sourceUrl && n.sourceUrl.toLowerCase().includes(q)) ||
        (n.tags && n.tags.some((t) => t.toLowerCase().includes(q))) ||
        (n.videoData && n.videoData.videoTitle.toLowerCase().includes(q))
    );
  },
};

export const localNotebookRepo = {
  async getAll(): Promise<EuclidNotebook[]> {
    const db = await getDB();
    return db.getAll('notebooks');
  },
  async save(nb: EuclidNotebook): Promise<void> {
    const db = await getDB();
    await db.put('notebooks', nb);
  },
};

export const localFolderRepo = {
  async getAll(): Promise<EuclidFolder[]> {
    const db = await getDB();
    return db.getAll('folders');
  },
  async save(folder: EuclidFolder): Promise<void> {
    const db = await getDB();
    await db.put('folders', folder);
  },
};

export const localTagRepo = {
  async getAll(): Promise<EuclidTag[]> {
    const db = await getDB();
    return db.getAll('tags');
  },
  async save(tag: EuclidTag): Promise<void> {
    const db = await getDB();
    await db.put('tags', tag);
  },
};

export const localCaptureJobRepo = {
  async save(job: CaptureJob): Promise<void> {
    const db = await getDB();
    await db.put('captureJobs', job);
  },
  async getById(id: string): Promise<CaptureJob | undefined> {
    const db = await getDB();
    return db.get('captureJobs', id);
  },
  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('captureJobs', id);
  },
  async update(id: string, partial: Partial<CaptureJob>): Promise<CaptureJob | undefined> {
    const db = await getDB();
    const existing = await db.get('captureJobs', id);
    if (!existing) return undefined;
    const updated = { ...existing, ...partial };
    await db.put('captureJobs', updated);
    return updated;
  },
};
