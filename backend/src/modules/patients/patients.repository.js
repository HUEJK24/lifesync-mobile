const { getPool } = require('../../database/pool');

async function getByUserId(userId) {
  const { rows } = await getPool().query(
    'SELECT id, user_id, blood_type, birth_date, notes, updated_at FROM patient_profiles WHERE user_id = $1',
    [userId]
  );
  return rows[0] || null;
}

async function upsertByUserId(userId, data) {
  const { blood_type, birth_date, notes } = data;
  const { rows } = await getPool().query(
    `INSERT INTO patient_profiles (user_id, blood_type, birth_date, notes, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (user_id) DO UPDATE SET
       blood_type = COALESCE(EXCLUDED.blood_type, patient_profiles.blood_type),
       birth_date = COALESCE(EXCLUDED.birth_date, patient_profiles.birth_date),
       notes = COALESCE(EXCLUDED.notes, patient_profiles.notes),
       updated_at = NOW()
     RETURNING id, user_id, blood_type, birth_date, notes, updated_at`,
    [userId, blood_type ?? null, birth_date || null, notes ?? null]
  );
  return rows[0];
}

module.exports = { getByUserId, upsertByUserId };
