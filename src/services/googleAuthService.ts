import { firebaseConfig } from '../firebase/config';
import { getCurrentExtensionOrigin } from '../utils/extensionUtils';

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
      const response = await new Promise<any>((resolve) => {
        chrome.runtime.sendMessage({ type: 'START_GOOGLE_SIGN_IN' }, (res) => {
          if (chrome.runtime.lastError) {
            console.error("[Google Auth] Chrome runtime error:", chrome.runtime.lastError.message);
            resolve({
              success: false,
              error: {
                code: 'CHROME_RUNTIME_ERROR',
                message: chrome.runtime.lastError.message
              }
            });
          } else {
            resolve(res);
          }
        });
      });

      console.info("[Google Auth] 11. Response returned to popup", response);

      if (response && response.success && response.user) {
        return response.user;
      }

      const rawErr = response?.error;
      const errMsg = typeof rawErr === 'object' && rawErr?.message
        ? rawErr.message
        : typeof rawErr === 'string'
        ? rawErr
        : 'Google Sign-In returned invalid authentication data. Please try again.';

      throw new Error(errMsg);
    } catch (e: any) {
      console.error("[Google Auth] Error in initiateGoogleSignIn:", e);
      throw e;
    }
  }

  throw new Error("Google sign-in requires running within the Chrome extension environment.");
}

