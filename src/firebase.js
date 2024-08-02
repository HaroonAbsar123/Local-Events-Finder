import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCDozkmlepZoaNNm6uGPdM_U-J35wcdQYY",
    authDomain: "local-events-finder-bad13.firebaseapp.com",
    projectId: "local-events-finder-bad13",
    storageBucket: "local-events-finder-bad13.appspot.com",
    messagingSenderId: "451549891621",
    appId: "1:451549891621:web:7ec5140903ca81ca1243cc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)