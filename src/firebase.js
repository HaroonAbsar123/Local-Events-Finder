import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyCDozkmlepZoaNNm6uGPdM_U-J35wcdQYY",
    authDomain: "local-events-finder-bad13.firebaseapp.com",
    projectId: "local-events-finder-bad13",
    storageBucket: "local-events-finder-bad13.appspot.com",
    messagingSenderId: "451549891621",
    appId: "1:451549891621:web:7ec5140903ca81ca1243cc"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
export const storage = getStorage(app);
export const db = getFirestore(app)