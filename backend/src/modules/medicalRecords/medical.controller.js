const repo = require('./medical.repository');
const { AppError } = require('../../utils/errors');

function ownedOr404(row) {
  if (!row) throw new AppError('Registro no encontrado o no autorizado', 404);
  return row;
}

async function listAllergies(req, res, next) {
  try { res.json({ allergies: await repo.listByUser('allergies', req.user.id) }); } catch (e) { next(e); }
}
async function createAllergy(req, res, next) {
  try { res.status(201).json({ allergy: await repo.createAllergy(req.user.id, req.validated.body) }); } catch (e) { next(e); }
}
async function updateAllergy(req, res, next) {
  try { res.json({ allergy: ownedOr404(await repo.updateAllergy(req.params.id, req.user.id, req.validated.body)) }); } catch (e) { next(e); }
}
async function deleteAllergy(req, res, next) {
  try {
    const ok = await repo.deleteAllergy(req.params.id, req.user.id);
    if (!ok) throw new AppError('Registro no encontrado o no autorizado', 404);
    res.status(204).send();
  } catch (e) { next(e); }
}

async function listMedications(req, res, next) {
  try { res.json({ medications: await repo.listByUser('medications', req.user.id) }); } catch (e) { next(e); }
}
async function createMedication(req, res, next) {
  try { res.status(201).json({ medication: await repo.createMedication(req.user.id, req.validated.body) }); } catch (e) { next(e); }
}
async function updateMedication(req, res, next) {
  try { res.json({ medication: ownedOr404(await repo.updateMedication(req.params.id, req.user.id, req.validated.body)) }); } catch (e) { next(e); }
}
async function deleteMedication(req, res, next) {
  try {
    const ok = await repo.deleteMedication(req.params.id, req.user.id);
    if (!ok) throw new AppError('Registro no encontrado o no autorizado', 404);
    res.status(204).send();
  } catch (e) { next(e); }
}

module.exports = {
  listAllergies, createAllergy, updateAllergy, deleteAllergy,
  listMedications, createMedication, updateMedication, deleteMedication,
};
