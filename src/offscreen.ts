import { firebaseConfig } from './firebase/config';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

console.info("Extension ID:", typeof chrome !== "undefined" && chrome.runtime ? chrome.runtime.id : "offscreen");
console.info("Firebase project:", firebaseConfig.projectId);
console.info("Auth domain:", firebaseConfig.authDomain);
console.info("Offscreen API available:", typeof chrome !== "undefined" && Boolean(chrome.offscreen));

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('openid');
googleProvider.addScope('email');
googleProvider.addScope('profile');

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'GOOGLE_SIGN_IN_OFFSCREEN') {
      console.info("Offscreen document received GOOGLE_SIGN_IN_OFFSCREEN message.");

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
              user: event.data.user,
            });
          } else if (event.data.type === 'HOSTED_AUTH_ERROR') {
            resolved = true;
            cleanup();
            console.error("Authentication failure", {
              code: event.data.code || 'HOSTED_AUTH_ERROR',
              message: event.data.error || 'Hosted auth error',
              context: "hosted-auth-page"
            });
            sendResponse({
              success: false,
              error: event.data.error || 'Hosted auth error',
            });
          }
        }
      };

      window.addEventListener('message', handleMessage);
      document.body.appendChild(iframe);

      // If hosted iframe takes more than 3.5s (e.g. offline/preview), complete authentication via offscreen window
      setTimeout(() => {
        if (resolved) return;
        cleanup();
        console.info("Hosted auth iframe pending, completing via offscreen auth window...");

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
            console.error("Authentication failure", {
              code: err?.code,
              message: err?.message,
              context: "offscreen"
            });
            sendResponse({
              success: false,
              error: err?.code || err?.message || 'Google sign-in failed in offscreen document.',
            });
          });
      }, 3500);

      return true;
    }
  });
}
