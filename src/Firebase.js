// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX544CiaTJF2DjbPWoB3sRURDrSBda2og",
  authDomain: "busybuy-80348.firebaseapp.com",
  projectId: "busybuy-80348",
  storageBucket: "busybuy-80348.appspot.com",
  messagingSenderId: "844951753935",
  appId: "1:844951753935:web:2e0408e15fd81dea6e13ba",
  measurementId: "G-GWGQ8LDDTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);