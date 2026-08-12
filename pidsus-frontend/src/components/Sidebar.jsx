import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Package,
  FileSpreadsheet,
  ShieldAlert,
  UserCheck,
  Building2,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Dashboard Analitik", icon: LayoutDashboard },
    { path: "/cases", label: "Manajemen Perkara", icon: Briefcase },
    { path: "/evidences", label: "Gudang Barang Bukti", icon: Package },
    { path: "/reports", label: "Laporan & Rekapitulasi", icon: FileSpreadsheet },
  ];

  return (
    <aside
      style={{
        width: "280px",
        backgroundColor: "var(--bg-sidebar)",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        borderRight: "1px solid var(--border-dark)",
        flexShrink: 0,
      }}
    >
      {/* Institution Header */}
      <div
        style={{
          padding: "1.5rem 1.25rem",
          borderBottom: "1px solid var(--border-dark)",
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
        }}
      >
        <img
          src="/logo-kejaksaan.png"
          alt="Logo Kejaksaan RI"
          style={{ width: "44px", height: "44px", objectFit: "contain", flexShrink: 0 }}
        />
        <div>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--accent-gold)",
              textTransform: "uppercase",
            }}
          >
            Kejaksaan RI
          </div>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            Kejari Salatiga
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "2px",
            }}
          >
            Seksi Pidsus
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: "1.25rem 0.875rem", flex: 1 }}>
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0 0.75rem 0.5rem 0.75rem",
          }}
        >
          Menu Utama
        </div>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                    textDecoration: "none",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.875rem",
                    transition: "all 0.15s ease",
                  })}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div
          style={{
            marginTop: "2rem",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0 0.75rem 0.5rem 0.75rem",
          }}
        >
          Sistem & Wilayah
        </div>
        <div
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "8px",
            fontSize: "0.75rem",
            color: "#cbd5e1",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Building2 size={14} color="#34d399" />
          <span>Wilayah Hukum Jawa Tengah</span>
        </div>
      </nav>

      {/* User Profile Card & Logout */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid var(--border-dark)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", overflow: "hidden" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "var(--primary-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--primary-light)",
              flexShrink: 0,
            }}
          >
            <UserCheck size={20} color="#34d399" />
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: "0.825rem",
                fontWeight: 700,
                color: "#ffffff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.name || "Oktavian Alle, S.H."}
            </div>
            <div
              style={{
                fontSize: "0.675rem",
                color: "var(--accent-gold)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.role || "Admin Pidsus"}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          title="Keluar dari Sistem"
          style={{
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            padding: "0.35rem",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
