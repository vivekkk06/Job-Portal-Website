import MainLayout from "../layouts/MainLayout";

export default function Terms() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-3xl w-full bg-white p-12 rounded-3xl shadow-xl border border-gray-100">

          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
            Terms & Conditions
          </h1>

          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">

            <p>
              By accessing or using JobDhundho, you agree to comply with and be
              bound by these Terms and Conditions. Please read them carefully.
            </p>

            <p>
              Users must use the platform responsibly. Fake job postings, spam,
              misleading content, or any misuse of the platform may result in
              suspension or permanent termination of accounts.
            </p>

            <p>
              JobDhundho is not responsible for the accuracy of job listings
              posted by companies. Users are advised to verify job details
              before applying.
            </p>

            <p>
              By continuing to use JobDhundho, you acknowledge that you have
              read, understood, and agreed to these terms.
            </p>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
