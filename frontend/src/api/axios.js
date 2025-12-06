import axios from "axios";

// Backend URL (from Vite env or default localhost)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to axios by default (if exists)
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Optional: interceptor to update token dynamically
api.interceptors.request.use(
  (config) => {
    const newToken = localStorage.getItem("token");
    if (newToken) {
      config.headers.Authorization = `Bearer ${newToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;