import api from "./axios";

export const getJobs = () =>
  api.get("/api/jobs/");

export const getJob = (id) =>
  api.get(`/api/jobs/${id}/`);

export const applyJob = (jobId) =>
  api.post("/api/applications/", { job: jobId });
