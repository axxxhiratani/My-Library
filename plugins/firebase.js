import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyA4XM5B0h3sNxfNZjqBeFOVWB3guLN2Sp0",
      authDomain: "my-library-3e57a.firebaseapp.com",
      projectId: "my-library-3e57a",
      storageBucket: "my-library-3e57a.appspot.com",
      messagingSenderId: "1074006547183",
      appId: "1:1074006547183:web:e1c083cbbf311d345fd91a",
      measurementId: "G-94NEB8LQ26"
    }
  )
}

export default firebase
