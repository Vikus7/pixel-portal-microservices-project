import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import defaultGameCover from '../assets/default-game-cover.png';

const GameCard = ({ game, onEdit, onDelete }) => {
  const plataformas = typeof game.plataformas === 'string' ? 
    game.plataformas.split(',') : 
    game.plataformas;

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group w-64">
      <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => onEdit(game)}
          className="p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
        >
          <Edit2 size={16} className="text-white" />
        </button>
        <button
          onClick={() => {
            if(window.confirm('¿Estás seguro de eliminar este juego?')) {
              onDelete(game.id);
            }
          }}
          className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
        >
          <Trash2 size={16} className="text-white" />
        </button>
      </div>

      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={game.portada || defaultGameCover}
          alt={game.nombre}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultGameCover;
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{game.nombre}</h3>
        <p className="text-gray-300 text-sm mb-2">
          {game.descripcion?.length > 100 ? 
            `${game.descripcion.substring(0, 100)}...` : 
            game.descripcion}
        </p>
        <p className="text-gray-400 text-sm">{game.desarrollador}</p>
        <div className="mt-2">
          {plataformas?.map((plataforma, index) => (
            <span 
              key={index}
              className="inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded mr-1 mb-1"
            >
              {plataforma.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;