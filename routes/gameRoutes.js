const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middlewares/authMiddleware');

router.get('/', gameController.getAllGames);
router.post('/', auth, gameController.createGame); // Protegida
router.put('/:id', auth, gameController.updateGame); // Protegida
router.delete('/:id', auth, gameController.deleteGame); // Protegida

module.exports = router;