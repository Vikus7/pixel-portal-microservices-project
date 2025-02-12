// src/routes/games.routes.js
const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Proteger todas las rutas
router.use(authMiddleware);

// Definir rutas
router.get('/my-games', gamesController.getUserGames);
router.post('/', gamesController.createGame);
router.put('/:gameId', gamesController.updateGame);
router.delete('/:gameId', gamesController.deleteGame);

module.exports = router;