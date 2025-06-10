
// src/components/common/Modal.jsx
import React from 'react';

/**
 * Componente Modal reutilizable.
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Controla si el modal está abierto o cerrado.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {React.Node} props.children - Contenido del modal.
 * @param {string} [props.title] - Título del modal.
 */
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          {title && <h3 className="text-xl font-semibold text-gray-800">{title}</h3>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
