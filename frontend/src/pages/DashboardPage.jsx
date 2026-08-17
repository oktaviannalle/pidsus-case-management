import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Briefcase, ShieldCheck, Package, Coins, Plus, ChevronRight } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import CaseDetailModal from "../components/modals/CaseDetailModal";
import CaseFormModal from "../components/modals/CaseFormModal";
import { getDashboardSummary, getCases, createCase } from "../services/caseService";
import { useAuth } from "../context/AuthContext";

const KEJAKSAAN_GREEN      = "#1e7a3e";
const KEJAKSAAN_GREEN_DARK = "#145c2d";
const KEJAKSAAN_GOLD       = "#c9a227";

const CHART_COLORS = [
  "#1e7a3e", "#25934d", "#c9a227", "#4f46e5",
  "#0ea5e9", "#dc2626",
];

function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary]           = useState(null);
  const [recentCases, setRecentCases]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [summaryRes, casesRes] = await Promise.all([getDashboardSummary(), getCases()]);
    setSummary(summaryRes.data);
    setRecentCases(casesRes.data.slice(0, 5));
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateCase = async (data) => {
    await createCase(data);
    setShowFormModal(false);
    fetchData();
  };

  const formatIDR = (val) => {
    if (!val) return "Rp 0";
    if (val >= 1_000_000_000) return `Rp ${(val / 1_000_000_000).toFixed(1)} Miliar`;
    if (val >= 1_000_000)     return `Rp ${(val / 1_000_000).toFixed(0)} Juta`;
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  const getStatusBadge = (status) => {
    if (status?.includes("Penyelidikan")) return "badge badge-penyelidikan";
    if (status?.includes("Penyidikan"))   return "badge badge-penyidikan";
    if (status?.includes("Penuntutan"))   return "badge badge-penuntutan";
    if (status?.includes("Eksekusi"))     return "badge badge-eksekusi";
    return "badge badge-default";
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px", flexDirection: "column", gap: "0.875rem" }}>
        <div style={{ width: "34px", height: "34px", border: "3px solid #cdddd4", borderTop: `3px solid ${KEJAKSAAN_GREEN}`, borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
        <p style={{ color: "#7fa888", fontSize: "0.825rem" }}>Memuat data...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">

      {/* ══════════════════════════════════════════
          BERANDA BANNER — style website Kejari Salatiga
          (Hijau solid + border kiri emas + logo watermark)
      ══════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: KEJAKSAAN_GREEN,
          borderRadius: "10px",
          padding: "0",
          marginBottom: "1.5rem",
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(20,92,45,0.2)",
          position: "relative",
        }}
      >
        {/* Gold accent bar kiri (seperti "Beranda" tab website) */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "5px", backgroundColor: KEJAKSAAN_GOLD }} />

        {/* Watermark logo Kejaksaan */}
        <div
          style={{
            position: "absolute",
            right: "1.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100px",
            height: "100px",
            backgroundImage: "url('/logo-kejaksaan.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />

        <div
          style={{
            padding: "1.25rem 1.5rem 1.25rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.875rem",
          }}
        >
          <div>
            {/* Breadcrumb-style label */}
            <div
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.35rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span>Beranda</span>
              <span style={{ opacity: 0.4 }}>›</span>
              <span>Dashboard Analitik</span>
            </div>

            <h1
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Dashboard Analitik Perkara
            </h1>
            <p style={{ fontSize: "0.775rem", color: "rgba(255,255,255,0.55)", marginTop: "0.3rem" }}>
              Ringkasan Eksekutif Penanganan Perkara Tindak Pidana Khusus — Kejaksaan Negeri Salatiga
            </p>
          </div>

          {user?.canRegister && (
            <button
              onClick={() => setShowFormModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 1.125rem",
                backgroundColor: KEJAKSAAN_GOLD,
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#a07d10"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = KEJAKSAAN_GOLD; }}
            >
              <Plus size={15} />
              <span>Register Perkara Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          KPI CARDS
      ══════════════════════════════════════════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <StatCard title="Total Perkara Pidsus"    value={summary?.totalCases || 0}                      icon={Briefcase}   color="primary" subtitle="Tercatat dalam registri" />
        <StatCard title="Kerugian Negara (Total)"  value={formatIDR(summary?.totalStateLoss || 0)}       icon={Coins}       color="red"     subtitle="Estimasi penghitungan ahli" />
        <StatCard title="Aset / Uang Disita"       value={formatIDR(summary?.totalRecoveredAmount || 0)} icon={ShieldCheck} color="gold"    trend={true}  subtitle="Pemulihan keuangan negara" />
        <StatCard title="Gudang Barang Bukti"      value={`${summary?.totalEvidences || 10} Items`}     icon={Package}     color="blue"    subtitle="Tersimpan di tempat penyimpanan" />
      </div>

      {/* ══════════════════════════════════════════
          CHARTS
      ══════════════════════════════════════════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "1.125rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Bar Chart */}
        <div className="card" style={{ padding: "1.25rem 1.375rem" }}>
          <div style={{ paddingBottom: "0.75rem", borderBottom: "1px solid #eef4f0", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: KEJAKSAAN_GREEN }}>
              Perkara per Tahapan Persuratan
            </h3>
            <p style={{ fontSize: "0.68rem", color: "#7fa888", marginTop: "0.2rem" }}>
              P-2 Penyelidikan · P-16/P-21 Penyidikan · P-31 Penuntutan · P-48 Eksekusi
            </p>
          </div>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary?.byStatus || []} margin={{ top: 5, right: 10, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef4f0" />
                <XAxis dataKey="status" tick={{ fontSize: 10, fill: "#7fa888" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#7fa888" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: KEJAKSAAN_GREEN_DARK, borderRadius: "7px", color: "#fff", border: "none", fontSize: "0.78rem" }}
                  itemStyle={{ color: "#e0b830" }}
                  cursor={{ fill: "rgba(30,122,62,0.06)" }}
                />
                <Bar dataKey="count" fill={KEJAKSAAN_GREEN} radius={[4, 4, 0, 0]} maxBarSize={56} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card" style={{ padding: "1.25rem 1.375rem" }}>
          <div style={{ paddingBottom: "0.75rem", borderBottom: "1px solid #eef4f0", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: KEJAKSAAN_GREEN }}>
              Kategori Jenis Tindak Pidana
            </h3>
            <p style={{ fontSize: "0.68rem", color: "#7fa888", marginTop: "0.2rem" }}>
              Korupsi Pengadaan, Dana Desa, Wewenang, TPPU & Perpajakan
            </p>
          </div>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary?.byCrimeType || []}
                  dataKey="count"
                  nameKey="crimeType"
                  cx="50%"
                  cy="44%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  stroke="none"
                >
                  {(summary?.byCrimeType || []).map((_, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: KEJAKSAAN_GREEN_DARK, borderRadius: "7px", color: "#fff", border: "none", fontSize: "0.78rem" }}
                />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "11px", paddingTop: "6px", color: "#3d6647" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TABEL PERKARA TERBARU
      ══════════════════════════════════════════ */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", border: "1px solid #cdddd4", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        {/* Header tabel */}
        <div
          style={{
            padding: "0.875rem 1.375rem",
            backgroundColor: "#eaf4ee",
            borderBottom: "2px solid #cdddd4",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: `4px solid ${KEJAKSAAN_GREEN}`,
          }}
        >
          <div>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: KEJAKSAAN_GREEN }}>
              Daftar Perkara Terbaru
            </h3>
            <p style={{ fontSize: "0.68rem", color: "#7fa888", marginTop: "0.15rem" }}>
              5 registri perkara yang baru masuk atau diperbarui
            </p>
          </div>
          <a
            href="/cases"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: KEJAKSAAN_GREEN,
              textDecoration: "none",
              padding: "0.3rem 0.65rem",
              border: `1px solid ${KEJAKSAAN_GREEN}`,
              borderRadius: "4px",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = KEJAKSAAN_GREEN; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = KEJAKSAAN_GREEN; }}
          >
            Lihat Semua <ChevronRight size={12} />
          </a>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>No. Perkara</th>
              <th>Judul Perkara</th>
              <th>Jenis Pidana</th>
              <th>Kerugian Negara</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {recentCases.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#7fa888", padding: "2.5rem" }}>
                  Belum ada data perkara.
                </td>
              </tr>
            ) : (
              recentCases.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.75rem", color: KEJAKSAAN_GREEN, backgroundColor: "#eaf4ee", padding: "0.2rem 0.5rem", borderRadius: "3px", whiteSpace: "nowrap" }}>
                      {c.caseNumber}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: "260px" }}>{c.title}</td>
                  <td style={{ color: "#3d6647", fontSize: "0.82rem" }}>{c.crimeType}</td>
                  <td style={{ fontWeight: 700, color: "#dc2626", fontSize: "0.875rem" }}>
                    {c.stateLoss ? formatIDR(c.stateLoss) : "—"}
                  </td>
                  <td><span className={getStatusBadge(c.status)}>{c.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setSelectedCase(c)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedCase  && <CaseDetailModal caseItem={selectedCase}  onClose={() => setSelectedCase(null)} />}
      {showFormModal && <CaseFormModal onClose={() => setShowFormModal(false)} onSubmit={handleCreateCase} />}
    </div>
  );
}

export default DashboardPage;
