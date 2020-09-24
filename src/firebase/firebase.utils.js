import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyATWzkzBfx4_t4sGFQ_FPpPt4JdsVPNRz0",
    authDomain: "crwn-db-db788.firebaseapp.com",
    databaseURL: "https://crwn-db-db788.firebaseio.com",
    projectId: "crwn-db-db788",
    storageBucket: "crwn-db-db788.appspot.com",
    messagingSenderId: "1096731225947",
    appId: "1:1096731225947:web:5d3c41a498fc0ee169747e",
    measurementId: "G-QD1PV4CYCL"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;