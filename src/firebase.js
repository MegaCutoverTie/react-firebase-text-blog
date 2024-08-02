import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0P1Wk5Xfct4oOCM_7FtkWtEvB3ZBYdgs",
  authDomain: "react-2024-a94c7.firebaseapp.com",
  projectId: "react-2024-a94c7",
  storageBucket: "react-2024-a94c7.appspot.com",
  messagingSenderId: "632603704012",
  appId: "1:632603704012:web:adb70710906569f3456069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export {auth, db};