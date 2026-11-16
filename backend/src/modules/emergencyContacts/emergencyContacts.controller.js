const repo = require('./emergencyContacts.repository');
const { AppError } = require('../../utils/errors');

async function list(req, res, next) {
  try { res.json({ contacts: await repo.listByUser(req.user.id) }); } catch (e) { next(e); }
}
async function create(req, res, next) {
  try { res.status(201).json({ contact: await repo.create(req.user.id, req.validated.body) }); } catch (e) { next(e); }
}
async function update(req, res, next) {
  try {
    const contact = await repo.update(req.params.id, req.user.id, req.validated.body);
    if (!contact) throw new AppError('Registro no encontrado o no autorizado', 404);
    res.json({ contact });
  } catch (e) { next(e); }
}
async function remove(req, res, next) {
  try {
    const ok = await repo.remove(req.params.id, req.user.id);
    if (!ok) throw new AppError('Registro no encontrado o no autorizado', 404);
    res.status(204).send();
  } catch (e) { next(e); }
}

module.exports = { list, create, update, remove };
