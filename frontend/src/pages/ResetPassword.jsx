import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(''); // Agregamos estado para almacenar el uid

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('El correo es requerido');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Cambiamos la ruta a verify-email
      const response = await fetch('http://localhost:3001/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al verificar el correo');
      }

      if (data.success) {
        setUid(data.uid); // Guardamos el uid que nos devuelve el backend
        setStep(2);
      }
    } catch (error) {
      setError(error.message || 'Error al verificar el correo');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3001/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid, // Enviamos el uid en lugar del email
          newPassword: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar la contraseña');
      }

      alert('Contraseña actualizada exitosamente');
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  // El resto del JSX se mantiene igual...

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-900 to-purple-800 flex items-center justify-center px-4">
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Restablecer contraseña
        </h2>
        
        {error && (
          <div className="bg-red-500 bg-opacity-20 text-red-200 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Verificando...' : 'Verificar Email'}
            </button>
            <p className="text-gray-400 text-center mt-4">
              <button
                onClick={() => navigate('/login')}
                className="text-cyan-400 hover:text-cyan-300"
              >
                Volver al login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;