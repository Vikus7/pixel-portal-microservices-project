// src/models/games.model.js
const { sql, connectDB } = require('../config/database');

class Game {
  static async validate(gameData) {
    const errors = [];
    if (!gameData.nombre) errors.push('El nombre es requerido');
    if (!gameData.descripcion) errors.push('La descripción es requerida');
    if (!gameData.desarrollador) errors.push('El desarrollador es requerido');
    if (!gameData.plataformas) errors.push('Debe seleccionar al menos una plataforma');
    return errors;
  }

  static async create(gameData) {
    try {
      const pool = await connectDB();
      const request = pool.request();
      
      console.log('Insertando nuevo juego:', gameData);
      
      const result = await request
        .input('nombre', sql.NVarChar, gameData.nombre)
        .input('descripcion', sql.NVarChar, gameData.descripcion)
        .input('desarrollador', sql.NVarChar, gameData.desarrollador)
        .input('plataformas', sql.NVarChar, gameData.plataformas)
        .input('portada', sql.NVarChar, gameData.portada || null)
        .input('userId', sql.NVarChar, gameData.userId)
        .query(`
          INSERT INTO Games (nombre, descripcion, desarrollador, plataformas, portada, userId)
          OUTPUT INSERTED.*
          VALUES (@nombre, @descripcion, @desarrollador, @plataformas, @portada, @userId)
        `);

      console.log('Resultado de la inserción:', result.recordset[0]);
      return result.recordset[0];
    } catch (error) {
      console.error('Error al crear juego:', error);
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      const pool = await connectDB();
      const request = pool.request();
      
      console.log('Buscando juegos para usuario:', userId);
      
      const result = await request
        .input('userId', sql.NVarChar, userId)
        .query('SELECT * FROM Games WHERE userId = @userId ORDER BY createdAt DESC');

      console.log('Juegos encontrados:', result.recordset);
      return result.recordset;
    } catch (error) {
      console.error('Error al buscar juegos:', error);
      throw error;
    }
  }

  static async findByIdAndUpdate(id, updateData) {
    try {
      const pool = await connectDB();
      const request = pool.request();
      
      console.log('Actualizando juego:', { id, updateData });
      
      const result = await request
        .input('id', sql.Int, id)
        .input('nombre', sql.NVarChar, updateData.nombre)
        .input('descripcion', sql.NVarChar, updateData.descripcion)
        .input('desarrollador', sql.NVarChar, updateData.desarrollador)
        .input('plataformas', sql.NVarChar, updateData.plataformas)
        .input('portada', sql.NVarChar, updateData.portada || null)
        .input('userId', sql.NVarChar, updateData.userId)
        .query(`
          UPDATE Games 
          SET nombre = @nombre,
              descripcion = @descripcion,
              desarrollador = @desarrollador,
              plataformas = @plataformas,
              portada = @portada
          OUTPUT INSERTED.*
          WHERE id = @id AND userId = @userId
        `);

      return result.recordset[0];
    } catch (error) {
      console.error('Error al actualizar juego:', error);
      throw error;
    }
  }

  static async findOneAndDelete(criteria) {
    try {
      const pool = await connectDB();
      const request = pool.request();
      
      console.log('Eliminando juego:', criteria);
      
      const result = await request
        .input('id', sql.Int, criteria.id)
        .input('userId', sql.NVarChar, criteria.userId)
        .query(`
          DELETE FROM Games 
          OUTPUT DELETED.*
          WHERE id = @id AND userId = @userId
        `);

      return result.recordset[0];
    } catch (error) {
      console.error('Error al eliminar juego:', error);
      throw error;
    }
  }
}

module.exports = Game;