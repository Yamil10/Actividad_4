const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'Acceso denegado' });

    // aceptar formato "Bearer <token>"
    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};
