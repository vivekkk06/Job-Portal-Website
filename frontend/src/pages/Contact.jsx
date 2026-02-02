import MainLayout from "../layouts/MainLayout";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <MainLayout>
      {/* Full screen center wrapper */}
      <div className="flex items-center justify-center min-h-[85vh] px-4">

        {/* Card */}
        <div className="max-w-3xl w-full bg-white p-12 rounded-3xl shadow-xl text-center border border-gray-100">

          <h1 className="text-4xl font-extrabold mb-3 text-gray-800">
            Contact Us
          </h1>

          <p className="text-gray-500 mb-10 text-lg">
            We’d love to hear from you. Reach out to us anytime.
          </p>

          {/* Contact details */}
          <div className="space-y-7 text-gray-700 text-lg">

            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-full bg-blue-50">
                <Mail className="text-blue-600" />
              </div>
              <span className="font-medium">support@jobdhundho.com</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-full bg-green-50">
                <Phone className="text-green-600" />
              </div>
              <span className="font-medium">+91 90000 00000</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-full bg-purple-50">
                <MapPin className="text-purple-600" />
              </div>
              <span className="font-medium">India</span>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
