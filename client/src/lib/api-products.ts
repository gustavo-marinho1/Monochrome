import axios from 'axios';

const api_url = import.meta.env.VITE_API_PRODUCTS_URL;

const createApi = (contentType: string = 'application/json') => {
  const apiProducts = axios.create({
    baseURL: api_url,
    withCredentials: true,
    headers: {
      'Content-Type': contentType,
    },
  });

  apiProducts.interceptors.response.use(
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

  return apiProducts;
};

const apiProducts = createApi();

export default apiProducts;