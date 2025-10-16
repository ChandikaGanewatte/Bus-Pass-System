import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8J1LqnAjJoRwA5ew-UgcX3dOfci5Cq-w",
  authDomain: "ctb-pass-system.firebaseapp.com",
  projectId: "ctb-pass-system",
  storageBucket: "ctb-pass-system.firebasestorage.app",
  messagingSenderId: "687392446961",
  appId: "1:687392446961:web:eeef61ab82e18f3a8d0c50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);