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

      // ✅ SAFE PAGINATION HANDLING
      if (Array.isArray(res.data)) {
        setApplications(res.data);
      } else {
        setApplications(res.data.results || []);
      }
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
      await api.patch(`/api/applications/${id}/update/`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log("Status update error:", err);
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
    } catch (err) {
      console.log("Delete job error:", err);
    }
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">
          Company Applications
        </h1>

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

        {loading && <div>Loading...</div>}

        {!loading &&
          Object.keys(groupedJobs).map(([jobId, jobData]) => (
            <div key={jobId} className="mb-10 bg-gray-50 p-6 shadow">
              <h2 className="text-xl font-bold mb-4">
                {jobData.job_title}
              </h2>

              {jobData.applications.map((app) => (
                <div key={app.id} className="bg-white p-4 mb-4 shadow">
                  <h3>{app.full_name}</h3>
                  <p>{app.email}</p>
                  <p>{app.phone}</p>

                  {app.status === "Pending" && (
                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={() =>
                          updateStatus(app.id, "Accepted")
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app.id, "Rejected")
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
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
