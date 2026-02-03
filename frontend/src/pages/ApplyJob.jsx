import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    resume: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.name === "resume") {
      setForm({ ...form, resume: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("job", id);
      data.append("full_name", form.full_name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("resume", form.resume);

      await api.post("/api/applications/apply/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application submitted successfully 🚀");
      navigate("/jobs");

    } catch (err) {
      console.log("FULL ERROR RESPONSE:", err.response?.data);
      setError(JSON.stringify(err.response?.data));
    }

    setLoading(false);
  }

  return (
    <MainLayout>
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Apply for This Job
            </h2>
            <p className="text-gray-500 mt-2">
              Fill in your details and upload your resume to apply.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="full_name"
                placeholder="Enter your full name"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF / DOC / DOCX)
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="w-full cursor-pointer"
                  required
                />
                <p className="text-gray-400 text-sm mt-2">
                  Max file size recommended: 5MB
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? "Submitting..." : "Submit Application 🚀"}
            </button>

          </form>
        </div>
      </div>
    </MainLayout>
  );
}
