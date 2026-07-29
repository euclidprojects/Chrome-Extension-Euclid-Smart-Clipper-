import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { firebaseConfig } from "../lib/firebase";

const ALLOWED_EXTENSION_ORIGIN =
  "chrome-extension://adgadgaalgjmkikplcdlnejpimmebgmm";

console.log("[Hosted Auth] Script started");

let auth: ReturnType<typeof getAuth>;
let googleProvider: GoogleAuthProvider;

try {
  const firebaseApp = initializeApp(firebaseConfig);

  auth = getAuth(firebaseApp);
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

  globalThis.parent.postMessage(
    {
      type: "EUCLID_HOSTED_AUTH_INIT_ERROR",
      error: {
        code:
          error?.code ||
          "auth/hosted-initialization-failed",
        message:
          error?.message ||
          "Hosted authentication failed to initialize."
      }
    },
    ALLOWED_EXTENSION_ORIGIN
  );

  throw error;
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

    const credential =
      GoogleAuthProvider.credentialFromResult(result);

    if (!credential) {
      throw new Error(
        "Google authentication returned no OAuth credential."
      );
    }

    globalThis.parent.postMessage(
      {
        type: "EUCLID_GOOGLE_AUTH_RESULT",
        requestId,
        success: true,
        credential: credential.toJSON()
      },
      ALLOWED_EXTENSION_ORIGIN
    );
  } catch (error: any) {
    console.error("[Hosted Auth] Authentication failed", {
      code: error?.code,
      message: error?.message
    });

    globalThis.parent.postMessage(
      {
        type: "EUCLID_GOOGLE_AUTH_RESULT",
        requestId,
        success: false,
        error: {
          code:
            error?.code ||
            "auth/google-authentication-failed",
          message:
            error?.message ||
            "Google authentication failed."
        }
      },
      ALLOWED_EXTENSION_ORIGIN
    );
  }
});

globalThis.parent.postMessage(
  {
    type: "EUCLID_HOSTED_AUTH_READY"
  },
  ALLOWED_EXTENSION_ORIGIN
);

console.log("[Hosted Auth] Ready message sent");
