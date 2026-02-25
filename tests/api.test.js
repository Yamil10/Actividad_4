const request = require('supertest');
const server = require('../server');
const app = server.app;
const { sequelize, Usuario } = server;

describe('Suite de Pruebas API Usuarios', () => {
  
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });


  it('Debe registrar un nuevo usuario exitosamente', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('ok', true);
  });


  it('Debe fallar al intentar registrar un usuario que ya existe', async () => {

    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'testuser',
        password: 'otrapassword'
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Usuario ya existe');
  });


  it('Debe rechazar el acceso a la lista de juegos sin un token válido', async () => {
    const res = await request(app).get('/api/juegos');
    expect(res.statusCode).toEqual(401);
    expect(res.text).toBe('No autorizado');
  });
  
  it('ERRÓNEA: Esta prueba va a fallar a propósito', async () => {
  const res = await request(app).get('/api/juegos');

  expect(res.statusCode).toBe(200); 
});

});