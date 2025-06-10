// src/services/clinicService.js
import { db } from '../config/firebaseConfig';
import { 
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore';

const CLINICS_COLLECTION = 'clinics';

// --- addClinic ---
export const addClinic = async (clinicData, userId) => {
  if (!userId) {
    throw new Error('Se requiere un ID de usuario para registrar una clínica.');
  }
  try {
    const dataWithTimestampsAndUser = {
      ...clinicData,
      createdByUserId: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, CLINICS_COLLECTION), dataWithTimestampsAndUser);
    return docRef.id;
  } catch (error) {
    console.error('clinicService: addClinic - Error:', error);
    throw new Error('No se pudo registrar la clínica.');
  }
};

// --- getClinics ---
export const getClinics = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, CLINICS_COLLECTION));
    const clinicsList = querySnapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    }));
    return clinicsList;
  } catch (error) {
    console.error('clinicService: getClinics - Error:', error);
    throw new Error(`No se pudieron cargar las clínicas. Error: ${error.message}`);
  }
};

// --- getClinicsByUserId ---
/**
 * Obtiene todas las clínicas creadas por un usuario específico.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array<object>>} Un array de objetos de las clínicas del usuario.
 * @throws {Error} Si ocurre un error al obtener los datos.
 */
export const getClinicsByUserId = async (userId) => {
  console.log('clinicService: getClinicsByUserId - Buscando clínicas para el usuario ID:', userId);
  if (!userId) {
    console.log('clinicService: getClinicsByUserId - No se proporcionó userId, devolviendo array vacío.');
    return [];
  }
  try {
    const clinicsCollectionRef = collection(db, CLINICS_COLLECTION);
    const q = query(clinicsCollectionRef, where("createdByUserId", "==", userId));
    const querySnapshot = await getDocs(q);

    const clinicsList = querySnapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    }));

    console.log(`clinicService: getClinicsByUserId - Encontradas ${clinicsList.length} clínicas para el usuario.`);
    return clinicsList;
  } catch (error) {
    console.error('clinicService: getClinicsByUserId - Error:', error);
    throw new Error(`No se pudieron cargar tus clínicas. Error: ${error.message}`);
  }
};

// --- getClinicById ---
export const getClinicById = async (clinicId) => {
  try {
    const docRef = doc(db, CLINICS_COLLECTION, clinicId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('clinicService: getClinicById - Error:', error);
    throw new Error(`No se pudo cargar la clínica. Error: ${error.message}`);
  }
};

// --- updateClinic ---
export const updateClinic = async (clinicId, updatedData) => {
  try {
    const clinicDocRef = doc(db, CLINICS_COLLECTION, clinicId);
    await updateDoc(clinicDocRef, { ...updatedData, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error('clinicService: updateClinic - Error:', error);
    throw new Error('No se pudo actualizar la clínica.');
  }
};

// --- deleteClinic ---
export const deleteClinic = async (clinicId) => {
  try {
    const clinicDocRef = doc(db, CLINICS_COLLECTION, clinicId);
    await deleteDoc(clinicDocRef);
  } catch (error) {
    console.error('clinicService: deleteClinic - Error:', error);
    throw new Error('No se pudo eliminar la clínica.');
  }
};