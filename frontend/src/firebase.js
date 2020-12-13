import firebase from "firebase"
import 'firebase/firestore';
import 'firebase/storage';


firebase.initializeApp({

})
  

// Initialize Firebase
firebase.analytics();
  

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

const provider = new firebase.auth.GoogleAuthProvider()


export {auth, provider, storage}
export default db