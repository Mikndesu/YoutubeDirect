import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: "direct-6b4f7.firebaseapp.com",
    projectId: "direct-6b4f7",
    storageBucket: "direct-6b4f7.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: "1:52894075571:web:c3c33f5a256b220ab9bec6",
    measurementId: "G-EB5XJF731T"
}

firebase.initializeApp(config)

export default firebase