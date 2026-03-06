import api from "../lib/api";
import type { UserLogin } from "../types/user";

async function me() {
  const response = await api.get(`/me`);
  if (response.status === 200) return response.data as {
    data: UserLogin,
    message: string
  };
  throw new Error("Session not found");
}

export { me }