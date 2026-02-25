const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Server {
  constructor() {
    this.PORT = process.env.PORT || 3000;

    this.app = express();
    this.app.use(express.json());
    this.app.use(express.static('public')); // sirve HTML y js

    // database setup
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      { host: process.env.DB_HOST, dialect: 'mysql', logging: false }
    );

    this.Usuario = this.sequelize.define('Usuario', {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false }
    });

    this.Juego = this.sequelize.define('Juego', {
      titulo: { type: DataTypes.STRING, allowNull: false },
      genero: { type: DataTypes.STRING }
    });

    // middleware and routes
    const proteger = (req, res, next) => {
      const token = req.header('Authorization')?.split(' ')[1];
      if (!token) return res.status(401).send('No autorizado');
      try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (e) { res.status(401).send('Token inválido'); }
    };

    this.app.post('/api/signup', async (req, res) => {
      try { await this.Usuario.create(req.body); res.status(201).json({ok: true}); }
      catch (e) { res.status(400).json({error: "Usuario ya existe"}); }
    });

    this.app.post('/api/login', async (req, res) => {
      const user = await this.Usuario.findOne({ where: req.body });
      if (user) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return res.json({ token });
      }
      res.status(401).json({ error: "Datos incorrectos" });
    });

    this.app.get('/api/juegos', proteger, async (req, res) => res.json(await this.Juego.findAll()));
    this.app.post('/api/juegos', proteger, async (req, res) => res.json(await this.Juego.create(req.body)));
  }

  start() {
    this.sequelize
      .sync()
      .then(() => {
        console.log('✅ MySQL Conectado');
        this.app.listen(this.PORT, () =>
          console.log(`🚀 Servidor en http://localhost:${this.PORT}`)
        );
      })
      .catch((err) => console.log('❌ Error:', err));
  }
}

const server = new Server();

if (require.main === module) {
  server.start();
}

module.exports = server;