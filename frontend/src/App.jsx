import { Routes, Route } from "react-router-dom";

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
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<StartRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<Help />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
      <Route
        path="/applicant/dashboard"
        element={
          <ProtectedRoute>
            <ApplicantDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/start-register" element={<StartRegister />} />
      <Route path="/complete-register" element={<CompleteRegister />} />
      <Route path="/create-company" element={<CreateCompany />} />
      <Route path="/apply/:id" element={<ApplyJob />} />
      <Route path="/company-dashboard" element={<CompanyDashboard />} />
      <Route path="/company-analytics" element={<CompanyAnalytics />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />



    </Routes>
  );
}
