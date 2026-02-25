const request = require('supertest');
const app = require('../app'); // Tu archivo Express

describe('GET /api/games', () => {
    it('Debe retornar un status 200 y una lista de juegos', async () => {
        const res = await request(app).get('/api/games');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});