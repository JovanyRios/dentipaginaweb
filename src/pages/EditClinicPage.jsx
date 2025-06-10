// src/pages/EditClinicPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClinicForm from '../components/clinic/ClinicForm';
import { getClinicById, updateClinic } from '../services/clinicService';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EditClinicPage = () => {
  const { clinicId } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'success' });

  const fetchClinicData = useCallback(async () => {
    if (!clinicId) {
      setError("No se proporcionó un ID de clínica.");
      setIsLoading(false);
      return;
    }

    console.log(`EditClinicPage: Cargando datos para clínica ID: ${clinicId}`);
    setIsLoading(true);
    setError(null);

    try {
      const clinicData = await getClinicById(clinicId);
      if (clinicData) {
        const formattedData = {
          ...clinicData,
          location: {
            lat: clinicData.location?.latitude,
            lng: clinicData.location?.longitude,
          },
        };
        console.log("EditClinicPage: Datos formateados para el formulario:", formattedData);
        setInitialData(formattedData);
      } else {
        setError(`No se encontró una clínica con el ID: ${clinicId}`);
        setModalContent({
          title: 'Error',
          message: `No se encontró una clínica con el ID: ${clinicId}`,
          type: 'error',
        });
        setShowFeedbackModal(true);
      }
    } catch (err) {
      console.error("EditClinicPage: Error al cargar datos de la clínica:", err);
      setError(err.message || "Error al cargar los datos de la clínica.");
      setModalContent({
        title: 'Error de Carga',
        message: err.message,
        type: 'error',
      });
      setShowFeedbackModal(true);
    } finally {
      setIsLoading(false);
    }
  }, [clinicId]);

  useEffect(() => {
    fetchClinicData();
  }, [fetchClinicData]);

  const handleUpdateSubmit = async (formDataFromForm) => {
    if (!clinicId) {
      console.error("EditClinicPage: No hay clinicId para actualizar.");
      return;
    }

    setIsSubmitting(true);
    setModalContent({ title: '', message: '', type: 'success' });

    try {
      const dataToUpdate = {
        ...formDataFromForm,
        location: {
          latitude: parseFloat(formDataFromForm.location.lat),
          longitude: parseFloat(formDataFromForm.location.lng),
        },
      };

      await updateClinic(clinicId, dataToUpdate);
      console.log(`EditClinicPage: Clínica actualizada con ID: ${clinicId}`);
      setModalContent({
        title: '¡Éxito!',
        message: `La clínica "${formDataFromForm.name}" ha sido actualizada correctamente.`,
        type: 'success',
      });
      setShowFeedbackModal(true);
    } catch (error) {
      console.error("EditClinicPage: Error al actualizar la clínica:", error);
      setModalContent({
        title: 'Error de Actualización',
        message: error.message || "No se pudo actualizar la clínica. Por favor, inténtalo de nuevo.",
        type: 'error',
      });
      setShowFeedbackModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    if (modalContent.type === 'success' || (error && !initialData)) {
      navigate('/clinics');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <LoadingSpinner size="lg" color="sky" />
        <p className="mt-3 text-lg text-gray-600">Cargando datos de la clínica...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-0">
      {initialData ? (
        <ClinicForm
          onSubmit={handleUpdateSubmit}
          initialData={initialData}
          isLoading={isSubmitting}
        />
      ) : (
        error && !showFeedbackModal && (
          <div className="text-center py-10 bg-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-red-700">Error</h2>
            <p className="text-red-600 my-3">{error}</p>
            <Button onClick={() => navigate('/clinics')} variant="secondary">
              Volver a la Lista
            </Button>
          </div>
        )
      )}

      <div className="mt-8 text-center">
        <Button variant="outline-primary" onClick={() => navigate('/clinics')}>
          Cancelar y Volver a la Lista
        </Button>
      </div>

      <Modal isOpen={showFeedbackModal} onClose={handleCloseFeedbackModal} title={modalContent.title}>
        <p className={modalContent.type === 'error' ? 'text-red-600' : 'text-gray-700'}>
          {modalContent.message}
        </p>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleCloseFeedbackModal}
            variant={modalContent.type === 'error' ? 'secondary' : 'cta'}
          >
            {modalContent.type === 'success' ? 'Ver Clínicas' : 'Cerrar'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EditClinicPage;