import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

console.log("FINAL API BASE:", API_BASE);

const api = axios.create({
  baseURL: API_BASE,
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  // Public endpoints (NO TOKEN REQUIRED)
  const publicRoutes = [
    "start-register",
    "verify-email",
    "complete-register",
    "login",
    "resend-otp",
    "jobs", // allow public job listing
  ];

  const isPublic = publicRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==============================
// RESPONSE INTERCEPTOR
// AUTO LOGOUT IF TOKEN EXPIRED
// ==============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired. Logging out...");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
