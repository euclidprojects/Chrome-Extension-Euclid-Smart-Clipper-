import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import firebaseConfig from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

const ALLOWED_EXTENSION_ORIGIN =
  "chrome-extension://adgadgaalgjmkikplcdlnejpimmebgmm";

function sendToParent(payload) {
  const parentOrigin = document.location.ancestorOrigins?.[0];

  if (parentOrigin && parentOrigin !== ALLOWED_EXTENSION_ORIGIN) {
    throw new Error(
      `Unauthorized parent origin: ${parentOrigin}`
    );
  }

  const targetOrigin = parentOrigin || ALLOWED_EXTENSION_ORIGIN;

  globalThis.parent.postMessage(
    JSON.stringify(payload),
    targetOrigin
  );
}

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
    !data ||
    data.type !== "EUCLID_GOOGLE_AUTH_START" ||
    typeof data.requestId !== "string"
  ) {
    return;
  }

  const requestId = data.requestId;

  try {
    console.log("[Hosted Auth] Starting Google popup");

    const result = await signInWithPopup(auth, provider);

    const oauthCredential =
      GoogleAuthProvider.credentialFromResult(result);

    if (!oauthCredential) {
      throw new Error(
        "Google authentication succeeded but returned no OAuth credential."
      );
    }

    const credentialJson = oauthCredential.toJSON();

    if (
      !credentialJson ||
      typeof credentialJson !== "object"
    ) {
      throw new Error(
        "Google OAuth credential could not be serialized."
      );
    }

    sendToParent({
      type: "EUCLID_GOOGLE_AUTH_RESULT",
      requestId,
      success: true,
      credential: credentialJson
    });
  } catch (error) {
    console.error("[Hosted Auth] Google authentication failed", {
      code: error?.code,
      message: error?.message
    });

    sendToParent({
      type: "EUCLID_GOOGLE_AUTH_RESULT",
      requestId,
      success: false,
      error: {
        code: error?.code || "auth/hosted-auth-failed",
        message:
          error?.message ||
          "Google authentication failed."
      }
    });
  }
});
