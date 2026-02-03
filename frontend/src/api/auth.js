import api from "./axios";

export const login = (data) =>
  api.post("/api/accounts/login/", data);

export const register = (data) =>
  api.post("/api/accounts/start-register/", data);

export const me = () =>
  api.get("/api/accounts/me/");
