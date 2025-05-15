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

export const API_BASE_URL = apiBaseUrl;
