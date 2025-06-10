// src/pages/MyClinicsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicList from '../components/clinic/ClinicList';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getClinicsByUserId, deleteClinic } from '../services/clinicService';
import { useAuth } from '../contexts/AuthContext';

const MyClinicsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [myClinics, setMyClinics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState(null);

  const fetchMyClinics = useCallback(async () => {
    if (!currentUser) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await getClinicsByUserId(currentUser.uid);
      setMyClinics(data);
    } catch (err) {
      setError(err.message || "No se pudieron cargar tus clínicas.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchMyClinics();
  }, [fetchMyClinics]);

  const handleEdit = (clinic) => {
    navigate(`/edit-clinic/${clinic.id}`);
  };

  const handleDeleteRequest = (clinicId) => {
    const clinic = myClinics.find(c => c.id === clinicId);
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
        fetchMyClinics();
      } catch (err) {
        alert(`Error al eliminar: ${err.message}`);
      } finally {
        setIsDeleteModalOpen(false);
        setClinicToDelete(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <LoadingSpinner size="lg" color="sky" />
        <p className="mt-3 text-lg text-gray-600">Cargando tus clínicas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-700">Error al Cargar</h2>
        <p className="text-red-600 my-3">{error}</p>
        <Button onClick={fetchMyClinics} variant="danger">Reintentar</Button>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-4 sm:px-0">
        <h1 className="text-3xl font-bold text-slate-800">Mis Clínicas Registradas</h1>
        <Button onClick={() => navigate('/register-clinic')} variant="cta">
          + Registrar Nueva Clínica
        </Button>
      </div>
      <ClinicList
        clinics={myClinics}
        currentUser={currentUser}
        onEditClinic={handleEdit}
        onDeleteClinic={handleDeleteRequest}
        onRegisterClinic={() => navigate('/register-clinic')} 
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

export default MyClinicsPage;
