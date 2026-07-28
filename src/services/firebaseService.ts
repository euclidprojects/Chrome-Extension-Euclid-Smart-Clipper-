import {
  auth,
  db,
  storage,
  googleProvider,
  fbSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseUser,
} from '../firebase/config';
import { authService } from './authService';
import {
  EuclidNote,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidUser,
  EuclidAttachment,
} from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

export const firebaseAuthService = {
  onAuthChange(callback: (user: EuclidUser | null) => void): () => void {
    return authService.subscribe((state) => callback(state.user));
  },
  signInWithGoogle: () => authService.signInWithGoogle(),
  signUpWithEmail: (fullName: string, email: string, password: string) =>
    authService.signUpWithEmail(fullName, email, password),
  signInWithEmail: (email: string, password: string) =>
    authService.signInWithEmail(email, password),
  sendPasswordReset: (email: string) => authService.sendPasswordReset(email),
  signOut: () => authService.signOut(),
};

export const firebaseSyncService = {
  // Save clip under secure user path: users/{userId}/clips/{clipId}
  async saveNoteToSmartNotes(note: EuclidNote, userId: string): Promise<boolean> {
    try {
      const now = new Date().toISOString();
      const clipPayload = {
        id: note.id,
        userId: userId,
        createdAt: note.created_at || now,
        updatedAt: now,
        sourceType: note.clipFormat || 'bookmark',
        sourceUrl: note.sourceUrl || '',
        title: note.title,
        content: note.content,
        plainTextContent: note.plainTextContent || '',
        markdownContent: note.markdownContent || '',
        sourceDomain: note.sourceDomain || '',
        sourceAuthor: note.sourceAuthor || '',
        sourceFavicon: note.sourceFavicon || '',
        videoData: note.videoData || null,
        tags: note.tags || [],
        notebook_id: note.notebook_id || null,
        folder_id: note.folder_id || null,
      };

      // Primary store: users/{uid}/clips/{clipId}
      await setDoc(doc(db, 'users', userId, 'clips', note.id), clipPayload, { merge: true });

      // Dual store for Smart Notes app integration: Notes/{clipId}
      try {
        const legacyPayload = {
          ...note,
          user_id: userId,
          updated_at: now,
          lastSyncedAt: now,
          syncStatus: 'synced',
        };
        await setDoc(doc(db, 'Notes', note.id), legacyPayload, { merge: true });
      } catch (err) {
        console.warn('Dual Notes collection write fallback:', err);
      }

      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${userId}/clips/${note.id}`);
      return false;
    }
  },

  async fetchUserNotebooks(userId: string): Promise<EuclidNotebook[]> {
    try {
      const q = query(collection(db, 'notebooks'), where('userId', '==', userId));
      const snap = await getDocs(q);
      const list: EuclidNotebook[] = [];
      snap.forEach((d) => list.push(d.data() as EuclidNotebook));
      return list;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'notebooks');
      return [];
    }
  },

  async fetchUserFolders(userId: string): Promise<EuclidFolder[]> {
    try {
      const q = query(collection(db, 'Folders'), where('userId', '==', userId));
      const snap = await getDocs(q);
      const list: EuclidFolder[] = [];
      snap.forEach((d) => list.push(d.data() as EuclidFolder));
      return list;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'Folders');
      return [];
    }
  },

  async fetchUserTags(userId: string): Promise<EuclidTag[]> {
    try {
      const q = query(collection(db, 'Tags'), where('userId', '==', userId));
      const snap = await getDocs(q);
      const list: EuclidTag[] = [];
      snap.forEach((d) => list.push(d.data() as EuclidTag));
      return list;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'Tags');
      return [];
    }
  },

  async uploadAttachment(
    userId: string,
    noteId: string,
    file: Blob,
    filename: string,
    mimeType: string
  ): Promise<EuclidAttachment | null> {
    try {
      const attachId = 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const storagePath = `users/${userId}/notes/${noteId}/attachments/${attachId}/${filename}`;
      const storageRef = ref(storage, storagePath);

      let downloadURL = '';
      try {
        await uploadBytes(storageRef, file);
        downloadURL = await getDownloadURL(storageRef);
      } catch (uploadErr) {
        console.warn('Storage upload fallback to Data URL object store', uploadErr);
        downloadURL = URL.createObjectURL(file);
      }

      const attachment: EuclidAttachment = {
        id: attachId,
        attachmentId: attachId,
        userId,
        noteId,
        filename,
        originalFilename: filename,
        mimeType,
        fileSize: file.size,
        storagePath,
        downloadURL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'Attachments', attachId), attachment);
      return attachment;
    } catch (e) {
      console.error('Failed attachment upload', e);
      return null;
    }
  },
};

