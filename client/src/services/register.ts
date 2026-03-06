import api from "../lib/api";
import type { UserLogin } from "../types/user";

interface Params {
  name: string,
  email: string,
  password: string
}

async function register(data: Params) {
  const response = await api.post(`/register`, data);
  if (response.status === 200) return response.data as {
    data: UserLogin,
    message: string
  };
  throw new Error("Register error");
}

export { register }