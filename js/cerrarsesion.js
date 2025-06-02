import {
  getAuth,
  signOut,
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

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("Has cerrado sesión.");
        window.location.href = "./login.html";  // o el archivo que uses para login
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error.message);
      });
  });
}
