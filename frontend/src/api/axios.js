import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically (except public routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (
    token &&
    !config.url.includes("start-register") &&
    !config.url.includes("verify-email") &&
    !config.url.includes("complete-register") &&
    !config.url.includes("login")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
