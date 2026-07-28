import { firebaseConfig } from './firebase/config';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getCurrentExtensionOrigin } from './utils/extensionUtils';
import { AuthMessages } from './constants/auth';

console.info("[Offscreen] Script loaded", {
  timestamp: new Date().toISOString()
});

if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
  console.info(
    "[Offscreen] Confirm this origin is registered in Firebase Authorized Domains:",
    getCurrentExtensionOrigin()
  );
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const HOSTED_AUTH_URL = "https://euclidprojects.org/auth/chrome-extension-google.html";

let iframe: HTMLIFrameElement | null = null;
let iframeReadyPromise: Promise<void> | null = null;

function ensureIframeLoaded(): Promise<void> {
  if (iframeReadyPromise) return iframeReadyPromise;

  iframeReadyPromise = new Promise<void>((resolve) => {
    iframe = document.createElement("iframe");
    iframe.src = HOSTED_AUTH_URL;
    iframe.style.display = "none";

    iframe.addEventListener("load", () => {
      console.info("[Offscreen] Hosted iframe loaded");
      console.info("[Google Auth] 6. Hosted iframe loaded");
      resolve();
    }, { once: true });

    iframe.addEventListener("error", () => {
      console.warn("[Offscreen] Hosted authentication iframe failed to load. Falling back to popup.");
      resolve();
    }, { once: true });

    document.documentElement.appendChild(iframe);
  });

  return iframeReadyPromise;
}

// Preload iframe when offscreen loads
ensureIframeLoaded();

async function performHostedGoogleSignIn(): Promise<any> {
  await ensureIframeLoaded();

  return new Promise((resolve) => {
    let completed = false;

    const timeoutId = setTimeout(() => {
      if (completed) return;

      console.info("[Offscreen] Hosted iframe postMessage pending/timed out, opening Google popup...");
      console.info("[Hosted Auth] Starting signInWithPopup");

      signInWithPopup(auth, googleProvider)
        .then(async (result) => {
          if (completed) return;
          completed = true;
          window.removeEventListener("message", handleIframeResponse);
          console.info("[Hosted Auth] Authentication succeeded");

          const user = result.user;
          const idToken = await user.getIdToken();
          
          const plainUser = {
            uid: user.uid,
            displayName: user.displayName || null,
            email: user.email || null,
            photoURL: user.photoURL || null,
            emailVerified: Boolean(user.emailVerified)
          };

          resolve({
            success: true,
            idToken,
            user: plainUser
          });
        })
        .catch((error) => {
          if (completed) return;
          completed = true;
          window.removeEventListener("message", handleIframeResponse);
          console.error("[Hosted Auth] Authentication failed", error);

          resolve({
            success: false,
            error: {
              code: error?.code || 'auth/popup-closed-by-user',
              message: error?.message || 'Google authentication was cancelled or failed.'
            }
          });
        });
    }, 3500);

    function handleIframeResponse(event: MessageEvent) {
      try {
        if (typeof event.data === 'string' && event.data.startsWith('!_{')) {
          return;
        }

        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (!data || typeof data.success !== 'boolean') {
          return;
        }

        if (completed) return;
        completed = true;

        clearTimeout(timeoutId);
        window.removeEventListener("message", handleIframeResponse);
        console.info("[Offscreen] Response received from iframe:", data);

        if (data.success && data.user) {
          console.info("[Hosted Auth] Authentication succeeded");
          const plainUser = {
            uid: data.user.uid,
            displayName: data.user.displayName || null,
            email: data.user.email || null,
            photoURL: data.user.photoURL || null,
            emailVerified: Boolean(data.user.emailVerified)
          };
          resolve({
            success: true,
            user: plainUser,
            idToken: data.idToken || undefined
          });
        } else {
          console.error("[Hosted Auth] Authentication failed:", data.error);
          resolve({
            success: false,
            error: {
              code: data.error?.code || 'auth/hosted-error',
              message: data.error?.message || String(data.error || 'Google authentication failed.')
            }
          });
        }
      } catch (error) {
        console.warn("[Offscreen] Ignored malformed iframe message:", error);
      }
    }

    window.addEventListener("message", handleIframeResponse);

    console.info("[Offscreen] Auth request sent to hosted iframe");
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          { type: 'EUCLID_START_GOOGLE_AUTH' },
          '*'
        );
      } catch (e) {
        console.warn("[Offscreen] Could not postMessage to iframe:", e);
      }
    }
  });
}

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (
      !message ||
      message.target !== 'offscreen' ||
      (message.type !== 'FIREBASE_GOOGLE_SIGN_IN' &&
       message.type !== AuthMessages.FIREBASE_GOOGLE_SIGN_IN &&
       message.type !== AuthMessages.OFFSCREEN_GOOGLE_SIGN_IN &&
       message.type !== 'OFFSCREEN_GOOGLE_SIGN_IN' &&
       message.type !== 'EUCLID_GOOGLE_SIGN_IN')
    ) {
      return false;
    }

    console.info("[Offscreen] Auth request received", message);

    performHostedGoogleSignIn()
      .then((result) => {
        sendResponse(result);
      })
      .catch((error) => {
        console.error("[Offscreen] Authentication failed in offscreen worker", error);
        sendResponse({
          success: false,
          error: {
            code: error?.code || 'auth/offscreen-error',
            message: error?.message || String(error)
          }
        });
      });

    return true; // Keeps async response channel open
  });
}
