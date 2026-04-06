import { getAxios } from "@/lib/api";
import type { APIResponse } from "../lib/api-response";

async function postProfilePhoto(data: any) {
  const api = getAxios({ contentType: "multipart/form-data" });
  const response = await api.post(`/profile/photo`, data);
  if (response.status === 200) return response.data as APIResponse<string>;
  throw new Error("Upload error");
}

export { postProfilePhoto };