import axios from 'axios';
import { getAccessToken, setAccessToken } from './token';

const api_url = import.meta.env.VITE_API_USER_URL;

interface Props {
  contentType?: string
}

export const getAxios = (props: Props) => {
  const { contentType = "application/json" } = props;

  const api = axios.create({
    baseURL: api_url,
    withCredentials: true,
    headers: {
      'Content-Type': contentType,
    },
  });

  const accessToken = getAccessToken();

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config;

      if (error.response && error.response.data) {
        const message = error.response.data.error || error.response.data.message;
        if (message) {
          error.message = message;
        }
      }

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;
        try {
          const { data } = await api.post('/refresh');
          setAccessToken(data.data);
          original.headers['Authorization'] = `Bearer ${data.data}`;
          return axios(original);
        } catch {
          return Promise.reject(error);
        }
      }

      if (error.response?.data?.redirect) {
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};