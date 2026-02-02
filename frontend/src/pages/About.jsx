import MainLayout from "../layouts/MainLayout";

export default function About() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">About JobDhundho</h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            JobDhundho is a modern job portal built to connect job seekers
            with top companies. Our mission is to simplify hiring and job searching,
            helping people find meaningful careers and companies find great talent.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
