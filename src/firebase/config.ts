import { firebaseApp, auth, firestore, firebaseStorage, firebaseConfig } from '../lib/firebase';
import {
  signOut as fbSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User as FirebaseUser,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, collection, getDocs, query, where, onSnapshot, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export { firebaseConfig };
export const app = firebaseApp;
export { auth };
export const db = firestore;
export const storage = firebaseStorage;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
googleProvider.addScope('openid');
googleProvider.addScope('email');
googleProvider.addScope('profile');

export {
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
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL,
};
export type { FirebaseUser };
