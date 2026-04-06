import { getAxios } from "@/lib/api";
import type { UserLogin } from "../types/user";
import type { APIResponse } from "@/lib/api-response";

async function me() {
  const api = getAxios({});
  const response = await api.get(`/me`);
  if (response.status === 200) {
    return response.data as APIResponse<UserLogin>;
  }
  throw new Error("Session not found");
}

export { me }