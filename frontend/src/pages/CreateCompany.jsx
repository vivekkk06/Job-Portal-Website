import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function CreateCompany() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    website: "",
    employees: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/api/companies/create/", form);

      alert("Company profile created successfully 🚀");
      navigate("/post-job");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        "Something went wrong"
      );
    }
  }

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[85vh] px-4">
        <div className="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-xl">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Create Company Profile
          </h1>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="name"
              placeholder="Company Name"
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

            <input
              name="website"
              placeholder="Website"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
            />

            <input
              name="employees"
              placeholder="Number of Employees"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
            />

            <textarea
              name="description"
              placeholder="Company Description"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              rows="4"
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
              Create Company
            </button>

          </form>

        </div>
      </div>
    </MainLayout>
  );
}
