// src/pages/ClinicListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicList from '../components/clinic/ClinicList';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getClinics, deleteClinic } from '../services/clinicService';

const ClinicListPage = () => {
  console.log("ClinicListPage: Renderizando componente (inicio o re-render)");

  const [clinics, setClinics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState(null);
  
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'success' });

  const navigate = useNavigate();

  const fetchClinics = useCallback(async () => {
    console.log("ClinicListPage: fetchClinics - INICIO de la función.");
    setIsLoading(true);
    setError(null);
    try {
      console.log("ClinicListPage: fetchClinics - ANTES de llamar a getClinics() del servicio.");
      const dataFromService = await getClinics(); 
      console.log("ClinicListPage: fetchClinics - DESPUÉS de getClinics(). Datos recibidos del servicio:", dataFromService);
      setClinics(dataFromService || []); 
    } catch (err) {
      console.error("ClinicListPage: fetchClinics - Error capturado:", err);
      setError(err.message || "Error desconocido al cargar clínicas.");
    } finally {
      setIsLoading(false);
      console.log("ClinicListPage: fetchClinics - FIN de la función (bloque finally).");
    }
  }, []); 

  useEffect(() => {
    console.log("ClinicListPage: useEffect[] (montaje) - Llamando a fetchClinics.");
    fetchClinics();
  }, [fetchClinics]);

  const handleEdit = (clinic) => {
    console.log('ClinicListPage: handleEdit para clínica ID:', clinic.id);
    alert(`Simulación: Editar clínica "${clinic.name}"`);
    // navigate(`/edit-clinic/${clinic.id}`); // Descomentar cuando la página de edición exista
  };

  const handleDeleteRequest = (clinicId) => {
    const clinicFound = clinics.find(c => c.id === clinicId);
    console.log('ClinicListPage: handleDeleteRequest para clínica ID:', clinicId, 'Encontrada:', clinicFound);
    if (clinicFound) {
        setClinicToDelete(clinicFound);
        setIsDeleteModalOpen(true);
    }
  };
  
  const confirmDelete = async () => {
    if (!clinicToDelete) return;
    console.log("ClinicListPage: confirmDelete - Confirmado para eliminar ID:", clinicToDelete.id);
    try {
      await deleteClinic(clinicToDelete.id);
      setModalContent({ title: 'Éxito', message: `Clínica "${clinicToDelete.name}" eliminada.`, type: 'success' });
      setShowFeedbackModal(true);
      fetchClinics(); 
    } catch (err) {
      console.error("ClinicListPage: confirmDelete - Error:", err);
      setModalContent({ title: 'Error', message: err.message || "No se pudo eliminar.", type: 'error' });
      setShowFeedbackModal(true);
    } finally {
      setIsDeleteModalOpen(false);
      setClinicToDelete(null);
    }
  };

  const handleGoToRegister = () => navigate('/register-clinic');
  const handleCloseFeedbackModal = () => setShowFeedbackModal(false);

  if (isLoading) {
    console.log("ClinicListPage: Renderizando - Estado de CARGA.");
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <LoadingSpinner size="lg" color="sky" />
        <p className="mt-3 text-lg text-gray-600">Cargando clínicas...</p>
      </div>
    );
  }

  if (error) {
    console.log("ClinicListPage: Renderizando - Estado de ERROR:", error);
    return (
      <div className="text-center py-20 bg-red-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-700">Error al Cargar Clínicas</h2>
        <p className="text-red-600 my-3">{error}</p>
        <Button onClick={fetchClinics} variant="danger">Reintentar</Button>
      </div>
    );
  }
  
  console.log("ClinicListPage: Renderizando - Lista de clínicas. Total:", clinics.length, "Datos:", clinics);
  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-4 sm:px-0">
        <h1 className="text-3xl font-bold text-slate-800">Listado de Clínicas</h1>
        <Button onClick={handleGoToRegister} variant="cta">+ Registrar Clínica</Button>
      </div>
      <ClinicList
        clinics={clinics}
        onEditClinic={handleEdit}
        onDeleteClinic={handleDeleteRequest}
        onRegisterClinic={handleGoToRegister} 
      />
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Eliminación">
        {clinicToDelete && (
          <>
            <p className="mb-6">¿Seguro que quieres eliminar la clínica "<strong>{clinicToDelete.name}</strong>"?</p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
              <Button variant="danger" onClick={confirmDelete}>Eliminar</Button>
            </div>
          </>
        )}
      </Modal>
      <Modal isOpen={showFeedbackModal} onClose={handleCloseFeedbackModal} title={modalContent.title}>
        <p className={modalContent.type === 'error' ? 'text-red-600' : ''}>{modalContent.message}</p>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleCloseFeedbackModal}>Cerrar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ClinicListPage;