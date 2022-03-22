import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9Rnv8CoDujhaqDCiAkQPXumW9aU8tXCY",
  authDomain: "practice-79d9b.firebaseapp.com",
  projectId: "practice-79d9b",
  storageBucket: "practice-79d9b.appspot.com",
  messagingSenderId: "186157097008",
  appId: "1:186157097008:web:d08d73f298ebecf7fb4df5",
};

// initialize firebase app
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore();

// collection reference
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(books);
  })
  .catch((error) => alert("something went terribly wrong"));
