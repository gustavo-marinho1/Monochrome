import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import type { User } from "../models/user.js";

async function serviceLogin(email: string, password: string) {
  const users = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = users.rows[0];
  if (!user) {
    throw new Error("Email not registered");
  }

  const corretPassword = await bcrypt.compare(password, user.password);
  if (!corretPassword) {
    throw new Error("Incorrect credentials");
  }

  const token = await generateToken(user.id, user.email);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token: token
  }
}

async function serviceRegister(name: string, email: string, password: string) {
  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (userExists.rows[0]) {
    throw new Error("Email already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const res = await pool.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email 
  `, [name, email, hashPassword]);

  const newUser: User = res.rows[0];
  if (!newUser) {
    throw new Error("Error creating new user");
  }

  const token = await generateToken(newUser.id, newUser.email);

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    },
    token: token
  }
}

export { serviceLogin, serviceRegister }