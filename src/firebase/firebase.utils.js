import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCxCrHDiQ6ZCtwt13Y_oBeQQfZEZA3lA2Q",
    authDomain: "crwn-db-20200924.firebaseapp.com",
    databaseURL: "https://crwn-db-20200924.firebaseio.com",
    projectId: "crwn-db-20200924",
    storageBucket: "crwn-db-20200924.appspot.com",
    messagingSenderId: "381282212306",
    appId: "1:381282212306:web:8d05a1921944d4525a500b",
    measurementId: "G-2P1WQNGX6N"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // console.log(userAuth);

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;