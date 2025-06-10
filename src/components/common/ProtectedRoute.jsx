// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Ajusta la ruta si es necesario
import LoadingSpinner from './LoadingSpinner'; // Para mostrar mientras se verifica auth

/**
 * Un componente para proteger rutas.
 * Si el usuario no está autenticado, redirige a la página de login.
 * Guarda la ubicación original para redirigir de vuelta después del login.
 * @param {object} props
 * @param {React.ReactNode} props.children - El componente/ruta a renderizar si el usuario está autenticado.
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoadingAuth } = useAuth();
  const location = useLocation(); // Para guardar la ruta desde la que se intentó acceder

  console.log("ProtectedRoute: currentUser:", currentUser, "isLoadingAuth:", isLoadingAuth);

  if (isLoadingAuth) {
    // Muestra un spinner mientras se verifica el estado de autenticación
    console.log("ProtectedRoute: Verificando estado de autenticación...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
        <p className="ml-3">Verificando autenticación...</p>
      </div>
    );
  }

  if (!currentUser) {
    // Si no hay usuario y ya no estamos cargando, redirigir a login
    console.log("ProtectedRoute: Usuario no autenticado. Redirigiendo a /login desde:", location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si hay un usuario y la carga terminó, renderiza el contenido protegido
  console.log("ProtectedRoute: Usuario autenticado. Renderizando contenido protegido.");
  return children;
};

export default ProtectedRoute;
