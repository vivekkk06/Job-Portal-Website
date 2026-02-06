import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function Profile() {
  const { user, loadUser } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Not logged in
        </p>
      </div>
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

      await loadUser(); // refresh context

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
    <div className="min-h-screen bg-slate-50 flex justify-center items-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg transition hover:shadow-2xl">

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-6 p-3 rounded-lg bg-green-100 text-green-700 text-center">
            {message}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          {editMode ? (
            <>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-4 w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-3 w-full border px-3 py-2 rounded-lg"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mt-4">
                {user.username}
              </h2>
              <p className="text-gray-500 text-sm">
                {user.email}
              </p>
            </>
          )}
        </div>

        {/* Profile Details */}
        {!editMode && (
          <div className="space-y-4 text-gray-700 text-lg">

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">User ID</span>
              <span>{user.id}</span>
            </div>

            {user.role && (
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Role</span>
                <span className="capitalize">{user.role}</span>
              </div>
            )}

            {user.date_joined && (
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Joined</span>
                <span>
                  {new Date(user.date_joined).toLocaleDateString()}
                </span>
              </div>
            )}

          </div>
        )}

        {/* BUTTONS */}
        <div className="mt-8 text-center flex justify-center gap-4">

          {editMode ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
            >
              Edit Profile
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
