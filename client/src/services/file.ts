import { apiMultipart } from "../lib/api";
import type { APIResponse } from "../lib/api-response";

async function postProfilePhoto(data: any) {
  const response = await apiMultipart.post(`/profile/photo`, data);
  if (response.status === 200) return response.data as APIResponse<string>;
  throw new Error("Upload error");
}

export { postProfilePhoto };