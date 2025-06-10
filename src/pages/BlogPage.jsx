
// src/pages/BlogPage.jsx
import React from 'react';

const BlogPage = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-slate-800 mb-6">
        Nuestro Blog Dental
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Próximamente encontrarás artículos interesantes, consejos y novedades del mundo dental.
      </p>
      <div className="animate-pulse">
        <div className="h-40 bg-slate-200 rounded-md max-w-2xl mx-auto"></div>
        <p className="text-slate-400 mt-4">Cargando contenido asombroso...</p>
      </div>
      {/* Aquí iría el listado de posts del blog en el futuro */}
    </div>
  );
};

export default BlogPage;