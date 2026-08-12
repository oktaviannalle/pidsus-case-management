import { useState } from "react";
import {
  X,
  Briefcase,
  UserCheck,
  Package,
  Clock,
  Coins,
  ShieldCheck,
  Building,
  FileCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

function CaseDetailModal({ caseItem, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!caseItem) return null;

  const formatIDR = (val) => {
    if (!val) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  const getStatusBadge = (status) => {
    if (status.includes("Penyelidikan")) return <span className="badge badge-penyelidikan">{status}</span>;
    if (status.includes("Penyidikan")) return <span className="badge badge-penyidikan">{status}</span>;
    if (status.includes("Penuntutan")) return <span className="badge badge-penuntutan">{status}</span>;
    if (status.includes("Eksekusi")) return <span className="badge badge-eksekusi">{status}</span>;
    return <span className="badge badge-default">{status}</span>;
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1.5rem",
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "1.5rem 2rem",
            backgroundColor: "var(--bg-sidebar)",
            color: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--accent-gold)",
                  backgroundColor: "rgba(217, 119, 6, 0.15)",
                  padding: "0.25rem 0.625rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(217, 119, 6, 0.3)",
                }}
              >
                {caseItem.caseNumber}
              </span>
              {getStatusBadge(caseItem.status)}
            </div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
              {caseItem.title}
            </h2>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.25rem" }}>
              Jenis Pidana: <strong style={{ color: "#cbd5e1" }}>{caseItem.crimeType}</strong>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: "#ffffff",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--border-color)",
            backgroundColor: "#f8fafc",
            padding: "0 2rem",
          }}
        >
          {[
            { id: "overview", label: "Ringkasan Perkara", icon: Briefcase },
            { id: "timeline", label: "Tahapan Persuratan (P-16/P-21)", icon: Clock },
            { id: "suspects", label: `Tersangka (${caseItem.suspects?.length || 0})`, icon: UserCheck },
            { id: "evidences", label: `Barang Bukti (${caseItem.evidences?.length || 0})`, icon: Package },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 1.25rem",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  border: "none",
                  borderBottom: isActive ? "3px solid var(--primary)" : "3px solid transparent",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: "2rem", overflowY: "auto", flex: 1 }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Asset Recovery Banner */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  backgroundColor: "#f8fafc",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>
                    Estimasi Kerugian Keuangan Negara
                  </div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#dc2626", marginTop: "0.25rem" }}>
                    {formatIDR(caseItem.stateLoss)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>
                    Penyitaan / Asset Recovery (Uang Pengganti)
                  </div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.25rem" }}>
                    {formatIDR(caseItem.recoveredAmount)}
                  </div>
                </div>
              </div>

              {/* Case Info Cards */}
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>Deskripsi Perkara</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {caseItem.description || "Tidak ada deskripsi rinci untuk kasus ini."}
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ backgroundColor: "#ffffff", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Tim Penanggung Jawab</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                    {caseItem.prosecutorTeam || "Tim Penyidik Pidsus Kejari Salatiga"}
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Tanggal Dilaporkan / Dimulai</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                    {caseItem.reportedDate ? new Date(caseItem.reportedDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINE PERSURATAN */}
          {activeTab === "timeline" && (
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                Rekam Jarak Prosedural Persuratan Pidana Khusus
              </h4>
              {!caseItem.caseStages || caseItem.caseStages.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Belum ada tahapan persuratan terdaftar.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative", paddingLeft: "1.5rem" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "7px",
                      top: "10px",
                      bottom: "10px",
                      width: "2px",
                      backgroundColor: "var(--border-color)",
                    }}
                  />
                  {caseItem.caseStages.map((stage, idx) => (
                    <div key={stage.id || idx} style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: "-1.5rem",
                          top: "2px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          backgroundColor: stage.status === "Selesai" ? "var(--primary)" : "#f59e0b",
                          border: "3px solid #ffffff",
                          boxShadow: "0 0 0 2px var(--border-color)",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "#f8fafc",
                          padding: "1rem",
                          borderRadius: "10px",
                          border: "1px solid var(--border-color)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                            {stage.stageName}
                          </span>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              backgroundColor: stage.status === "Selesai" ? "#dcfce7" : "#fffbeb",
                              color: stage.status === "Selesai" ? "#166534" : "#b45309",
                            }}
                          >
                            {stage.status}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                          Mulai: {stage.startDate} {stage.endDate ? `• Selesai: ${stage.endDate}` : "• Berjalan"}
                        </div>
                        {stage.notes && (
                          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            {stage.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TERSANGKA */}
          {activeTab === "suspects" && (
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Daftar Tersangka Perkara</h4>
              {!caseItem.suspects || caseItem.suspects.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Belum ada data tersangka dimasukkan.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {caseItem.suspects.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        padding: "1rem 1.25rem",
                        backgroundColor: "#f8fafc",
                        borderRadius: "10px",
                        border: "1px solid var(--border-color)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                          {s.fullName}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                          NIK: <span style={{ fontFamily: "var(--font-mono)" }}>{s.nik || "-"}</span> • Kontak: {s.phoneNumber || "-"}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                          Alamat: {s.address || "-"}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "0.35rem 0.75rem",
                          borderRadius: "20px",
                          backgroundColor: "#fef2f2",
                          color: "#dc2626",
                          border: "1px solid #fecaca",
                        }}
                      >
                        {s.detentionStatus || "Ditahan"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BARANG BUKTI */}
          {activeTab === "evidences" && (
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Barang Bukti & Lokasi Penyimpanan (Gudang BB)</h4>
              {!caseItem.evidences || caseItem.evidences.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Belum ada barang bukti disita untuk perkara ini.</p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {caseItem.evidences.map((e) => (
                    <div
                      key={e.id}
                      style={{
                        padding: "1rem",
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        border: "1px solid var(--border-color)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "var(--primary)",
                            backgroundColor: "var(--primary-bg)",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "4px",
                          }}
                        >
                          {e.type || "Barang Bukti"}
                        </span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#166534" }}>{e.status}</span>
                      </div>

                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                        {e.name}
                      </div>

                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <Building size={14} color="var(--accent-gold)" />
                        <span>{e.storageLocation || "Gudang BB Kejari Salatiga"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#f8fafc",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button className="btn btn-secondary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaseDetailModal;
