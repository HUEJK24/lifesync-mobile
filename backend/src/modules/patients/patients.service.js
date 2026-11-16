const repo = require('./patients.repository');
const { AppError } = require('../../utils/errors');

async function getProfile(userId) {
  const profile = await repo.getByUserId(userId);
  if (!profile) throw new AppError('Perfil no encontrado', 404);
  return profile;
}

async function upsertProfile(userId, data) {
  return repo.upsertByUserId(userId, data);
}

module.exports = { getProfile, upsertProfile };
