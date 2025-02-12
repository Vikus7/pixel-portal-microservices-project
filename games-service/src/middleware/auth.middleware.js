// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    // Durante desarrollo, si no hay token, asumimos un usuario de prueba
    if (!token) {
      req.user = { userId: 'dev-user-1' };
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      // Si el token es inválido, usamos usuario de prueba
      console.log('Token inválido, usando usuario de prueba');
      req.user = { userId: 'dev-user-1' };
    }
    
    next();
  } catch (error) {
    console.error('Error en auth middleware:', error);
    next();
  }
};

module.exports = authMiddleware;