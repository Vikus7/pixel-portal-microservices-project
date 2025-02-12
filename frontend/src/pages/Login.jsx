import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.username,
          contrasena: formData.password
        })
      });

      

      const data = await response.json();

      

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesiÃ³n');
      }


     
        
        // Guardar datos completos del usuario
        const userData = {
            id: data.id,
            nombreUsuario: data.nombre_usuario,
            email: data.email,
            fotoPerfil: data.foto_perfil || '/default-avatar.png',
            token: data.token
        };

  
        
        console.log('Token recibido:', data.token);

        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');

        

  
    
    } catch (error) {
      setError(error.message || 'Credenciales invÃ¡lidas');
    } finally {
      setLoading(false);
    }

};

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-900 to-purple-800 flex items-center justify-center px-4">
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Iniciar sesión</h2>
        {error && (
          <div className="bg-red-500 bg-opacity-20 text-red-200 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              disabled={loading}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-all duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-cyan-400 hover:text-cyan-300"
            disabled={loading}
          >
            Regístrate
          </button>
        </p>
        <p className="text-gray-400 text-center mt-2">
          <button
            onClick={() => navigate('/reset-password')}
            className="text-cyan-400 hover:text-cyan-300"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;