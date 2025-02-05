import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            PixelPort
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Tu biblioteca personal de juegos. Organiza, descubre y comparte tu pasión gaming.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Registrarse
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            title="Organiza tu colección"
            description="Gestiona tu biblioteca de juegos de manera eficiente"
            icon="🎮"
          />
          <FeatureCard
            title="Multiplataforma"
            description="Accede desde cualquier dispositivo"
            icon="💻"
          />
          <FeatureCard
            title="Comunidad gaming"
            description="Conecta con otros gamers"
            icon="🌟"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;