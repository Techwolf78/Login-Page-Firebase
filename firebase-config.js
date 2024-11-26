// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCln-9sgIMTiqxZzEtnYqKJu5sYBNpqaXg",
    authDomain: "guestlist-158e7.firebaseapp.com",
    databaseURL: "https://guestlist-158e7-default-rtdb.firebaseio.com",
    projectId: "guestlist-158e7",
    storageBucket: "guestlist-158e7.firebasestorage.app",
    messagingSenderId: "265509884217",
    appId: "1:265509884217:web:743a79baceb7e31d6918e8",
    measurementId: "G-72LNLNW6B2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firestore Database

export { auth, db };
