// src/pages/CreatePostPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/blog/PostForm';
import { addPost } from '../services/blogService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const CreatePostPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (postData) => {
    if (!currentUser) {
      toast.error("Debes estar conectado para crear un artículo.");
      return;
    }
    setIsSubmitting(true);
    try {
      const authorInfo = { 
        uid: currentUser.uid, 
        email: currentUser.email, 
        displayName: currentUser.displayName 
      };
      const newPostId = await addPost(postData, authorInfo);
      toast.success("Artículo creado con éxito.");
      navigate(`/blog/${newPostId}`);
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <PostForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};

export default CreatePostPage;