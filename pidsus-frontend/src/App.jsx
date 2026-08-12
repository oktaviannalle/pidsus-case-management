import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CasesPage from "./pages/CasesPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #444" }}>
        <Link to="/cases" style={{ marginRight: "1rem" }}>
          Daftar Kasus
        </Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<CasesPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
