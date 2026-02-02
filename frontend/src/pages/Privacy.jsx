import MainLayout from "../layouts/MainLayout";

export default function Privacy() {
  return (
    <MainLayout>
      {/* Center wrapper */}
      <div className="flex items-center justify-center min-h-[80vh] px-4">

        {/* Card */}
        <div className="max-w-3xl w-full bg-white p-12 rounded-3xl shadow-xl border border-gray-100">

          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
            Privacy Policy
          </h1>

          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">

            <p>
              JobDhundho respects your privacy. We are committed to protecting
              your personal information and your right to privacy.
            </p>

            <p>
              We only collect data that is necessary to provide job search,
              application, and recruitment services. We do not sell, rent,
              or share your personal information with third parties.
            </p>

            <p>
              All user data is stored securely, and appropriate technical and
              organizational measures are taken to protect it from unauthorized
              access, alteration, or misuse.
            </p>

            <p>
              By using JobDhundho, you agree to this Privacy Policy. If you have
              any questions about how we handle your data, please contact our
              support team.
            </p>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
