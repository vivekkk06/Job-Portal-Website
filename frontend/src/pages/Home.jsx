import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import JobCard from "../components/JobCard";
import api from "../api/axios";

const companies = ["Google", "Spotify", "Slack", "Netflix", "Figma"];

const heroImages = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72",
];

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const navigate = useNavigate();

  // 🔥 Fetch uploaded jobs (Pagination Safe)
  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await api.get("/api/jobs/");

      // ✅ FIX FOR PAGINATION
      const jobs = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      if (jobs.length <= 3) {
        setFeaturedJobs(jobs);
      } else {
        const shuffled = [...jobs].sort(() => 0.5 - Math.random());
        setFeaturedJobs(shuffled.slice(0, 3));
      }
    } catch (err) {
      console.log("Jobs fetch error:", err);
      setFeaturedJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  }

  // 🔄 Auto image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage(
      currentImage === heroImages.length - 1 ? 0 : currentImage + 1
    );
  };

  const prevImage = () => {
    setCurrentImage(
      currentImage === 0 ? heroImages.length - 1 : currentImage - 1
    );
  };

  // 🔍 Search
  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/jobs?search=${keyword}`);
  };

  // 🏢 Company filter
  const handleCompanyClick = (company) => {
    navigate(`/jobs?company=${company}`);
  };

  return (
    <MainLayout>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Find Your Perfect <br />
            <span className="text-blue-600">Dream Job</span>
          </h1>

          <p className="mt-5 text-gray-600 max-w-md">
            Search thousands of jobs from top companies and start your career today.
          </p>

          <div className="mt-8 flex bg-white shadow-xl rounded-xl overflow-hidden max-w-md">
            <input
              className="flex-1 px-4 py-3 outline-none"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 font-semibold hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* IMAGE SLIDER */}
        <div className="relative">
          <img
            src={heroImages[currentImage]}
            alt="hero"
            className="w-full rounded-3xl shadow-xl transition duration-700 object-cover h-[420px]"
          />

          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            ◀
          </button>

          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            ▶
          </button>
        </div>
      </section>

      {/* TRUSTED COMPANIES */}
      <section className="bg-white py-12 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-semibold text-gray-500">
            Trusted by 1000+ companies
          </p>

          <div className="flex justify-center gap-10 mt-6 opacity-80 flex-wrap">
            {companies.map((c) => (
              <button
                key={c}
                onClick={() => handleCompanyClick(c)}
                className="hover:text-blue-600 hover:underline font-medium transition"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">
          Featured Jobs
        </h2>

        {loadingJobs ? (
          <div className="text-center text-gray-500">
            Loading jobs...
          </div>
        ) : featuredJobs.length === 0 ? (
          <div className="bg-gray-50 p-10 rounded-2xl text-center shadow">
            <p className="text-gray-500 text-lg">
              🚀 No jobs uploaded yet.
            </p>
            <p className="text-gray-400 mt-2">
              Be the first to post a job!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

    </MainLayout>
  );
}
