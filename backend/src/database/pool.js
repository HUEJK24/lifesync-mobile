const { Pool } = require('pg');
const env = require('../config/env');

// Singleton: una única instancia de Pool para la aplicación
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: env.databaseUrl,
      ssl: env.databaseUrl && env.databaseUrl.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
    });

    pool.on('error', (err) => {
      console.error('Error inesperado en el pool de PostgreSQL', err);
    });
  }
  return pool;
}

module.exports = { getPool };
