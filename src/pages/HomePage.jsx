// src/pages/HomePage.jsx
import React from 'react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom'; // Importar Link

const HomePage = () => {
  return (
    <div className="text-center py-10 md:py-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6">
        Bienvenido a DentalApp
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Encuentra y registra clínicas dentales de forma fácil y rápida.
        Tu plataforma central para la gestión dental.
      </p>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
        <Link to="/register-clinic" className="w-full sm:w-auto">
          <Button 
            variant="cta" 
            size="lg" 
            className="w-full" // Asegurar que el botón tome el ancho del Link
          >
            Registrar una Clínica
          </Button>
        </Link>
        <Link to="/clinics" className="w-full sm:w-auto">
          <Button 
            variant="outline-primary" 
            size="lg" 
            className="w-full"
          >
            Ver Clínicas Existentes
          </Button>
        </Link>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-10 max-w-5xl mx-auto text-left">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-sky-700 mb-3">Fácil Registro</h3>
          <p className="text-gray-600 text-sm">
            Añade nuevas clínicas dentales a nuestro directorio con un formulario sencillo e intuitivo, incluyendo su ubicación en el mapa.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-sky-700 mb-3">Búsqueda Avanzada</h3>
          <p className="text-gray-600 text-sm">
            Localiza clínicas por nombre, servicios o cercanía. Ideal para pacientes y administradores. (Funcionalidad futura)
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-sky-700 mb-3">Gestión Centralizada</h3>
          <p className="text-gray-600 text-sm">
            Mantén la información de las clínicas actualizada y accesible desde cualquier lugar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;