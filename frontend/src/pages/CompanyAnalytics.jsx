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
        <div className="text-center py-20 text-lg">
          Loading analytics...
        </div>
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-red-600">
          Failed to load analytics.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-10">
          Company Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Total Jobs" value={data.total_jobs || 0} />
          <Card title="Total Applications" value={data.total_applications || 0} />
          <Card title="Pending" value={data.pending || 0} />
          <Card title="Accepted" value={data.accepted || 0} />
          <Card title="Rejected" value={data.rejected || 0} />
        </div>
      </div>
    </MainLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-medium text-gray-600">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
