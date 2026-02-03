import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loadUser } = useContext(AuthContext);

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/accounts/login/", form);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      await loadUser();

      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[85vh] px-4">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-6">
            Login
          </h1>

          {error && <p className="text-red-600">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="username"
              placeholder="Email or Username"
              className="w-full border rounded px-4 py-3"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border rounded px-4 py-3"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded">
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don’t have account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
