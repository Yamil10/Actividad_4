const Game = require('../models/Game');

exports.getAllGames = async (req, res) => {
    const games = await Game.findAll();
    res.json(games);
};

exports.createGame = async (req, res) => {
    const newGame = await Game.create(req.body);
    res.status(201).json(newGame);
};

exports.updateGame = async (req, res) => {
    await Game.update(req.body, { where: { id: req.params.id } });
    res.json({ msg: 'Juego actualizado' });
};

exports.deleteGame = async (req, res) => {
    await Game.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'Juego eliminado' });
};