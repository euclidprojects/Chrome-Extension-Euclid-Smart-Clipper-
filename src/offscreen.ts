import { firebaseConfig } from './firebase/config';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getCurrentExtensionOrigin } from './utils/extensionUtils';

if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
  console.warn(
    "Confirm this origin is registered in Firebase Authorized Domains:",
    getCurrentExtensionOrigin()
  );
}

console.info("[Auth Debug] Firebase project:", firebaseConfig.projectId);
console.info("[Auth Debug] Auth domain:", firebaseConfig.authDomain);
console.info("[Auth Debug] Offscreen API available:", typeof chrome !== "undefined" && Boolean(chrome.offscreen));

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
googleProvider.addScope('openid');
googleProvider.addScope('email');
googleProvider.addScope('profile');

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (!message || (message.type !== 'EUCLID_GOOGLE_SIGN_IN' && message.type !== 'GOOGLE_SIGN_IN_OFFSCREEN')) {
      return;
    }

    console.info("Offscreen document received EUCLID_GOOGLE_SIGN_IN message.");

    let resolved = false;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://euclidprojects.org/auth/chrome-extension-google';
    iframe.style.display = 'none';

    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'HOSTED_AUTH_SUCCESS' && event.data.user) {
          resolved = true;
          cleanup();
          sendResponse({
            success: true,
            idToken: typeof event.data.idToken === 'string' ? event.data.idToken : undefined,
            accessToken: typeof event.data.accessToken === 'string' ? event.data.accessToken : undefined,
            user: {
              uid: event.data.user.uid,
              email: event.data.user.email,
              displayName: event.data.user.displayName,
              photoURL: event.data.user.photoURL,
            },
          });
        } else if (event.data.type === 'HOSTED_AUTH_ERROR') {
          resolved = true;
          cleanup();
          console.error("[Auth Debug] Firebase failure", {
            code: event.data.code || 'HOSTED_AUTH_ERROR',
            message: event.data.error || 'Hosted auth error',
            name: 'HostedAuthError',
            context: 'hosted-auth'
          });
          sendResponse({
            success: false,
            error: {
              code: event.data.code || 'HOSTED_AUTH_ERROR',
              message: typeof event.data.error === 'string' ? event.data.error : 'Hosted auth error',
            },
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    document.body.appendChild(iframe);

    // If hosted auth iframe takes more than 3.5s (e.g. offline/preview), complete authentication via offscreen window
    setTimeout(() => {
      if (resolved) return;
      cleanup();
      console.info("Hosted auth iframe pending, completing via offscreen auth window...");

      console.info("[Auth Debug] Calling function", {
        functionName: "signInWithPopup",
        authExists: Boolean(auth),
        appExists: Boolean(app),
        projectId: firebaseConfig?.projectId,
        hasRequiredArguments: Boolean(auth && googleProvider)
      });

      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          sendResponse({
            success: true,
            idToken: credential?.idToken || undefined,
            accessToken: credential?.accessToken || undefined,
            user: {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
            },
          });
        })
        .catch((err) => {
          console.error("[Auth Debug] Firebase failure", {
            code: err?.code,
            message: err?.message,
            name: err?.name,
            context: "offscreen"
          });
          sendResponse({
            success: false,
            error: {
              code: err?.code || 'OFFSCREEN_POPUP_FAILED',
              message: err?.message || 'Google sign-in failed in offscreen document.',
            },
          });
        });
    }, 3500);

    return true;
  });
}
