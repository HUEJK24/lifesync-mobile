const { getPool } = require('../../database/pool');

async function listByUser(table, userId) {
  const { rows } = await getPool().query(
    `SELECT * FROM ${table} WHERE user_id = $1 ORDER BY id DESC`,
    [userId]
  );
  return rows;
}

async function findOwned(table, id, userId) {
  const { rows } = await getPool().query(
    `SELECT * FROM ${table} WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return rows[0] || null;
}

async function createAllergy(userId, data) {
  const { allergen, severity, reaction, notes } = data;
  const { rows } = await getPool().query(
    `INSERT INTO allergies (user_id, allergen, severity, reaction, notes)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [userId, allergen, severity ?? null, reaction ?? null, notes ?? null]
  );
  return rows[0];
}

async function updateAllergy(id, userId, data) {
  const { allergen, severity, reaction, notes } = data;
  const { rows } = await getPool().query(
    `UPDATE allergies SET allergen=$1, severity=$2, reaction=$3, notes=$4
     WHERE id=$5 AND user_id=$6 RETURNING *`,
    [allergen, severity ?? null, reaction ?? null, notes ?? null, id, userId]
  );
  return rows[0] || null;
}

async function deleteAllergy(id, userId) {
  const { rowCount } = await getPool().query(
    'DELETE FROM allergies WHERE id=$1 AND user_id=$2',
    [id, userId]
  );
  return rowCount > 0;
}

async function createMedication(userId, data) {
  const { name, dosage, frequency, notes } = data;
  const { rows } = await getPool().query(
    `INSERT INTO medications (user_id, name, dosage, frequency, notes)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [userId, name, dosage ?? null, frequency ?? null, notes ?? null]
  );
  return rows[0];
}

async function updateMedication(id, userId, data) {
  const { name, dosage, frequency, notes } = data;
  const { rows } = await getPool().query(
    `UPDATE medications SET name=$1, dosage=$2, frequency=$3, notes=$4
     WHERE id=$5 AND user_id=$6 RETURNING *`,
    [name, dosage ?? null, frequency ?? null, notes ?? null, id, userId]
  );
  return rows[0] || null;
}

async function deleteMedication(id, userId) {
  const { rowCount } = await getPool().query(
    'DELETE FROM medications WHERE id=$1 AND user_id=$2',
    [id, userId]
  );
  return rowCount > 0;
}

module.exports = {
  listByUser, findOwned,
  createAllergy, updateAllergy, deleteAllergy,
  createMedication, updateMedication, deleteMedication,
};
