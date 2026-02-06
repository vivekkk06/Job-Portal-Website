import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function CompanyAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const res = await api.get("/api/applications/analytics/");
      setData(res.data);
    } catch (err) {
      console.log("Analytics error:", err);
      setData({
        total_jobs: 0,
        total_applications: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse text-lg font-semibold text-gray-600">
            Loading analytics...
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh] text-red-600 font-semibold">
          Failed to load analytics.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-2">
            Company Analytics
          </h1>
          <p className="text-gray-500 text-lg">
            Overview of your jobs and applications
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <Card
            title="Total Jobs"
            value={data.total_jobs || 0}
            icon="💼"
            bg="bg-blue-50"
            text="text-blue-600"
          />

          <Card
            title="Total Applications"
            value={data.total_applications || 0}
            icon="📄"
            bg="bg-purple-50"
            text="text-purple-600"
          />

          <Card
            title="Pending"
            value={data.pending || 0}
            icon="⏳"
            bg="bg-yellow-50"
            text="text-yellow-600"
          />

          <Card
            title="Accepted"
            value={data.accepted || 0}
            icon="✅"
            bg="bg-green-50"
            text="text-green-600"
          />

          <Card
            title="Rejected"
            value={data.rejected || 0}
            icon="❌"
            bg="bg-red-50"
            text="text-red-600"
          />

        </div>
      </div>
    </MainLayout>
  );
}

function Card({ title, value, icon, bg, text }) {
  return (
    <div className={`p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 ${bg}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-600">
          {title}
        </h2>
        <span className="text-2xl">{icon}</span>
      </div>

      <p className={`text-4xl font-extrabold ${text}`}>
        {value}
      </p>
    </div>
  );
}
