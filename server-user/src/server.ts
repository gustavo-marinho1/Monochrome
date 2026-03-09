import Fastify from "fastify";
import FastifyCors from "@fastify/cors";
import FastifyCookie from "@fastify/cookie";
import type { JWTUser } from "./modules/auth/auth.model.js";
import UserRoutes from "./modules/user/user.routes.js";
import AuthRoutes from "./modules/auth/auth.routes.js";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import FileRoutes from "./modules/file/file.routes.js";

const server = Fastify({
  logger: true
});

declare module "fastify" {
  export interface FastifyRequest {
    user?: JWTUser
  }
}

// cors
server.register(FastifyCors, {
  origin: "http://localhost:5173",
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD']
});

// cookies
server.register(FastifyCookie, {
  secret: String(process.env.COOKIE_SECRET),
  hook: 'onRequest'
});

// files
server.register(fastifyMultipart, {
  limits: { fileSize: 5 * 1024 * 1024 }
});

server.register(fastifyStatic, {
  root: path.join(process.cwd(), 'uploads'),
  prefix: '/uploads/',
});

// routes
server.register(UserRoutes);
server.register(AuthRoutes);
server.register(FileRoutes);

export default server;