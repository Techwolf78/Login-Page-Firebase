import { auth, db } from "./firebase-config.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const recaptchaVerifier = new RecaptchaVerifier('send-otp', {
    size: 'invisible',
    callback: (response) => {
        sendOTP();
    }
}, auth);

async function sendOTP() {
    const phoneNumber = document.getElementById('phone-number').value;
    const appVerifier = recaptchaVerifier;

    if (!phoneNumber) {
        alert('Please enter a valid phone number');
        return;
    }

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            document.getElementById('otp-container').classList.remove('hidden');
            alert("OTP sent!");
        }).catch((error) => {
            console.error("Error during OTP sending: ", error);
            alert("Failed to send OTP. Please try again.");
        });
}

async function verifyOTP() {
    const otp = document.getElementById('otp').value;
    const confirmationResult = window.confirmationResult;

    confirmationResult.confirm(otp).then((result) => {
        const user = result.user;
        alert("User signed in successfully!");

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Store the user's data in Firestore
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, {
            username: username,
            password: password,
            phoneNumber: user.phoneNumber,
            createdAt: new Date()
        })
        .then(() => {
            alert("User data saved to Firestore!");
        })
        .catch((error) => {
            console.error("Error saving user data: ", error);
        });
    }).catch((error) => {
        console.error("Error verifying OTP: ", error);
        alert("Invalid OTP. Please try again.");
    });
}

document.getElementById('send-otp').addEventListener('click', sendOTP);
document.getElementById('verify-otp').addEventListener('click', verifyOTP);
