import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';  

const firebaseConfig = {
  apiKey: "AIzaSyAcEXn0hwIpc8yu31I8I5R5oWjr5Bap8PU",
  authDomain: "dbmantra-8ac00.firebaseapp.com",
  projectId: "dbmantra-8ac00",
  storageBucket: "dbmantra-8ac00.appspot.com",
  messagingSenderId: "396911581837",
  appId: "1:396911581837:web:0cb1c0d9041f433c0620c4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); 
