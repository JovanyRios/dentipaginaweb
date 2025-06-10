// src/services/authService.js
import { auth } from '../config/firebaseConfig'; // Asegúrate de que este path sea correcto
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  // updateProfile, // Opcional, si quieres actualizar el perfil del usuario
} from 'firebase/auth';

/**
 * Registra un nuevo usuario con correo electrónico y contraseña.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<object>} El objeto UserCredential del usuario creado.
 * @throws {Error} Si ocurre un error durante el registro.
 */
export const signUpWithEmail = async (email, password) => {
  console.log('authService: signUpWithEmail - Intentando registrar con email:', email);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('authService: signUpWithEmail - Usuario registrado:', userCredential.user);
    // Puedes actualizar el perfil si lo deseas, por ejemplo:
    // await updateProfile(userCredential.user, { displayName: "Nombre de Usuario" });
    return userCredential;
  } catch (error) {
    console.error('authService: signUpWithEmail - Error:', error.code, error.message);
    throw new Error(error.message || 'No se pudo registrar el usuario.');
  }
};

/**
 * Inicia sesión de un usuario con correo electrónico y contraseña.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<object>} El objeto UserCredential del usuario que inició sesión.
 * @throws {Error} Si ocurre un error durante el inicio de sesión.
 */
export const signInWithEmail = async (email, password) => {
  console.log('authService: signInWithEmail - Intentando iniciar sesión con email:', email);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('authService: signInWithEmail - Usuario inició sesión:', userCredential.user);
    return userCredential;
  } catch (error) {
    console.error('authService: signInWithEmail - Error:', error.code, error.message);
    throw new Error(error.message || 'No se pudo iniciar sesión.');
  }
};

/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error durante el cierre de sesión.
 */
export const signOutUser = async () => {
  console.log('authService: signOutUser - Intentando cerrar sesión.');
  try {
    await signOut(auth);
    console.log('authService: signOutUser - Sesión cerrada.');
  } catch (error) {
    console.error('authService: signOutUser - Error:', error.code, error.message);
    throw new Error(error.message || 'No se pudo cerrar la sesión.');
  }
};

/**
 * Observador para los cambios en el estado de autenticación del usuario.
 * @param {function} callback - Se llama con el objeto `user` o `null` cada vez que cambia el estado.
 * @returns {function} Una función para cancelar la suscripción al observador.
 */
export const onAuthStateChangedListener = (callback) => {
  console.log('authService: onAuthStateChangedListener - Suscribiéndose a cambios de auth.');
  return onAuthStateChanged(auth, callback);
};
