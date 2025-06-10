// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
// import Modal from '../components/common/Modal'; // Si decides usarlo para errores
import { signInWithEmail } from '../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Obtener ubicación previa
  const from = location.state?.from?.pathname || '/'; // Ruta a redirigir después de login

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError('El correo electrónico y la contraseña son obligatorios.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmail(email, password);
      console.log('LoginPage: Usuario inició sesión con éxito:', userCredential.user);

      // Redirigir a la página previa o al home
      console.log('LoginPage: Redirigiendo a:', from);
      navigate(from, { replace: true });
    } catch (authError) {
      console.error('LoginPage: Error al iniciar sesión:', authError);
      let friendlyMessage = authError.message || 'No se pudo iniciar sesión. Verifica tus credenciales.';

      if (
        authError.code === 'auth/user-not-found' ||
        authError.code === 'auth/wrong-password' ||
        authError.code === 'auth/invalid-credential'
      ) {
        friendlyMessage = 'Correo electrónico o contraseña incorrectos.';
      } else if (authError.code === 'auth/invalid-email') {
        friendlyMessage = 'El formato del correo electrónico no es válido.';
      } else if (authError.code === 'auth/too-many-requests') {
        friendlyMessage = 'Demasiados intentos fallidos. Intenta más tarde.';
      }

      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Accede a tu cuenta
          </h2>
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
          />
          {error && <p className="text-sm text-red-600 text-center py-2">{error}</p>}
          <div>
            <Button type="submit" variant="cta" className="w-full" disabled={isLoading}>
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="font-medium text-sky-600 hover:text-sky-500">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
