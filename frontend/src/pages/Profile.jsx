import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Not logged in
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg transition hover:shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-3xl font-bold mt-4">
            {user.username}
          </h2>

          <p className="text-gray-500 text-sm">
            {user.email}
          </p>
        </div>

        {/* Profile Details */}
        <div className="space-y-4 text-gray-700 text-lg">

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">User ID</span>
            <span>{user.id}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Username</span>
            <span>{user.username}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email</span>
            <span>{user.email}</span>
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

        {/* Future Upgrade Section */}
        <div className="mt-8 text-center">
          <button
            disabled
            className="bg-gray-200 text-gray-500 px-6 py-2 rounded-xl cursor-not-allowed"
          >
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
