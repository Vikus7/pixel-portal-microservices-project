import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // TODO: Implementar verificación con Firebase
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aquí iría la verificación del email con Firebase
      // await firebase.auth().verifyEmail(email);
      setStep(2);
    } catch (error) {
      setError('Error al verificar el correo');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      // Aquí iría la actualización de la contraseña en Firebase
      // await firebase.auth().updatePassword(password);
      alert('Contraseña actualizada exitosamente');
      onClose();
    } catch (error) {
      setError('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          Recuperar Contraseña
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
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Verificando...' : 'Verificar Email'}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
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
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;