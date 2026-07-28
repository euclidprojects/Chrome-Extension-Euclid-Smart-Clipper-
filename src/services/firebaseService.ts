import {
  auth,
  db,
  storage,
  googleProvider,
  signInWithPopup,
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

// Convert Firebase user object or Firestore document to EuclidUser
export async function buildEuclidUserFromFirebase(fbUser: FirebaseUser): Promise<EuclidUser> {
  let photo = fbUser.photoURL || null;
  let name = fbUser.displayName || fbUser.email?.split('@')[0] || 'Euclid User';

  try {
    const userDocRef = doc(db, 'users', fbUser.uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data.displayName) name = data.displayName;
      if (data.photoURL) photo = data.photoURL;
    }
  } catch (err) {
    console.warn('Could not read user profile document:', err);
  }

  return {
    uid: fbUser.uid,
    email: fbUser.email,
    displayName: name,
    photoURL: photo,
    plan: 'pro',
    storageUsed: 142 * 1024 * 1024,
    storageLimit: 10 * 1024 * 1024 * 1024,
    connectedToSmartNotes: true,
    lastSyncedAt: new Date().toISOString(),
  };
}

export const firebaseAuthService = {
  // Listen to Auth State Changes with shared listener
  onAuthChange(callback: (user: EuclidUser | null) => void): () => void {
    return onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const euclidUser = await buildEuclidUserFromFirebase(fbUser);
        callback(euclidUser);
      } else {
        callback(null);
      }
    });
  },

  // Google Sign-In with minimum scopes (openid, email, profile)
  async signInWithGoogle(): Promise<EuclidUser> {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const fbUser = res.user;

      const euclidUser: EuclidUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName || 'Euclid User',
        photoURL: fbUser.photoURL,
        plan: 'pro',
        storageUsed: 142 * 1024 * 1024,
        storageLimit: 10 * 1024 * 1024 * 1024,
        connectedToSmartNotes: true,
        lastSyncedAt: new Date().toISOString(),
      };

      // Save/merge profile in Firestore users/{uid}
      try {
        await setDoc(
          doc(db, 'users', fbUser.uid),
          {
            uid: fbUser.uid,
            displayName: fbUser.displayName || 'Euclid User',
            email: fbUser.email,
            photoURL: fbUser.photoURL || null,
            provider: 'google',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, `users/${fbUser.uid}`);
      }

      return euclidUser;
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      throw new Error(error.message || 'Google sign-in was cancelled or failed.');
    }
  },

  // Create Account with Email and Password
  async signUpWithEmail(fullName: string, email: string, password: string): Promise<{ user: EuclidUser; verificationSent: boolean }> {
    // Password validation requirements
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain at least one number.');
    }

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const fbUser = res.user;

    // Update display name
    await updateProfile(fbUser, { displayName: fullName });

    // Send verification email
    let verificationSent = false;
    try {
      await sendEmailVerification(fbUser);
      verificationSent = true;
    } catch (e) {
      console.warn('Could not send verification email:', e);
    }

    const euclidUser: EuclidUser = {
      uid: fbUser.uid,
      email: fbUser.email,
      displayName: fullName,
      photoURL: null,
      plan: 'pro',
      storageUsed: 0,
      storageLimit: 10 * 1024 * 1024 * 1024,
      connectedToSmartNotes: true,
      lastSyncedAt: new Date().toISOString(),
    };

    // Save profile under users/{uid} in Firestore
    try {
      await setDoc(doc(db, 'users', fbUser.uid), {
        uid: fbUser.uid,
        displayName: fullName,
        email: fbUser.email,
        photoURL: null,
        provider: 'email',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${fbUser.uid}`);
    }

    return { user: euclidUser, verificationSent };
  },

  // Sign In with Email and Password
  async signInWithEmail(email: string, password: string): Promise<EuclidUser> {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = res.user;
    return await buildEuclidUserFromFirebase(fbUser);
  },

  // Send Password Reset Email
  async sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  // Sign Out
  async signOut(): Promise<void> {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.error('Sign out error:', e);
    }
  },
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

