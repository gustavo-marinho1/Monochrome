import type { FastifyReply, FastifyRequest } from "fastify";
import { serviceChangeName, serviceGetMeInfo, serviceGetProfile } from "./user.services.js";

async function controllerMe (req: FastifyRequest, reply: FastifyReply) {
  try {
    if (!req.user) throw new Error("Error authentication");
    const id = req.user.id;
    const data = await serviceGetMeInfo(id);
    reply
      .status(200)
      .send({ message: "Me", data: data});
  }
  catch (error: Error | any) {
    reply
      .status(401)
      .send({ message: error.message, data: undefined });
  }
}

async function controllerGetProfile (req: FastifyRequest, reply: FastifyReply) {
  try {
    if (!req.user) throw new Error("Error authentication");
    const id = req.user.id;
    const data = await serviceGetProfile(id);
    console.log(data.avatar_url);
    reply
      .status(200)
      .send({ message: "Profile", data: data});
  }
  catch (error: Error | any) {
    reply
      .status(401)
      .send({ message: error.message, data: undefined });
  }
}

async function controllerChangeName (req: FastifyRequest, reply: FastifyReply) {
  // @ts-ignore
  const { name } = req.body;
  try {
    if (!req.user) throw new Error("Error authentication");
    if (!name) throw new Error("Name not provided");
    await serviceChangeName(req.user.id, name);
    reply
      .status(200)
      .send({ message: "Name changed", data: true});
  }
  catch (error: Error | any) {
    reply
      .status(401)
      .send({ message: error.message, data: undefined });
  }
}

async function controllerChangePhoto (req: FastifyRequest, reply: FastifyReply) {
  // @ts-ignore
  const { photo } = req.body;
  try {
    if (!req.user) throw new Error("Authentication error");
    if (!photo) throw new Error("Photo not provided");
    console.log(photo);
    //await serviceChangePhoto(req.user.id, avatar_url);
    reply
      .status(200)
      .send({ message: "Photo changed", data: true});
  }
  catch (error: Error | any) {
    reply
      .status(401)
      .send({ message: error.message, data: undefined });
  }
}

export { controllerMe, controllerGetProfile, controllerChangeName, controllerChangePhoto }