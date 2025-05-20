import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-generator-64c68.firebaseapp.com",
  projectId: "ai-logo-generator-64c68",
  storageBucket: "ai-logo-generator-64c68.firebasestorage.app",
  messagingSenderId: "163364135705",
  appId: "1:163364135705:web:161db03ed1f7181dd29b88",
  measurementId: "G-MEHT4VB3DG",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
