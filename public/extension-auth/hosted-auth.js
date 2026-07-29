import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import firebaseConfig from "./firebase-config.js";

console.log("[Hosted Auth] Page loaded", {
  origin: globalThis.location.origin
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

const ALLOWED_EXTENSION_ORIGIN =
  "chrome-extension://adgadgaalgjmkikplcdlnejpimmebgmm";

function sendToExtension(payload) {
  if (globalThis.parent && globalThis.parent !== globalThis) {
    globalThis.parent.postMessage(
      typeof payload === "string" ? payload : JSON.stringify(payload),
      ALLOWED_EXTENSION_ORIGIN
    );
  }
}

// Send ready handshake after init
sendToExtension({
  type: "EUCLID_HOSTED_AUTH_READY"
});

globalThis.addEventListener("message", async (event) => {
  if (event.origin !== ALLOWED_EXTENSION_ORIGIN) {
    return;
  }

  let data = event.data;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return;
    }
  }

  if (
    data?.type !== "EUCLID_GOOGLE_AUTH_START" ||
    typeof data?.requestId !== "string"
  ) {
    return;
  }

  const requestId = data.requestId;

  console.log("[Hosted Auth] Authentication request received");

  try {
    console.log("[Hosted Auth] Google popup opened");
    const result = await signInWithPopup(auth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) {
      throw new Error(
        "Google authentication returned no OAuth credential."
      );
    }

    sendToExtension({
      type: "EUCLID_GOOGLE_AUTH_RESULT",
      requestId,
      success: true,
      credential: credential.toJSON()
    });
  } catch (error) {
    console.error("[Hosted Auth] Authentication failed", {
      code: error?.code,
      message: error?.message
    });

    sendToExtension({
      type: "EUCLID_GOOGLE_AUTH_RESULT",
      requestId,
      success: false,
      error: {
        code: error?.code || "auth/hosted-auth-failed",
        message: error?.message || "Google authentication failed."
      }
    });
  }
});
