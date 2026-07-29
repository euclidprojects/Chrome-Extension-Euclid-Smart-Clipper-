console.info("[Offscreen] Script loaded");

const AUTH_PAGE_URL = "https://euclidprojects.org/extension-auth/";
const AUTH_PAGE_ORIGIN = "https://euclidprojects.org";

let hostedPageReady = false;
let resolveHostedPageReady: (() => void) | null = null;
let rejectHostedPageReady: ((err: Error) => void) | null = null;

const hostedPageReadyPromise = new Promise<void>((resolve, reject) => {
  resolveHostedPageReady = resolve;
  rejectHostedPageReady = reject;
});

let authIframe: HTMLIFrameElement | null = null;
let authIframeReadyPromise: Promise<HTMLIFrameElement> | null = null;

function ensureAuthIframe(): Promise<HTMLIFrameElement> {
  if (authIframe && authIframe.isConnected && authIframeReadyPromise) {
    return authIframeReadyPromise;
  }

  console.log("[Offscreen] Creating hosted iframe", { url: AUTH_PAGE_URL });

  authIframe = document.createElement("iframe");
  authIframe.src = AUTH_PAGE_URL;
  authIframe.hidden = true;

  authIframeReadyPromise = new Promise((resolve, reject) => {
    authIframe!.addEventListener(
      "load",
      () => {
        console.log("[Offscreen] Hosted iframe load event");
        resolve(authIframe!);
      },
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

globalThis.addEventListener("message", (event) => {
  if (
    event.origin === AUTH_PAGE_ORIGIN &&
    authIframe &&
    event.source === authIframe.contentWindow
  ) {
    let payload = event.data;
    if (typeof payload === "string") {
      try {
        payload = JSON.parse(payload);
      } catch {
        return;
      }
    }
    if (payload?.type === "EUCLID_HOSTED_AUTH_READY") {
      if (!hostedPageReady) {
        hostedPageReady = true;
        resolveHostedPageReady?.();
        console.log("[Offscreen] Hosted authentication page ready");
      }
    } else if (payload?.type === "EUCLID_HOSTED_AUTH_INIT_ERROR") {
      const err = new Error(
        payload?.error?.message ||
          "The hosted authentication page failed to initialize."
      );
      (err as any).code =
        payload?.error?.code || "auth/hosted-initialization-failed";
      console.error("[Offscreen] Hosted authentication page init error:", err);
      rejectHostedPageReady?.(err);
    }
  }
});

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(message)), timeoutMs);
    })
  ]);
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

  console.info("[Offscreen] Waiting for hosted authentication page ready handshake");
  await withTimeout(
    hostedPageReadyPromise,
    10000,
    "The hosted authentication page loaded but did not initialize. Check /extension-auth/, its JavaScript, CSP and iframe headers."
  );

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
