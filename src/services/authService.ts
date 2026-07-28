import {
  auth,
  db,
  firebaseConfig,
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
  FirebaseUser,
} from '../firebase/config';
import { EuclidUser } from '../types';
import { initiateGoogleSignIn } from './googleAuthService';

export type AuthStatus =
  | "initializing"
  | "signed-out"
  | "authenticating"
  | "signed-in"
  | "error";

export interface AuthState {
  status: AuthStatus;
  user: EuclidUser | null;
  error: string | null;
  errorCode?: string | null;
}

export const authErrorMessages: Record<string, string> = {
  "auth/internal-error": "Authentication could not be started. Please try again.",
  "auth/operation-not-allowed": "This sign-in method is not currently enabled.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/wrong-password": "The email or password is incorrect.",
  "auth/user-not-found": "No account found with this email address.",
  "auth/email-already-in-use": "An account already exists with this email address.",
  "auth/network-request-failed": "A network error occurred. Check your internet connection.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  "auth/popup-blocked": "The Google sign-in window was blocked.",
  "auth/unauthorized-domain": "This extension is not authorized for authentication.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password is too weak. Must be at least 8 characters with upper, lower, and numbers.",
};

export function getFriendlyAuthErrorMessage(error: any): string {
  if (!error) return "";
  const code = error.code || (typeof error === "string" ? error : "");
  if (code && authErrorMessages[code]) {
    return authErrorMessages[code];
  }
  if (error.message) {
    if (error.message.includes("auth/internal-error")) {
      return authErrorMessages["auth/internal-error"];
    }
    if (error.message.includes("auth/invalid-credential")) {
      return authErrorMessages["auth/invalid-credential"];
    }
    if (error.message.includes("auth/email-already-in-use")) {
      return authErrorMessages["auth/email-already-in-use"];
    }
    if (error.message.includes("auth/popup-closed-by-user")) {
      return authErrorMessages["auth/popup-closed-by-user"];
    }
    return error.message.replace(/^Firebase:\s*/, "");
  }
  return "An unexpected authentication error occurred. Please try again.";
}

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

class AuthService {
  private state: AuthState = {
    status: 'initializing',
    user: null,
    error: null,
  };

  private listeners: Set<(state: AuthState) => void> = new Set();
  private unsubscribeFirebase: (() => void) | null = null;

  constructor() {
    this.init();
  }

  private init() {
    if (this.unsubscribeFirebase) return;

    if (typeof chrome !== 'undefined' && chrome.runtime) {
      console.info("Extension ID:", chrome.runtime.id);
      console.info("Firebase project:", firebaseConfig.projectId);
      console.info("Auth domain:", firebaseConfig.authDomain);
      console.info("Offscreen API available:", Boolean(chrome.offscreen));
    }

    // Ensure initial startup state has no stale errors
    this.state.error = null;
    this.state.errorCode = null;

    this.unsubscribeFirebase = onAuthStateChanged(
      auth,
      async (fbUser) => {
        if (fbUser) {
          try {
            const euclidUser = await buildEuclidUserFromFirebase(fbUser);
            this.updateState({
              status: 'signed-in',
              user: euclidUser,
              error: null,
              errorCode: null,
            });
          } catch (e: any) {
            console.error("Authentication failure", {
              code: e?.code,
              message: e?.message,
              context: "popup"
            });
            this.updateState({
              status: 'signed-in',
              user: {
                uid: fbUser.uid,
                email: fbUser.email,
                displayName: fbUser.displayName || 'Euclid User',
                photoURL: fbUser.photoURL,
                plan: 'pro',
                storageUsed: 0,
                storageLimit: 10 * 1024 * 1024 * 1024,
                connectedToSmartNotes: true,
                lastSyncedAt: new Date().toISOString(),
              },
              error: null,
            });
          }
        } else {
          // Signed-out is NORMAL and MUST NOT create an error
          this.updateState({
            status: 'signed-out',
            user: null,
            error: null,
            errorCode: null,
          });
        }
      },
      (error: any) => {
        console.error("Authentication failure", {
          code: error?.code,
          message: error?.message,
          context: "popup"
        });
        // A signed-out user is normal; do not show error on initial load
        this.updateState({
          status: 'signed-out',
          user: null,
          error: null,
          errorCode: null,
        });
      }
    );
  }

  public getAuthState(): AuthState {
    return { ...this.state };
  }

  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    // Send immediate current state
    listener(this.getAuthState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private updateState(newState: Partial<AuthState>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.getAuthState()));
  }

  public clearError() {
    const isUserLoggedIn = Boolean(auth.currentUser);
    this.updateState({
      error: null,
      errorCode: null,
      status: isUserLoggedIn ? 'signed-in' : 'signed-out',
    });
  }

  public async signInWithGoogle(): Promise<EuclidUser> {
    this.updateState({ status: 'authenticating', error: null, errorCode: null });
    try {
      const fbUser = await initiateGoogleSignIn();
      const euclidUser = await buildEuclidUserFromFirebase(fbUser);

      // Save profile to Firestore users/{uid}
      try {
        await setDoc(
          doc(db, 'users', fbUser.uid),
          {
            uid: fbUser.uid,
            displayName: fbUser.displayName || 'Euclid User',
            email: fbUser.email,
            photoURL: fbUser.photoURL || null,
            provider: 'google',
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (e) {
        console.warn('Firestore profile write warning:', e);
      }

      this.updateState({
        status: 'signed-in',
        user: euclidUser,
        error: null,
      });
      return euclidUser;
    } catch (error: any) {
      console.error('Google Auth failure:', { code: error?.code, message: error?.message });
      const friendly = getFriendlyAuthErrorMessage(error);
      this.updateState({
        status: 'signed-out',
        user: null,
        error: friendly,
        errorCode: error?.code || 'auth/google-failed',
      });
      throw new Error(friendly);
    }
  }

  public async signInWithEmail(email: string, password: string): Promise<EuclidUser> {
    this.updateState({ status: 'authenticating', error: null, errorCode: null });
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const euclidUser = await buildEuclidUserFromFirebase(res.user);
      this.updateState({
        status: 'signed-in',
        user: euclidUser,
        error: null,
      });
      return euclidUser;
    } catch (error: any) {
      console.error('Email sign-in failure:', { code: error?.code, message: error?.message });
      const friendly = getFriendlyAuthErrorMessage(error);
      this.updateState({
        status: 'signed-out',
        user: null,
        error: friendly,
        errorCode: error?.code || 'auth/signin-failed',
      });
      throw new Error(friendly);
    }
  }

  public async signUpWithEmail(
    fullName: string,
    email: string,
    password: string
  ): Promise<{ user: EuclidUser; verificationSent: boolean }> {
    this.updateState({ status: 'authenticating', error: null, errorCode: null });

    if (password.length < 8) {
      const msg = 'Password must be at least 8 characters long.';
      this.updateState({ status: 'signed-out', error: msg });
      throw new Error(msg);
    }
    if (!/[A-Z]/.test(password)) {
      const msg = 'Password must contain at least one uppercase letter.';
      this.updateState({ status: 'signed-out', error: msg });
      throw new Error(msg);
    }
    if (!/[a-z]/.test(password)) {
      const msg = 'Password must contain at least one lowercase letter.';
      this.updateState({ status: 'signed-out', error: msg });
      throw new Error(msg);
    }
    if (!/[0-9]/.test(password)) {
      const msg = 'Password must contain at least one number.';
      this.updateState({ status: 'signed-out', error: msg });
      throw new Error(msg);
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = res.user;

      await updateProfile(fbUser, { displayName: fullName });

      let verificationSent = false;
      try {
        await sendEmailVerification(fbUser);
        verificationSent = true;
      } catch (e) {
        console.warn('Verification email warning:', e);
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
        console.warn('User profile creation warning:', e);
      }

      this.updateState({
        status: 'signed-in',
        user: euclidUser,
        error: null,
      });

      return { user: euclidUser, verificationSent };
    } catch (error: any) {
      console.error('Email sign-up failure:', { code: error?.code, message: error?.message });
      const friendly = getFriendlyAuthErrorMessage(error);
      this.updateState({
        status: 'signed-out',
        user: null,
        error: friendly,
        errorCode: error?.code || 'auth/signup-failed',
      });
      throw new Error(friendly);
    }
  }

  public async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset failure:', { code: error?.code, message: error?.message });
      const friendly = getFriendlyAuthErrorMessage(error);
      throw new Error(friendly);
    }
  }

  public async signOut(): Promise<void> {
    try {
      await fbSignOut(auth);
      this.updateState({
        status: 'signed-out',
        user: null,
        error: null,
        errorCode: null,
      });
    } catch (error: any) {
      console.error('Sign-out error:', error);
      this.updateState({
        status: 'signed-out',
        user: null,
        error: null,
      });
    }
  }
}

export const authService = new AuthService();
