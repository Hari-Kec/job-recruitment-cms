import axios from 'axios';
import { toast } from 'react-hot-toast';

// const baseURL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    toast.error(error.response?.data?.error || 'Something went wrong');
    return Promise.reject(error);
  }
);

// Auth functions
export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const register = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

export const updateUser = async (userData, token) => {
  const { data } = await api.put('/auth/me', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getCurrentUser = async (token) => {
  const { data } = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
};

export const resetPassword = async (resetData) => {
  const { data } = await api.post('/auth/reset-password', resetData);
  return data;
};

export default api;