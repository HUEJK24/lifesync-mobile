const { ZodError } = require('zod');

function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    });
  }

  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Error interno del servidor';

  if (status >= 500) {
    console.error(err);
  }

  return res.status(status).json({ error: message, details: err.details || null });
}

module.exports = errorHandler;
