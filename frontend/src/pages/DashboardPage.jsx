import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Package,
  Coins,
  Scale,
  Plus,
  FileSpreadsheet,
  Building,
} from "lucide-react";
import StatCard from "../components/ui/StatCard";
import CaseDetailModal from "../components/modals/CaseDetailModal";
import CaseFormModal from "../components/modals/CaseFormModal";
import { getDashboardSummary, getCases, createCase } from "../services/caseService";
import { useAuth } from "../context/AuthContext";

const COLORS = ["#f59e0b", "#3b82f6", "#6366f1", "#8b5cf6", "#10b981", "#ec4899"];

function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [recentCases, setRecentCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [summaryRes, casesRes] = await Promise.all([getDashboardSummary(), getCases()]);
    setSummary(summaryRes.data);
    setRecentCases(casesRes.data.slice(0, 5));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCase = async (newCaseData) => {
    await createCase(newCaseData);
    setShowFormModal(false);
    fetchData();
  };

  const formatIDR = (val) => {
    if (!val) return "Rp 0";
    if (val >= 1000000000) {
      return `Rp ${(val / 1000000000).toFixed(1)} Miliar`;
    }
    if (val >= 1000000) {
      return `Rp ${(val / 1000000).toFixed(0)} Juta`;
    }
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
        <p style={{ color: "var(--text-secondary)" }}>Memuat Dashboard Analitik Pidsus...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Analitik Perkara</h1>
          <p className="page-subtitle">
            Ringkasan Eksekutif & Metrics Penanganan Perkara Tindak Pidana Khusus Kejaksaan Negeri Salatiga
          </p>
        </div>

        {user?.canRegister && (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="btn btn-primary" onClick={() => setShowFormModal(true)}>
              <Plus size={16} />
              <span>Register Perkara Baru</span>
            </button>
          </div>
        )}
      </div>

      {/* KPI Stat Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          title="Total Perkara Pidsus"
          value={summary?.totalCases || 0}
          icon={Briefcase}
          color="primary"
          subtitle="Tercatat dalam registri"
        />

        <StatCard
          title="Kerugian Negara (Tot.)"
          value={formatIDR(summary?.totalStateLoss || 0)}
          icon={Coins}
          color="red"
          subtitle="Estimasi penghitungan ahli"
        />

        <StatCard
          title="Aset / Uang Disita"
          value={formatIDR(summary?.totalRecoveredAmount || 0)}
          icon={ShieldCheck}
          color="gold"
          trend={true}
          subtitle="Pemulihan keuangan negara"
        />

        <StatCard
          title="Gudang Barang Bukti"
          value={`${summary?.totalEvidences || 10} Items`}
          icon={Package}
          color="blue"
          subtitle="Tersimpan di tempat penyimpanan"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Chart 1: Distribution by Stage */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Perkara per Tahapan Persuratan</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                Tahap Penyelidikan (P-2), Penyidikan (P-16/P-21), Penuntutan (P-31) & Eksekusi (P-48)
              </p>
            </div>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary?.byStatus || []} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="status" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", color: "#ffffff", border: "none" }}
                  itemStyle={{ color: "#34d399" }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Distribution by Crime Type */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Kategori Jenis Tindak Pidana</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                Korupsi Pengadaan, Dana Desa, Wewenang, TPPU & Perpajakan
              </p>
            </div>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary?.byCrimeType || []}
                  dataKey="count"
                  nameKey="crimeType"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {(summary?.byCrimeType || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", color: "#ffffff", border: "none" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Cases Widget Table */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Daftar Perkara Terbaru</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              5 Registri perkara Pidsus yang baru masuk atau diperbarui
            </p>
          </div>
        </div>

        <div className="table-container" style={{ border: "none", boxShadow: "none" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Perkara</th>
                <th>Judul Perkara</th>
                <th>Jenis Pidana</th>
                <th>Kerugian Negara</th>
                <th>Status Persuratan</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recentCases.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "0.8rem", color: "var(--primary)" }}>
                      {c.caseNumber}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: "320px" }}>{c.title}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{c.crimeType}</td>
                  <td style={{ fontWeight: 700, color: "#dc2626" }}>
                    {c.stateLoss ? formatIDR(c.stateLoss) : "-"}
                  </td>
                  <td>
                    <span className="badge badge-penyidikan">{c.status}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setSelectedCase(c)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedCase && <CaseDetailModal caseItem={selectedCase} onClose={() => setSelectedCase(null)} />}
      {showFormModal && <CaseFormModal onClose={() => setShowFormModal(false)} onSubmit={handleCreateCase} />}
    </div>
  );
}

export default DashboardPage;
