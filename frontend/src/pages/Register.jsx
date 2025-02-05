import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios excepto la foto de perfil');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const userData = {
        email: formData.email,
        password: formData.password,
        nombreUsuario: formData.username,
        fotoPerfil: null
      };

      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      if (data.success) {
        alert('Usuario registrado exitosamente');
        navigate('/login');
      }
    } catch (error) {
      setError(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-900 to-purple-800 flex items-center justify-center px-4 py-8">
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Registro</h2>
        {error && (
          <div className="bg-red-500 bg-opacity-20 text-red-200 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
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
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Foto de perfil (opcional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              onChange={(e) => setFormData({...formData, profilePic: e.target.files[0]})}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-all duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-cyan-400 hover:text-cyan-300"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;