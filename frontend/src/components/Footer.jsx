import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-50 bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white">JobDhundho</h2>
          <p className="mt-3 text-sm">
            Find your dream job and build your career with top companies.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/jobs" className="hover:text-white">Find Jobs</Link></li>
            <li><Link to="/companies" className="hover:text-white">Companies</Link></li>
            <li><Link to="/post-job" className="hover:text-white">Post a Job</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/Blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} JobDhundho. All rights reserved.
      </div>
    </footer>
  );
}
