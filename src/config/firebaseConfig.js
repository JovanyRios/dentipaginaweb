// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtL5I3Fg6xDriqa0Co7tkDR3BMnBawznM",
  authDomain: "denti-54d3c.firebaseapp.com",
  projectId: "denti-54d3c",
  storageBucket: "denti-54d3c.firebasestorage.app",
  messagingSenderId: "512447164362",
  appId: "1:512447164362:web:d1342eb7c312ab27a62933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar servicios de Firebase que necesites
const db = getFirestore(app); // Instancia de Firestore (base de datos)
const auth = getAuth(app);   // Instancia de Auth (autenticación)

// Exportar las instancias para usarlas en otras partes de tu aplicación
export { db, auth, app };