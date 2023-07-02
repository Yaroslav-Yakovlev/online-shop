import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtOLn_Skx-0rmjUjAw61JRnm40B3OUuvM",
    authDomain: "online-shop-356ce.firebaseapp.com",
    projectId: "online-shop-356ce",
    storageBucket: "online-shop-356ce.appspot.com",
    messagingSenderId: "823527717618",
    appId: "1:823527717618:web:e6573c00df0bf7bba3ee6b"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();



