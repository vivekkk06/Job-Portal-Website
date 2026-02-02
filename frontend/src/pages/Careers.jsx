import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, search, jobType]);

  async function fetchJobs() {
    try {
      const res = await api.get("jobs/");
      setJobs(res.data);
    } catch (err) {
      console.log("Error fetching jobs:", err.response?.data);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let data = jobs;

    if (search) {
      data = data.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (jobType !== "All") {
      data = data.filter(job => job.job_type === jobType);
    }

    setFilteredJobs(data);
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-14 px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Explore Career Opportunities
          </h1>
          <p className="text-gray-600">
            Find the perfect job that matches your skills.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border p-3 rounded-xl"
          />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="All">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-10">
            Loading jobs...
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center text-gray-500">
            No jobs found.
          </div>
        )}

        {/* JOB CARDS */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {job.title}
              </h2>

              <p className="text-gray-600">
                {job.company_name}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                📍 {job.location}
              </p>

              <p className="text-gray-500 text-sm">
                🕒 {job.job_type}
              </p>

              <div className="mt-5">
                <Link
                  to={`/jobs/${job.id}`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
}
