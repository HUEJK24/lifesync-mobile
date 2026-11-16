const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const { AppError } = require('../../utils/errors');
const repo = require('./auth.repository');

async function register({ name, email, password }) {
  const existing = await repo.findByEmail(email);
  if (existing) throw new AppError('El correo ya está registrado', 409);

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await repo.createUser({ name, email, passwordHash });

  // Crear perfil médico base asociado al usuario
  const { getPool } = require('../../database/pool');
  await getPool().query(
    'INSERT INTO patient_profiles (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
    [user.id]
  );

  const token = signToken(user);
  return { user, token };
}

async function login({ email, password }) {
  const user = await repo.findByEmail(email);
  if (!user) throw new AppError('Credenciales inválidas', 401);

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new AppError('Credenciales inválidas', 401);

  const token = signToken(user);
  return {
    user: { id: user.id, name: user.name, email: user.email, created_at: user.created_at },
    token,
  };
}

function signToken(user) {
  return jwt.sign(
    { email: user.email },
    env.jwtSecret,
    { subject: String(user.id), expiresIn: env.jwtExpiresIn }
  );
}

module.exports = { register, login };
