import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function CompanyDashboard() {
  const [applications, setApplications] = useState([]);
  const [groupedJobs, setGroupedJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    groupApplications();
  }, [applications, filter]);

  async function fetchApplications() {
    try {
      const res = await api.get("/api/applications/company/");
      setApplications(res.data);
    } catch (err) {
      console.log("Error fetching applications:", err.response?.data);
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
      if (!grouped[app.job]) {
        grouped[app.job] = {
          job_title: app.job_title,
          applications: [],
        };
      }

      grouped[app.job].applications.push(app);
    });

    setGroupedJobs(grouped);
  }

  async function updateStatus(id, status) {
    try {
      await api.patch(`applications/${id}/update/`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log("Status update error:", err.response?.data);
    }
  }

  async function deleteJob(jobId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job? This will also delete related applications."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/jobs/${jobId}/delete/`);

      // Remove job + related applications instantly
      setApplications((prev) =>
        prev.filter((app) => app.job !== jobId)
      );
    } catch (err) {
      console.log("Delete job error:", err.response?.data);
    }
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-3xl font-bold mb-6">
          Company Applications
        </h1>

        {/* FILTER */}
        <div className="flex gap-3 mb-8">
          {["All", "Pending", "Accepted", "Rejected"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg border transition ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-10">
            Loading applications...
          </div>
        )}

        {!loading && Object.keys(groupedJobs).length === 0 && (
          <div className="text-center text-gray-500">
            No applications found.
          </div>
        )}

        {/* JOB GROUPS */}
        {Object.entries(groupedJobs).map(([jobId, jobData]) => (
          <div
            key={jobId}
            className="mb-10 bg-gray-50 rounded-2xl p-6 shadow"
          >

            {/* JOB HEADER */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold">
                {jobData.job_title}
              </h2>

              <button
                onClick={() => deleteJob(jobId)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Delete Job
              </button>
            </div>

            {/* APPLICATIONS */}
            {jobData.applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl shadow p-5 mb-4"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="text-lg font-semibold">
                      {app.full_name}
                    </h3>
                    <p className="text-gray-600">{app.email}</p>
                    <p className="text-gray-600">📞 {app.phone}</p>
                  </div>

                  {/* STATUS */}
                  <div>
                    {app.status === "Pending" && (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    )}
                    {app.status === "Accepted" && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Accepted
                      </span>
                    )}
                    {app.status === "Rejected" && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>

                {/* RESUME */}
                <div className="mt-3">
                  {app.resume_url ? (
                    <a
                      href={app.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-400">
                      No Resume Available
                    </span>
                  )}
                </div>

                {/* ACTIONS */}
                {app.status === "Pending" && (
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => updateStatus(app.id, "Accepted")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(app.id, "Rejected")}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
