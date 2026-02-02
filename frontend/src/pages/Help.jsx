import MainLayout from "../layouts/MainLayout";

export default function Help() {
  return (
    <MainLayout>
      {/* Center wrapper */}
      <div className="flex items-center justify-center min-h-[80vh] px-4">

        {/* Card */}
        <div className="max-w-3xl w-full bg-white p-12 rounded-3xl shadow-xl border border-gray-100">

          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
            Help Center
          </h1>

          <div className="space-y-5 text-gray-600 text-lg leading-relaxed text-center">

            <p>
              Welcome to JobDhundho Help Center. We’re here to assist you with any
              questions or issues you may have while using our platform.
            </p>

            <p>
              You can explore frequently asked questions, contact our support
              team, or reach out to us directly if you need personalized help.
            </p>

            <p>
              📧 <span className="font-medium">support@jobdhundho.com</span>
            </p>

            <p>
              We aim to respond to all queries as quickly as possible.
            </p>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
