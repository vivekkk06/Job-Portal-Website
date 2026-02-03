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
      console.log("Analytics error:", err.response?.data);
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

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-3xl font-bold mb-10">
          Company Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <Card title="Total Jobs" value={data.total_jobs} color="blue" />
          <Card title="Total Applications" value={data.total_applications} color="purple" />
          <Card title="Pending" value={data.pending} color="yellow" />
          <Card title="Accepted" value={data.accepted} color="green" />
          <Card title="Rejected" value={data.rejected} color="red" />

        </div>
      </div>
    </MainLayout>
  );
}

function Card({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700"
  };

  return (
    <div className={`p-6 rounded-2xl shadow-md ${colors[color]}`}>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
