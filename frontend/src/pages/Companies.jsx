import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

const companies = [
  {
    id: 1,
    name: "Google",
    location: "Global",
    jobs: 12,
  },
  {
    id: 2,
    name: "Microsoft",
    location: "India",
    jobs: 8,
  },
  {
    id: 3,
    name: "Netflix",
    location: "Remote",
    jobs: 5,
  },
  {
    id: 4,
    name: "Spotify",
    location: "Remote",
    jobs: 6,
  },
  {
    id: 5,
    name: "Amazon",
    location: "India",
    jobs: 10,
  },
  {
    id: 6,
    name: "Meta",
    location: "Global",
    jobs: 7,
  },
];

export default function Companies() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          Top Companies
        </h1>

        <p className="text-center text-gray-600 mb-12 text-lg">
          Discover companies that are actively hiring.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              onClick={() => navigate(`/jobs?company=${company.name}`)}
              className="cursor-pointer bg-white p-8 rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold mb-4">
                {company.name[0]}
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                {company.name}
              </h3>

              <p className="text-gray-500 mt-1">{company.location}</p>

              <p className="mt-3 text-sm text-gray-600">
                {company.jobs} open positions
              </p>

              <span className="mt-4 text-blue-600 font-semibold">
                View Jobs →
              </span>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
}
