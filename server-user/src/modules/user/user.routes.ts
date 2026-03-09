import type { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate.js";
import { controllerChangeName, controllerChangePhoto, controllerGetProfile, controllerMe } from "./user.controllers.js";


export default async function UserRoutes(fastify: FastifyInstance) {

  fastify.get("/me", {onRequest: authenticate}, controllerMe);

  fastify.get("/profile", {onRequest: authenticate}, controllerGetProfile);

  fastify.patch("/user/name", {onRequest: authenticate}, controllerChangeName);

  fastify.patch("/user/photo", {onRequest: authenticate}, controllerChangePhoto);

}