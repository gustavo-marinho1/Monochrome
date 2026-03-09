import type { FastifyReply, FastifyRequest } from "fastify";
import { AllowedImageTypes, saveAvatarFile } from "../../utils/image.js";
import { serviceSaveProfilePhoto } from "./file.services.js";

async function controllerPostProfilePhoto(req: FastifyRequest, reply: FastifyReply) {
  try {
    if (!req.user) throw new Error("Error authentication");

    const data = await req.file();
    if (!data) throw new Error("File not provided");

    if (!AllowedImageTypes.includes(data.mimetype)) {
      throw new Error("File not allowed");
    }

    const photoSrc = await saveAvatarFile(data);

    await serviceSaveProfilePhoto(req.user.id, photoSrc);

    reply
      .status(200)
      .send({ 
        message: 'New profile photo',
        data: photoSrc
      });
  }
  catch (error: Error | any) {
    reply
      .status(401)
      .send({ message: error.message, data: undefined });
  }
}

export { controllerPostProfilePhoto }