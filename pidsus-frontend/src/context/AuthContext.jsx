import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const DEMO_USERS = {
  kajari: {
    key: "kajari",
    name: "Dr. Heru Prasetyo, S.H., M.H.",
    role: "Kepala Kejaksaan Negeri Salatiga (Kajari)",
    nip: "197405121998031002",
    password: "kajari123",
    avatarRole: "KAJARI",
    allowedPages: ["/dashboard", "/cases", "/evidences", "/reports"],
    canRegister: true,
  },
  admin: {
    key: "admin",
    name: "Oktavian Alle, S.H.",
    role: "Admin Seksi Pidsus",
    nip: "199710152021021001",
    password: "admin123",
    avatarRole: "ADMIN",
    allowedPages: ["/dashboard", "/cases", "/evidences"],
    canRegister: true,
  },
  penyidik: {
    key: "penyidik",
    name: "Wahyu Hidayat, S.H., M.H.",
    role: "Ketua Tim Penyidik P-16 A",
    nip: "198208152006041005",
    password: "penyidik123",
    avatarRole: "PENYIDIK",
    allowedPages: ["/dashboard", "/cases", "/evidences"],
    canRegister: false,
  },
  tamu: {
    key: "tamu",
    name: "Tamu / Demo Viewer",
    role: "Pengunjung Demo Aplikasi",
    nip: "GUEST-DEMO-VISITOR",
    password: "",
    avatarRole: "TAMU",
    allowedPages: ["/dashboard", "/cases", "/reports"],
    canRegister: false,
    isReadOnly: true,
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("pidsus_user");
    return saved ? JSON.parse(saved) : DEMO_USERS.admin;
  });

  const authenticate = (inputNip, inputPassword, roleKey) => {
    const cleanNip = (inputNip || "").replace(/\s+/g, "");
    
    // Direct role matching
    const targetUser = DEMO_USERS[roleKey];
    if (targetUser && targetUser.nip.replace(/\s+/g, "") === cleanNip && targetUser.password === inputPassword) {
      setUser(targetUser);
      localStorage.setItem("pidsus_user", JSON.stringify(targetUser));
      return { success: true };
    }

    // Check all roles if NIP & password match any credential
    const matchedUser = Object.values(DEMO_USERS).find(
      (u) => u.nip.replace(/\s+/g, "") === cleanNip && u.password === inputPassword
    );

    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem("pidsus_user", JSON.stringify(matchedUser));
      return { success: true };
    }

    return { success: false, error: "NIP atau Kata Sandi yang Anda masukkan salah. Silakan periksa kembali." };
  };

  const loginGuest = () => {
    setUser(DEMO_USERS.tamu);
    localStorage.setItem("pidsus_user", JSON.stringify(DEMO_USERS.tamu));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pidsus_user");
  };

  return (
    <AuthContext.Provider value={{ user, authenticate, loginGuest, logout, DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
