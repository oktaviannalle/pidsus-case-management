import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, UserCheck, AlertCircle, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { authenticate, loginGuest, DEMO_USERS } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("admin");
  const [username, setUsername] = useState(DEMO_USERS.admin.nip);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showHint, setShowHint] = useState(true);

  // Sync NIP input when role dropdown changes
  useEffect(() => {
    if (DEMO_USERS[selectedRole]) {
      setUsername(DEMO_USERS[selectedRole].nip);
      setPassword(""); // Clear password so user must enter valid password
      setErrorMsg("");
    }
  }, [selectedRole, DEMO_USERS]);

  const handleCustomLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const result = authenticate(username, password, selectedRole);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrorMsg(result.error);
    }
  };

  const handleGuestLogin = () => {
    loginGuest();
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
          {/* Error Banner */}
          {errorMsg && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                fontSize: "0.825rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleCustomLogin}>
            <div className="form-group">
              <label className="form-label">Pilih Peran Akses / Jabatan</label>
              <select
                className="form-control"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{ fontWeight: 600, color: "var(--primary-dark)" }}
              >
                <option value="admin">Admin Seksi Pidsus - Akses Dashboard, Perkara & BB</option>
                <option value="kajari">Kepala Kejaksaan Negeri (Kajari) - Akses Seluruh Halaman</option>
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
                  placeholder="Masukkan NIP resmi..."
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
                  placeholder="Masukkan Kata Sandi..."
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

          {/* Credentials Info Helper for Testing / Recruiters */}
          <div
            style={{
              marginTop: "1.25rem",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "0.875rem",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Info size={14} color="var(--primary)" />
                <span>Kredensial Akses Uji Coba:</span>
              </div>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.7rem", cursor: "pointer", fontWeight: 600 }}
              >
                {showHint ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>

            {showHint && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontFamily: "var(--font-mono)", marginTop: "0.35rem" }}>
                <div>• <strong>Admin:</strong> admin123</div>
                <div>• <strong>Kajari:</strong> kajari123</div>
                <div>• <strong>Penyidik:</strong> penyidik123</div>
              </div>
            )}
          </div>

          {/* Guest Login Divider & Button */}
          <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)", textAlign: "center" }}>
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
