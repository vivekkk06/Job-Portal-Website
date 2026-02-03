import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const [hasCompany, setHasCompany] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(false);

  useEffect(() => {
    if (user) {
      checkCompany();
    } else {
      setHasCompany(false);
    }
  }, [user]);

  async function checkCompany() {
    try {
      setLoadingCompany(true);
      const res = await api.get("/api/companies/my-company/");
      setHasCompany(res.data.exists);
    } catch (err) {
      console.log("Company check error:", err.response?.data);
      setHasCompany(false);
    } finally {
      setLoadingCompany(false);
    }
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl text-blue-600">
        JobDhundho
      </Link>

      <div className="flex gap-5 items-center">

        {/* Always Visible */}
        <Link to="/jobs" className="hover:text-blue-600">
          Jobs
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Company Links */}
            {hasCompany && !loadingCompany && (
              <>
                <Link
                  to="/company-dashboard"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Company Applications
                </Link>

                <Link
                  to="/company-analytics"
                  className="text-blue-600 hover:underline"
                >
                  Dashboard
                </Link>
              </>
            )}

            {/* Username */}
            <span className="font-medium text-gray-700">
              {user.username}
            </span>

            {/* Logout */}
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
