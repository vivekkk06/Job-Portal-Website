import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import JobCard from "../components/JobCard";
import api from "../api/axios";

export default function Jobs() {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/jobs/");

      // ✅ FULL PAGINATION SUPPORT
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      setJobs(data);
    } catch (err) {
      console.log("Error fetching jobs", err);
      setError("Failed to load jobs.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  const params = new URLSearchParams(location.search);
  const search = params.get("search");
  const company = params.get("company");

  const filteredJobs = jobs.filter((job) => {
    let ok = true;

    if (search) {
      ok =
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.description?.toLowerCase().includes(search.toLowerCase());
    }

    if (company) {
      const companyName =
        job.company_name ||
        job.company?.name ||
        "";

      ok =
        ok &&
        companyName.toLowerCase() === company.toLowerCase();
    }

    return ok;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-2">
            Explore Jobs
          </h1>
          <p className="text-gray-500">
            Discover opportunities from top companies
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">

          {/* FILTER PANEL */}
          <aside className="bg-white p-6 rounded-3xl shadow-md border h-fit sticky top-24">
            <h2 className="font-semibold text-lg mb-5">
              Filters
            </h2>

            {!search && !company && (
              <p className="text-sm text-gray-400">
                No filters applied
              </p>
            )}

            {search && (
              <div className="mb-3">
                <span className="text-xs text-gray-500">
                  Search
                </span>
                <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg mt-1 text-sm font-medium">
                  🔍 {search}
                </div>
              </div>
            )}

            {company && (
              <div>
                <span className="text-xs text-gray-500">
                  Company
                </span>
                <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg mt-1 text-sm font-medium">
                  🏢 {company}
                </div>
              </div>
            )}
          </aside>

          {/* JOB LIST */}
          <section className="lg:col-span-3">

            {/* LOADING SKELETON */}
            {loading && (
              <div className="grid sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center">
                {error}
              </div>
            )}

            {/* EMPTY STATE */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="bg-gray-50 p-12 rounded-3xl text-center shadow-sm">
                <p className="text-lg text-gray-500">
                  🚀 No jobs found matching your criteria
                </p>
              </div>
            )}

            {/* JOB GRID */}
            {!loading && !error && filteredJobs.length > 0 && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

          </section>
        </div>
      </div>
    </MainLayout>
  );
}
