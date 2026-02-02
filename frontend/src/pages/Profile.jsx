import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="p-10">Not logged in</p>;

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

        <div className="space-y-3 text-lg">
          <p><b>ID:</b> {user.id}</p>
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>
      </div>
    </div>
  );
}
