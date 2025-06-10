// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Estilos
import 'leaflet/dist/leaflet.css'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Páginas (con las nuevas del blog)
import HomePage from './pages/HomePage';
import RegisterClinicPage from './pages/RegisterClinicPage';
import ClinicListPage from './pages/ClinicListPage';
import EditClinicPage from './pages/EditClinicPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CreatePostPage from './pages/CreatePostPage'; // Importar
import EditPostPage from './pages/EditPostPage';     // Importar
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyClinicsPage from './pages/MyClinicsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/clinics" element={<ClinicListPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Rutas Protegidas */}
          <Route path="/register-clinic" element={<ProtectedRoute><RegisterClinicPage /></ProtectedRoute>} />
          <Route path="/edit-clinic/:clinicId" element={<ProtectedRoute><EditClinicPage /></ProtectedRoute>} />
          <Route path="/my-clinics" element={<ProtectedRoute><MyClinicsPage /></ProtectedRoute>} />
          <Route path="/blog/new" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
          <Route path="/blog/edit/:postId" element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </Router>
  );
}

export default App;