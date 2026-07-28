import { getCurrentExtensionOrigin } from '../utils/extensionUtils';
import { AUTH_MESSAGES } from '../constants/auth';

if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
  console.info(
    "Euclid Smart Clipper extension origin:",
    getCurrentExtensionOrigin()
  );
}

export async function initiateGoogleSignIn(): Promise<any> {
  console.info("[Google Auth] 1. Popup request started");

  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    try {
      // 1. Health check ping
      let ping = await new Promise<any>((resolve) => {
        chrome.runtime.sendMessage({ type: "PING_BACKGROUND" }, (res) => {
          if (chrome.runtime.lastError) {
            console.warn("[Service Worker] PING_BACKGROUND error:", chrome.runtime.lastError.message);
            resolve({ success: false });
          } else {
            resolve(res);
          }
        });
      });

      if (!ping?.success) {
        ping = await new Promise<any>((resolve) => {
          chrome.runtime.sendMessage({ type: AUTH_MESSAGES.SERVICE_WORKER_PING }, (res) => {
            if (chrome.runtime.lastError) {
              console.warn("[Service Worker] SERVICE_WORKER_PING error:", chrome.runtime.lastError.message);
              resolve({ success: false });
            } else {
              resolve(res);
            }
          });
        });
      }

      if (!ping?.success) {
        throw new Error("The extension background service worker is unavailable.");
      }

      // 2. Main Google Auth request
      const response = await new Promise<any>((resolve) => {
        chrome.runtime.sendMessage({ type: "GOOGLE_SIGN_IN" }, (res) => {
          if (chrome.runtime.lastError) {
            const errMsg = chrome.runtime.lastError.message || '';
            console.error("[Google Auth] Chrome runtime error:", errMsg);
            resolve({
              success: false,
              error: {
                code: 'SERVICE_WORKER_UNAVAILABLE',
                message: 'The extension background service worker is unavailable.'
              }
            });
          } else {
            resolve(res);
          }
        });
      });

      console.info("[Google Auth] Response returned to popup:", response);
      console.info("[Popup] Authentication completed");

      if (!response) {
        throw new Error("The background service worker returned an empty response.");
      }

      if (!response.success) {
        const rawErr = response.error;
        const errMsg = typeof rawErr === 'object' && rawErr?.message
          ? rawErr.message
          : typeof rawErr === 'string'
          ? rawErr
          : 'Google authentication failed.';
        throw new Error(errMsg);
      }

      const userObj = response.user || response.result?.user;
      if (!userObj) {
        throw new Error("Google Sign-In returned invalid authentication user data.");
      }

      return userObj;
    } catch (e: any) {
      console.error("[Google Auth] Error in initiateGoogleSignIn:", e);
      throw e;
    }
  }

  throw new Error("Google sign-in requires running within the Chrome extension environment.");
}
