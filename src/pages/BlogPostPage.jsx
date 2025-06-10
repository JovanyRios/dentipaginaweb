// src/pages/BlogPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../services/blogService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const BlogPostPage = () => {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      setIsLoading(true);
      setError(null);
      try {
        const postData = await getPostById(postId);
        if (!postData) {
          setError('Artículo no encontrado.');
        } else {
          setPost(postData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    if (post && currentUser && currentUser.uid === post.author.uid) {
      try {
        await deletePost(post.id);
        alert('Artículo eliminado con éxito.');
        navigate('/blog');
      } catch (err) {
        alert(`Error al eliminar: ${err.message}`);
      }
    }
  };

  if (isLoading) return <div className="text-center py-20"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!post) return <div className="text-center py-20">Artículo no encontrado.</div>;

  const isOwner = currentUser && currentUser.uid === post.author.uid;
  const postDate = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Fecha no disponible';

  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4">{post.title}</h1>
        <p className="text-lg text-gray-500">
          Por {post.author.displayName || post.author.email} el {postDate}
        </p>
        {isOwner && (
          <div className="mt-4 flex space-x-2">
            <Button onClick={() => navigate(`/blog/edit/${post.id}`)} variant="outline-primary" size="sm">Editar</Button>
            <Button onClick={() => setIsDeleteModalOpen(true)} variant="danger" size="sm">Eliminar</Button>
          </div>
        )}
      </header>
      
      {post.coverImageUrl && (
        <img src={post.coverImageUrl} alt={`Portada de ${post.title}`} className="w-full rounded-xl shadow-lg mb-8" />
      )}
      
      <div 
        className="prose prose-lg max-w-none" 
        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
      >
        {post.content}
      </div>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Eliminación">
        <p>¿Estás seguro de que quieres eliminar este artículo permanentemente?</p>
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </article>
  );
};

export default BlogPostPage;
