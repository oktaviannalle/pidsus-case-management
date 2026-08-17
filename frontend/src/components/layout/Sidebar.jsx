import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Package,
  FileSpreadsheet,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Warna resmi Kejaksaan Negeri Salatiga
const KEJAKSAAN_GREEN       = "#1e7a3e";
const KEJAKSAAN_GREEN_DARK  = "#145c2d";
const KEJAKSAAN_GOLD        = "#c9a227";

function Sidebar() {
  const { user, logout } = useAuth();

  const allNavItems = [
    { path: "/dashboard", label: "Beranda",      icon: LayoutDashboard },
    { path: "/cases",     label: "Perkara",      icon: Briefcase },
    { path: "/evidences", label: "Barang Bukti", icon: Package },
    { path: "/reports",   label: "Laporan",      icon: FileSpreadsheet },
  ];

  const allowedPages = user?.allowedPages || ["/dashboard", "/cases", "/evidences", "/reports"];
  const visibleNavItems = allNavItems.filter((item) => allowedPages.includes(item.path));

  const initials = (user?.name || "U")
    .split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <aside
      style={{
        width: "240px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        flexShrink: 0,
        boxShadow: "2px 0 10px rgba(20,92,45,0.12)",
      }}
    >
      {/* ═══════════════════════════════════════════
          BAGIAN 1 — HEADER PUTIH
          (Identik dengan header website Kejari Salatiga:
           logo kiri + nama institusi kanan, bg putih)
      ═══════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: `3px solid ${KEJAKSAAN_GREEN}`,
          padding: "1rem 1.125rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flexShrink: 0,
        }}
      >
        <img
          src="/logo-kejaksaan.png"
          alt="Logo Kejaksaan RI"
          style={{ width: "54px", height: "54px", objectFit: "contain", flexShrink: 0 }}
        />
        <div>
          <div style={{ fontSize: "0.6rem", color: "#666", fontWeight: 400, lineHeight: 1.4 }}>
            Kejaksaan Republik Indonesia
          </div>
          <div
            style={{
              fontSize: "0.88rem",
              fontWeight: 800,
              color: KEJAKSAAN_GREEN,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            Kejaksaan Negeri<br />Salatiga
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          BAGIAN 2 — NAVIGATION BAR HIJAU
          (Identik dengan nav bar website Kejari Salatiga:
           background hijau, item horizontal jadi vertikal,
           active state bergaris kiri emas)
      ═══════════════════════════════════════════ */}
      <nav
        style={{
          backgroundColor: KEJAKSAAN_GREEN,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Watermark ornamen Kejaksaan (transparan) */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "160px",
            height: "160px",
            backgroundImage: "url('/logo-kejaksaan.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.05,
            pointerEvents: "none",
          }}
        />

        {/* Navigation items */}
        <ul style={{ listStyle: "none", padding: "0.375rem 0", position: "relative", zIndex: 1 }}>
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    padding: "0.8rem 1.125rem",
                    color: "#ffffff",
                    backgroundColor: isActive ? KEJAKSAAN_GREEN_DARK : "transparent",
                    borderLeft: isActive
                      ? `4px solid ${KEJAKSAAN_GOLD}`
                      : "4px solid transparent",
                    textDecoration: "none",
                    fontWeight: isActive ? 700 : 400,
                    fontSize: "0.875rem",
                    transition: "background-color 0.15s ease",
                    cursor: "pointer",
                  })}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if (el.style.backgroundColor !== KEJAKSAAN_GREEN_DARK) {
                      el.style.backgroundColor = "rgba(0,0,0,0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    if (el.style.backgroundColor !== KEJAKSAAN_GREEN_DARK) {
                      el.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={17} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.75 }} />
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {isActive && (
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: KEJAKSAAN_GOLD,
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.12)", margin: "0.25rem 0.875rem" }} />

        {/* Seksi Info box */}
        <div style={{ padding: "0.75rem 1.125rem", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "0.58rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            Seksi
          </div>
          <div
            style={{
              padding: "0.65rem 0.875rem",
              backgroundColor: "rgba(0,0,0,0.15)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
            }}
          >
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
              Tindak Pidana Khusus
            </div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>
              Wilayah Hukum Jawa Tengah
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Motto */}
        <div
          style={{
            padding: "0.5rem 1.125rem 0.75rem",
            textAlign: "center",
            fontSize: "0.58rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            position: "relative",
            zIndex: 1,
          }}
        >
          SATYA ADHI WICAKSANA
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          BAGIAN 3 — USER PROFILE (footer)
          (Hijau gelap + border emas atas)
      ═══════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: KEJAKSAAN_GREEN_DARK,
          borderTop: `2px solid ${KEJAKSAAN_GOLD}`,
          padding: "0.75rem 1.125rem",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          flexShrink: 0,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            backgroundColor: KEJAKSAAN_GOLD,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            fontWeight: 800,
            color: "#ffffff",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user?.name || "Pengguna Sistem"}
          </div>
          <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user?.role || "Admin Pidsus"}
          </div>
        </div>

        <button
          onClick={logout}
          title="Keluar dari Sistem"
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            padding: "0.3rem",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            transition: "color 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#fca5a5"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
