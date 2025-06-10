// src/pages/ClinicListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicList from '../components/clinic/ClinicList';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getClinics, deleteClinic } from '../services/clinicService';
import { useAuth } from '../contexts/AuthContext';

const ClinicListPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [clinics, setClinics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState(null);

  const fetchClinics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const clinicsData = await getClinics();
      setClinics(clinicsData || []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar las clínicas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClinics();
  }, [fetchClinics]);

  const handleEdit = (clinic) => {
    navigate(`/edit-clinic/${clinic.id}`);
  };

  const handleDeleteRequest = (clinicId) => {
    const clinic = clinics.find(c => c.id === clinicId);
    if (clinic) {
        setClinicToDelete(clinic);
        setIsDeleteModalOpen(true);
    }
  };
  
  const confirmDelete = async () => {
    if (clinicToDelete) {
      try {
        await deleteClinic(clinicToDelete.id);
        alert(`Clínica "${clinicToDelete.name}" eliminada.`);
        fetchClinics();
      } catch (err) {
        alert(`Error al eliminar: ${err.message}`);
      } finally {
        setIsDeleteModalOpen(false);
        setClinicToDelete(null);
      }
    }
  };

  const handleGoToRegister = () => navigate('/register-clinic');

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <LoadingSpinner size="lg" color="sky" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-700">Error al Cargar Clínicas</h2>
        <p className="text-red-600 my-3">{error}</p>
        <Button onClick={fetchClinics} variant="danger">Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-4 sm:px-0">
        <h1 className="text-3xl font-bold text-slate-800">Listado de Clínicas</h1>
        {currentUser && (
          <Button onClick={handleGoToRegister} variant="cta">+ Registrar Nueva Clínica</Button>
        )}
      </div>
      <ClinicList
        clinics={clinics}
        currentUser={currentUser}
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
    </div>
  );
};

export default ClinicListPage;
