import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, UserCheck, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login, DEMO_USERS } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("admin");
  const [username, setUsername] = useState(DEMO_USERS.admin.nip);
  const [password, setPassword] = useState("••••••••");

  // Sync NIP input when role dropdown changes
  useEffect(() => {
    if (DEMO_USERS[selectedRole]) {
      setUsername(DEMO_USERS[selectedRole].nip);
    }
  }, [selectedRole, DEMO_USERS]);

  const handleCustomLogin = (e) => {
    e.preventDefault();
    login(selectedRole);
    navigate("/dashboard");
  };

  const handleGuestLogin = () => {
    login("tamu");
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#0f172a",
        backgroundImage: "radial-gradient(circle at 50% 20%, #064e3b 0%, #0f172a 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        }}
      >
        {/* Header Branding */}
        <div
          style={{
            backgroundColor: "var(--primary-dark)",
            padding: "2.5rem 2rem 2rem 2rem",
            textAlign: "center",
            color: "#ffffff",
            position: "relative",
          }}
        >
          <img
            src="/logo-kejaksaan.png"
            alt="Logo Kejaksaan RI"
            style={{ width: "70px", height: "70px", objectFit: "contain", margin: "0 auto 1rem auto", display: "block" }}
          />

          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--accent-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            KEJAKSAAN NEGERI SALATIGA
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ffffff", marginTop: "0.25rem" }}>
            Sistem Manajemen Kasus Pidsus
          </h2>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.35rem" }}>
            Seksi Tindak Pidana Khusus • SATYA ADHI WICAKSANA
          </div>
        </div>

        {/* Login Body Form */}
        <div style={{ padding: "2rem" }}>
          <form onSubmit={handleCustomLogin}>
            <div className="form-group">
              <label className="form-label">Pilih Peran Akses / Jabatan</label>
              <select
                className="form-control"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{ fontWeight: 600, color: "var(--primary-dark)" }}
              >
                <option value="kajari">Kepala Kejaksaan Negeri (Kajari) - Akses Seluruh Halaman</option>
                <option value="admin">Admin Seksi Pidsus - Akses Dashboard, Perkara & BB</option>
                <option value="penyidik">Ketua Tim Penyidik P-16 - Akses Dashboard, Perkara & BB</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">NIP / ID Aparat Kejaksaan</label>
              <div style={{ position: "relative" }}>
                <User size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  required
                  className="form-control"
                  style={{ paddingLeft: "2.35rem" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Kata Sandi</label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="password"
                  required
                  className="form-control"
                  style={{ paddingLeft: "2.35rem" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.75rem", fontSize: "0.95rem", marginTop: "0.5rem" }}
            >
              <span>Masuk ke Sistem</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Guest Login Divider & Button */}
          <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border-color)", textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleGuestLogin}
              style={{
                width: "100%",
                padding: "0.625rem",
                borderRadius: "10px",
                borderColor: "#cbd5e1",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <UserCheck size={16} color="var(--primary)" />
              <span>Masuk sebagai Tamu (Lihat Demo Aplikasi)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
