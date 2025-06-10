// src/components/clinic/ClinicList.jsx
import React from 'react';
import ClinicCard from './ClinicCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

/**
 * Componente para mostrar una lista de clínicas.
 * @param {object} props - Propiedades del componente.
 * @param {Array<object>} props.clinics - Array de objetos de clínicas.
 * @param {object | null} props.currentUser - El objeto del usuario autenticado actualmente.
 * @param {boolean} [props.isLoading=false] - Indica si se están cargando las clínicas.
 * @param {function} [props.onEditClinic] - Función para editar una clínica.
 * @param {function} [props.onDeleteClinic] - Función para eliminar una clínica.
 * @param {function} [props.onRegisterClinic] - Función para ir a la página de registro.
 */
const ClinicList = ({ clinics, currentUser, isLoading = false, onEditClinic, onDeleteClinic, onRegisterClinic }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner size="lg" />
        <p className="ml-3 text-gray-600">Cargando clínicas...</p>
      </div>
    );
  }

  if (!clinics || clinics.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No hay clínicas registradas</h3>
        <p className="mt-1 text-sm text-gray-500">
          Sé el primero en añadir una clínica a nuestro directorio.
        </p>
        {onRegisterClinic && currentUser && (
          <div className="mt-6">
            <Button onClick={onRegisterClinic} variant="cta">
              Registrar Primera Clínica
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
      {clinics.map(clinic => (
        <ClinicCard 
          key={clinic.id}
          clinic={clinic} 
          currentUser={currentUser}
          onEdit={onEditClinic ? () => onEditClinic(clinic) : undefined}
          onDelete={onDeleteClinic ? () => onDeleteClinic(clinic.id) : undefined}
        />
      ))}
    </div>
  );
};

export default ClinicList;
