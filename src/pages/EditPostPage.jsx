// src/pages/EditPostPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/blog/PostForm';
import { getPostById, updatePost } from '../services/blogService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EditPostPage = () => {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPostData = useCallback(async () => {
    try {
      const postData = await getPostById(postId);
      if (!postData) {
        toast.error("Artículo no encontrado.");
        navigate('/blog');
        return;
      }
      if (currentUser?.uid !== postData.author.uid) {
        toast.error("No tienes permiso para editar este artículo.");
        navigate(`/blog/${postId}`);
        return;
      }
      setInitialData(postData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [postId, currentUser, navigate]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  const handleSubmit = async (postData) => {
    setIsSubmitting(true);
    try {
      await updatePost(postId, postData);
      toast.success("Artículo actualizado con éxito.");
      navigate(`/blog/${postId}`);
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) return <div className="text-center py-20"><LoadingSpinner size="lg" /></div>;
  if (!initialData) return <div className="text-center py-20">Cargando o artículo no encontrado...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <PostForm onSubmit={handleSubmit} isLoading={isSubmitting} initialData={initialData} />
    </div>
  );
};

export default EditPostPage;