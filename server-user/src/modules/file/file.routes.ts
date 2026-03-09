import type { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate.js";
import { controllerPostProfilePhoto } from "./file.controllers.js";

export default async function FileRoutes(fastify: FastifyInstance) {

  fastify.post("/profile/photo", {onRequest: authenticate}, controllerPostProfilePhoto);

}