// src/components/clinic/ClinicCard.jsx
import React from 'react';
import Button from '../common/Button';

const IconPlaceholder = ({ children, className = "w-4 h-4 mr-2 text-sky-600" }) => (
  <span className={className}>{children}</span>
);

/**
 * Componente para mostrar la información de una clínica en una tarjeta.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.clinic - Objeto con la información de la clínica.
 * @param {object | null} props.currentUser - El objeto del usuario autenticado actualmente.
 * @param {function} [props.onEdit] - Función a llamar para editar la clínica.
 * @param {function} [props.onDelete] - Función a llamar para eliminar la clínica.
 */
const ClinicCard = ({ clinic, currentUser, onEdit, onDelete }) => {
  if (!clinic) return null;

  const { id, name, address, phone, email, website, servicesOffered, location, photoUrl, description, createdByUserId } = clinic;

  // Determina si el usuario actual es el propietario de la clínica
  const isOwner = currentUser && currentUser.uid === createdByUserId;

  const defaultPhoto = `https://placehold.co/600x400/E3F2FD/1A237E?text=${encodeURIComponent(name.charAt(0))}&font=montserrat`;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 flex flex-col">
      <img 
        className="w-full h-48 object-cover" 
        src={photoUrl || defaultPhoto} 
        alt={`Imagen de ${name}`} 
        onError={(e) => { e.target.onerror = null; e.target.src = defaultPhoto; }}
      />
      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{name}</h3>
        
        {address && (
          <p className="text-gray-600 text-sm mb-2 flex items-start">
            <IconPlaceholder>📍</IconPlaceholder>
            {address}
          </p>
        )}
        {phone && (
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <IconPlaceholder>📞</IconPlaceholder>
            {phone}
          </p>
        )}
        
        {description && (
            <p className="text-sm text-gray-500 mb-3 leading-relaxed line-clamp-2">
                {description}
            </p>
        )}

        {servicesOffered && servicesOffered.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs text-gray-500 uppercase font-semibold mb-1.5">Servicios Destacados:</h4>
            <div className="flex flex-wrap gap-1.5">
              {servicesOffered.slice(0, 4).map((service, index) => ( 
                <span key={index} className="bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  {service}
                </span>
              ))}
              {servicesOffered.length > 4 && (
                <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium">...</span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex-grow"></div> 

        {location?.latitude && (
          <p className="text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
            Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
          </p>
        )}

      </div>
      {/* Condición para mostrar los botones de acción: el usuario debe ser el propietario */}
      {isOwner && (onEdit || onDelete) && (
        <div className="p-4 bg-slate-50 border-t border-gray-200 flex justify-end space-x-2">
          {onEdit && 
            <Button onClick={() => onEdit(clinic)} variant="outline-primary" size="sm" className="flex items-center">
              ✏️ Editar
            </Button>
          }
          {onDelete && 
            <Button onClick={() => onDelete(id)} variant="danger" size="sm" className="flex items-center">
              🗑️ Eliminar
            </Button>
          }
        </div>
      )}
    </div>
  );
};

export default ClinicCard;