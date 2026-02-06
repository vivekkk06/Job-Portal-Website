import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";

export default function Profile() {
  const { user, loadUser } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-lg font-medium text-gray-600">
            Not logged in
          </p>
        </div>
      </MainLayout>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      await api.patch("/api/accounts/me/", formData);

      await loadUser();

      setEditMode(false);
      setMessage("Profile updated successfully 🎉");
    } catch (err) {
      console.log(err);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-20 px-4">

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-8 p-4 rounded-xl bg-green-100 text-green-700 text-center shadow-sm">
            {message}
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-lg border rounded-3xl shadow-2xl p-10 transition hover:shadow-3xl">

          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">

            <div className="w-24 h-24 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">

              {editMode ? (
                <>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border px-4 py-3 rounded-xl mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold">
                    {user.username}
                  </h2>
                  <p className="text-gray-500">
                    {user.email}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* PROFILE DETAILS */}
          {!editMode && (
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">

              <InfoCard label="User ID" value={user.id} />

              {user.role && (
                <InfoCard
                  label="Role"
                  value={user.role}
                />
              )}

              {user.date_joined && (
                <InfoCard
                  label="Joined"
                  value={new Date(user.date_joined).toLocaleDateString()}
                />
              )}
            </div>
          )}

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4 justify-center">

            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-xl transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition"
              >
                Edit Profile
              </button>
            )}
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

/* Small reusable card */
function InfoCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
