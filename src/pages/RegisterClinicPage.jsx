// src/pages/RegisterClinicPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicForm from '../components/clinic/ClinicForm';
import { addClinic } from '../services/clinicService';
import Button from '../components/common/Button';
// import Modal from '../components/common/Modal'; // Ya no usaremos Modal para feedback simple aquí
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify'; // <<< IMPORTAR toast

const RegisterClinicPage = () => {
  const { currentUser, isLoadingAuth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Ya no necesitamos estados para el modal de feedback
  // const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  // const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'success' });
  const navigate = useNavigate();

  const handleRegisterSubmit = async (clinicData) => {
    if (!currentUser) {
      toast.error('Debes iniciar sesión para registrar una nueva clínica.'); // <<< TOAST de error
      navigate('/login'); // Redirigir a login
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSave = {
        ...clinicData,
        location: {
          latitude: parseFloat(clinicData.location.lat),
          longitude: parseFloat(clinicData.location.lng)
        }
      };
      
      const newClinicId = await addClinic(dataToSave, currentUser.uid);
      console.log('RegisterClinicPage: Nueva clínica registrada con ID:', newClinicId, 'por Usuario ID:', currentUser.uid);
      
      toast.success(`Clínica "${clinicData.name}" registrada correctamente.`); // <<< TOAST de éxito
      navigate('/clinics'); // Redirigir después del éxito

    } catch (error) {
      console.error("RegisterClinicPage: Error al registrar la clínica:", error);
      toast.error(error.message || "No se pudo registrar la clínica."); // <<< TOAST de error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ya no necesitamos handleCloseModal

  if (isLoadingAuth) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
            <p>Verificando autenticación...</p>
        </div>
    );
  }

  if (!currentUser && !isLoadingAuth) {
    // Redirigir si no está autenticado (ProtectedRoute ya lo hace, pero es una doble seguridad o si se accede de otra forma)
    // O mostrar un mensaje más amigable aquí antes de la redirección de ProtectedRoute
    // toast.info('Por favor, inicia sesión para acceder a esta página.'); // Opcional
    // navigate('/login'); // ProtectedRoute se encargará de esto.
    // Por ahora, dejaremos que ProtectedRoute maneje la redirección si el usuario llega aquí sin estar logueado.
    // El ClinicForm no se mostrará si no hay currentUser.
     return (
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-0 text-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Acceso Restringido</h2>
        <p className="text-gray-600 mb-6">
          Cargando información de usuario o necesitas iniciar sesión.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-0">
      <ClinicForm 
        onSubmit={handleRegisterSubmit} 
        isLoading={isSubmitting}
      />
      
      <div className="mt-8 text-center">
        <Button 
          variant="outline-primary" 
          onClick={() => navigate('/clinics')}
        >
          Ver Lista de Clínicas
        </Button>
      </div>

      {/* El Modal ya no se usa para feedback de éxito/error aquí */}
    </div>
  );
};

export default RegisterClinicPage;