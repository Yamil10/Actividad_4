// archivo de demostración para mostrar tests que pasan y fallan

describe('demostracion de jest', () => {
  test('prueba exitosa', () => {
    expect(1 + 1).toBe(2);
  });

  test('prueba forzada a fallar', () => {
    // esta expectativa está mal a propósito
    expect('hola').toBe('adios');
  });
});
