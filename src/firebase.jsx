// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDPP5_JDcOyWxmWdSVTdYL86yPZNiZcVDQ",
    authDomain: "userauthentication-775c1.firebaseapp.com",
    projectId: "userauthentication-775c1",
    storageBucket: "userauthentication-775c1.appspot.com",
    messagingSenderId: "155237487800",
    appId: "1:155237487800:web:2e0217cdd3e96ed769904d"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth,sendPasswordResetEmail };
