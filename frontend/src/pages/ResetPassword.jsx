import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";


export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("accounts/reset-password/", { email, otp, password });
      setSuccess("Password reset successful 🎉 Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Invalid OTP or expired code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[85vh] px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>
          <p className="text-center text-gray-500 mb-6">
            Enter code sent to <b>{email}</b>
          </p>

          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              required
              className="w-full border p-3 rounded-lg text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New password"
              required
              className="w-full border p-3 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

        </div>
      </div>
    </MainLayout>
  );
}
