import { useEffect, useState } from "react";
import { Package, Building, ShieldCheck, Search, Filter, Warehouse } from "lucide-react";
import { getCases } from "../services/caseService";

function EvidencesPage() {
  const [evidences, setEvidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    const fetchEvidences = async () => {
      setLoading(true);
      const res = await getCases();
      const allEvidences = [];
      res.data.forEach((c) => {
        if (c.evidences && c.evidences.length > 0) {
          c.evidences.forEach((e) => {
            allEvidences.push({
              ...e,
              caseNumber: c.caseNumber,
              caseTitle: c.title,
            });
          });
        }
      });
      setEvidences(allEvidences);
      setLoading(false);
    };

    fetchEvidences();
  }, []);

  const filteredEvidences = evidences.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.storageLocation && e.storageLocation.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === "ALL" || (e.type && e.type.includes(typeFilter));
    return matchesSearch && matchesType;
  });

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Gudang & Registri Barang Bukti</h1>
          <p className="page-subtitle">
            Pelacakan Rantai Penjagaan (*Chain of Custody*) & Penyimpanan Physical Asset Barang Bukti Kejari Salatiga
          </p>
        </div>
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
            placeholder="Cari Nama Barang Bukti, Lokasi Gudang, atau No. Perkara..."
            className="form-control"
            style={{ paddingLeft: "2.35rem" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Filter size={16} color="var(--text-secondary)" />
          <select
            className="form-control"
            style={{ width: "200px" }}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">Semua Kategori BB</option>
            <option value="Kendaraan">Kendaraan Bermotor</option>
            <option value="Dokumen">Dokumen / Sertifikat</option>
            <option value="Uang Tunai">Uang Tunai / Rekening</option>
            <option value="Elektronik">Elektronik / IT</option>
            <option value="Logam Mulia">Logam Mulia / Perhiasan</option>
          </select>
        </div>
      </div>

      {/* Evidences Grid Table */}
      <div className="table-container">
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
            Memuat registri barang bukti...
          </div>
        ) : filteredEvidences.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
            Belum ada barang bukti tercatat yang sesuai filter.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Barang Bukti</th>
                <th>Jenis BB</th>
                <th>No. Perkara Terkait</th>
                <th>Lokasi Penyimpanan (Gudang BB)</th>
                <th>Tanggal Penyitaan</th>
                <th>Status Penyitaan</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvidences.map((e) => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 700, maxWidth: "300px" }}>{e.name}</td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor: "#ecfdf5",
                        color: "var(--primary)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      {e.type || "Barang Bukti"}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      {e.caseNumber}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.825rem" }}>
                      <Building size={14} color="var(--accent-gold)" />
                      <span>{e.storageLocation || "Gudang Utama Kejari Salatiga"}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.825rem" }}>
                    {e.collectedDate || "-"}
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#166534",
                        backgroundColor: "#dcfce7",
                        padding: "0.25rem 0.625rem",
                        borderRadius: "20px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EvidencesPage;
