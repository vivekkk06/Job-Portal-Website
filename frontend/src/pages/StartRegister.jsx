import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function StartRegister() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("accounts/start-register/", { email });

      navigate("/verify-email", { state: { email } });
    } catch (err) {
      setError("Failed to send OTP");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[85vh]">
        <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Enter your email</h2>

          {error && <p className="text-red-600">{error}</p>}

          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border p-3 rounded mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded mt-4">
            Send OTP
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
