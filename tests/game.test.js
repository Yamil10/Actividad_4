const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'secret');
const { sequelize } = require('../config/db');

describe('API Juegos SQL', () => {
    beforeAll(async () => {
        // force sync recreate tables clean for tests
        await sequelize.sync({ force: true });
    });
    it('GET /api/games devuelve arreglo', async () => {
        const res = await request(app).get('/api/games');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /api/games crea juego con token válido', async () => {
        const nuevo = { titulo: 'Prueba', genero: 'RPG', plataforma: 'PC', precio: '19.99' };
        const res = await request(app)
            .post('/api/games')
            .set('Authorization', 'Bearer ' + token)
            .send(nuevo);
        if (res.statusCode !== 201) {
            console.error('POST /api/games fallo:', res.statusCode, res.body);
        }
        expect(res.statusCode).toEqual(201);
        expect(res.body).toMatchObject(nuevo);

        const lista = await request(app).get('/api/games');
        expect(lista.body.some(g => g.titulo === 'Prueba')).toBe(true);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});