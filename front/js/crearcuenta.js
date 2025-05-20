/*import {
  getAuth,
  createUserWithEmailAndPassword
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

const form = document.getElementById("registerForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Usuario creado con éxito");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Error al crear el usuario: " + error.message);
    });
});
*/

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const firstName = document.getElementById("nombre").value;
  const lastName = document.getElementById("apellido").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdAt: new Date()
    });
    alert("Usuario registrado correctamente");
    window.location.href = "login.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});