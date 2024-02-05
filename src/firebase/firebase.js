import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu63tjRlUQqYggYaLtJVBAUxoWJBQUBO8",
  authDomain: "blog-application-88331.firebaseapp.com",
  projectId: "blog-application-88331",
  storageBucket: "blog-application-88331.appspot.com",
  messagingSenderId: "107046532078",
  appId: "1:107046532078:web:ec83d396f87a4ecd7fd4ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);