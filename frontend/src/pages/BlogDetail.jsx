import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function BlogDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  if (!blog) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Blog Not Found</h2>
          <button
            onClick={() => navigate("/blog")}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Blog
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-2xl mb-8"
        />

        <span className="text-blue-600 font-medium">
          {blog.category}
        </span>

        <h1 className="text-4xl font-bold mt-3 mb-4">
          {blog.title}
        </h1>

        <p className="text-gray-500 mb-6">
          {blog.date}
        </p>

        <p className="text-gray-700 leading-8 text-lg">
          {blog.content}
        </p>

      </div>
    </MainLayout>
  );
}
