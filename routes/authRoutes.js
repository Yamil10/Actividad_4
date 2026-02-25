const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Ruta temporal para login (puedes expandirla después con el controlador)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Aquí iría la validación con la DB, por ahora devolvemos un token de prueba
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;