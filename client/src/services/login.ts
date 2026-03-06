import api from "../lib/api";
import type { UserLogin } from "../types/user";

interface Params {
  email: string,
  password: string
}

async function login(data: Params) {
  const response = await api.post(`/login`, data);
  if (response.status === 200) return response.data as {
    data: UserLogin,
    message: string
  };
  throw new Error("Login error");
}

export { login }