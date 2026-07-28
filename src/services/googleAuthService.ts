import { firebaseConfig } from '../firebase/config';

if (typeof window !== 'undefined') {
  console.info("Euclid Smart Clipper extension ID:", typeof chrome !== "undefined" && chrome?.runtime?.id ? chrome.runtime.id : "web-preview");
}

export async function initiateGoogleSignIn(): Promise<any> {
  console.info("[Auth Debug] Calling function", {
    functionName: "initiateGoogleSignIn",
    authExists: true,
    appExists: true,
    projectId: firebaseConfig?.projectId,
    hasRequiredArguments: true
  });

  // Check if running in Chrome extension MV3 context
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    try {
      const response = await new Promise<any>((resolve) => {
        chrome.runtime.sendMessage({ type: 'GOOGLE_SIGN_IN_REQUEST' }, (res) => {
          if (chrome.runtime.lastError) {
            console.error("[Auth Debug] Firebase failure", {
              code: 'CHROME_RUNTIME_ERROR',
              message: chrome.runtime.lastError.message,
              name: 'ChromeRuntimeError',
              context: 'popup'
            });
            resolve({ success: false, error: chrome.runtime.lastError.message });
          } else {
            resolve(res);
          }
        });
      });

      if (response && response.success && response.user) {
        return response.user;
      }

      const errMsg = response?.error || 'Google sign-in could not be completed.';
      console.error("[Auth Debug] Firebase failure", {
        code: response?.code || 'GOOGLE_SIGNIN_FAILED',
        message: errMsg,
        name: 'GoogleSignInError',
        context: 'popup'
      });
      throw new Error(typeof errMsg === 'string' ? errMsg : 'Google sign-in failed.');
    } catch (e: any) {
      console.error("[Auth Debug] Firebase failure", {
        code: e?.code || 'GOOGLE_AUTH_ERROR',
        message: e?.message,
        name: e?.name,
        context: 'popup'
      });
      throw e;
    }
  }

  throw new Error("Google sign-in requires running within the Chrome extension environment.");
}
