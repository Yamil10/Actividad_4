
describe('demostracion de jest', () => {
  test('prueba exitosa', () => {
    expect(1 + 1).toBe(2);
  });

  test('prueba forzada a fallar', () => {
    expect('hola').toBe('adios');
  });
});
