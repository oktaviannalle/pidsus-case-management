import apiClient from "./axiosClient";
import { MOCK_CASES, MOCK_SUMMARY } from "./mockData";

// Memory cache for mock mutations when API is offline
let localMockCases = [...MOCK_CASES];

export const getCases = async () => {
  try {
    const res = await apiClient.get("/cases");
    if (res.data && res.data.length > 0) {
      return { data: res.data, isMock: false };
    }
  } catch (err) {
    console.warn("Backend API tidak terjangkau, menggunakan data portofolio Pidsus:", err.message);
  }
  return { data: localMockCases, isMock: true };
};

export const getCaseById = async (id) => {
  try {
    const res = await apiClient.get(`/cases/${id}`);
    if (res.data) {
      return { data: res.data, isMock: false };
    }
  } catch (err) {
    console.warn("Backend API offline, mengambil detail dari mock:", err.message);
  }
  const found = localMockCases.find((c) => c.id === Number(id));
  return { data: found || localMockCases[0], isMock: true };
};

export const getDashboardSummary = async () => {
  try {
    const res = await apiClient.get("/dashboard/summary");
    if (res.data) {
      // Enrich backend data with asset recovery metrics if available
      return {
        data: {
          ...MOCK_SUMMARY,
          totalCases: res.data.totalCases || MOCK_SUMMARY.totalCases,
          byStatus: res.data.byStatus || MOCK_SUMMARY.byStatus,
          byCrimeType: res.data.byCrimeType || MOCK_SUMMARY.byCrimeType,
        },
        isMock: false,
      };
    }
  } catch (err) {
    console.warn("Backend API offline, menggunakan summary analitik mock:", err.message);
  }
  return { data: MOCK_SUMMARY, isMock: true };
};

export const createCase = async (caseData) => {
  try {
    const res = await apiClient.post("/cases", caseData);
    return { data: res.data, success: true, isMock: false };
  } catch (err) {
    console.warn("Saving to local mock state:", err.message);
    const newCase = {
      id: Date.now(),
      caseNumber: caseData.caseNumber || `PRINT-${Math.floor(Math.random() * 90 + 10)}/M.3.20/Fd.1/2026`,
      title: caseData.title || "Kasus Pidsus Baru",
      crimeType: caseData.crimeType || "Tindak Pidana Korupsi",
      status: caseData.status || "Penyelidikan",
      description: caseData.description || "",
      reportedDate: caseData.reportedDate || new Date().toISOString().split("T")[0],
      stateLoss: Number(caseData.stateLoss) || 0,
      recoveredAmount: Number(caseData.recoveredAmount) || 0,
      prosecutorTeam: caseData.prosecutorTeam || "Tim Penyidik Pidsus",
      suspects: [],
      evidences: [],
      caseStages: [{ id: Date.now(), stageName: "Penyelidikan (P-2)", startDate: new Date().toISOString().split("T")[0], status: "Berjalan" }],
    };
    localMockCases = [newCase, ...localMockCases];
    return { data: newCase, success: true, isMock: true };
  }
};

export const updateCase = async (id, caseData) => {
  try {
    const res = await apiClient.put(`/cases/${id}`, caseData);
    return { data: res.data, success: true, isMock: false };
  } catch (err) {
    localMockCases = localMockCases.map((c) => (c.id === Number(id) ? { ...c, ...caseData } : c));
    return { success: true, isMock: true };
  }
};

export const deleteCase = async (id) => {
  try {
    await apiClient.delete(`/cases/${id}`);
    return { success: true, isMock: false };
  } catch (err) {
    localMockCases = localMockCases.filter((c) => c.id !== Number(id));
    return { success: true, isMock: true };
  }
};
