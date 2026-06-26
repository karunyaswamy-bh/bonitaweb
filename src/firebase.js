import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCMUqEcbAGXK5S0YPw1y_MkmUlwEwOuraA',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'bonita-shop-b3f4b.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://bonita-shop-b3f4b-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'bonita-shop-b3f4b',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'bonita-shop-b3f4b.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1033595771665',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1033595771665:web:1fa2b208ac817adc978ab0',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-L00D0JK273',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

