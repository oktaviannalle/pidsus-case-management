import { useEffect, useState } from "react";
import { Printer, Eye } from "lucide-react";
import { getCases } from "../api/caseService";
import { useAuth } from "../context/AuthContext";

function ReportsPage() {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    getCases().then((res) => setCases(res.data));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const formatIDR = (val) => {
    if (!val) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="animate-fade-in">
      {/* Action Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Laporan Rekapitulasi Perkara</h1>
          <p className="page-subtitle">
            Format Cetak Laporan Bulanan Penanganan Perkara Pidsus untuk Kepala Kejaksaan Negeri Salatiga
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {user?.isReadOnly ? (
            <div
              style={{
                backgroundColor: "#fffbeb",
                color: "#b45309",
                border: "1px solid #fde68a",
                padding: "0.4rem 0.875rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <Eye size={14} />
              <span>Mode Peninjau Tamu (Read-Only)</span>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handlePrint}>
              <Printer size={16} />
              <span>Cetak / Simpan PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Official Kejaksaan Document Paper View */}
      <div
        className="card"
        style={{
          backgroundColor: "#ffffff",
          padding: "3rem",
          maxWidth: "1000px",
          margin: "0 auto",
          boxShadow: "var(--shadow-md)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Official Kop Surat Header */}
        <div
          style={{
            borderBottom: "3px double #000000",
            paddingBottom: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            KEJAKSAAN REPUBLIK INDONESIA
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase" }}>
            KEJAKSAAN TINGGI JAWA TENGAH
          </div>
          <div style={{ fontSize: "1.3rem", fontWeight: 900, textTransform: "uppercase", color: "var(--primary-dark)" }}>
            KEJAKSAAN NEGERI SALATIGA
          </div>
          <div style={{ fontSize: "0.75rem", color: "#475569" }}>
            Jl. Diponegoro No. 79, Kota Salatiga, Jawa Tengah 50711 • Telp: (0298) 326789
          </div>
        </div>

        {/* Title of Document */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h3 style={{ textDecoration: "underline", fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase" }}>
            LAPORAN REKAPITULASI PENANGANAN PERKARA TINDAK PIDANA KHUSUS
          </h3>
          <div style={{ fontSize: "0.85rem", marginTop: "0.25rem", color: "var(--text-secondary)" }}>
            PERIODE: TAHUN 2024 / ACTIVE CASE REGISTRY
          </div>
        </div>

        {/* Official Summary Table */}
        <table
          className="data-table"
          style={{
            border: "1px solid #000000",
            fontSize: "0.8rem",
            marginBottom: "2.5rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9" }}>
              <th style={{ border: "1px solid #000", textAlign: "center", width: "40px" }}>NO</th>
              <th style={{ border: "1px solid #000" }}>NOMOR PERKARA (PRINT)</th>
              <th style={{ border: "1px solid #000" }}>JUDUL PERKARA & KRONOLOGI</th>
              <th style={{ border: "1px solid #000" }}>KERUGIAN NEGARA</th>
              <th style={{ border: "1px solid #000" }}>ASET RECOVERY</th>
              <th style={{ border: "1px solid #000", textAlign: "center" }}>STATUS PROSEDURAL</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c, idx) => (
              <tr key={c.id}>
                <td style={{ border: "1px solid #000", textAlign: "center" }}>{idx + 1}</td>
                <td style={{ border: "1px solid #000", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{c.caseNumber}</td>
                <td style={{ border: "1px solid #000" }}>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#475569" }}>{c.crimeType}</div>
                </td>
                <td style={{ border: "1px solid #000", fontWeight: 700, color: "#dc2626" }}>
                  {formatIDR(c.stateLoss)}
                </td>
                <td style={{ border: "1px solid #000", fontWeight: 700, color: "#047857" }}>
                  {formatIDR(c.recoveredAmount)}
                </td>
                <td style={{ border: "1px solid #000", textAlign: "center", fontWeight: 700 }}>
                  {c.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Signature Block */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", fontSize: "0.85rem" }}>
          <div style={{ textAlign: "center" }}>
            <div>Mengetahui,</div>
            <div style={{ fontWeight: 800 }}>KEPALA KEJAKSAAN NEGERI SALATIGA</div>
            <div style={{ height: "70px" }} />
            <div style={{ fontWeight: 800, textDecoration: "underline" }}>DR. HERU PRASETYO, S.H., M.H.</div>
            <div>JAKSA UTAMA MADYA / NIP. 19740512 199803 1 002</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div>Salatiga, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</div>
            <div style={{ fontWeight: 800 }}>KEPALA SEKSI TINDAK PIDANA KHUSUS</div>
            <div style={{ height: "70px" }} />
            <div style={{ fontWeight: 800, textDecoration: "underline" }}>WAHYU HIDAYAT, S.H., M.H.</div>
            <div>JAKSA UTAMA PRATAMA / NIP. 19820815 200604 1 005</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
