import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const DEMO_USERS = {
  kajari: {
    key: "kajari",
    name: "Dr. Heru Prasetyo, S.H., M.H.",
    role: "Kepala Kejaksaan Negeri Salatiga (Kajari)",
    nip: "19740512 199803 1 002",
    avatarRole: "KAJARI",
    allowedPages: ["/dashboard", "/cases", "/evidences", "/reports"],
    canRegister: true,
  },
  admin: {
    key: "admin",
    name: "Oktavian Alle, S.H.",
    role: "Admin Seksi Pidsus",
    nip: "19971015 202102 1 001",
    avatarRole: "ADMIN",
    allowedPages: ["/dashboard", "/cases", "/evidences"],
    canRegister: true,
  },
  penyidik: {
    key: "penyidik",
    name: "Wahyu Hidayat, S.H., M.H.",
    role: "Ketua Tim Penyidik P-16 A",
    nip: "19820815 200604 1 005",
    avatarRole: "PENYIDIK",
    allowedPages: ["/dashboard", "/cases", "/evidences"],
    canRegister: false,
  },
  tamu: {
    key: "tamu",
    name: "Tamu / Demo Viewer",
    role: "Pengunjung Demo Aplikasi",
    nip: "GUEST-DEMO-VISITOR",
    avatarRole: "TAMU",
    allowedPages: ["/dashboard", "/cases"],
    canRegister: false,
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("pidsus_user");
    return saved ? JSON.parse(saved) : DEMO_USERS.admin;
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
