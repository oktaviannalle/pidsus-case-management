# Arsitektur Sistem & Spesifikasi Teknis (Clean Monorepo)

Dokumen ini menjelaskan arsitektur perangkat lunak, pola perancangan layer (*layering pattern*), dan alur komunikasi data antara **Front-End React** dan **Back-End ASP.NET Core Web API**.

---

## 🏛️ Pola Arsitektur Sistem

Sistem ini menerapkan pola **Clean Architecture Monorepo** dengan pemisahan tanggung jawab yang jelas (*Separation of Concerns*):

```
┌─────────────────────────────────────────────────────────────┐
│                 React Frontend (Single Page App)            │
│  - Adhyaksa Corporate UI Design System                      │
│  - Recharts Analytics & Visualizations                      │
│  - Role-Based Access Control (RBAC Auth Context)             │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API HTTP / JSON
┌──────────────────────────────▼──────────────────────────────┐
│             ASP.NET Core Web API (Backend Layer)            │
│  - Controllers Layer (Presentation API Endpoints)           │
│  - Core Domain Models Layer (Case, Suspect, Evidence)       │
│  - Infrastructure Layer (EF Core & Npgsql Provider)         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Entity Framework Core (ORM)
┌──────────────────────────────▼──────────────────────────────┐
│                    PostgreSQL Database                      │
│  - Tabular Relational Storage for Pidsus Cases              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Struktur Repository Enterprise

```
pidsus-case-management/
├── .github/workflows/         # Automated CI/CD Pipelines (GitHub Actions)
├── docs/                      # Technical Documentation & Architecture
├── backend/                   # ASP.NET Core 8 Web API
│   ├── Controllers/           # REST Endpoints
│   ├── Core/Models/           # Domain Entities & Business Schema
│   └── Data/                  # DbContext & Automatic Initializer Seeder
└── frontend/                  # React (Vite) Single Page Application
    ├── src/
    │   ├── components/layout/ # Sidebar, Navbar
    │   ├── components/modals/ # CaseDetailModal, CaseFormModal
    │   ├── components/ui/     # StatCard, ProtectedRoute
    │   ├── context/           # AuthContext & Session Provider
    │   ├── pages/             # DashboardPage, CasesPage, EvidencesPage, ReportsPage
    │   └── services/          # API Services & Client Integration Layer
    └── public/                # Assets & Official Logo Kejaksaan RI
```

---

## 🛡️ Hak Akses Peran (Role-Based Access Control)

| Role / Jabatan | Halaman Terbuka | Fitur Tambah/Edit | Mode Akses |
| :--- | :--- | :--- | :--- |
| **Kajari** | `/dashboard`, `/cases`, `/evidences`, `/reports` | ✅ Ya | Full Access |
| **Admin Pidsus** | `/dashboard`, `/cases`, `/evidences` | ✅ Ya | Full Access |
| **Ketua Tim Penyidik** | `/dashboard`, `/cases`, `/evidences` | 🔒 Tidak | Read-Only |
| **Tamu (Guest)** | `/dashboard`, `/cases`, `/reports` | 🔒 Tidak | Read-Only Viewer |
