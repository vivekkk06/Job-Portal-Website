import api from "./axios";

// LOGIN
export const login = (data) =>
  api.post("/api/accounts/login/", data);

// START REGISTER
export const register = (data) =>
  api.post("/api/accounts/start-register/", data);

// RESEND OTP  🔥 ADD THIS
export const resendOTP = (data) =>
  api.post("/api/accounts/resend-otp/", data);
// VERIFY EMAIL (if used)
export const verifyEmail = (data) =>
  api.post("/api/accounts/verify-email/", data);

// COMPLETE REGISTER (if used)
export const completeRegister = (data) =>
  api.post("/api/accounts/complete-register/", data);

// GET CURRENT USER
export const me = () =>
  api.get("/api/accounts/me/");
