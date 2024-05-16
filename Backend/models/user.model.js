import { pool } from "../database/connection";

const findUser = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = $1;";
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const create = async (email, password, rol, lenguage) => {
  const query =
    "INSERT INTO usuarios (id, email, password,rol, lenguage) VALUES (DEFAULT, $1, $2 , $3, $4) RETURNING *;";
  const values = [email, password, rol, lenguage];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const userModel = {
  findUser,
  create,
};
