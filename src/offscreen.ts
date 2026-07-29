console.info("[Offscreen] Script loaded");

const AUTH_PAGE_URL = "https://euclidprojects.org/extension-auth/";
const AUTH_PAGE_ORIGIN = new URL(AUTH_PAGE_URL).origin;

let authIframe: HTMLIFrameElement | null = null;
let authIframeReadyPromise: Promise<HTMLIFrameElement> | null = null;

function ensureAuthIframe(): Promise<HTMLIFrameElement> {
  if (authIframe && authIframe.isConnected && authIframeReadyPromise) {
    return authIframeReadyPromise;
  }

  authIframe = document.createElement("iframe");
  authIframe.src = AUTH_PAGE_URL;
  authIframe.hidden = true;

  authIframeReadyPromise = new Promise((resolve, reject) => {
    authIframe!.addEventListener(
      "load",
      () => resolve(authIframe!),
      { once: true }
    );

    authIframe!.addEventListener(
      "error",
      () => reject(new Error("The hosted authentication iframe failed to load.")),
      { once: true }
    );
  });

  document.documentElement.appendChild(authIframe);

  return authIframeReadyPromise;
}

const AUTH_TIMEOUT_MS = 120000;
let authenticationInFlight: Promise<{ credential: any }> | null = null;

async function performHostedGoogleSignIn(): Promise<{ credential: any }> {
  if (authenticationInFlight) {
    return authenticationInFlight;
  }

  authenticationInFlight = runHostedGoogleSignIn().finally(() => {
    authenticationInFlight = null;
  });

  return authenticationInFlight;
}

async function runHostedGoogleSignIn(): Promise<{ credential: any }> {
  console.info("[Offscreen] Waiting for hosted iframe");
  const iframeEl = await ensureAuthIframe();
  console.info("[Offscreen] Hosted iframe ready");

  const requestId = crypto.randomUUID();

  return new Promise((resolve, reject) => {
    let completed = false;

    const timeoutId = setTimeout(() => {
      if (completed) return;
      completed = true;
      globalThis.removeEventListener("message", handleHostedMessage);
      const error = new Error("Google authentication timed out.");
      (error as any).code = "auth/authentication-timeout";
      reject(error);
    }, AUTH_TIMEOUT_MS);

    function finish(callback: (val: any) => void, value: any) {
      if (completed) return;
      completed = true;
      clearTimeout(timeoutId);
      globalThis.removeEventListener("message", handleHostedMessage);
      callback(value);
    }

    function handleHostedMessage(event: MessageEvent) {
      if (event.origin !== AUTH_PAGE_ORIGIN) return;
      if (event.source !== iframeEl.contentWindow) return;

      let payload = event.data;

      if (typeof payload === "string" && payload.startsWith("!_{")) {
        return;
      }

      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }

      if (
        !payload ||
        payload.type !== "EUCLID_GOOGLE_AUTH_RESULT" ||
        payload.requestId !== requestId
      ) {
        return;
      }

      console.info("[Offscreen] Hosted result received");

      if (payload.success !== true) {
        const error = new Error(
          payload.error?.message || "Google authentication failed."
        );
        (error as any).code = payload.error?.code || "auth/google-auth-failed";
        finish(reject, error);
        return;
      }

      if (!payload.credential || typeof payload.credential !== "object") {
        const error = new Error("Hosted authentication returned no serialized OAuth credential.");
        (error as any).code = "auth/no-credential";
        finish(reject, error);
        return;
      }

      finish(resolve, { credential: payload.credential });
    }

    globalThis.addEventListener("message", handleHostedMessage);

    if (iframeEl.contentWindow) {
      iframeEl.contentWindow.postMessage(
        {
          type: "EUCLID_GOOGLE_AUTH_START",
          requestId
        },
        AUTH_PAGE_ORIGIN
      );
    } else {
      const error = new Error("Hosted authentication iframe window is unavailable.");
      (error as any).code = "auth/iframe-unavailable";
      finish(reject, error);
    }
  });
}

// Synchronous top-level health check listener
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.target === "offscreen" && message?.type === "PING_OFFSCREEN") {
    console.info("[Offscreen] Ping received");
    sendResponse({
      success: true,
      status: "ready"
    });
    return false;
  }
  return false;
});

// Single top-level Google Auth listener
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (
    message?.target !== "offscreen" ||
    (message?.type !== "FIREBASE_GOOGLE_SIGN_IN" && message?.type !== "OFFSCREEN_GOOGLE_SIGN_IN")
  ) {
    return false;
  }

  console.info("[Offscreen] Google auth request received");

  let responseSent = false;

  const respondOnce = (response: any) => {
    if (responseSent) return;
    responseSent = true;
    try {
      console.info("[Offscreen] Sending response to service worker");
      sendResponse(response);
    } catch (error: any) {
      console.error("[Offscreen] sendResponse failed", { message: error?.message });
    }
  };

  Promise.resolve()
    .then(() => performHostedGoogleSignIn())
    .then((result: any) => {
      respondOnce({
        success: true,
        credential: result.credential
      });
    })
    .catch((error: any) => {
      console.error("[Offscreen] Google authentication failed", {
        code: error?.code,
        message: error?.message
      });

      respondOnce({
        success: false,
        error: {
          code: error?.code || "auth/offscreen-auth-failed",
          message: error?.message || "Google authentication failed."
        }
      });
    });

  return true;
});
