<script type="module">
// ---------------- FIREBASE SETUP ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAIeuTXkhi6aIgOPUY2QdhVxDR1Un4C8oQ",
  authDomain: "unlac-health.firebaseapp.com",
  projectId: "unlac-health",
  storageBucket: "unlac-health.firebasestorage.app",
  messagingSenderId: "604002765264",
  appId: "1:604002765264:web:1256e09260bf2d4a0951d5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
