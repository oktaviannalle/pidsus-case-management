import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import apiClient from "../api/axiosClient";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get("/dashboard/summary")
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data dashboard:", err);
        setError("Tidak bisa memuat data dashboard.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Memuat dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Dashboard Analitik</h1>
      <h2>Total Kasus: {summary.totalCases}</h2>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ width: 400, height: 300 }}>
          <h3>Kasus per Status</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary.byStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: 400, height: 300 }}>
          <h3>Kasus per Jenis Tindak Pidana</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summary.byCrimeType}
                dataKey="count"
                nameKey="crimeType"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {summary.byCrimeType.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
