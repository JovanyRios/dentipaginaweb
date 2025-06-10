// src/services/blogService.js
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
  where,
  orderBy
} from 'firebase/firestore';

const POSTS_COLLECTION = 'posts';

/**
 * Añade un nuevo post a Firestore.
 * @param {object} postData - Datos del post (title, content, excerpt, etc.).
 * @param {object} author - Información del autor (uid, email, displayName).
 * @returns {Promise<string>} El ID del nuevo post.
 */
export const addPost = async (postData, author) => {
  if (!author || !author.uid) {
    throw new Error('Se requiere un autor autenticado para crear un post.');
  }
  try {
    const dataToSave = {
      ...postData,
      author: {
        uid: author.uid,
        email: author.email,
        displayName: author.displayName || null,
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), dataToSave);
    return docRef.id;
  } catch (error) {
    console.error("blogService: Error al añadir post:", error);
    throw new Error('No se pudo crear el artículo.');
  }
};

/**
 * Obtiene todos los posts, ordenados por fecha de creación descendente.
 * @returns {Promise<Array<object>>} Un array con todos los posts.
 */
export const getAllPosts = async () => {
  try {
    const postsCollectionRef = collection(db, POSTS_COLLECTION);
    const q = query(postsCollectionRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const postsList = querySnapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    }));
    return postsList;
  } catch (error) {
    console.error("blogService: Error al obtener todos los posts:", error);
    throw new Error('No se pudieron cargar los artículos.');
  }
};

/**
 * Obtiene un post específico por su ID.
 * @param {string} postId - El ID del post.
 * @returns {Promise<object|null>} El objeto del post o null si no se encuentra.
 */
export const getPostById = async (postId) => {
  try {
    const docRef = doc(db, POSTS_COLLECTION, postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("blogService: Error al obtener post por ID:", error);
    throw new Error('No se pudo cargar el artículo.');
  }
};

/**
 * Actualiza un post existente.
 * @param {string} postId - El ID del post a actualizar.
 * @param {object} postData - Los datos a actualizar.
 */
export const updatePost = async (postId, postData) => {
  try {
    const postDocRef = doc(db, POSTS_COLLECTION, postId);
    const dataToUpdate = {
      ...postData,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(postDocRef, dataToUpdate);
  } catch (error) {
    console.error("blogService: Error al actualizar post:", error);
    throw new Error('No se pudo actualizar el artículo.');
  }
};

/**
 * Elimina un post.
 * @param {string} postId - El ID del post a eliminar.
 */
export const deletePost = async (postId) => {
  try {
    const postDocRef = doc(db, POSTS_COLLECTION, postId);
    await deleteDoc(postDocRef);
  } catch (error) {
    console.error("blogService: Error al eliminar post:", error);
    throw new Error('No se pudo eliminar el artículo.');
  }
};
