import pool from "../../config/db.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/token.js";
import type { User } from "../user/user.model.js";
import type { RefreshTokenDB } from "./auth.model.js";



async function serviceLogin(email: string, password: string) {
  const users = await pool.query("SELECT * FROM users WHERE email = $1;", [email]);
  const user = users.rows[0];
  if (!user) {
    throw new Error("Email not registered");
  }

  const corretPassword = await bcrypt.compare(password, user.password);
  if (!corretPassword) {
    throw new Error("Incorrect credentials");
  }

  const accessToken = await generateAccessToken(user.id);
  const refreshToken = await generateRefreshToken(user.id);

  await serviceSaveRefreshToken(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}



async function serviceRegister(name: string, email: string, password: string) {
  const userExists = await pool.query("SELECT * FROM users WHERE email = $1;", [email]);
  if (userExists.rows[0]) {
    throw new Error("Email already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const res = await pool.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;
  `, [name, email, hashPassword]);

  const newUser: User = res.rows[0];
  if (!newUser) {
    throw new Error("Error creating new user");
  }

  const accessToken = await generateAccessToken(newUser.id);
  const refreshToken = await generateRefreshToken(newUser.id);

  await serviceSaveRefreshToken(newUser.id, refreshToken);

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    },
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}



const serviceSearchRefreshToken = async (token: string) => {
  const { rows } = await pool.query(`
    SELECT * FROM refresh_tokens WHERE token = $1;
  `, [token]);

  if (rows.length > 0) return rows[0] as RefreshTokenDB;
  return null;
}



const serviceSaveRefreshToken = async (userId: string, token: string) => {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 2);
  await pool.query(`
    INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3);
  `, [userId, token, expiresAt]);
}



const createRefreshTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id    UUID NOT NULL,
      token      TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      revoked_at TIMESTAMPTZ,

      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
  //CREATE INDEX idx_refresh_tokens_token   ON refresh_tokens(token);
  //CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
}



async function revokeRefreshToken(token: string) {
  const result = await pool.query(`
    UPDATE refresh_tokens SET revoked_at = NOW() 
    WHERE token = $1 AND revoked_at IS NULL
    RETURNING id;
  `, [token]);

  if (result.rowCount === 0) {
    throw new Error('Token not found or already revoked');
  }
}



export { serviceLogin, serviceRegister, createRefreshTable, serviceSaveRefreshToken, serviceSearchRefreshToken, revokeRefreshToken }