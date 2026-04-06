import { getAxios } from '@/lib/api';
import type { APIResponse } from '@/lib/api-response';
import { setAccessToken } from '../lib/token';

interface LoginParams {
  email: string,
  password: string
}

interface RegisterParams {
  name: string,
  email: string,
  password: string
}

async function login(data: LoginParams) {
  const api = getAxios({});
  const response = await api.post(`/login`, data);
  if (response.status === 200) {
    setAccessToken(response.data.data);
    return response.data as APIResponse<string>;
  }
  throw new Error("Login error");
}

async function register(data: RegisterParams) {
  const api = getAxios({});
  const response = await api.post(`/register`, data);
  if (response.status === 200) {
    setAccessToken(response.data.data);
    return response.data as APIResponse<string>;
  }
  throw new Error("Register error");
}

async function logout() {
  const api = getAxios({});
  const response = await api.post(`/logout`);
  if (response.status === 200) {
    return response.data as APIResponse<any>;
  }
  throw new Error("Logout error");
}

export { login, register, logout }