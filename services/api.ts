import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Replace with your actual backend URL or use the environment variable
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes (e.g., 401 for logout)
    if (error.response && error.response.status === 401) {
        // secure store deletion logic could handle by the caller or a global event
        SecureStore.deleteItemAsync('authToken');
    }
    return Promise.reject(error);
  }
);

export default api;
