const { getPool } = require('../../database/pool');

async function listByUser(userId) {
  const { rows } = await getPool().query(
    'SELECT * FROM emergency_contacts WHERE user_id = $1 ORDER BY is_primary DESC, id DESC',
    [userId]
  );
  return rows;
}

async function create(userId, data) {
  const { name, relationship, phone, is_primary } = data;
  const { rows } = await getPool().query(
    `INSERT INTO emergency_contacts (user_id, name, relationship, phone, is_primary)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [userId, name, relationship ?? null, phone, !!is_primary]
  );
  return rows[0];
}

async function update(id, userId, data) {
  const { name, relationship, phone, is_primary } = data;
  const { rows } = await getPool().query(
    `UPDATE emergency_contacts SET name=$1, relationship=$2, phone=$3, is_primary=$4
     WHERE id=$5 AND user_id=$6 RETURNING *`,
    [name, relationship ?? null, phone, !!is_primary, id, userId]
  );
  return rows[0] || null;
}

async function remove(id, userId) {
  const { rowCount } = await getPool().query(
    'DELETE FROM emergency_contacts WHERE id=$1 AND user_id=$2',
    [id, userId]
  );
  return rowCount > 0;
}

module.exports = { listByUser, create, update, remove };
