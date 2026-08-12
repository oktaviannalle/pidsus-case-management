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
    if (res.data && res.data.totalCases > 0) {
      return {
        data: {
          totalCases: res.data.totalCases,
          totalStateLoss: res.data.totalStateLoss || 0,
          totalRecoveredAmount: res.data.totalRecoveredAmount || 0,
          totalEvidences: res.data.totalEvidences || 0,
          byStatus: res.data.byStatus || MOCK_SUMMARY.byStatus,
          byCrimeType: res.data.byCrimeType || MOCK_SUMMARY.byCrimeType,
        },
        isMock: false,
      };
    }
  } catch (err) {
    console.warn("Backend API offline, menggunakan summary analitik mock:", err.message);
  }

  // Calculate dynamic mock summary if backend offline
  const totalStateLoss = localMockCases.reduce((sum, c) => sum + (Number(c.stateLoss) || 0), 0);
  const totalRecoveredAmount = localMockCases.reduce((sum, c) => sum + (Number(c.recoveredAmount) || 0), 0);
  return {
    data: {
      ...MOCK_SUMMARY,
      totalCases: localMockCases.length,
      totalStateLoss,
      totalRecoveredAmount,
    },
    isMock: true,
  };
};

export const createCase = async (caseData) => {
  const formattedPayload = {
    caseNumber: caseData.caseNumber,
    title: caseData.title,
    crimeType: caseData.crimeType,
    status: caseData.status || "Penyelidikan",
    description: caseData.description || "",
    stateLoss: Number(caseData.stateLoss) || 0,
    recoveredAmount: Number(caseData.recoveredAmount) || 0,
    prosecutorTeam: caseData.prosecutorTeam || "Tim Penyidik Pidsus",
    reportedDate: caseData.reportedDate ? new Date(caseData.reportedDate).toISOString() : new Date().toISOString(),
  };

  try {
    const res = await apiClient.post("/cases", formattedPayload);
    if (res.data) {
      localMockCases = [res.data, ...localMockCases];
      return { data: res.data, success: true, isMock: false };
    }
  } catch (err) {
    console.warn("Backend API error / fallback to local state:", err.message);
  }

  const newCase = {
    id: Date.now(),
    ...formattedPayload,
    suspects: [],
    evidences: [],
    caseStages: [{ id: Date.now(), stageName: "Penyelidikan (P-2)", startDate: new Date().toISOString().split("T")[0], status: "Berjalan" }],
  };
  localMockCases = [newCase, ...localMockCases];
  return { data: newCase, success: true, isMock: true };
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
  } catch (err) {
    console.warn("API delete error:", err.message);
  }
  localMockCases = localMockCases.filter((c) => c.id !== Number(id));
  return { success: true, isMock: true };
};
