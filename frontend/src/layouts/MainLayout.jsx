import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <Navbar />

      <main className="flex-1 relative z-0">
        {children}
      </main>

      <Footer />
    </div>
  );
}
