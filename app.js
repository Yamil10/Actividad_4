const express = require('express');
const path = require('path');
const sequelize = require('./config/db');
const gameRoutes = require('./routes/gameRoutes');
const authRoutes = require('./routes/authRoutes'); // Para login y registro
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json()); // Para parsear JSON
app.use(express.static('public')); // Para servir la vista HTML estática

// Rutas
app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes);

// Sincronización con MySQL y encendido del servidor
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // 'force: false' evita borrar los datos cada vez que reinicias
    .then(() => {
        console.log('Conectado a MySQL con éxito');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });

module.exports = app; // Exportamos para las pruebas con Jest