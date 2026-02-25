const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../config/db');

describe('API Auth', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('POST /api/auth/register crea usuario y devuelve token', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'u@dom.com', password: 'secret' });
        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeDefined();
    });

    test('POST /api/auth/login con credenciales válidas devuelve token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'u@dom.com', password: 'secret' });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test('POST /api/auth/register con email duplicado falla', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'u@dom.com', password: 'secret' });
        expect(res.statusCode).toBe(400);
    });
});