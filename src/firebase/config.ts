import { firebaseApp, auth, firestore, firebaseStorage, firebaseConfig } from '../lib/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs, query, where, onSnapshot, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export { firebaseConfig };
export const app = firebaseApp;
export { auth };
export const db = firestore;
export const storage = firebaseStorage;

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('openid');
googleProvider.addScope('email');
googleProvider.addScope('profile');

export {
  signInWithPopup,
  fbSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  deleteDoc,
  ref,
  uploadBytes,
  getDownloadURL,
};
export type { FirebaseUser };
