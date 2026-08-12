import { useEffect, useState } from "react";
import { Plus, Search, Filter, Eye, Trash2, ShieldAlert } from "lucide-react";
import { getCases, createCase, deleteCase } from "../api/caseService";
import { useAuth } from "../context/AuthContext";
import CaseDetailModal from "../components/CaseDetailModal";
import CaseFormModal from "../components/CaseFormModal";

function CasesPage() {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [crimeFilter, setCrimeFilter] = useState("ALL");
  const [selectedCase, setSelectedCase] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchCasesData = async () => {
    setLoading(true);
    const res = await getCases();
    setCases(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCasesData();
  }, []);

  const handleCreateCase = async (caseData) => {
    await createCase(caseData);
    setShowFormModal(false);
    fetchCasesData();
  };

  const handleDeleteCase = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Apakah Anda yakin ingin menghapus registri perkara ini?")) {
      await deleteCase(id);
      fetchCasesData();
    }
  };

  const formatIDR = (val) => {
    if (!val) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.crimeType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || c.status.includes(statusFilter);
    const matchesCrime = crimeFilter === "ALL" || c.crimeType.includes(crimeFilter);

    return matchesSearch && matchesStatus && matchesCrime;
  });

  const getStatusBadgeClass = (status) => {
    if (status.includes("Penyelidikan")) return "badge badge-penyelidikan";
    if (status.includes("Penyidikan")) return "badge badge-penyidikan";
    if (status.includes("Penuntutan")) return "badge badge-penuntutan";
    if (status.includes("Eksekusi")) return "badge badge-eksekusi";
    return "badge badge-default";
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Manajemen Perkara Pidsus</h1>
          <p className="page-subtitle">
            Daftar Induk Registri Kasus Tindak Pidana Khusus Kejaksaan Negeri Salatiga
          </p>
        </div>

        {user?.canRegister && (
          <button className="btn btn-primary" onClick={() => setShowFormModal(true)}>
            <Plus size={16} />
            <span>Register Perkara Baru</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div
        className="card"
        style={{
          padding: "1.25rem",
          marginBottom: "1.5rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "280px", position: "relative" }}>
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
            placeholder="Cari Nomor Perkara atau Judul Kasus..."
            className="form-control"
            style={{ paddingLeft: "2.35rem" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Filter size={16} color="var(--text-secondary)" />
          <select
            className="form-control"
            style={{ width: "180px" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Semua Status</option>
            <option value="Penyelidikan">Penyelidikan (P-2)</option>
            <option value="Penyidikan">Penyidikan (P-16/P-21)</option>
            <option value="Penuntutan">Penuntutan (P-31)</option>
            <option value="Eksekusi">Eksekusi / Inkracht (P-48)</option>
          </select>
        </div>

        {/* Crime Type Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <select
            className="form-control"
            style={{ width: "200px" }}
            value={crimeFilter}
            onChange={(e) => setCrimeFilter(e.target.value)}
          >
            <option value="ALL">Semua Jenis Pidana</option>
            <option value="Korupsi">Tindak Pidana Korupsi</option>
            <option value="Pencucian Uang">Pencucian Uang (TPPU)</option>
            <option value="Perpajakan">Tindak Pidana Perpajakan</option>
          </select>
        </div>
      </div>

      {/* Main Cases Data Table */}
      <div className="table-container">
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
            Memuat daftar perkara...
          </div>
        ) : filteredCases.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
            Tidak ada perkara yang sesuai dengan pencarian atau filter.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Perkara (PRINT)</th>
                <th>Judul Perkara</th>
                <th>Jenis Tindak Pidana</th>
                <th>Kerugian Negara</th>
                <th>Aset Disita</th>
                <th>Status Persuratan</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        color: "var(--primary)",
                      }}
                    >
                      {c.caseNumber}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: "340px" }}>{c.title}</td>
                  <td>
                    <span style={{ fontSize: "0.825rem", color: "var(--text-secondary)" }}>{c.crimeType}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: "#dc2626" }}>
                    {c.stateLoss ? formatIDR(c.stateLoss) : "-"}
                  </td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>
                    {c.recoveredAmount ? formatIDR(c.recoveredAmount) : "-"}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(c.status)}>{c.status}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCase(c);
                        }}
                      >
                        <Eye size={14} />
                        <span>Detail</span>
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ color: "#ef4444", borderColor: "#fca5a5" }}
                        onClick={(e) => handleDeleteCase(c.id, e)}
                        title="Hapus Registri Perkara"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {selectedCase && <CaseDetailModal caseItem={selectedCase} onClose={() => setSelectedCase(null)} />}
      {showFormModal && <CaseFormModal onClose={() => setShowFormModal(false)} onSubmit={handleCreateCase} />}
    </div>
  );
}

export default CasesPage;
