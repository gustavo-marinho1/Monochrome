import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { isAccessTokenValid } from "../utils/token.js";
import type { JWTUser } from "../modules/auth/auth.model.js";

async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const auth = req.headers['authorization'];

  if (!auth) {
    return reply.status(401).send({ message: "Token not provided", data: undefined });
  }

  const accessToken = auth.split(' ')[1];

  if (!accessToken) {
    return reply.status(401).send({ message: "Token not provided", data: undefined });
  }

  try {
    const decodedJwt = jwt.verify(
      accessToken,
      String(process.env.ACCESS_SECRET)
    ) as JWTUser;
    req.user = decodedJwt;
  } catch {
    return reply.status(401).send({ message: 'Token not valid', data: undefined });
  }
}

export { authenticate }