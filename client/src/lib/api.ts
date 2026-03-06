import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: api_url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const message = error.response.data.error || error.response.data.message;
      if (message) {
        error.message = message;
      }
    }

    if (error.response.data && error.response.data.redirect) {
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;