import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

// ❗ DO NOT attach token for public endpoints
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
