// src/components/clinic/ClinicForm.jsx
import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField'; 
import Button from '../common/Button'; 
import MapPicker from '../common/MapPicker'; 
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Formulario para registrar o editar una clínica dental.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onSubmit - Función que se llama al enviar el formulario. Recibe los datos de la clínica.
 * @param {object} [props.initialData] - Datos iniciales para editar una clínica existente.
 * @param {boolean} [props.isLoading=false] - Indica si se está procesando el envío.
 * @param {string} [props.submitButtonText='Registrar Clínica'] - Texto para el botón de envío.
 * @param {string} [props.title='Registrar Nueva Clínica Dental'] - Título del formulario.
 */
const ClinicForm = ({ 
  onSubmit, 
  initialData, 
  isLoading = false,
  submitButtonText,
  title
}) => {
  const defaultInitialData = {
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    servicesOffered: '', 
    operatingHours_monday: '', 
    description: '',
    location: { lat: 19.432608, lng: -99.133209 }, // Default a CDMX
  };

  const [formData, setFormData] = useState(defaultInitialData);
  const [formErrors, setFormErrors] = useState({});

  const currentTitle = title || (initialData ? 'Editar Clínica Dental' : 'Registrar Nueva Clínica Dental');
  const currentSubmitButtonText = submitButtonText || (initialData ? 'Actualizar Clínica' : 'Registrar Clínica');


  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultInitialData, 
        ...initialData,
        servicesOffered: Array.isArray(initialData.servicesOffered) 
          ? initialData.servicesOffered.join(', ') 
          : (initialData.servicesOffered || ''),
        location: initialData.location || defaultInitialData.location,
      });
    } else {
      setFormData(defaultInitialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleLocationChange = (newLocation) => {
    setFormData(prev => ({ ...prev, location: newLocation }));
     if (formErrors.location) {
      setFormErrors(prev => ({ ...prev, location: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'El nombre de la clínica es obligatorio.';
    if (!formData.address.trim()) errors.address = 'La dirección es obligatoria.';
    if (!formData.phone.trim()) errors.phone = 'El teléfono es obligatorio.';
    else if (!/^\+?[0-9\s-()]{7,20}$/.test(formData.phone)) {
      errors.phone = 'El formato del teléfono no es válido.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'El formato del correo electrónico no es válido.';
    }
    if (formData.website && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(formData.website)) {
        errors.website = 'El formato del sitio web no es válido.';
    }
    if (!formData.location || formData.location.lat === undefined || formData.location.lng === undefined) {
        errors.location = 'Debe seleccionar una ubicación en el mapa.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const clinicDataToSubmit = {
        ...formData,
        servicesOffered: formData.servicesOffered.split(',').map(s => s.trim()).filter(s => s),
        website: formData.website && !formData.website.startsWith('http') ? `https://${formData.website}` : formData.website,
      };
      onSubmit(clinicDataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 border-b pb-3">
        {currentTitle}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="name"
          name="name"
          label="Nombre de la Clínica"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
          required
        />
        <InputField
          id="phone"
          name="phone"
          label="Teléfono de Contacto"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={formErrors.phone}
          required
        />
      </div>
      
      <InputField
        id="address"
        name="address"
        label="Dirección Completa"
        type="text"
        value={formData.address}
        onChange={handleChange}
        error={formErrors.address}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="email"
          name="email"
          label="Correo Electrónico (opcional)"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
        />
        <InputField
          id="website"
          name="website"
          label="Sitio Web (opcional)"
          type="text" // Cambiado a text para permitir URLs sin http al inicio
          value={formData.website}
          onChange={handleChange}
          error={formErrors.website}
          placeholder="www.ejemplo.com"
        />
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Ubicación en el Mapa <span className="text-red-500">*</span>
        </label>
        <MapPicker 
  initialPosition={formData.location} // formData.location debe ser {lat: ..., lng: ...}
  onLocationChange={handleLocationChange}
  // height="350px" // Puedes ajustar la altura aquí si es necesario
/>
        {formErrors.location && <p className="mt-1 text-xs text-red-600">{formErrors.location}</p>}
      </div>

      <InputField
        id="servicesOffered"
        name="servicesOffered"
        label="Servicios Ofrecidos (separados por coma)"
        type="text"
        value={formData.servicesOffered}
        onChange={handleChange}
        placeholder="Ej: Limpieza Dental, Ortodoncia, Endodoncia"
        error={formErrors.servicesOffered}
      />
      
      <InputField
        id="operatingHours_monday" // Ejemplo simplificado
        name="operatingHours_monday"
        label="Horario de Atención (ej. Lunes a Viernes 9am-6pm)"
        type="text"
        value={formData.operatingHours_monday}
        onChange={handleChange}
        error={formErrors.operatingHours_monday}
        placeholder="L-V: 9:00 - 18:00, S: 9:00 - 13:00"
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción Adicional (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          placeholder="Breve descripción de la clínica, especialidades, información relevante para pacientes, etc."
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
        <Button 
            type="button" 
            variant="secondary" 
            onClick={() => setFormData(initialData || defaultInitialData)} 
            disabled={isLoading}
            className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
        <Button 
            type="submit" 
            variant="cta" 
            disabled={isLoading}
            className="w-full sm:w-auto"
        >
          {isLoading ? <LoadingSpinner size="sm" color="white" /> : currentSubmitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default ClinicForm;