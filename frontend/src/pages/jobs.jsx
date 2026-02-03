import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import JobCard from "../components/JobCard";
import api from "../api/axios";

export default function Jobs() {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await api.get("/api/jobs/");
      setJobs(res.data);
    } catch (err) {
      console.log("Error fetching jobs", err);
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
      ok =
        ok &&
        job.company_name?.toLowerCase() === company.toLowerCase();
    }

    return ok;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
        <aside className="bg-white p-6 rounded-2xl shadow h-fit">
          <h2 className="font-bold text-lg mb-4">Filters</h2>
          {search && <p className="text-sm mb-2">🔍 Search: <b>{search}</b></p>}
          {company && <p className="text-sm mb-2">🏢 Company: <b>{company}</b></p>}
        </aside>

        <section className="md:col-span-3">
          {loading ? (
            <div className="bg-white p-10 rounded-2xl shadow text-center">
              Loading jobs...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow text-center">
              No jobs found.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
