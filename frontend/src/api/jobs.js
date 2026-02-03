import api from "./axios";

// Get all jobs
export const getJobs = () =>
  api.get("/api/jobs/");

// Get single job
export const getJob = (id) =>
  api.get(`/api/jobs/${id}/`);

// Apply for job
export const applyJob = (jobId) =>
  api.post("/api/applications/", { job: jobId });
