const AUTH_PAGE_URL = "https://euclidprojects.org/extension-auth/";
const AUTH_PAGE_ORIGIN = new URL(AUTH_PAGE_URL).origin;

const iframe = document.createElement("iframe");
iframe.src = AUTH_PAGE_URL;
iframe.hidden = true;

document.documentElement.appendChild(iframe);

const iframeReady: Promise<void> = new Promise((resolve, reject) => {
  iframe.addEventListener("load", () => resolve(), { once: true });
  iframe.addEventListener(
    "error",
    () => reject(new Error("The hosted authentication iframe failed to load.")),
    { once: true }
  );
});

async function handleGoogleAuthentication(): Promise<{ success: boolean; credential?: any; error?: any }> {
  await iframeReady;

  const requestId = crypto.randomUUID();

  return new Promise((resolve, reject) => {
    let completed = false;

    const timeoutId = setTimeout(() => {
      if (completed) return;
      completed = true;
      globalThis.removeEventListener("message", handleHostedResponse);
      reject(new Error("Google authentication timed out before receiving a response."));
    }, 120000);

    function finish(callback: (val: any) => void, value: any) {
      if (completed) return;
      completed = true;
      clearTimeout(timeoutId);
      globalThis.removeEventListener("message", handleHostedResponse);
      callback(value);
    }

    function handleHostedResponse(event: MessageEvent) {
      if (event.origin !== AUTH_PAGE_ORIGIN) return;
      if (event.source !== iframe.contentWindow) return;

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

      if (payload.success !== true) {
        finish(resolve, {
          success: false,
          error: {
            code: payload.error?.code || "auth/google-auth-failed",
            message: payload.error?.message || "Google authentication failed."
          }
        });
        return;
      }

      if (!payload.credential || typeof payload.credential !== "object") {
        finish(reject, new Error("Hosted authentication returned no serialized OAuth credential."));
        return;
      }

      finish(resolve, {
        success: true,
        credential: payload.credential
      });
    }

    globalThis.addEventListener("message", handleHostedResponse);

    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          type: "EUCLID_GOOGLE_AUTH_START",
          requestId
        },
        AUTH_PAGE_ORIGIN
      );
    } else {
      finish(reject, new Error("Hosted authentication iframe window is unavailable."));
    }
  });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (
    message?.target !== "offscreen" ||
    (message?.type !== "FIREBASE_GOOGLE_SIGN_IN" && message?.type !== "OFFSCREEN_GOOGLE_SIGN_IN")
  ) {
    return false;
  }

  handleGoogleAuthentication()
    .then(sendResponse)
    .catch((error) => {
      sendResponse({
        success: false,
        error: {
          code: error?.code || "auth/offscreen-failed",
          message: error?.message || "Offscreen authentication failed."
        }
      });
    });

  return true;
});
