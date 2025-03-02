// models/userModel.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ nombre_usuario, email, foto_perfil, contrasena }) {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const [result] = await db.execute(
      'INSERT INTO usuario (nombre_usuario, email, foto_perfil, contrasena) VALUES (?, ?, ?, ?)',
      [nombre_usuario, email, foto_perfil, hashedPassword]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE email = ?', [email]);
    return rows[0];
  }

  static async updatePassword(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute('UPDATE usuario SET contrasena = ? WHERE email = ?', [hashedPassword, email]);
    return result;
  }
}

module.exports = User;