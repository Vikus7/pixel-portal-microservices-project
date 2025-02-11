// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { nombre_usuario, email, foto_perfil, contrasena } = req.body;

  try {
    const user = await User.create({ nombre_usuario, email, foto_perfil, contrasena });
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

const login = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const userInfo= {
      id: user.id,
      nombre_usuario: user.nombre_usuario,
      email: user.email,
      foto_perfil: user.foto_perfil,
      message: 'Login exitoso',
      token: token
    }
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

module.exports = { signup, login };

