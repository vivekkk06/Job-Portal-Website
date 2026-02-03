import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

console.log("FINAL API BASE:", API_BASE);

const api = axios.create({
  baseURL: API_BASE ,
});

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
