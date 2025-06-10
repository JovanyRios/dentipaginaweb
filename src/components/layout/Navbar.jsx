// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, signOut, isLoadingAuth } = useAuth();

  const baseNavigationLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Ver Clínicas', href: '/clinics' },
    { name: 'Mis Clínicas', href: '/my-clinics', requiresAuth: true }, // <<< NUEVO ENLACE
    { name: 'Registrar Clínica', href: '/register-clinic', requiresAuth: true },
    { name: 'Blog', href: '/blog' },
  ];

  const navigationLinks = baseNavigationLinks.filter(link => {
    if (link.requiresAuth && !currentUser) {
      return false;
    }
    return true;
  });

  const handleSignOutClick = async () => {
    try {
      await signOut();
      navigate('/login'); 
      setIsMobileMenuOpen(false); 
    } catch (error) {
      console.error("Navbar: Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-slate-800 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>Estás en el sitio web para México.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="h-8 w-auto text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
              </svg>
              <span className="font-bold text-xl text-slate-800">DentalApp</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                            ${location.pathname === item.href
                              ? 'text-sky-500 font-semibold bg-sky-50'
                              : 'text-gray-700 hover:text-sky-600 hover:bg-sky-50'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoadingAuth ? (
              <div className="text-sm text-slate-500 animate-pulse">Verificando...</div>
            ) : currentUser ? (
              <>
                <span className="text-sm text-slate-600">
                    {currentUser.displayName || currentUser.email}
                </span>
                <Button variant="outline-primary" size="sm" onClick={handleSignOutClick}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline-primary" size="sm">Ingresar</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="cta" size="sm">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen ? ( <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> ) : ( <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg> )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                            ${location.pathname === item.href
                              ? 'text-sky-600 bg-sky-100'
                              : 'text-gray-700 hover:text-sky-600 hover:bg-sky-50'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 pb-3 border-t border-gray-200">
            <div className="flex flex-col items-center px-4 space-y-3">
              {isLoadingAuth ? (
                 <div className="text-sm text-slate-500 py-2 animate-pulse">Verificando...</div>
              ) : currentUser ? (
                <>
                  <div className="text-sm text-slate-700 py-2 text-center">
                    {currentUser.displayName || currentUser.email}
                  </div>
                  <Button variant="outline-primary" size="sm" className="w-full" onClick={handleSignOutClick}>
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline-primary" size="sm" className="w-full">Ingresar</Button>
                  </Link>
                  <Link to="/signup" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="cta" size="sm" className="w-full">Registrarse</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
