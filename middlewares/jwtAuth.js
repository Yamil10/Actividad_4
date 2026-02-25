const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.header('Authorization') || '';
    const token = header.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Acceso denegado' });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token no válido' });
    }
};
