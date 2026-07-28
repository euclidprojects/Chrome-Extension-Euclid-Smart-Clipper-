import firebaseApp, { auth, firestore, firebaseStorage, firebaseConfig } from '../lib/firebase';

export { firebaseConfig, firebaseApp };
export const firebaseAuth = auth;
export { firestore, firebaseStorage };
