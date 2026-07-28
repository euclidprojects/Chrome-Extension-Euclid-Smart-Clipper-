import { firebaseConfig } from '../firebase/config';
import { getCurrentExtensionOrigin } from '../utils/extensionUtils';
import { AuthMessages } from '../constants/auth';

if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
  console.info(
    "Euclid Smart Clipper extension origin:",
    getCurrentExtensionOrigin()
  );
}

function timeoutAfter(milliseconds: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("The background service worker did not respond."));
    }, milliseconds);
  });
}

export async function initiateGoogleSignIn(): Promise<any> {
  console.info("[Google Auth] 1. Popup request started");

  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    try {
      const response = await Promise.race([
        new Promise<any>((resolve) => {
          chrome.runtime.sendMessage({ type: AuthMessages.START_GOOGLE_SIGN_IN }, (res) => {
            if (chrome.runtime.lastError) {
              const errMsg = chrome.runtime.lastError.message || '';
              console.error("[Google Auth] Chrome runtime error:", errMsg);
              if (
                errMsg.includes("Receiving end does not exist") ||
                errMsg.includes("Could not establish connection")
              ) {
                resolve({
                  success: false,
                  error: {
                    code: 'SERVICE_WORKER_UNAVAILABLE',
                    message: 'The extension background service is not available. Reload the extension and try again.'
                  }
                });
              } else {
                resolve({
                  success: false,
                  error: {
                    code: 'CHROME_RUNTIME_ERROR',
                    message: errMsg
                  }
                });
              }
            } else {
              resolve(res);
            }
          });
        }),
        timeoutAfter(15000)
      ]);

      console.info("[Google Auth] 11. Response returned to popup", response);

      if (!response) {
        throw new Error("The background service returned an empty response.");
      }

      if (response.success && response.result?.user) {
        return response.result.user;
      }

      if (response.success && response.user) {
        return response.user;
      }

      const rawErr = response.error;
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


