import { Search, Bell, Shield, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const KEJAKSAAN_GREEN = "#1e7a3e";
const KEJAKSAAN_GOLD  = "#c9a227";

function Navbar() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const initials = (user?.name || "U")
    .split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <header
      style={{
        height: "60px",
        backgroundColor: "#ffffff",
        borderBottom: "2px solid #cdddd4",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 4px rgba(20,92,45,0.06)",
        gap: "1rem",
      }}
    >
      {/* LEFT: Date */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexShrink: 0 }}>
        <Calendar size={12} color={KEJAKSAAN_GREEN} />
        <span style={{ fontSize: "0.7rem", fontWeight: 600, color: KEJAKSAAN_GREEN, whiteSpace: "nowrap" }}>
          {today}
        </span>
      </div>

      {/* CENTER: Search */}
      <div style={{ flex: 1, maxWidth: "380px", position: "relative" }}>
        <Search size={13} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#7fa888" }} />
        <input
          type="text"
          placeholder="Cari No. Perkara, Tersangka, atau Barang Bukti..."
          style={{
            width: "100%",
            padding: "0.45rem 0.875rem 0.45rem 2rem",
            backgroundColor: "#f3f6f4",
            border: "1.5px solid #cdddd4",
            borderRadius: "5px",
            fontSize: "0.775rem",
            fontFamily: "var(--font-sans)",
            color: "#1a2e1a",
            outline: "none",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.borderColor = KEJAKSAAN_GREEN;
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = "#f3f6f4";
            e.target.style.borderColor = "#cdddd4";
          }}
        />
      </div>

      {/* RIGHT: Motto + Bell + User */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
        {/* Motto badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.28rem 0.65rem", backgroundColor: "#eaf4ee", border: "1px solid #cdddd4", borderRadius: "4px" }}>
          <Shield size={10} color={KEJAKSAAN_GOLD} />
          <span style={{ fontSize: "0.62rem", fontWeight: 700, color: KEJAKSAAN_GREEN, letterSpacing: "0.05em" }}>
            SATYA ADHI WICAKSANA
          </span>
        </div>

        {/* Bell */}
        <button className="btn-icon" style={{ position: "relative", width: "32px", height: "32px" }} title="Notifikasi">
          <Bell size={16} />
          <span style={{ position: "absolute", top: "6px", right: "6px", width: "6px", height: "6px", backgroundColor: "#dc2626", borderRadius: "50%", border: "1.5px solid #fff" }} />
        </button>

        <div style={{ width: "1px", height: "22px", backgroundColor: "#cdddd4" }} />

        {/* User chip */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", padding: "0.28rem 0.6rem 0.28rem 0.3rem", borderRadius: "6px", border: "1px solid #cdddd4", backgroundColor: "#fafcfa", cursor: "default" }}>
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "5px",
              backgroundColor: KEJAKSAAN_GREEN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.62rem",
              fontWeight: 800,
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1a2e1a", lineHeight: 1.2, whiteSpace: "nowrap" }}>
              {user?.name || "Pengguna"}
            </div>
            <div style={{ fontSize: "0.6rem", color: "#7fa888", lineHeight: 1.2, whiteSpace: "nowrap" }}>
              {user?.role || "Admin"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
