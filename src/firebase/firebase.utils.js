import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyDqj0zTKPyfKuVtM3o_WEhydu3P2lTFBHc",
        authDomain: "crwn-db-84256.firebaseapp.com",
        databaseURL: "https://crwn-db-84256.firebaseio.com",
        projectId: "crwn-db-84256",
        storageBucket: "crwn-db-84256.appspot.com",
        messagingSenderId: "51545779655",
        appId: "1:51545779655:web:d52fb2bf7b961a45f2fde2",
        measurementId: "G-T4F089EMNH"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;