const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, 
  { host: process.env.DB_HOST, dialect: 'mysql', logging: false }
);

const Usuario = sequelize.define('Usuario', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
});

const Juego = sequelize.define('Juego', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  genero: { type: DataTypes.STRING }
});

module.exports = { sequelize, Usuario, Juego };