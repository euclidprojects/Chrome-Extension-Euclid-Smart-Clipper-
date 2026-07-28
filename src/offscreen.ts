import { firebaseConfig } from './firebase/config';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getCurrentExtensionOrigin } from './utils/extensionUtils';
import { AuthMessages } from './constants/auth';

if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
  console.warn(
    "Confirm this origin is registered in Firebase Authorized Domains:",
    getCurrentExtensionOrigin()
  );
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const HOSTED_AUTH_URL = "https://euclidprojects.org/auth/chrome-extension-google.html";

let iframe: HTMLIFrameElement | null = null;
let iframeReady = false;
let iframeReadyPromise: Promise<void> | null = null;

function ensureIframeLoaded(): Promise<void> {
  if (iframeReadyPromise) return iframeReadyPromise;

  iframeReadyPromise = new Promise<void>((resolve) => {
    iframe = document.createElement("iframe");
    iframe.src = HOSTED_AUTH_URL;
    iframe.style.display = "none";

    iframe.addEventListener("load", () => {
      iframeReady = true;
      console.info("[Google Auth] 6. Hosted iframe loaded");
      resolve();
    }, { once: true });

    iframe.addEventListener("error", () => {
      console.warn("[Google Auth] Hosted authentication iframe failed to load.");
      resolve(); // Proceed so handleGoogleAuthentication can execute fallback
    }, { once: true });

    document.documentElement.appendChild(iframe);
  });

  return iframeReadyPromise;
}

// Preload iframe when offscreen loads
ensureIframeLoaded();

async function handleGoogleAuthentication(): Promise<any> {
  await ensureIframeLoaded();

  return new Promise((resolve) => {
    let completed = false;

    const timeoutId = setTimeout(() => {
      if (completed) return;

      console.info("[Google Auth] Hosted iframe postMessage pending/timed out, opening offscreen Google popup...");
      console.info("[Google Auth] 8. Google popup started");

      signInWithPopup(auth, googleProvider)
        .then((result) => {
          if (completed) return;
          completed = true;
          window.removeEventListener("message", handleIframeResponse);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          resolve({
            success: true,
            idToken: credential?.idToken || undefined,
            accessToken: credential?.accessToken || undefined,
            user: {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
            }
          });
        })
        .catch((error) => {
          if (completed) return;
          completed = true;
          window.removeEventListener("message", handleIframeResponse);
          resolve({
            success: false,
            error: {
              code: error?.code || 'auth/popup-closed-by-user',
              message: error?.message || 'Google authentication was cancelled or failed.'
            }
          });
        });
    }, 4000);

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
        console.info("[Google Auth] 9. Iframe response received", data);

        resolve(data);
      } catch (error) {
        console.warn("[Google Auth] Ignored malformed iframe message:", error);
      }
    }

    window.addEventListener("message", handleIframeResponse);

    console.info("[Google Auth] 7. Auth request sent to iframe");
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          { type: 'EUCLID_START_GOOGLE_AUTH' },
          '*'
        );
      } catch (e) {
        console.warn("Could not postMessage to iframe:", e);
      }
    }
  });
}

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (
      !message ||
      message.target !== 'offscreen' ||
      (message.type !== AuthMessages.OFFSCREEN_GOOGLE_SIGN_IN &&
       message.type !== 'OFFSCREEN_GOOGLE_SIGN_IN' &&
       message.type !== 'EUCLID_GOOGLE_SIGN_IN')
    ) {
      return false;
    }

    console.info("[Google Auth] Offscreen listener triggered with message:", message);

    handleGoogleAuthentication()
      .then((result) => {
        sendResponse(result);
      })
      .catch((error) => {
        sendResponse({
          success: false,
          error: {
            code: error?.code || 'auth/offscreen-failed',
            message: error?.message || 'Offscreen authentication failed.'
          }
        });
      });

    return true; // Keep async response channel open
  });
}

