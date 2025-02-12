// src/controllers/games.controller.js
const Game = require('../models/games.model');

class GamesController {
  async getUserGames(req, res) {
    try {
      console.log('Obteniendo juegos del usuario...');
      const userId = req.user.userId;
      const games = await Game.findByUserId(userId);
      console.log('Juegos encontrados:', games);
      res.json({ success: true, games });
    } catch (error) {
      console.error('Error al obtener juegos del usuario:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createGame(req, res) {
    try {
      console.log('Creando nuevo juego con datos:', req.body);
      const errors = await Game.validate(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
      }

      const gameData = {
        ...req.body,
        userId: req.user.userId
      };

      const newGame = await Game.create(gameData);
      res.status(201).json({ success: true, game: newGame });
    } catch (error) {
      console.error('Error al crear juego:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateGame(req, res) {
    try {
      const { gameId } = req.params;
      const userId = req.user.userId;
      
      const errors = await Game.validate(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
      }

      const updatedGame = await Game.findByIdAndUpdate(gameId, {
        ...req.body,
        userId
      });

      if (!updatedGame) {
        return res.status(404).json({ success: false, message: 'Juego no encontrado' });
      }

      res.json({ success: true, game: updatedGame });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteGame(req, res) {
    try {
      const { gameId } = req.params;
      const userId = req.user.userId;
      
      const deletedGame = await Game.findOneAndDelete({
        id: gameId,
        userId
      });

      if (!deletedGame) {
        return res.status(404).json({ success: false, message: 'Juego no encontrado' });
      }

      res.json({ success: true, message: 'Juego eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new GamesController();