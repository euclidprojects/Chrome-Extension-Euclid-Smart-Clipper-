import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";
import { firebaseConfig } from "../lib/firebase";

console.log("[Hosted Auth] Script started");

if (typeof window !== "undefined") {
  (window as any).EUCLID_HOSTED_AUTH_READY = true;
}
