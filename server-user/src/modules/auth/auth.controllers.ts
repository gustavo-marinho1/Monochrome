import type { FastifyReply, FastifyRequest } from "fastify";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, generateAccessToken, generateRefreshToken } from "../../utils/token.js";
import { revokeRefreshToken, serviceLogin, serviceRegister, serviceSearchRefreshToken } from "./auth.services.js";
import { dateNow } from "../../utils/date.js";

async function controllerLogin (req: FastifyRequest, reply: FastifyReply) {
  // @ts-ignore
  const { email, password } = req.body;
  const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 24
  }
  try {
    if (!email || !password) {
      throw new Error("Email or password not provided");
    }
    const data = await serviceLogin(email, password);
    reply
      .status(200)
      .setCookie(COOKIE_REFRESH_TOKEN, data.refreshToken, cookieOptions)
      .send({ message: "Login", data: data.accessToken });
  }
  catch (error: Error | any) {
    reply.status(401).send({ message: error.message, data: undefined });
  }
}

async function controllerRegister (req: FastifyRequest, reply: FastifyReply) {
  // @ts-ignore
  const { name, email, password } = req.body;
  const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 24
  }
  try {
    if (!name || !email || !password) {
      throw new Error("Required data not provided");
    }
    const data = await serviceRegister(name, email, password);
    reply
      .status(200)
      .setCookie(COOKIE_REFRESH_TOKEN, data.refreshToken, cookieOptions)
      .send({ message: "Login", data: data.accessToken });
  }
  catch (error: Error | any) {
    reply.status(401).send({ message: error.message, data: undefined });
  }
}

async function controllerLogout (req: FastifyRequest, reply: FastifyReply) {
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const
  };

  try {
    const refresh_token = req.cookies.refresh_token;
    if (refresh_token)
      await revokeRefreshToken(refresh_token);

    reply
      .status(200)
      .clearCookie(COOKIE_REFRESH_TOKEN, cookieOptions)
      .send({ message: "Logout", data: undefined });
  }
  catch (error: Error | any) {
    reply
      .status(500)
      .clearCookie(COOKIE_REFRESH_TOKEN, cookieOptions)
      .send({ message: error.message, data: undefined });
  }
}

async function controllerRefresh(req: FastifyRequest, reply: FastifyReply) {
  const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    maxAge: 60 * 2
  }

  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) return reply
      .status(403)
      .clearCookie(COOKIE_REFRESH_TOKEN, cookieOptions)
      .send({ message: 'Token missing' });

    const data = await serviceSearchRefreshToken(refresh_token);
    
    if (!data) {
      return reply.status(403).send({ message: 'Invalid token' });
    }

    if (data.revoked_at || new Date(data.expires_at) < dateNow()) {
      return reply.status(403).send({ message: 'Token revoked or expired' });
    }

    await revokeRefreshToken(refresh_token);
    const newRefreshToken = await generateRefreshToken(data.user_id);
    const newAccessToken = await generateAccessToken(data.user_id);

    reply
      .status(200)
      .setCookie('refresh_token', newRefreshToken, cookieOptions)
      .send({ message: "Refresh token valid", data: newAccessToken });
  }
  catch (error: Error | any) {
    reply
      .status(500)
      .clearCookie(COOKIE_REFRESH_TOKEN, cookieOptions)
      .send({ message: error.message, data: undefined });
  }
}

export { controllerLogin, controllerLogout, controllerRegister, controllerRefresh }