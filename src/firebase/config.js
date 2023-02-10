import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC5nPh3r5c3nO0wxsccORjcrNw99cppLpc",
    authDomain: "vue-firebase-2714b.firebaseapp.com",
    projectId: "vue-firebase-2714b",
    storageBucket: "vue-firebase-2714b.appspot.com",
    messagingSenderId: "218282292685",
    appId: "1:218282292685:web:8fe963eab8406183e58084"
  };


// init firebase
const app = initializeApp(firebaseConfig)

//init firestore service
const db = getFirestore(app);

// init timestamp
const timestamp = serverTimestamp

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export{ auth, db, timestamp }