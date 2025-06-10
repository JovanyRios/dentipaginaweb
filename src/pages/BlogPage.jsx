// src/pages/BlogPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllPosts } from '../services/blogService';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Pequeño componente para la tarjeta del post
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const postDate = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Fecha no disponible';

  return (
    <article 
      onClick={() => navigate(`/blog/${post.id}`)}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col"
    >
      <img 
        className="w-full h-48 object-cover" 
        src={post.coverImageUrl || `https://placehold.co/600x400/E3F2FD/1A237E?text=${encodeURIComponent(post.title.charAt(0))}`} 
        alt={`Imagen para ${post.title}`}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 hover:text-sky-600">{post.title}</h2>
        <p className="text-sm text-gray-500 mb-3">
          Por {post.author?.displayName || post.author?.email || 'Anónimo'} el {postDate}
        </p>
        <p className="text-gray-700 leading-relaxed line-clamp-3 flex-grow">{post.excerpt}</p>
        <div className="mt-4">
          <span className="text-sky-600 font-semibold hover:underline">Leer más →</span>
        </div>
      </div>
    </article>
  );
};

const BlogPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return (
      <div className="text-center py-20"><LoadingSpinner size="lg" /></div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        <p>Error al cargar los artículos: {error}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Blog Dental</h1>
        {currentUser && (
          <Button onClick={() => navigate('/blog/new')} variant="cta">
            + Nuevo Artículo
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">Aún no hay artículos publicados.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;