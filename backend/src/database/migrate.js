const fs = require('fs');
const path = require('path');
const { getPool } = require('./pool');

const MIGRATION_LOCK_ID = 741920260001;

// Ejecutor de migraciones SQL en orden, con control de aplicadas y bloqueo entre instancias
async function run() {
  const dir = path.join(__dirname, '../../migrations');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock($1)', [MIGRATION_LOCK_ID]);
    await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`);

    for (const file of files) {
      const { rows } = await client.query('SELECT 1 FROM schema_migrations WHERE filename = $1', [file]);
      if (rows.length) {
        console.log(`Migración ya aplicada: ${file}`);
        continue;
      }

      const sql = fs.readFileSync(path.join(dir, file), 'utf8');
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT DO NOTHING', [file]);
      console.log(`Migración aplicada: ${file}`);
    }

    await client.query('COMMIT');
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch (rollbackErr) {
      console.error('No se pudo hacer rollback', rollbackErr);
    }
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

if (require.main === module) {
  run().catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { run };
