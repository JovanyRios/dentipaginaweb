
// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-50 text-gray-600 py-10 mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h5 className="font-semibold text-slate-700 mb-3">DentalApp</h5>
            <p className="text-sm">
              Facilitando la conexión entre pacientes y clínicas dentales.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-700 mb-3">Enlaces Rápidos</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-sky-600 hover:underline">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-sky-600 hover:underline">Blog</a></li>
              <li><a href="#" className="hover:text-sky-600 hover:underline">Contacto</a></li>
              <li><a href="#" className="hover:text-sky-600 hover:underline">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-700 mb-3">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-sky-600 hover:underline">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-sky-600 hover:underline">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-sky-600 hover:underline">Política de Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm">
          <p>&copy; {currentYear} DentalApp. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
