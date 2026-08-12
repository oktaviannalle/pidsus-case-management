import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import CasesPage from "./pages/CasesPage";
import EvidencesPage from "./pages/EvidencesPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Left Adhyaksa Sidebar */}
        <Sidebar />

        {/* Right Main Body */}
        <div className="main-content">
          <Navbar isMockMode={true} />

          <main className="page-body">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/evidences" element={<EvidencesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
