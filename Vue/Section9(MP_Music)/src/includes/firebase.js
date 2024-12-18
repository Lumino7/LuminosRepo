import firebase from "firebase/app"; //only importing the app library from firebase instead of importing all firebase packages,
//decreasing the bundle size.
import 'firebase/auth'; //module name not needed as firebase is smart enough to extend itself with the imported module.

const firebaseConfig = { //generated and copied from firebase website
  apiKey: "AIzaSyA-P0cXXOaU7ukka9n888J3OPebQwCprKE",
  authDomain: "music-57b1b.firebaseapp.com",
  projectId: "music-57b1b",
  storageBucket: "music-57b1b.firebasestorage.app",
  messagingSenderId: "562075242473",
  appId: "1:562075242473:web:90536a1276eed75f388578"
};

export default firebase.initializeApp(firebaseConfig);
