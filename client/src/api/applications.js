import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.error || 'Something went wrong');
    return Promise.reject(error);
  }
);

export default api;