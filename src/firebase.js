import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import from 'firebase/firestore' instead

const firebaseConfig = {
  apiKey: "AIzaSyAUdxGxwGSgV1OMfQhVk2SPwF2B28RSYf8",
  authDomain: "banking-app-6ae3e.firebaseapp.com",
  projectId: "banking-app-6ae3e",
  storageBucket: "banking-app-6ae3e.appspot.com",
  messagingSenderId: "488611358782",
  appId: "1:488611358782:web:dd0a0b23cac313b9d8896f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
