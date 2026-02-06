import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getJob } from "../api/jobs";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getJob(id)
      .then((res) => {
        setJob(res.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load job details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ NEW: Apply Button Logic
  const handleApplyClick = () => {
    const token = localStorage.getItem("access");

    // If user NOT logged in
    if (!token) {
      const confirmLogin = window.confirm(
        "You must login first to apply for this job.\n\nDo you want to go to the login page?"
      );

      if (confirmLogin) {
        navigate("/login");
      }

      return;
    }

    // If logged in → go to apply page
    navigate(`/apply/${job.id}`);
  };

  return (
    <MainLayout>
      {loading && (
        <div className="text-center py-20 text-lg font-medium">
          Loading job details...
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-600 font-medium">
          {error}
        </div>
      )}

      {job && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-gray-600 mt-1">
                {job.company_name || job.company} • {job.location}
              </p>
            </div>

            {/* ✅ UPDATED BUTTON */}
            <button
              onClick={handleApplyClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>

          {job.job_type && (
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mt-4 inline-block">
              {job.job_type}
            </span>
          )}

          {job.salary && (
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mt-4 ml-3 inline-block">
              ₹ {job.salary}
            </span>
          )}

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div className="mt-10">
            <Link to="/jobs" className="text-blue-600 font-medium">
              ← Back to jobs
            </Link>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
