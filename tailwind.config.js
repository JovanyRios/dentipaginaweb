// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate que esta línea esté y sea correcta para tu estructura
    "./public/index.html",     // Si usas clases de Tailwind directamente en tu index.html
  ],
  theme: {
    extend: {
      // Aquí puedes extender el tema por defecto, como agregar colores personalizados
      // colors: {
      //   'azul-dental': '#1E90FF',
      // }
    },
  },
  plugins: [],
}