import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, KeyRound, User, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login, DEMO_USERS } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("199710152021021001");
  const [password, setPassword] = useState("••••••••");
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleCustomLogin = (e) => {
    e.preventDefault();
    login(selectedRole);
    navigate("/dashboard");
  };

  const handleQuickLogin = (roleKey) => {
    login(roleKey);
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
        position: "relative",
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
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem auto",
              boxShadow: "0 8px 20px rgba(4, 120, 87, 0.5)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <ShieldAlert size={34} color="#fbbf24" />
          </div>

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
              <label className="form-label">NIP / ID Jaksa</label>
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

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.75rem", fontSize: "0.95rem", marginTop: "0.5rem" }}>
              <span>Masuk ke Sistem</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border-color)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", textAlign: "center", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              ⚡ Quick Access Demo Portofolio
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleQuickLogin("admin")}
                style={{ justifyContent: "flex-start", padding: "0.55rem 0.75rem" }}
              >
                <CheckCircle2 size={14} color="var(--primary)" />
                <span style={{ fontWeight: 600 }}>Login sebagai Admin Pidsus</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleQuickLogin("kajari")}
                style={{ justifyContent: "flex-start", padding: "0.55rem 0.75rem" }}
              >
                <CheckCircle2 size={14} color="var(--accent-gold)" />
                <span style={{ fontWeight: 600 }}>Login sebagai Kajari (Executive View)</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleQuickLogin("penyidik")}
                style={{ justifyContent: "flex-start", padding: "0.55rem 0.75rem" }}
              >
                <CheckCircle2 size={14} color="#3b82f6" />
                <span style={{ fontWeight: 600 }}>Login sebagai Ketua Tim Penyidik</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
