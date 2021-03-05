import firebase from 'firebase/app';
import 'firebase/auth'; // If you need it
import 'firebase/firestore'; // If you need it
// import 'firebase/storage'; // If you need it
// import 'firebase/analytics'; // If you need it
// import 'firebase/performance'; // If you need it

//TODO fill fields below
const clientCredentials = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // Check that `window` is in scope for the analytics module!
  // if (typeof window !== 'undefined') {
  //   // Enable analytics. https://firebase.google.com/docs/analytics/get-started
  //   if ('measurementId' in clientCredentials) {
  //     firebase.analytics();
  //     firebase.performance();
  //   }
  // }
}

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
