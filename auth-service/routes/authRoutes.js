// routes/authRoutes.js
const express = require('express');
const { signup, login, passwordReset , verifyToken, updatePassword} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/password-reset', passwordReset);
router.post('/password-reset-verify', verifyToken);
router.post('/password-reset-change', updatePassword);

module.exports = router;

