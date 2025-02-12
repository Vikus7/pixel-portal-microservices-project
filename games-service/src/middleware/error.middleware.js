// src/middleware/error.middleware.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  };
  
  module.exports = errorHandler;