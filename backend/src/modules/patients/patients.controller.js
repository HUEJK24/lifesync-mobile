const service = require('./patients.service');

async function getProfile(req, res, next) {
  try {
    const profile = await service.getProfile(req.user.id);
    res.json({ profile });
  } catch (err) {
    next(err);
  }
}

async function upsertProfile(req, res, next) {
  try {
    const profile = await service.upsertProfile(req.user.id, req.validated.body);
    res.json({ profile });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, upsertProfile };
