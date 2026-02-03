import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";


export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/api/accounts/forgot-password/", { email });
      setSuccess("OTP sent to your email 📩");
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } catch {
      setError("User not found with this email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[85vh] px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your email to receive reset code
          </p>

          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border p-3 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg">
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>

          <p className="text-center text-sm mt-5">
            Remember password? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
          </p>

        </div>
      </div>
    </MainLayout>
  );
}
