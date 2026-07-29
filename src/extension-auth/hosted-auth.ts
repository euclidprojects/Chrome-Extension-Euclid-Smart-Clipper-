import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { firebaseConfig } from "../lib/firebase";

const ALLOWED_EXTENSION_ORIGIN =
  "chrome-extension://adgadgaalgjmkikplcdlnejpimmebgmm";

function sendToExtension(payload: any) {
  if (typeof window !== "undefined" && window.parent && window.parent !== window.self) {
    window.parent.postMessage(payload, ALLOWED_EXTENSION_ORIGIN);
  }
}

console.log("[Hosted Auth] Script started");

let auth: ReturnType<typeof getAuth>;
let googleProvider: GoogleAuthProvider;

try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  console.log("[Hosted Auth] Firebase initialized");
} catch (error: any) {
  console.error("[Hosted Auth] Initialization failed", {
    code: error?.code,
    message: error?.message
  });

  sendToExtension({
    type: "EUCLID_HOSTED_AUTH_INIT_ERROR",
    error: {
      code: error?.code || "auth/hosted-initialization-failed",
      message: error?.message || "The hosted authentication page failed to initialize."
    }
  });

  throw error;
}

globalThis.addEventListener("message", async (event) => {
  if (event.origin !== ALLOWED_EXTENSION_ORIGIN) {
    console.warn("[Hosted Auth] Ignored origin", {
      origin: event.origin
    });
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
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) {
      throw new Error(
        "Google sign-in returned no OAuth credential."
      );
    }

    sendToExtension({
      type: "EUCLID_GOOGLE_AUTH_RESULT",
      requestId,
      success: true,
      credential: credential.toJSON()
    });
  } catch (error: any) {
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

sendToExtension({
  type: "EUCLID_HOSTED_AUTH_READY"
});

console.log("[Hosted Auth] Ready message sent");
