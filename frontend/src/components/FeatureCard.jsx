import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default FeatureCard;