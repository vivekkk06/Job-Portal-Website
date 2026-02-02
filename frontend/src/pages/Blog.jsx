import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const BLOGS = [
  {
    id: 1,
    title: "How to Hire Top Developers in 2026",
    category: "Hiring",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    excerpt:
      "Discover modern hiring strategies to attract top tech talent in today’s competitive market.",
    content:
      "Hiring top developers in 2026 requires strong employer branding, remote flexibility, competitive compensation, and technical assessments that reflect real-world problems.",
    date: "Jan 25, 2026",
  },
  {
    id: 2,
    title: "Remote Work is the Future",
    category: "Remote",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    excerpt:
      "Why remote-first companies outperform traditional offices and how to adapt.",
    content:
      "Remote-first companies are outperforming traditional offices due to flexibility, global talent access, and reduced operational costs.",
    date: "Jan 18, 2026",
  },
  {
    id: 3,
    title: "Writing a Resume That Gets Interviews",
    category: "Career",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    excerpt:
      "Learn how to craft a resume that recruiters actually read.",
    content:
      "A strong resume focuses on measurable achievements, clean formatting, relevant skills, and tailored content for each job application.",
    date: "Jan 10, 2026",
  },
];

export default function Blog() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filteredBlogs =
    filter === "All"
      ? BLOGS
      : BLOGS.filter((blog) => blog.category === filter);

  function handleReadMore(blog) {
    navigate(`/blog/${blog.id}`, { state: blog });
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* HERO */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            JobDhundho Blog
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Insights on hiring, career growth, and the future of work.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex justify-center gap-4 mb-12">
          {["All", "Hiring", "Remote", "Career"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full border transition ${
                filter === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BLOG GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <span className="text-sm text-blue-600 font-medium">
                  {blog.category}
                </span>

                <h2 className="text-xl font-bold mt-2 mb-3">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  {blog.excerpt}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{blog.date}</span>
                  <button
                    onClick={() => handleReadMore(blog)}
                    className="text-blue-600 hover:underline"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
}
