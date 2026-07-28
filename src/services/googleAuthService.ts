import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

if (typeof window !== 'undefined') {
  console.info("Euclid Smart Clipper extension ID:", typeof chrome !== "undefined" && chrome?.runtime?.id ? chrome.runtime.id : "web-preview");
}

export async function initiateGoogleSignIn(): Promise<any> {
  // Check if running in Chrome extension MV3 context
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    try {
      const response = await new Promise<any>((resolve) => {
        chrome.runtime.sendMessage({ type: 'GOOGLE_SIGN_IN_REQUEST' }, (res) => {
          if (chrome.runtime.lastError) {
            resolve({ success: false, error: chrome.runtime.lastError.message });
          } else {
            resolve(res);
          }
        });
      });

      if (response && response.success && response.user) {
        return response.user;
      }
      if (response && response.error) {
        console.warn('Offscreen/background Google Auth note:', response.error);
      }
    } catch (e) {
      console.warn('Offscreen Google sign-in message error:', e);
    }
  }

  // Fallback direct Popup execution
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Direct Google Sign-In error:', { code: error?.code, message: error?.message });
    throw error;
  }
}
