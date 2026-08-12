import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Package,
  FileSpreadsheet,
  ShieldAlert,
  UserCheck,
  Building2,
} from "lucide-react";

function Sidebar() {
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
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            backgroundColor: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(4, 120, 87, 0.4)",
            flexShrink: 0,
          }}
        >
          <ShieldAlert size={26} color="#fbbf24" />
        </div>
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

      {/* User Profile Card */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid var(--border-dark)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
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
          }}
        >
          <UserCheck size={20} color="#34d399" />
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#ffffff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Oktavian Alle, S.H.
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "var(--accent-gold)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Admin Pidsus / Jaksa Utama
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
