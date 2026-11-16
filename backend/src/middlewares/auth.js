const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { AppError } = require('../utils/errors');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token) {
    return next(new AppError('Autenticación requerida', 401));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    return next(new AppError('Token inválido o expirado', 401));
  }
}

module.exports = authMiddleware;
