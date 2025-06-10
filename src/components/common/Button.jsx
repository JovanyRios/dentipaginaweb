// src/components/common/Button.jsx
import React from 'react';

/**
 * Componente de botón reutilizable.
 * @param {object} props - Propiedades del componente.
 * @param {React.Node} props.children - Contenido del botón.
 * @param {function} props.onClick - Función a ejecutar al hacer clic.
 * @param {string} [props.type='button'] - Tipo de botón (button, submit, reset).
 * @param {string} [props.variant='primary'] - Variante de estilo (primary, secondary, danger, cta, outline-light, outline-primary).
 * @param {string} [props.size='md'] - Tamaño del botón (sm, md, lg).
 * @param {string} [props.className] - Clases CSS adicionales.
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado.
 */
const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'md', className = '', disabled = false }) => {
  const baseStyle = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-150 flex items-center justify-center';
  
  let variantStyle = '';
  switch (variant) {
    case 'primary': // Azul principal (ej. para acciones estándar)
      variantStyle = 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
      break;
    case 'cta': // Call to Action (azul más brillante, como en la referencia)
      variantStyle = 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400';
      break;
    case 'secondary':
      variantStyle = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400';
      break;
    case 'danger':
      variantStyle = 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400';
      break;
    case 'outline-light': // Botón con borde, texto oscuro, fondo transparente (para Navbar)
      variantStyle = 'border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-300';
      break;
    case 'outline-primary': // Botón con borde azul, texto azul
      variantStyle = 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-300';
      break;
    default:
      variantStyle = 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
  }

  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'py-1.5 px-3 text-sm';
      break;
    case 'lg':
      sizeStyle = 'py-2.5 px-6 text-lg';
      break;
    case 'md':
    default:
      sizeStyle = 'py-2 px-4 text-base';
      break;
  }

  if (disabled) {
    variantStyle = 'bg-gray-300 text-gray-500 cursor-not-allowed';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;