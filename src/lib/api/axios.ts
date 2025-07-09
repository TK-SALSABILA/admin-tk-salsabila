import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import { BASE_URL } from '@/constants/api';

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor untuk handle error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;