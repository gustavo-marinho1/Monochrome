import pool from "../config/db.js";
import type { User } from "../models/user.js";

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
  const res = await pool.query("SELECT id, name, email, imagem_url, photo_src FROM users WHERE id = $1", [id]);
  const user: User = res.rows[0];
  if (!user) throw new Error("User not found");
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo_src: user.photo_src,
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
  await pool.query("UPDATE users SET photo_src = $1 WHERE id = $2", [photo, id]);
}

export { serviceGetMeInfo, serviceGetProfile, serviceChangeName, serviceChangePhoto }