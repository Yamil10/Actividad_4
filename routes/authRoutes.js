const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// registro y login reales usando la BD
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
