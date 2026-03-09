import type { FastifyReply, FastifyRequest } from "fastify";
import { COOKIE_AUTH_TOKEN } from "../../utils/token.js";
import { serviceLogin, serviceRegister } from "./auth.services.js";

async function controllerLogin (req: FastifyRequest, reply: FastifyReply) {
  // @ts-ignore
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Email or password not provided");
    }
    const data = await serviceLogin(email, password);
    reply
      .status(200)
      .setCookie(COOKIE_AUTH_TOKEN, data.token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24
      })
      .send({ message: "Login", data: data.user });
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
    reply
      .status(200)
      .clearCookie(COOKIE_AUTH_TOKEN, cookieOptions)
      .send({ message: "Logout", data: undefined });
  }
  catch (error: Error | any) {
    reply
      .status(500)
      .clearCookie(COOKIE_AUTH_TOKEN, cookieOptions)
      .send({ message: error.message, data: undefined });
  }
}

async function controllerRegister (req: FastifyRequest, reply: FastifyReply) {
  // @ts-ignore
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw new Error("Required data not provided");
    }
    const data = await serviceRegister(name, email, password);
    reply
    .status(200)
    .setCookie(COOKIE_AUTH_TOKEN, data.token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24
    })
    .send({ message: "User created", data: data.user});
  }
  catch (error: Error | any) {
    reply.status(401).send({ message: error.message, data: undefined });
  }
}

export { controllerLogin, controllerLogout, controllerRegister }