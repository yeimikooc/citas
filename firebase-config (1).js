// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

 const firebaseConfig = {
   apiKey: "AIzaSyAV4anOE0soYkA4f7Vc-mF1GCO-gN-xKsQ",
   authDomain: "bdnosql-a6bc1.firebaseapp.com",
   projectId: "bdnosql-a6bc1",
   storageBucket: "bdnosql-a6bc1.firebasestorage.app",
   messagingSenderId: "282605116061",
   appId: "1:282605116061:web:f74810884fe34d2dc3d274",
   measurementId: "G-DGJE3X2T8E"
 };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
