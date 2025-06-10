
// src/pages/BlogPostPage.jsx (Placeholder Detallado para el Futuro)
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // Para obtener el ID del post de la URL
import LoadingSpinner from '../components/common/LoadingSpinner'; // Para simular carga

// Datos de ejemplo para un post (luego vendrían de Firebase o un CMS)
const mockPostData = {
  id: '1',
  title: '5 Consejos Esenciales para una Sonrisa Saludable este Verano',
  author: 'Dr. Sonrisas',
  date: '25 de Mayo, 2025',
  imageUrl: 'https://placehold.co/800x400/A0D2DB/FFFFFF?text=Blog+Dental&font=montserrat',
  category: 'Cuidado Dental',
  tags: ['higiene bucal', 'verano', 'consejos', 'prevención'],
  content: `
    <p class="mb-4 text-lg leading-relaxed">El verano es una época de disfrute, vacaciones y, a menudo, cambios en nuestras rutinas. ¡Pero no debemos descuidar nuestra salud bucal! Mantener una sonrisa radiante y saludable es clave para disfrutar al máximo.</p>
    
    <h2 class="text-2xl font-semibold text-sky-700 mt-6 mb-3">1. Mantén tu Rutina de Cepillado y Uso de Hilo Dental</h2>
    <p class="mb-4 leading-relaxed">Aunque estés de viaje o fuera de casa, no olvides cepillarte los dientes al menos dos veces al día y usar hilo dental diariamente. Considera llevar un kit de higiene bucal de viaje.</p>
    
    <figure class="my-6">
      <img src="https://placehold.co/600x300/E0F2FE/1A237E?text=Cepillado+Dental" alt="Persona cepillándose los dientes" class="rounded-lg shadow-md mx-auto" />
      <figcaption class="text-center text-sm text-gray-500 mt-2">La constancia es clave.</figcaption>
    </figure>
    
    <h2 class="text-2xl font-semibold text-sky-700 mt-6 mb-3">2. Hidrátate Constantemente</h2>
    <p class="mb-4 leading-relaxed">Beber suficiente agua no solo es bueno para tu salud general, sino que también ayuda a mantener la boca limpia y a combatir la sequedad bucal, que puede aumentar el riesgo de caries.</p>
    
    <h2 class="text-2xl font-semibold text-sky-700 mt-6 mb-3">3. Cuidado con los Alimentos y Bebidas Azucaradas</h2>
    <p class="mb-4 leading-relaxed">Los helados, refrescos y otras delicias veraniegas suelen tener alto contenido de azúcar. Disfrútalos con moderación y, si es posible, enjuágate la boca con agua después de consumirlos.</p>
    
    <h2 class="text-2xl font-semibold text-sky-700 mt-6 mb-3">4. Protege tus Labios del Sol</h2>
    <p class="mb-4 leading-relaxed">Al igual que tu piel, tus labios también necesitan protección solar. Usa un bálsamo labial con FPS para prevenir quemaduras y otros daños.</p>
    
    <h2 class="text-2xl font-semibold text-sky-700 mt-6 mb-3">5. No Pospongas tu Visita al Dentista</h2>
    <p class="mb-4 leading-relaxed">Si tienes programada una revisión o limpieza, ¡no la canceles por las vacaciones! Es mejor prevenir y asegurarse de que todo esté en orden.</p>
    
    <p class="mt-8 text-lg leading-relaxed">¡Sigue estos consejos y disfruta de un verano lleno de sonrisas saludables!</p>
  `
};

const BlogPostPage = () => {
  // const { postId } = useParams(); // Obtendría el ID del post de la URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos del post
    // En una app real, aquí harías un fetch a tu backend o Firebase usando postId
    console.log('Cargando post con ID (simulado):', '1' /* postId */);
    setTimeout(() => {
      setPost(mockPostData);
      setIsLoading(false);
    }, 1000);
  }, [/* postId */]); // Dependencia postId

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <LoadingSpinner size="lg" color="sky" />
        <p className="mt-4 text-lg text-gray-600">Cargando artículo del blog...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600">Error</h2>
        <p className="text-gray-600 mt-2">No se pudo cargar el artículo del blog.</p>
        {/* Podrías añadir un botón para volver al listado del blog */}
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 border-b pb-6 border-gray-200">
        <div className="mb-3">
          <span className="text-sm font-medium text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 leading-tight">
          {post.title}
        </h1>
        <p className="text-base text-gray-500">
          Publicado por <span className="font-semibold text-slate-700">{post.author}</span> el <time dateTime={post.date}>{post.date}</time>
        </p>
      </header>

      {post.imageUrl && (
        <figure className="mb-8">
          <img 
            src={post.imageUrl} 
            alt={`Imagen principal para ${post.title}`} 
            className="w-full h-auto max-h-[450px] object-cover rounded-xl shadow-lg" 
          />
        </figure>
      )}

      {/* El contenido del post se inserta como HTML. Asegúrate de que este HTML sea seguro si viene de un CMS. */}
      <div 
        className="prose prose-lg prose-sky max-w-none" // Tailwind Typography plugin es ideal para esto
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      {post.tags && post.tags.length > 0 && (
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Etiquetas:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
              >
                # {tag}
              </span>
            ))}
          </div>
        </footer>
      )}
      {/* Aquí podrían ir comentarios, botones de compartir, etc. */}
    </article>
  );
};

export default BlogPostPage;