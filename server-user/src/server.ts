import Fastify from "fastify";
import FastifyCors from "@fastify/cors";
import FastifyCookie from "@fastify/cookie";
import UserRoutes from "./routes/user.js";
import type { JWTUser } from "./models/user.js";
import AuthRoutes from "./routes/auth.js";

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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
});

// cookies
server.register(FastifyCookie, {
  secret: String(process.env.COOKIE_SECRET),
  hook: 'onRequest',
});

// routes
server.register(UserRoutes);
server.register(AuthRoutes);

export default server;