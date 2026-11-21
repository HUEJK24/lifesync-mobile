const { Pool } = require('pg');
const env = require('../config/env');

// Singleton: una única instancia de Pool para la aplicación
let pool;

function buildConfig() {
  if (!env.databaseUrl) {
    return { connectionString: env.databaseUrl };
  }

  const url = new URL(env.databaseUrl);
  const sslmode = url.searchParams.get('sslmode');
  url.searchParams.delete('sslmode');

  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
  const requiresSsl = ['require', 'verify-ca', 'verify-full'].includes(sslmode);
  const useSsl = !isLocal && (env.nodeEnv === 'production' || requiresSsl);

  return {
    connectionString: url.toString(),
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
    max: env.nodeEnv === 'production' ? 10 : undefined,
    idleTimeoutMillis: 30000,
  };
}

function getPool() {
  if (!pool) {
    pool = new Pool(buildConfig());

    pool.on('error', (err) => {
      console.error('Error inesperado en el pool de PostgreSQL', err);
    });
  }
  return pool;
}

module.exports = { getPool };
