// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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

const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Token verificado', decoded });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido', error });
  }
};


const passwordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar email con el token
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Restablecer contraseña',
      text: `Para restablecer tu contraseña, copia y pega el siguiente token en el campo correspondiente: ${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email enviado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el email', error });
  }
}

const updatePassword = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await User.updatePassword(email, contrasena);

    res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la contraseña', error });
  }
}

module.exports = { signup, login , passwordReset,verifyToken, updatePassword};

