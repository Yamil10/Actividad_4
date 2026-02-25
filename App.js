const express = require('express');
const jwt = require('jsonwebtoken');
const { Usuario, Juego } = require('./Database');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Para servir el HTML

// Middleware para proteger rutas
const proteger = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('No autorizado');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) { res.status(401).send('Token inválido'); }
};

// --- AUTH ---
app.post('/api/signup', async (req, res) => {
  try { await Usuario.create(req.body); res.status(201).json({ok: true}); }
  catch (e) { res.status(400).json({error: "Usuario ya existe"}); }
});

app.post('/api/login', async (req, res) => {
  const user = await Usuario.findOne({ where: req.body });
  if (user) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ token });
  }
  res.status(401).json({ error: "Datos incorrectos" });
});

// --- GESTOR DE JUEGOS ---
app.get('/api/juegos', proteger, async (req, res) => res.json(await Juego.findAll()));
app.post('/api/juegos', proteger, async (req, res) => res.json(await Juego.create(req.body)));

module.exports = app;