import { createContext, useEffect, useState } from "react";
import { me } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const res = await me();
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };


  useEffect(() => {
    if (localStorage.getItem("access")) {
      loadUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
