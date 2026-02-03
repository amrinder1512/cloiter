import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens or other headers
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
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

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors like 401, 403, etc.
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      console.log('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export const addBaseUrl = (url) => {
  if (!url) return "";
  if (url.startsWith('http') || url.startsWith('/images/')) return url;
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default api;