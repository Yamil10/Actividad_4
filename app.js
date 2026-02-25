const express = require('express');
const path = require('path');
const { sequelize } = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/games', require('./routes/gameRoutes'));

const PORT = process.env.PORT || 3000;

// sincronizar y arrancar solo en modo distinto a test
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ alter: true }).then(() => {
      console.log('✅ Base de datos sincronizada');
      app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  }).catch(err => console.log('❌ Error en DB:', err));
}

module.exports = app;
