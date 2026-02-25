const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email y contraseña son requeridos' });
        }
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ msg: 'Usuario ya existe' });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hash });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error registrando usuario' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email y contraseña son requeridos' });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: 'Credenciales inválidas' });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en login' });
    }
};
