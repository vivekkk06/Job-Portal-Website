import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5">
      <h3 className="font-semibold text-lg">{job.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{job.company}</p>
      <p className="text-sm text-gray-600 mt-1">{job.location}</p>

      <Link
        to={`/jobs/${job.id}`}
        className="inline-block mt-4 text-blue-600 font-semibold"
      >
        View details →
      </Link>
    </div>
  );
}
