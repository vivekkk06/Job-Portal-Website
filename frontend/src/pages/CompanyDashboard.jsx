import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function CompanyDashboard() {
  const [applications, setApplications] = useState([]);
  const [groupedJobs, setGroupedJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    groupApplications();
  }, [applications, filter]);

  async function fetchApplications() {
    try {
      const res = await api.get("/api/applications/company/");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];
      setApplications(data);
    } catch (err) {
      console.log("Error fetching applications:", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }

  function groupApplications() {
    const filtered =
      filter === "All"
        ? applications
        : applications.filter((app) => app.status === filter);

    const grouped = {};

    filtered.forEach((app) => {
      const jobId = app.job;

      if (!grouped[jobId]) {
        grouped[jobId] = {
          job_title: app.job_title || "Untitled Job",
          applications: [],
        };
      }

      grouped[jobId].applications.push(app);
    });

    setGroupedJobs(grouped);
  }

  async function updateStatus(id, status) {
    try {
      setUpdatingId(id);
      setMessage("");

      const res = await api.patch(
        `/api/applications/${id}/update/`,
        { status }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );

      setMessage(res.data.message || "Status updated successfully");
    } catch (err) {
      console.log("Status update error:", err);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteJob(jobId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/jobs/${jobId}/delete/`);

      setApplications((prev) =>
        prev.filter((app) => app.job !== Number(jobId))
      );

      setMessage("Job deleted successfully.");
    } catch (err) {
      console.log("Delete job error:", err);
      alert("Failed to delete job.");
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">
            Company Applications
          </h1>
          <p className="text-gray-500">
            Manage and review job applicants easily
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 shadow-sm">
            {message}
          </div>
        )}

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {["All", "Pending", "Accepted", "Rejected"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filter === type
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-16 text-lg text-gray-500">
            Loading applications...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && Object.keys(groupedJobs).length === 0 && (
          <div className="bg-gray-50 p-12 rounded-2xl text-center shadow-sm">
            <p className="text-gray-500 text-lg">
              🚀 No applications yet
            </p>
          </div>
        )}

        {/* JOB GROUPS */}
        {Object.entries(groupedJobs).map(([jobId, jobData]) => (
          <div
            key={jobId}
            className="mb-12 bg-white rounded-3xl shadow-md p-8 border"
          >
            {/* JOB HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {jobData.job_title}
              </h2>

              <button
                onClick={() => deleteJob(jobId)}
                className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition font-medium"
              >
                Delete Job
              </button>
            </div>

            {/* APPLICATION CARDS */}
            <div className="grid md:grid-cols-2 gap-6">
              {jobData.applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition border"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {app.full_name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {app.email}
                      </p>
                      <p className="text-gray-500 text-sm">
                        📞 {app.phone}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  {/* Resume */}
                  <div className="mb-4">
                    {app.resume_url ? (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        View Resume →
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No Resume Available
                      </span>
                    )}
                  </div>

                  {/* ACTION BUTTONS */}
                  {app.status === "Pending" && (
                    <div className="flex gap-3">
                      <button
                        disabled={updatingId === app.id}
                        onClick={() =>
                          updateStatus(app.id, "Accepted")
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                      >
                        {updatingId === app.id
                          ? "Updating..."
                          : "Accept"}
                      </button>

                      <button
                        disabled={updatingId === app.id}
                        onClick={() =>
                          updateStatus(app.id, "Rejected")
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                      >
                        {updatingId === app.id
                          ? "Updating..."
                          : "Reject"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
