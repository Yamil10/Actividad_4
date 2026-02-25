const Game = require('../models/Game');

exports.createGame = async (req, res) => {
    try {
        const { titulo, genero, plataforma, precio } = req.body;
        const nuevo = await Game.create({ titulo, genero, plataforma, precio });
        res.status(201).json(nuevo);
    } catch (error) {
        console.error('Error al insertar en MySQL:', error);
        res.status(500).json({ msg: 'No se pudo guardar el juego' });
    }
};

exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener juegos' });
    }
};

exports.updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        await Game.update(req.body, { where: { id } });
        res.json({ msg: 'Juego actualizado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al editar' });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        await Game.destroy({ where: { id } });
        res.json({ msg: 'Juego eliminado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar' });
    }
};
