// src/index.js o src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tus estilos globales, incluyendo Tailwind
import { AuthProvider } from './contexts/AuthContext'; // <<< IMPORTA EL AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* <<< ENVUELVE App CON AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
