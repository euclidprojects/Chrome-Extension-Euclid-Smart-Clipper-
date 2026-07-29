import {
  auth,
  db,
  storage,
  googleProvider,
  firebaseConfig,
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
  onSnapshot,
  serverTimestamp,
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
import { localNoteRepo } from '../storage/indexedDB';

export interface SaveScreenshotParams {
  screenshotDataUrl: string;
  title?: string;
  sourceUrl?: string;
  sourceTitle?: string;
  notebookId?: string | null;
  folderId?: string | null;
  tags?: string[];
  userRemark?: string;
  annotations?: any[];
  capturedAt?: string;
}

export interface SaveScreenshotResult {
  success: boolean;
  noteId?: string;
  imageUrl?: string;
  error?: string;
}

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
  // Required Save to Smart Notes Flow
  async saveScreenshotToSmartNotes(params: SaveScreenshotParams): Promise<SaveScreenshotResult> {
    console.log('[Smart Notes] Starting Firestore save');
    try {
      if (auth?.authStateReady) {
        await auth.authStateReady();
      }

      // 1. Confirm that the user is authenticated & obtain current Firebase user's uid
      let currentUser = auth?.currentUser;
      if (!currentUser) {
        // Wait briefly for auth initialization if needed
        currentUser = await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (u) => {
            unsubscribe();
            resolve(u);
          });
          setTimeout(() => {
            unsubscribe();
            resolve(auth?.currentUser);
          }, 2500);
        });
      }

      if (!currentUser) {
        throw new Error('Please sign in before saving to Smart Notes.');
      }

      const uid = currentUser.uid;
      const timestamp = Date.now();
      const noteId = `note_${timestamp}_${Math.random().toString(36).substring(2, 7)}`;

      console.log('[Firebase Debug] Project:', firebaseConfig.projectId);
      console.log('[Firebase Debug] User:', uid);
      console.log('[Firebase Debug] Firestore save started');
      console.log('[Firebase Debug] Firestore document path:', `Notes/${noteId}`);

      // 2. Prepare screenshot - convert screenshot data URL or Blob into a valid image file
      console.log('[Smart Notes] Preparing screenshot');
      const dataUrl = params.screenshotDataUrl;
      if (!dataUrl) {
        throw new Error('No screenshot image data provided.');
      }

      let blob: Blob;
      if (dataUrl.startsWith('data:')) {
        const arr = dataUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        blob = new Blob([u8arr], { type: mime });
      } else if (dataUrl.startsWith('http') || dataUrl.startsWith('blob:')) {
        const response = await fetch(dataUrl);
        blob = await response.blob();
      } else {
        throw new Error('Invalid screenshot data format.');
      }

      // 3. Upload the screenshot to Firebase Storage using required user path
      console.log('[Smart Notes] Uploading screenshot');
      const fileName = `${timestamp}-screenshot.png`;
      const storagePath = `users/${uid}/smart-notes/screenshots/${fileName}`;
      const storageRef = ref(storage, storagePath);

      await uploadBytes(storageRef, blob, { contentType: 'image/png' });
      console.log('[Smart Notes] Screenshot uploaded');

      // 4. Obtain download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log(`[Smart Notes] Download URL received: ${downloadURL}`);

      // 5. Create a Firestore note document containing the screenshot URL
      console.log('[Smart Notes] Creating Firestore note');
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const title = params.title || `Screenshot ${formattedDate}`;
      const sourceUrl = params.sourceUrl || '';
      const sourceTitle = params.sourceTitle || title;
      const sourceDomain = sourceUrl ? new URL(sourceUrl).hostname : '';
      const userRemark = params.userRemark || '';
      const nowIso = new Date().toISOString();

      const htmlContent = `
        <div class="euclid-clip-body">
          <h3>${title}</h3>
          ${userRemark ? `<p class="font-medium text-emerald-900 my-2"><strong>Remark:</strong> ${userRemark}</p>` : ''}
          <div class="my-3">
            <img src="${downloadURL}" alt="${title}" class="rounded-xl border shadow-lg max-w-full h-auto"/>
          </div>
          ${sourceUrl ? `<p class="text-xs text-slate-500">Source: <a href="${sourceUrl}" target="_blank" class="text-emerald-600 underline">${sourceTitle}</a></p>` : ''}
        </div>
      `;

      const plainTextContent = (userRemark ? `${userRemark}\n\n` : '') + (sourceUrl ? `Source: ${sourceUrl}` : '');
      const markdownContent = `# ${title}\n\n${userRemark ? `**Remark:** ${userRemark}\n\n` : ''}![${title}](${downloadURL})\n\n${sourceUrl ? `*Source: [${sourceTitle}](${sourceUrl})*` : ''}`;

      const noteDocument = {
        id: noteId,
        userId: uid,
        user_id: uid,
        title: title,
        content: htmlContent,
        plainTextContent: plainTextContent,
        markdownContent: markdownContent,
        type: 'screenshot',
        noteType: 'annotated_screenshot',
        clipFormat: 'screenshot',
        source: 'euclid-smart-clipper',
        sourceUrl: sourceUrl,
        canonicalUrl: sourceUrl,
        sourceTitle: sourceTitle,
        sourceDomain: sourceDomain,
        imageUrl: downloadURL,
        screenshotUrl: downloadURL,
        notebook_id: params.notebookId || null,
        folder_id: params.folderId || null,
        tags: params.tags || [],
        annotations: params.annotations || [],
        attachments: [
          {
            id: `att_${timestamp}`,
            type: 'image',
            url: downloadURL,
            downloadURL: downloadURL,
            name: fileName,
            filename: fileName,
            mimeType: 'image/png',
            storagePath: storagePath,
          },
        ],
        is_pinned: false,
        is_favorite: false,
        is_archived: false,
        is_deleted: false,
        extensionCreated: true,
        extensionVersion: '1.0.0',
        syncStatus: 'synced',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        created_at: nowIso,
        updated_at: nowIso,
      };

      // Primary top-level Notes write
      await setDoc(doc(db, 'Notes', noteId), noteDocument, { merge: true });
      console.log(`[Smart Notes] Firestore note created: ${noteId}`);

      // Subcollection users/{uid}/notes write
      try {
        await setDoc(doc(db, 'users', uid, 'notes', noteId), noteDocument, { merge: true });
      } catch (e) {
        console.warn('[Smart Notes] Subcollection notes write fallback:', e);
      }

      // Subcollection users/{uid}/clips write
      try {
        await setDoc(doc(db, 'users', uid, 'clips', noteId), noteDocument, { merge: true });
      } catch (e) {
        console.warn('[Smart Notes] Subcollection clips write fallback:', e);
      }

      // Update IndexedDB local store
      try {
        const localNote: EuclidNote = {
          ...noteDocument,
          createdAt: nowIso,
          updatedAt: nowIso,
        } as any;
        await localNoteRepo.save(localNote);
      } catch (e) {
        console.warn('[Smart Notes] IndexedDB local save fallback:', e);
      }

      console.log('[Smart Notes] Save completed successfully');
      return {
        success: true,
        noteId: noteId,
        imageUrl: downloadURL,
      };
    } catch (error: any) {
      console.error('[Smart Notes] Save failed', {
        code: error?.code,
        message: error?.message,
        stack: error?.stack,
      });

      let userFriendlyMessage = error?.message || 'The clip could not be saved to Smart Notes.';
      if (!auth?.currentUser || error?.message?.includes('sign in')) {
        userFriendlyMessage = 'Please sign in before saving to Smart Notes.';
      } else if (error?.code === 'permission-denied' || error?.code === 'storage/unauthorized') {
        userFriendlyMessage = 'Firestore denied permission to create this note.';
      } else if (error?.code?.includes('storage/')) {
        userFriendlyMessage = 'The screenshot could not be uploaded.';
      }

      return {
        success: false,
        error: userFriendlyMessage,
      };
    }
  },

  // Real-time listener for user's Smart Notes
  subscribeToUserNotes(userId: string, callback: (notes: EuclidNote[]) => void): () => void {
    const q = query(collection(db, 'Notes'), where('user_id', '==', userId));
    return onSnapshot(
      q,
      (snapshot) => {
        const notes: EuclidNote[] = [];
        snapshot.forEach((d) => {
          notes.push({ id: d.id, ...d.data() } as EuclidNote);
        });
        callback(notes);
      },
      (err) => {
        console.warn('[Smart Notes] Snapshot listener warning:', err);
      }
    );
  },

  async fetchUserNotes(userId: string): Promise<EuclidNote[]> {
    try {
      const q = query(collection(db, 'Notes'), where('user_id', '==', userId));
      const snap = await getDocs(q);
      const list: EuclidNote[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as EuclidNote));
      return list;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'Notes');
      return [];
    }
  },

  // Save clip under secure user path: users/{userId}/clips/{clipId}
  async saveNoteToSmartNotes(note: EuclidNote, userId: string): Promise<boolean> {
    console.log('[Smart Notes] Starting Firestore save for clip:', note.id);
    try {
      if (auth?.authStateReady) {
        await auth.authStateReady();
      }

      const currentUser = auth?.currentUser;
      if (!currentUser) {
        throw new Error('Please sign in before saving to Smart Notes.');
      }

      const uid = currentUser.uid || userId;
      console.log('[Firebase Debug] Project:', firebaseConfig.projectId);
      console.log('[Firebase Debug] User:', uid);
      console.log('[Firebase Debug] Firestore save started');
      console.log('[Firebase Debug] Firestore document path:', `Notes/${note.id}`);

      const now = new Date().toISOString();
      const clipPayload = {
        id: note.id,
        userId: uid,
        user_id: uid,
        createdAt: note.created_at || now,
        updatedAt: now,
        created_at: note.created_at || now,
        updated_at: now,
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
        is_deleted: false,
        is_archived: false,
        is_pinned: false,
        is_favorite: false,
        syncStatus: 'synced',
        lastSyncedAt: now,
      };

      // Top-level Notes collection write
      await setDoc(doc(db, 'Notes', note.id), clipPayload, { merge: true });
      console.log('[Smart Notes] Firestore note created:', note.id);

      // Primary store: users/{uid}/clips/{clipId}
      try {
        await setDoc(doc(db, 'users', uid, 'clips', note.id), clipPayload, { merge: true });
      } catch (err) {
        console.warn('Subcollection clips write fallback:', err);
      }

      // Subcollection users/{uid}/notes/{clipId}
      try {
        await setDoc(doc(db, 'users', uid, 'notes', note.id), clipPayload, { merge: true });
      } catch (err) {
        console.warn('Subcollection notes write fallback:', err);
      }

      console.log('[Smart Notes] Save completed successfully');
      return true;
    } catch (error: any) {
      console.error('[Smart Notes] Save failed', {
        code: error?.code,
        message: error?.message,
        stack: error?.stack,
      });
      throw error;
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

