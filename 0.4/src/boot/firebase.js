// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJDlS4eDW9fZ1Pf7cVRMMcsVh-8pLwHRs",
  authDomain: "studentapp-5773b.firebaseapp.com",
  databaseURL: "https://studentapp-5773b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studentapp-5773b",
  storageBucket: "studentapp-5773b.appspot.com",
  messagingSenderId: "366484284596",
  appId: "1:366484284596:web:72ab22082469ba617d63e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fAuth=getAuth(app);
const fDb=getDatabase(app);
const fS=getStorage(app)
export {fAuth,fDb,fS};
