import api from "./axios";

// Get all jobs
export const getJobs = () =>
  api.get("/jobs/");

// Get single job
export const getJob = (id) =>
  api.get(`/jobs/${id}/`);

// Apply for job (if needed)
export const applyJob = (jobId) =>
  api.post("/applications/", { job: jobId });
