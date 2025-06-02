import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKcBzRuDrbWGeirYJhv3TyZmorBdQbnp0",
  authDomain: "login-db31e.firebaseapp.com",
  projectId: "login-db31e",
  storageBucket: "login-db31e.appspot.com",
  messagingSenderId: "145693940411",
  appId: "1:145693940411:web:41f74dcaa011831c3d279e",
  measurementId: "G-KPTJGBCJPH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
      window.location.href = "/erp-front/front/index.html"; // Redirigir a la página principal
    })
    .catch((error) => {
      alert("Error al iniciar sesión: " + error.message);
    });
});
