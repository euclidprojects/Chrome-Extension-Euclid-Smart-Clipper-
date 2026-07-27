import { firebaseApp, firebaseAuth, firestore, firebaseStorage, firebaseConfig } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export { firebaseConfig };
export const app = firebaseApp;
export const auth = firebaseAuth;
export const db = firestore;
export const storage = firebaseStorage;
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  fbSignOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  ref,
  uploadBytes,
  getDownloadURL
};
export type { FirebaseUser };

