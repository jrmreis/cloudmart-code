// cloudmart-frontend/src/config/axiosConfig.js
import axios from 'axios';

// Get API base URL from runtime config or environment variables
let apiBaseUrl;

// Check if we're running in the browser and if RUNTIME_CONFIG exists
if (typeof window !== 'undefined' && window.RUNTIME_CONFIG) {
  apiBaseUrl = window.RUNTIME_CONFIG.API_BASE_URL;
  console.log('Using runtime configuration:', apiBaseUrl);
} else {
  // Fallback for development environment
  apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
  console.log('Using environment variables or default:', apiBaseUrl);
}

// Create axios instance with the dynamic base URL
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptors if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
