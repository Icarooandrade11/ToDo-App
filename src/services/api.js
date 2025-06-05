import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Sua URL base do backend
});

// Interceptor para adicionar o token JWT a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;