const firebaseConfig = {

  apiKey: "AIzaSyC8EnxdK6hX5SalnvkZlpXdpIEVWf0qn4w",
  authDomain: "violence-investigation.firebaseapp.com",
  projectId: "violence-investigation",
  storageBucket: "violence-investigation.appspot.com",
  messagingSenderId: "219225688182",
  appId: "1:219225688182:web:1f66a04fa1fbba4008b757",
  measurementId: "G-4X8CP49CNP"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Test Firebase initialization
console.log(firebase.auth());

// Handle Login Form Submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // User signed in
          const user = userCredential.user;
          // Redirect to videos.html
          window.location.href = "videos.html";
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage); // Display error to the user
      });
});
