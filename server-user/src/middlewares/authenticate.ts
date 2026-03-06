import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import type { JWTUser } from "../models/user.js";
import { COOKIE_AUTH_TOKEN, isTokenValid } from "../utils/token.js";

async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const token = req.cookies.auth_token;
  if (!token) {
    reply
      .status(401)
      .clearCookie(COOKIE_AUTH_TOKEN)
      .send({ message: "Token not provided", data: undefined});
    return
  }

  const valid = isTokenValid(token);
  if (!valid) {
    reply
      .status(401)
      .clearCookie(COOKIE_AUTH_TOKEN)
      .send({ message: "Token not valid", data: undefined, redirect: "/login" });
    return
  }

  const decodedJwt = jwt.verify(token, String(process.env.JWT_SECRET)) as JWTUser;
  req.user = decodedJwt;
}

export { authenticate }