const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Actividad_4', 'root', "Trapaca10'", {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;