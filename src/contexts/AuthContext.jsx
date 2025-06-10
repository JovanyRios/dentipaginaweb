// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChangedListener, signOutUser } from '../services/authService'; // Asumiendo que signOutUser está en authService
import LoadingSpinner from '../components/common/LoadingSpinner'; // Para un estado de carga inicial

// 1. Crear el Contexto
const AuthContext = createContext({
  currentUser: null, // El usuario actual de Firebase Auth
  setCurrentUser: () => null, // Función para establecer el usuario (manejada internamente por el provider)
  isLoadingAuth: true, // Para saber si aún se está verificando el estado inicial de auth
  signOut: async () => {}, // Función para cerrar sesión
});

// Hook personalizado para usar el AuthContext fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. Crear el Proveedor del Contexto (AuthProvider)
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Estado de carga inicial

  useEffect(() => {
    // onAuthStateChangedListener devuelve la función de desuscripción (unsubscribe)
    console.log("AuthProvider: Suscribiéndose a onAuthStateChangedListener...");
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("AuthProvider: onAuthStateChangedListener - Usuario recibido:", user);
      setCurrentUser(user); // user será null si nadie está conectado, o el objeto user si sí
      setIsLoadingAuth(false); // Termina la carga inicial después de la primera verificación
    });

    // Limpiar la suscripción cuando el componente AuthProvider se desmonte
    return () => {
      console.log("AuthProvider: Desuscribiéndose de onAuthStateChangedListener.");
      unsubscribe();
    };
  }, []); // El array vacío asegura que esto solo se ejecute una vez (al montar y desmontar)

  const handleSignOut = async () => {
    console.log("AuthProvider: handleSignOut - Intentando cerrar sesión...");
    try {
      await signOutUser(); // Llama a la función de tu servicio
      // setCurrentUser(null); // onAuthStateChangedListener se encargará de esto automáticamente
      console.log("AuthProvider: handleSignOut - Sesión cerrada exitosamente desde el provider.");
    } catch (error) {
      console.error("AuthProvider: handleSignOut - Error al cerrar sesión:", error);
      // Aquí podrías manejar el error, por ejemplo, mostrar una notificación
    }
  };

  const value = {
    currentUser,
    setCurrentUser, // Aunque no lo usemos directamente desde fuera, es parte del contexto
    isLoadingAuth,
    signOut: handleSignOut, // Exponer la función de cierre de sesión
  };

  // Mientras isLoadingAuth es true, podrías mostrar un spinner de carga global
  // o simplemente no renderizar los children hasta que se resuelva el estado de auth.
  // Por ahora, no bloquearemos el renderizado de los children, pero es una opción.
  // if (isLoadingAuth) {
  //   return <LoadingSpinner size="lg" className="min-h-screen flex items-center justify-center" />;
  // }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
