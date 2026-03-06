import type { FastifyInstance } from "fastify";
import { controllerLogin, controllerLogout, controllerRegister } from "../controllers/auth.js";

export default async function AuthRoutes(fastify: FastifyInstance) {

  fastify.post("/login", controllerLogin);

  fastify.post("/logout", controllerLogout);

  fastify.post("/register", controllerRegister);

}