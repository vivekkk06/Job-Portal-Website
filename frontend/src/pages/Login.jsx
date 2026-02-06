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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ NEW

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/accounts/login/", form);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      await loadUser();

      setSuccess(true); // ✅ trigger animation

      // Smooth delay before redirect
      setTimeout(() => {
        navigate("/");
      }, 900);

    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[85vh] px-4">

        <div
          className={`w-full max-w-md bg-white p-10 rounded-3xl shadow-xl transition-all duration-700
          ${success ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Login
          </h1>

          {error && (
            <p className="text-red-600 mb-3 text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 mb-3 text-center font-medium">
              Login successful! Redirecting...
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="username"
              placeholder="Email or Username"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3 rounded text-white font-medium transition flex items-center justify-center gap-2
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : success ? (
                "Success ✓"
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center mt-4">
            Don’t have account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
