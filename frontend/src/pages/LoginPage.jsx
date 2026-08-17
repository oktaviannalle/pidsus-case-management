import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, UserCheck, AlertCircle, Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { authenticate, loginGuest, DEMO_USERS } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("admin");
  const [username, setUsername] = useState(DEMO_USERS.admin.nip);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (DEMO_USERS[selectedRole]) {
      setUsername(DEMO_USERS[selectedRole].nip);
      setPassword("");
      setErrorMsg("");
    }
  }, [selectedRole, DEMO_USERS]);

  const handleCustomLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // smooth UX delay
    const result = authenticate(username, password, selectedRole);
    setIsLoading(false);
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

  const roles = [
    { value: "admin", label: "Admin Seksi Pidsus", desc: "Akses Dashboard, Perkara & Barang Bukti" },
    { value: "kajari", label: "Kepala Kejaksaan Negeri (Kajari)", desc: "Akses Seluruh Halaman & Laporan" },
    { value: "penyidik", label: "Ketua Tim Penyidik P-16", desc: "Akses Dashboard, Perkara & BB" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* ── LEFT PANEL: HERO / BRANDING ── */}
      <div
        style={{
          flex: "1 1 55%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/login-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.45)",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(5,25,13,0.85) 0%, rgba(13,50,32,0.75) 50%, rgba(26,71,49,0.60) 100%)",
          }}
        />

        {/* Gold accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--accent-gold-dark), var(--accent-gold), var(--accent-gold-light), var(--accent-gold))",
          }}
        />

        {/* Decorative circle ornament */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "320px",
            height: "320px",
            border: "1px solid rgba(201,162,39,0.15)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "240px",
            height: "240px",
            border: "1px solid rgba(201,162,39,0.1)",
            borderRadius: "50%",
          }}
        />

        {/* Content */}
        <div
          className="animate-slide-left"
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "2rem",
            maxWidth: "480px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "0 auto 1.75rem",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "2px solid rgba(201,162,39,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              animation: "float 4s ease-in-out infinite",
            }}
          >
            <img
              src="/logo-kejaksaan.png"
              alt="Logo Kejaksaan RI"
              style={{ width: "72px", height: "72px", objectFit: "contain" }}
            />
          </div>

          {/* Institutional badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(184,134,11,0.15)",
              border: "1px solid rgba(184,134,11,0.35)",
              padding: "0.35rem 0.875rem",
              borderRadius: "9999px",
              marginBottom: "1.25rem",
            }}
          >
            <Shield size={12} color="var(--accent-gold)" />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                color: "var(--accent-gold-light)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Kejaksaan Republik Indonesia
            </span>
          </div>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Sistem Manajemen<br />
            <span className="text-gold-gradient">Kasus Pidsus</span>
          </h1>

          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Seksi Tindak Pidana Khusus<br />
            Kejaksaan Negeri Salatiga
          </p>

          {/* Motto */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.5rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, var(--accent-gold))",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              SATYA ADHI WICAKSANA
            </span>
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "linear-gradient(90deg, var(--accent-gold), transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: FORM ── */}
      <div
        style={{
          flex: "0 0 440px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 2.5rem",
          position: "relative",
          overflowY: "auto",
          boxShadow: "-8px 0 40px rgba(8,24,40,0.15)",
        }}
      >
        {/* Gold top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))",
          }}
        />

        {/* Header */}
        <div className="animate-slide-right" style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "var(--primary-bg)",
              border: "1px solid rgba(26,58,92,0.2)",
              padding: "0.3rem 0.75rem",
              borderRadius: "9999px",
              marginBottom: "1rem",
            }}
          >
            <Shield size={11} color="var(--primary)" />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--primary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Portal Akses Terautentikasi
            </span>
          </div>

          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            Masuk ke Sistem
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              marginTop: "0.5rem",
            }}
          >
            Gunakan NIP & Kata Sandi resmi Aparat Kejaksaan
          </p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div
            style={{
              background: "#fef2f2",
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
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleCustomLogin}>
          {/* Role Selector */}
          <div className="form-group">
            <label className="form-label">Peran Akses / Jabatan</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    border: selectedRole === role.value
                      ? "1.5px solid var(--primary)"
                      : "1.5px solid var(--border-color)",
                    background: selectedRole === role.value
                      ? "linear-gradient(135deg, var(--primary-bg) 0%, rgba(37,99,235,0.05) 100%)"
                      : "#ffffff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: selectedRole === role.value ? "5px solid var(--primary)" : "2px solid #cbd5e1",
                      flexShrink: 0,
                      marginTop: "2px",
                      transition: "all 0.2s",
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {role.label}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                      {role.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* NIP Input */}
          <div className="form-group">
            <label className="form-label">NIP / ID Aparat Kejaksaan</label>
            <div style={{ position: "relative" }}>
              <User
                size={16}
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
                required
                placeholder="Masukkan NIP resmi..."
                className="form-control"
                style={{ paddingLeft: "2.25rem" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label">Kata Sandi</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Masukkan Kata Sandi..."
                className="form-control"
                style={{ paddingLeft: "2.25rem", paddingRight: "2.5rem" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.85rem",
              fontSize: "0.9rem",
              fontWeight: 700,
              background: isLoading ? "#94a3b8" : "var(--primary)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "0.75rem",
              boxShadow: isLoading ? "none" : "0 4px 16px rgba(26,58,92,0.35)",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
              letterSpacing: "0.02em",
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #ffffff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Sistem</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider" style={{ margin: "1.75rem 0 1.25rem" }}>
          atau
        </div>

        {/* Guest Login */}
        <button
          type="button"
          onClick={handleGuestLogin}
          style={{
            width: "100%",
            padding: "0.7rem",
            borderRadius: "10px",
            border: "1.5px solid var(--border-color)",
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            background: "#ffffff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.color = "var(--primary)";
            e.currentTarget.style.background = "var(--primary-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.background = "#ffffff";
          }}
        >
          <UserCheck size={15} />
          <span>Masuk sebagai Tamu (Demo Aplikasi)</span>
        </button>

        {/* Footer */}
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border-color)",
            textAlign: "center",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.2rem" }}>
            © 2024 Kejaksaan Negeri Salatiga
          </div>
          Sistem Manajemen Perkara Pidsus — Versi 2.0<br />
          Wilayah Hukum Jawa Tengah
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
