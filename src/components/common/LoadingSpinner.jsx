
// src/components/common/LoadingSpinner.jsx
import React from 'react';

/**
 * Componente simple de spinner de carga.
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.size='md'] - Tamaño del spinner (sm, md, lg).
 * @param {string} [props.color='sky'] - Color del spinner (usando colores de Tailwind).
 * @param {string} [props.className] - Clases CSS adicionales.
 */
const LoadingSpinner = ({ size = 'md', color = 'sky', className = '' }) => {
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'w-5 h-5';
      break;
    case 'lg':
      sizeClasses = 'w-10 h-10';
      break;
    case 'md':
    default:
      sizeClasses = 'w-8 h-8';
      break;
  }

  // Asegúrate que las clases de color estén completas para que Tailwind JIT las genere
  // ej. border-sky-500, border-t-sky-200
  const borderColorClass = `border-${color}-500`; 
  // Para el color del borde superior transparente, se usa style inline para mayor seguridad con JIT
  // const borderTopColorClass = `border-t-${color}-200`; // Esta sería la clase si no fuera transparente

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses} border-4 ${borderColorClass}`}
        style={{ borderTopColor: 'transparent' }} 
      ></div>
    </div>
  );
};

export default LoadingSpinner;