const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Game = sequelize.define('Game', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    genero: { type: DataTypes.STRING, allowNull: false },
    plataforma: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = Game;
