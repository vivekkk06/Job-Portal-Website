import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { resendOTP, verifyEmail } from "../api/auth";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await verifyEmail({ email, otp });

      setSuccess("Email verified successfully 🎉");

      setTimeout(() => {
        navigate("/complete-register", { state: { email } });
      }, 1500);

    } catch (err) {
      setError("Invalid OTP");
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");

    try {
      await resendOTP({ email });
      setSuccess("New OTP sent 📩");
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[85vh] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

          <h2 className="text-3xl font-bold mb-2">Verify your email</h2>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <form onSubmit={submit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              maxLength="6"
              className="w-full text-center text-2xl border p-3 rounded-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Verify Email
            </button>
          </form>

          <p className="mt-4 text-sm">
            Didn’t receive code?{" "}
            <button onClick={handleResend} className="text-blue-600">
              Resend OTP
            </button>
          </p>

          <Link to="/register" className="text-blue-600 text-sm">
            Register again
          </Link>

        </div>
      </div>
    </MainLayout>
  );
}
