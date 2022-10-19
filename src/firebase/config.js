import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyD5cSFTIydqq_8vzixoZcSn7j_bDZJFXs4",
  authDomain: "rn-project-2a553.firebaseapp.com",
  projectId: "rn-project-2a553",
  storageBucket: "rn-project-2a553.appspot.com",
  messagingSenderId: "898353517601",
  appId: "1:898353517601:web:47ed288b8a15cbc0053f60",
  measurementId: "G-4R1L0LG2BX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
