import api from "./axios";

// LOGIN
export const login = (data) =>
  api.post("accounts/login/", data);

// START REGISTER
export const register = (data) =>
  api.post("accounts/start-register/", data);

// RESEND OTP
export const resendOTP = (data) =>
  api.post("accounts/resend-otp/", data);

// VERIFY EMAIL
export const verifyEmail = (data) =>
  api.post("accounts/verify-email/", data);

// COMPLETE REGISTER
export const completeRegister = (data) =>
  api.post("accounts/complete-register/", data);

// GET CURRENT USER
export const me = () =>
  api.get("accounts/me/");
