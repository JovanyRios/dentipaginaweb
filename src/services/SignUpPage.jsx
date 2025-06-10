// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { signUpWithEmail } from '../services/authService';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'success' });

  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setModalContent({ title: '', message: '', type: 'success' });

    try {
      const userCredential = await signUpWithEmail(email, password);
      console.log('SignUpPage: Usuario registrado con éxito:', userCredential.user);

      setModalContent({
        title: '¡Registro Exitoso!',
        message: 'Tu cuenta ha sido creada y has iniciado sesión automáticamente.',
        type: 'success',
      });
      setShowFeedbackModal(true);

    } catch (authError) {
      console.error("SignUpPage: Error al registrar el usuario:", authError);
      let friendlyMessage = authError.message || "No se pudo registrar el usuario. Inténtalo de nuevo.";
      if (authError.code === 'auth/email-already-in-use') {
        friendlyMessage = 'Este correo electrónico ya está registrado. Por favor, intenta con otro o inicia sesión.';
      } else if (authError.code === 'auth/weak-password') {
        friendlyMessage = 'La contraseña es demasiado débil. Por favor, elige una más segura.';
      }

      setModalContent({
        title: 'Error de Registro',
        message: friendlyMessage,
        type: 'error'
      });
      setShowFeedbackModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModalAndRedirect = () => {
    setShowFeedbackModal(false);
    if (modalContent.type === 'success') {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una?{' '}
            <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@correo.com"
            error={error.includes('correo') ? error : null}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            error={error.includes('contraseña') || error.includes('coinciden') ? error : null}
          />
          <InputField
            id="confirm-password"
            name="confirm-password"
            type="password"
            label="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
            error={error.includes('coinciden') ? error : null}
          />

          {error && !error.includes('correo') && !error.includes('contraseña') && !error.includes('coinciden') && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <div>
            <Button type="submit" variant="cta" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={showFeedbackModal}
        onClose={handleCloseModalAndRedirect}
        title={modalContent.title}
      >
        <p className={modalContent.type === 'error' ? 'text-red-600' : 'text-gray-700'}>
          {modalContent.message}
        </p>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleCloseModalAndRedirect}
            variant={modalContent.type === 'error' ? 'secondary' : 'cta'}
          >
            {modalContent.type === 'success' ? 'Continuar' : 'Cerrar'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpPage;