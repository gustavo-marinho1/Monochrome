import type { FastifyInstance } from "fastify";
import { controllerMe, controllerGetProfile, controllerChangeName, controllerChangePhoto } from "../controllers/user.js";
import { authenticate } from "../middlewares/authenticate.js";

export default async function UserRoutes(fastify: FastifyInstance) {

  fastify.get("/me", {onRequest: authenticate}, controllerMe);

  fastify.get("/profile", {onRequest: authenticate}, controllerGetProfile);

  fastify.patch("/user/name", {onRequest: authenticate}, controllerChangeName);

  fastify.patch("/user/photo", {onRequest: authenticate}, controllerChangePhoto);

}