import api from "./axios";

// Login
export const login = (data) =>
  api.post("/token/", data);

// Register
export const register = (data) =>
  api.post("/accounts/register/", data);

// Get current user
export const me = () =>
  api.get("/accounts/me/");
