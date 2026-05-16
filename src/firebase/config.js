import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase project config
const firebaseConfig = {
  // apiKey: "YOUR_API_KEY",
  // authDomain: "YOUR_AUTH_DOMAIN",
  // projectId: "YOUR_PROJECT_ID",
  // storageBucket: "YOUR_STORAGE_BUCKET",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  // appId: "YOUR_APP_ID",
  
  apiKey: "AIzaSyDim40mG5ajVyNdNTwCoKd9FBoIYsqy0dI",
  authDomain: "todo-calender-react.firebaseapp.com",
  projectId: "todo-calender-react",
  storageBucket: "todo-calender-react.firebasestorage.app",
  messagingSenderId: "63681201494",
  appId: "1:63681201494:web:9d48e3390abc144a4d02f7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
