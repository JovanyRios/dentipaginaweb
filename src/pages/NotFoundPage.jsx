// src/pages/NotFoundPage.jsx
import React from 'react';
import Button from '../components/common/Button'; // Asumiendo que quieres usar tu botón
// import { Link } from 'react-router-dom'; // Descomentar cuando se configure el router

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Puedes añadir un SVG o imagen de error 404 aquí */}
        <svg className="mx-auto h-24 w-24 text-sky-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9c0-4.97 4.03-9 9-9s9 4.03 9 9zM13.586 10.414a2 2 0 112.828 2.828L12 17.657l-4.414-4.415a2 2 0 112.828-2.828L12 12.343l1.586-1.929z" opacity="0.4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01" />
        </svg>
        
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-800 mb-3">
          Oops!
        </h1>
        <h2 className="text-3xl font-bold text-sky-600 mb-6">
          Error 404 - Página No Encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
          Quizás quieras volver al inicio.
        </p>
        
        {/* Este botón luego usaría <Link to="/"> de react-router-dom */}
        <Button 
          variant="cta" 
          size="lg" 
          onClick={() => console.log('Ir a Inicio (placeholder)')} 
          className="w-full sm:w-auto"
        >
          Volver a la Página de Inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;