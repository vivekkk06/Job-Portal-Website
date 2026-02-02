import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="dashboard-box">
        <h1>Dashboard</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}
