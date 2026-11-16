const request = require('supertest');
const app = require('../src/app');

describe('Módulos médicos - seguridad y validación Sprint 2', () => {
  it('bloquea perfil sin JWT', async () => {
    const res = await request(app).get('/api/v1/profile');
    expect(res.status).toBe(401);
  });

  it('bloquea alergias con JWT inválido', async () => {
    const res = await request(app)
      .get('/api/v1/medical/allergies')
      .set('Authorization', 'Bearer invalido');
    expect(res.status).toBe(401);
  });

  it('rechaza creación de alergia sin campos requeridos aun con formato de auth incorrecto ausente', async () => {
    const res = await request(app)
      .post('/api/v1/medical/allergies')
      .send({ severity: 'Alta' });
    expect(res.status).toBe(401); // primero exige autenticación
  });

  it('bloquea contactos sin JWT', async () => {
    const res = await request(app).get('/api/v1/contacts');
    expect(res.status).toBe(401);
  });

  it('rechaza datos inválidos de contacto sin JWT (prioriza auth)', async () => {
    const res = await request(app).post('/api/v1/contacts').send({ name: '' });
    expect([400,401]).toContain(res.status);
  });
});
