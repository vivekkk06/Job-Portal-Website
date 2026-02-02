import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function ApplicantDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("applications/my/")
      .then(res => setApplications(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold">Applicant Dashboard</h1>
          <p className="text-gray-500">Track your job applications</p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Total Applications" value={applications.length} />
          <StatCard title="Pending" value={applications.filter(a => a.status === "PENDING").length} />
          <StatCard title="Accepted" value={applications.filter(a => a.status === "ACCEPTED").length} />
        </div>

        {/* APPLICATION LIST */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">My Applications</h2>

          {loading && <p>Loading...</p>}

          {!loading && applications.length === 0 && (
            <p className="text-gray-500">You have not applied to any jobs yet.</p>
          )}

          <div className="space-y-4">
            {applications.map(app => (
              <div
                key={app.id}
                className="border rounded-xl p-4 flex justify-between items-center hover:shadow"
              >
                <div>
                  <h3 className="font-semibold">{app.job.title}</h3>
                  <p className="text-sm text-gray-500">{app.job.company_name}</p>
                  <p className="text-xs text-gray-400">Applied on {new Date(app.applied_at).toDateString()}</p>
                </div>

                <span className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${app.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                  ${app.status === "ACCEPTED" && "bg-green-100 text-green-700"}
                  ${app.status === "REJECTED" && "bg-red-100 text-red-700"}
                `}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex flex-col gap-2">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-extrabold">{value}</h2>
    </div>
  );
}
