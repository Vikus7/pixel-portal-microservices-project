CREATE DATABASE IF NOT EXISTS User;
USE User;

CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    foto_perfil VARCHAR(500), -- URL o ruta de la imagen del perfil
    contrasena VARCHAR(255) NOT NULL
);
