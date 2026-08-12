import { useEffect, useState } from "react";
import apiClient from "../api/axiosClient";

function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get("/cases")
      .then((res) => {
        setCases(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data kasus:", err);
        setError(
          "Tidak bisa terhubung ke server. Pastikan backend sedang berjalan.",
        );
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Memuat data kasus...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Daftar Kasus Pidsus</h1>
      {cases.length === 0 ? (
        <p>Belum ada data kasus.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>No. Perkara</th>
              <th>Judul</th>
              <th>Jenis Tindak Pidana</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td>{c.caseNumber}</td>
                <td>{c.title}</td>
                <td>{c.crimeType}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CasesPage;
