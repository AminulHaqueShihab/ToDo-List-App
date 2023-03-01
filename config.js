import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAcvdOvOAkPhTuboIYGK_Ve92iLFI6NEhA",
    authDomain: "todo-list-59418.firebaseapp.com",
    projectId: "todo-list-59418",
    storageBucket: "todo-list-59418.appspot.com",
    messagingSenderId: "637745654351",
    appId: "1:637745654351:web:35e31eae8d7bcb232a183a",
    measurementId: "G-HBGQNV934M"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}



export { firebase };