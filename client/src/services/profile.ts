import { getAxios } from "@/lib/api";
import type { APIResponse } from "../lib/api-response";
import type { Profile } from "../types/profile";

async function getProfile() {
  const api = getAxios({});
  const response = await api.get(`/profile`);
  if (response.status === 200) return response.data as APIResponse<Profile>;
  throw new Error("Error");
}

async function changeProfileName(name: string) {
  const api = getAxios({});
  const response = await api.patch(`/user/name`, { name });
  if (response.status === 200) return response.data as APIResponse<true>;
  throw new Error("Error");
}

export { getProfile, changeProfileName };