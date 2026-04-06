import pool from "../../config/db.js";
import type { User } from "../user/user.model.js";

async function serviceSaveProfilePhoto(id: string, photo_url: string) {
  const res = await pool.query("SELECT id FROM users WHERE id = $1", [id]);
  const user: User = res.rows[0];
  if (!user) throw new Error("User not found");
  await pool.query("UPDATE users SET avatar_url = $1 WHERE id = $2", [photo_url, id]);
}

export { serviceSaveProfilePhoto };