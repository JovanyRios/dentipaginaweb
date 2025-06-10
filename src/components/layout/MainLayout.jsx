
// src/components/layout/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer'; 

/**
 * Componente de layout principal que envuelve las páginas.
 * Incluye Navbar y Footer.
 * @param {object} props - Propiedades del componente.
 * @param {React.Node} props.children - Contenido de la página a renderizar.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50"> {/* Fondo general un poco gris claro */}
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
