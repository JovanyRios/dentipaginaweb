
// src/components/common/InputField.jsx
import React from 'react';

/**
 * Componente de campo de entrada reutilizable.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.id - ID del campo.
 * @param {string} props.label - Etiqueta del campo.
 * @param {string} props.type - Tipo de input (text, email, password, number, etc.).
 * @param {string} props.name - Nombre del campo.
 * @param {string|number} props.value - Valor del campo.
 * @param {function} props.onChange - Función al cambiar el valor.
 * @param {string} [props.placeholder] - Placeholder del campo.
 * @param {string} [props.error] - Mensaje de error a mostrar.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor.
 * @param {boolean} [props.required=false] - Si el campo es obligatorio.
 */
const InputField = ({ id, label, type, name, value, onChange, placeholder, error, className = '', required = false }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;