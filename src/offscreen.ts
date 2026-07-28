import { auth, googleProvider } from './firebase/config';
import { signInWithPopup } from 'firebase/auth';

console.info("Euclid Smart Clipper offscreen document initialized.");

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'GOOGLE_SIGN_IN_OFFSCREEN') {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          sendResponse({
            success: true,
            user: {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
            },
          });
        })
        .catch((err) => {
          console.error("Offscreen auth error:", { code: err?.code, message: err?.message });
          sendResponse({
            success: false,
            error: err?.code || err?.message || 'Google sign-in failed in offscreen document.',
          });
        });
      return true;
    }
  });
}
