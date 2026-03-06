import api from "../lib/api";
import type { APIResponse } from "../lib/api-response";

async function logout() {
  const response = await api.post(`/logout`);
  if (response.status === 200) return response.data as APIResponse<any>;
  throw new Error("Logout error");
}

export { logout }