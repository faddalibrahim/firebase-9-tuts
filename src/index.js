import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9Rnv8CoDujhaqDCiAkQPXumW9aU8tXCY",
  authDomain: "practice-79d9b.firebaseapp.com",
  projectId: "practice-79d9b",
  storageBucket: "practice-79d9b.appspot.com",
  messagingSenderId: "186157097008",
  appId: "1:186157097008:web:d08d73f298ebecf7fb4df5",
};

/** SETUP */

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

/** CRUD */

// adding docs
const addBookForm = document.getElementById("add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
    alert("book added successfully");
  });
});

// adding docs
const deleteBookForm = document.getElementById("delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookForm.book_id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
    alert("book deleted successfully");
  });
});
