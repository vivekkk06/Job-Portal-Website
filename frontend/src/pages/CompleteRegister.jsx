import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function CompleteRegister() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/api/accounts/complete-register/", {
        email,
        ...form,
      });

      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[85vh]">
        <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Complete registration</h2>

          {error && <p className="text-red-600">{error}</p>}

          <input
            placeholder="Username"
            className="w-full border p-3 rounded mt-4"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mt-4"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-green-600 text-white py-3 rounded mt-4">
            Create Account
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
