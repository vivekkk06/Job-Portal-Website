import api from "./axios";

export const login = (data) =>
  api.post("/api/accounts/login/", data);

export const register = (data) =>
  api.post("/api/accounts/start-register/", data);

export const resendOTP = (data) =>
  api.post("/api/accounts/resend-otp/", data);

export const verifyEmail = (data) =>
  api.post("/api/accounts/verify-email/", data);

export const completeRegister = (data) =>
  api.post("/api/accounts/complete-register/", data);

export const me = () =>
  api.get("/api/accounts/me/");
