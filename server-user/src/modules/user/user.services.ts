import pool from "../../config/db.js";
import type { User } from "./user.model.js";


async function serviceGetMeInfo(id: number) {
  const res = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [id]);
  const user: User = res.rows[0];
  if (!user) throw new Error("User not found");
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

async function serviceGetProfile(id: number) {
  const res = await pool.query("SELECT id, name, email, avatar_url, created_at FROM users WHERE id = $1", [id]);
  const user: User = res.rows[0];
  if (!user) throw new Error("User not found");
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url,
    created_at: user.created_at
  };
}

async function serviceChangeName(id: number, name: string) {
  const res = await pool.query("SELECT id FROM users WHERE id = $1", [id]);
  const user: User = res.rows[0];
  if (!user) throw new Error("User not found");
  await pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, id]);
}

async function serviceChangePhoto(id: number, photo: string) {
  const res = await pool.query("SELECT id FROM users WHERE id = $1", [id]);
  const user: User = res.rows[0];
  if (!user) throw new Error("User not found");
  await pool.query("UPDATE users SET avatar_url = $1 WHERE id = $2", [photo, id]);
}

async function createTableUser() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      avatar_url TEXT
    );
  `);
}

export { serviceGetMeInfo, serviceGetProfile, serviceChangeName, serviceChangePhoto, createTableUser }