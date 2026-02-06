import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/StartRegister";
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";
import Profile from "./pages/Profile";
import Jobs from "./pages/jobs";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Pricing from "./pages/Pricing";
import PostJob from "./pages/PostJob";
import Companies from "./pages/Companies";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StartRegister from "./pages/StartRegister";
import CompleteRegister from "./pages/CompleteRegister";
import CreateCompany from "./pages/CreateCompany";
import ApplyJob from "./pages/ApplyJob";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyAnalytics from "./pages/CompanyAnalytics";
import Checkout from "./pages/Checkout";
import BlogDetail from "./pages/BlogDetail";

export default function App() {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<StartRegister />} />
      <Route path="/start-register" element={<StartRegister />} />
      <Route path="/complete-register" element={<CompleteRegister />} />

      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<Help />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ===== PROTECTED ROUTES ===== */}

      {/* General Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Applicant Dashboard */}
      <Route
        path="/applicant/dashboard"
        element={
          <ProtectedRoute>
            <ApplicantDashboard />
          </ProtectedRoute>
        }
      />

      {/* Apply Job */}
      <Route
        path="/apply/:id"
        element={
          <ProtectedRoute>
            <ApplyJob />
          </ProtectedRoute>
        }
      />

      {/* Company Routes */}
      <Route
        path="/post-job"
        element={
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-company"
        element={
          <ProtectedRoute>
            <CreateCompany />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company-dashboard"
        element={
          <ProtectedRoute>
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company-analytics"
        element={
          <ProtectedRoute>
            <CompanyAnalytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* ===== FALLBACK ===== */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
