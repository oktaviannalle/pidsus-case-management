import { useState } from "react";
import { X, Save } from "lucide-react";

function CaseFormModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    caseNumber: "",
    title: "",
    crimeType: "Korupsi (Pengadaan Barang/Jasa)",
    status: "Penyelidikan",
    stateLoss: "",
    recoveredAmount: "",
    prosecutorTeam: "Tim Penyidik P-16 A (Kejari Salatiga)",
    description: "",
    reportedDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          maxWidth: "700px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.75rem",
            backgroundColor: "var(--bg-sidebar)",
            color: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff" }}>Tambah Perkara Pidsus Baru</h3>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Register Perkara Tindak Pidana Khusus Kejari Salatiga</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "1.5rem 1.75rem", overflowY: "auto", flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Nomor Perkara (PRINT)</label>
              <input
                type="text"
                name="caseNumber"
                required
                placeholder="misal: PRINT-06/M.3.20/Fd.1/08/2026"
                className="form-control"
                value={formData.caseNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Jenis Tindak Pidana</label>
              <select name="crimeType" className="form-control" value={formData.crimeType} onChange={handleChange}>
                <option value="Korupsi (Pengadaan Barang/Jasa)">Korupsi (Pengadaan Barang/Jasa)</option>
                <option value="Korupsi (Penyalahgunaan Wewenang)">Korupsi (Penyalahgunaan Wewenang)</option>
                <option value="Korupsi (Dana Desa/Kelurahan)">Korupsi (Dana Desa/Kelurahan)</option>
                <option value="Pencucian Uang (TPPU)">Pencucian Uang (TPPU)</option>
                <option value="Tindak Pidana Perpajakan">Tindak Pidana Perpajakan</option>
                <option value="Kepabeanan & Cukai">Kepabeanan & Cukai</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Judul / Subjek Perkara</label>
            <input
              type="text"
              name="title"
              required
              placeholder="misal: Dugaan Korupsi Pengadaan Alat Laboratorium..."
              className="form-control"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Status Persuratan Prosedural</label>
              <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
                <option value="Penyelidikan">Penyelidikan (P-2)</option>
                <option value="Penyidikan (P-16)">Penyidikan (P-16)</option>
                <option value="Penyidikan (P-21)">Penyidikan Berkas Lengkap (P-21)</option>
                <option value="Penuntutan (P-31)">Penuntutan (P-31)</option>
                <option value="Eksekusi (P-48)">Eksekusi / Inkracht (P-48)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal Pelaporan / Register</label>
              <input
                type="date"
                name="reportedDate"
                className="form-control"
                value={formData.reportedDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Estimasi Kerugian Negara (Rp)</label>
              <input
                type="number"
                name="stateLoss"
                placeholder="misal: 1500000000"
                className="form-control"
                value={formData.stateLoss}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nilai Aset Disita / Recovery (Rp)</label>
              <input
                type="number"
                name="recoveredAmount"
                placeholder="misal: 800000000"
                className="form-control"
                value={formData.recoveredAmount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tim Jaksa Peneliti / Penyidik</label>
            <input
              type="text"
              name="prosecutorTeam"
              placeholder="misal: Tim Penyidik P-16 A (Ketua: Wahyu H., S.H.)"
              className="form-control"
              value={formData.prosecutorTeam}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ringkasan Posisi Kasus & Kronologi</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Jelaskan secara ringkas perbuatan melawan hukum & peranan subjek..."
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
            }}
          >
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Simpan Perkara</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CaseFormModal;
