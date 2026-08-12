import { Search, Bell, Database, Server, Shield } from "lucide-react";

function Navbar({ isMockMode = true }) {
  return (
    <header
      style={{
        height: "70px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
      }}
    >
      {/* Search Input */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "400px" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            placeholder="Cari Nomor Perkara, Nama Tersangka, atau Barang Bukti..."
            className="form-control"
            style={{
              paddingLeft: "2.35rem",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              fontSize: "0.825rem",
            }}
          />
        </div>
      </div>

      {/* Right Header Actions & Status */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        {/* Backend API Status Indicator */}
        <div
          title={
            isMockMode
              ? "Backend API offline, berjalan menggunakan data portofolio Pidsus."
              : "Terhubung langsung dengan ASP.NET Core Web API & PostgreSQL."
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 600,
            backgroundColor: isMockMode ? "#fffbeb" : "#ecfdf5",
            color: isMockMode ? "#b45309" : "#047857",
            border: `1px solid ${isMockMode ? "#fde68a" : "#a7f3d0"}`,
          }}
        >
          {isMockMode ? <Database size={14} /> : <Server size={14} />}
          <span>{isMockMode ? "Portofolio Demo Mode" : "PostgreSQL API Live"}</span>
        </div>

        {/* Institutional Motto */}
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--primary-dark)",
            padding: "0.35rem 0.75rem",
            backgroundColor: "#f1f5f9",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Shield size={14} color="var(--accent-gold)" />
          <span>SATYA ADHI WICAKSANA</span>
        </div>

        {/* Notifications Icon */}
        <button
          className="btn-icon"
          style={{ position: "relative" }}
          title="Notifikasi Sistem"
        >
          <Bell size={20} />
          <span
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              width: "8px",
              height: "8px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
            }}
          />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
