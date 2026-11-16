const fs = require('fs');
const path = require('path');
const { getPool } = require('./pool');

// Ejecutor simple de migraciones SQL en orden (uso en entorno configurado)
async function run() {
  const dir = path.join(__dirname, '../../migrations');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
  const pool = getPool();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    await pool.query(sql);
    console.log(`Migración aplicada: ${file}`);
  }
  await pool.end();
}

if (require.main === module) {
  run().catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { run };
