import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    job_type: "",
    salary: "",
    description: "",
    requirements: "",
  });

  const [error, setError] = useState("");
  const [checkingCompany, setCheckingCompany] = useState(true);

  // 🔥 CHECK IF COMPANY EXISTS
  useEffect(() => {
    checkCompany();
  }, []);

  async function checkCompany() {
    try {
      const res = await api.get("companies/my-company/");
      if (!res.data.exists) {
        navigate("/create-company");
      }
    } catch {
      navigate("/login");
    } finally {
      setCheckingCompany(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("jobs/", form);
      alert("Job posted successfully 🚀");
      navigate("/jobs");
    } catch (err) {
      setError("Failed to post job");
    }
  }

  if (checkingCompany) {
    return (
      <MainLayout>
        <div className="text-center py-20">Checking company profile...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[85vh] px-4">
        <div className="bg-white w-full max-w-3xl p-10 rounded-3xl shadow-xl">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Post a Job
          </h1>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="title"
              placeholder="Job Title"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              required
            />

            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              required
            />

            <select
              name="job_type"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              required
            >
              <option value="">Select type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>

            <input
              name="salary"
              placeholder="Salary"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              rows="4"
              required
            />

            <textarea
              name="requirements"
              placeholder="Requirements"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              rows="3"
            />

            <div className="flex gap-4">

              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
              >
                Post Job
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-300 py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      </div>
    </MainLayout>
  );
}
