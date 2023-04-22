/* eslint-disable prettier/prettier */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, addDoc, getDocs, getDoc, setDoc, Timestamp, where, query } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzEVBpidx0SSYI_Aoip4mbSr44FkmLCXo",
  authDomain: "eridirect-de469.firebaseapp.com",
  projectId: "eridirect-de469",
  storageBucket: "eridirect-de469.appspot.com",
  messagingSenderId: '878956527106',
  appId: '1:878956527106:web:30efdce3a0edb9fb61311b',
  measurementId: 'G-4HP03V5T2S',
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);
// Initialize Authorization and get a reference to the service
const auth = getAuth(firebaseApp);

export { db, auth, collection, addDoc, onAuthStateChanged, getDocs, doc, getDoc, setDoc, Timestamp, where, query }; 
