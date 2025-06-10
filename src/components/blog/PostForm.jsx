// src/components/blog/PostForm.jsx
import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const PostForm = ({ onSubmit, initialData, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImageUrl: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        excerpt: initialData.excerpt || '',
        coverImageUrl: initialData.coverImageUrl || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'El título es obligatorio.';
    if (!formData.content.trim()) errors.content = 'El contenido no puede estar vacío.';
    if (!formData.excerpt.trim()) errors.excerpt = 'El extracto es obligatorio para la vista previa.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const title = initialData ? 'Editar Artículo' : 'Crear Nuevo Artículo';
  const submitButtonText = initialData ? 'Actualizar Artículo' : 'Publicar Artículo';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-semibold text-slate-800 border-b pb-3">{title}</h2>
      
      <InputField id="title" name="title" label="Título del Artículo" type="text" value={formData.title} onChange={handleChange} error={formErrors.title} required />
      
      <InputField id="coverImageUrl" name="coverImageUrl" label="URL de la Imagen de Portada (Opcional)" type="url" value={formData.coverImageUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" />

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Contenido <span className="text-red-500">*</span></label>
        <textarea id="content" name="content" rows="10" value={formData.content} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="Escribe tu artículo aquí..."></textarea>
        {formErrors.content && <p className="mt-1 text-xs text-red-600">{formErrors.content}</p>}
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Extracto (Resumen Corto) <span className="text-red-500">*</span></label>
        <textarea id="excerpt" name="excerpt" rows="3" value={formData.excerpt} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="Un resumen corto para la lista de artículos..."></textarea>
        {formErrors.excerpt && <p className="mt-1 text-xs text-red-600">{formErrors.excerpt}</p>}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" variant="cta" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : submitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
