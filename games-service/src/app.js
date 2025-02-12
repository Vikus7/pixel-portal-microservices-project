// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/database');
const gamesRoutes = require('./routes/games.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar conexión a la base de datos
connectDB().then(() => {
  console.log('Base de datos inicializada');
}).catch(err => {
  console.error('Error al inicializar la base de datos:', err);
});

// Rutas
app.use('/api/games', gamesRoutes);

// Manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Games service running on port ${PORT}`);
});