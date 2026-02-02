import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE,
});

// 🔐 Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📌 Get all jobs
export const getJobs = () => api.get("/jobs/");

// 📌 Get single job
export const getJob = (id) => api.get(`/jobs/${id}/`);

// 📌 Apply for job
// export const applyJob = (jobId) =>
//   api.post("/applications/", { job: jobId });

export default api;
