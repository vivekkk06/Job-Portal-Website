import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function CompanyDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const res = await api.get("/api/applications/company/");
      const data = Array.isArray(res.data) ? res.data : res.data.results;
      setApplications(data || []);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      setUpdatingId(id);
      await api.patch(`/api/applications/${id}/update/`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log("Update error:", err);
      alert("Failed to update. Check console.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">
          Company Applications
        </h1>

        {loading && <p>Loading...</p>}

        {!loading && applications.length === 0 && (
          <p>No applications found.</p>
        )}

        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white shadow rounded-xl p-6 mb-6"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {app.full_name}
                </h2>
                <p>{app.email}</p>
                <p>{app.phone}</p>
                <p className="text-sm text-gray-500">
                  Job: {app.job_title}
                </p>
              </div>

              <span className="font-semibold">
                {app.status}
              </span>
            </div>

            {app.status === "Pending" && (
              <div className="mt-4 flex gap-4">
                <button
                  disabled={updatingId === app.id}
                  onClick={() => updateStatus(app.id, "Accepted")}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {updatingId === app.id ? "Processing..." : "Accept"}
                </button>

                <button
                  disabled={updatingId === app.id}
                  onClick={() => updateStatus(app.id, "Rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  {updatingId === app.id ? "Processing..." : "Reject"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
