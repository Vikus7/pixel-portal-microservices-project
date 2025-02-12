// src/config/database.js
const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true // Cambiado a true para desarrollo
  }
};

// Crear un pool global
let pool = null;

const connectDB = async () => {
  try {
    if (!pool) {
      console.log('Intentando conectar a la base de datos...');
      console.log('Configuración:', {
        user: process.env.DB_USER,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME
      });
      
      pool = await new sql.ConnectionPool(config).connect();
      console.log('Conexión exitosa a la base de datos');
    }
    return pool;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

module.exports = {
  sql,
  connectDB
};