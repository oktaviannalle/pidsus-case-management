import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const DEMO_USERS = {
  admin: {
    name: "Oktavian Alle, S.H.",
    role: "Admin Pidsus / Jaksa Utama Pratama",
    nip: "19971015 202102 1 001",
    avatarRole: "ADMIN",
  },
  kajari: {
    name: "Dr. Heru Prasetyo, S.H., M.H.",
    role: "Kepala Kejaksaan Negeri Salatiga",
    nip: "19740512 199803 1 002",
    avatarRole: "KAJARI",
  },
  penyidik: {
    name: "Wahyu Hidayat, S.H., M.H.",
    role: "Ketua Tim Penyidik P-16 A",
    nip: "19820815 200604 1 005",
    avatarRole: "PENYIDIK",
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("pidsus_user");
    return saved ? JSON.parse(saved) : DEMO_USERS.admin; // Default demo user logged in
  });

  const login = (roleKey = "admin") => {
    const selectedUser = DEMO_USERS[roleKey] || DEMO_USERS.admin;
    setUser(selectedUser);
    localStorage.setItem("pidsus_user", JSON.stringify(selectedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pidsus_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
