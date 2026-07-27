import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA-uHRDW6gi3lwXvUiDqdv08xZGp1nBgKY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "euclid-projects.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "euclid-projects",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "euclid-projects.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1024604491016",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1024604491016:web:b9a9a69cd0c4f9bf4e30bd",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N5HJ2EXRN1"
};

export const firebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
