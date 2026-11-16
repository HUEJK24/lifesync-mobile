const request = require('supertest');
const app = require('../src/app');

describe('Auth - validaciones Sprint 1', () => {
  it('rechaza registro con datos inválidos', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'no-es-correo', password: '123' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('rechaza login con datos inválidos', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'x', password: '' });
    expect(res.status).toBe(400);
  });

  it('requiere autenticación en ruta protegida', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
  });
});
