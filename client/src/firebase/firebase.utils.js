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
export const createUserProfileDocument = async (userAuth, additionalData) => {
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();

        if(!snapShot.exists) {
                const { displayName, email } = userAuth;
                const createdAt = new Date();

                try{
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        })
                } catch (error){
                        console.log('error creating user', error.message);
                }
        }

        return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
        const collectionRef = firestore.collection(collectionKey);
        
        const batch = firestore.batch();
        objectsToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj);
        });

        return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
        const transformedCollection = collections.docs.map(doc => {
                const { title, items } = doc.data();

                return {
                        routeName: encodeURI(title.toLowerCase()),
                        id: doc.id,
                        title,
                        items
                };
        });

        console.log(transformedCollection);
        return transformedCollection.reduce((accumulator, collection) => {
                accumulator[collection.title.toLowerCase()] = collection;
                return accumulator;
        }, {});
};

export const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
                const unsubscibe = auth.onAuthStateChanged(userAuth => {
                        unsubscibe();
                        resolve(userAuth);
                }, reject);
        });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;