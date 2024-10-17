// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, deleteDoc, limit, getFirestore, collection, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore()

const ITEMS = 'items'

export {
    firestore,
    collection,
    query,
    limit,
    onSnapshot,
    orderBy,
    addDoc,
    doc,
    deleteDoc,
    ITEMS,
}