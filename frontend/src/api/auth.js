import axios from "axios";

const BASE = "http://127.0.0.1:8000/api";

export const login = (data) =>
  axios.post(`${BASE}/token/`, data);

export const register = (data) =>
  axios.post(`${BASE}/accounts/register/`, data);

export const me = () =>
  axios.get(`${BASE}/accounts/me/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
