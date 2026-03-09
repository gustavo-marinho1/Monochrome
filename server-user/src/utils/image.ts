import path from "node:path";
import fs from 'node:fs';
import { pipeline } from "node:stream/promises";

const AllowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

async function saveAvatarFile(data: any) {
  const extension = path.extname(data.filename);
  const fileName = `avatar-${crypto.randomUUID()}${extension}`;
  const directory = path.join(process.cwd(), 'uploads/avatars', fileName);

  await pipeline(data.file, fs.createWriteStream(directory));

  const photoSrc = `uploads/avatars/${fileName}`;
  return photoSrc;
}

export { AllowedImageTypes, saveAvatarFile }