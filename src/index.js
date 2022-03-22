import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  // getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth();

// collection reference
const colRef = collection(db, "books");

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     console.log(books);
//   })
//   .catch((error) => alert("something went terribly wrong"));

// queries

// const q = query(colRef, where("author", "==", "Isayama"));

// orderBy this needs an index to work
// const q = query(
//   colRef,
//   where("author", "==", "Isayama"),
//   orderBy("title", "desc")
//   );

const q = query(colRef, orderBy("createdAt", "desc"));

// real time collection data

// onSnapshot(colRef, (snapshot) => {
//   let books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   console.log(books);
// });

onSnapshot(q, (snapshot) => {
  let books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(books);
});

/** CRUD */

// adding docs
const addBookForm = document.getElementById("add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
    alert("book added successfully");
  });
});

// deleting docs
const deleteBookForm = document.getElementById("delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookForm.book_id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
    alert("book deleted successfully");
  });
});

// getting single doc

const docRef = doc(db, "books", "bVYdIhE9eQ21DJf940eN");
// getDoc(docRef).then((doc) => {
//   console.log("getting single doc");
//   console.log(doc.data(), doc.id);
// });

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating docs

const updateForm = document.getElementById("update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateForm.id.value);
  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
    alert("updated successfully");
  });
});

// sign up

const signUpForm = document.getElementById("signup");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(
    auth,
    signUpForm.email.value,
    signUpForm.password.value
  ).then((cred) => {
    console.log("user created:", cred.user);
    signUpForm.reset();
  });
});
