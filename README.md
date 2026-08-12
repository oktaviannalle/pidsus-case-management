# ⚖️ Sistem Manajemen Kasus Pidsus (Kejaksaan Negeri Salatiga)

![.NET Backend CI](https://github.com/oktaviannalle/pidsus-case-management/actions/workflows/dotnet-build.yml/badge.svg)
![React Frontend CI](https://github.com/oktaviannalle/pidsus-case-management/actions/workflows/react-build.yml/badge.svg)
![License](https://img.shields.io/badge/License-MIT-emerald.svg)
![Architecture](https://img.shields.io/badge/Architecture-Clean%20Monorepo-blue.svg)

> ⚠️ **Disclaimer:** Project ini adalah rekonstruksi portofolio personal yang terinspirasi dari pengalaman magang penulis di divisi Pidsus, Kejaksaan Negeri Salatiga (Februari–Mei 2019). Seluruh data yang ditampilkan (nomor perkara, nama, kasus) adalah **data fiktif/dummy** untuk keperluan demonstrasi portofolio.

---

## 🌟 Fitur Utama (Enterprise Features)

- **📌 Manajemen Perkara Pidsus:** CRUD data kasus (nomor perkara PRINT, judul, jenis tindak pidana, status persuratan, estimasi kerugian negara, dan nilai aset disita).
- **⚖️ Tahapan Persuratan Prosedural Kejaksaan:** Tracking tahapan legal persuratan (Penyelidikan P-2, Penyidikan P-16, Berkas Lengkap P-21, Penuntutan P-31, dan Eksekusi P-48).
- **🛡️ Role-Based Access Control (RBAC):** Autentikasi multi-peran dengan hak akses terspesialisasi untuk **Kepala Kejaksaan Negeri (Kajari)**, **Admin Seksi Pidsus**, **Ketua Tim Penyidik**, dan **Tamu (Guest Viewer)**.
- **💰 Pelacakan Asset Recovery & Kerugian Negara:** Monitoring estimasi kerugian keuangan negara vs. uang pengganti/aset disita yang berhasil direcovery.
- **📦 Gudang & Rantai Penjagaan Barang Bukti (*Chain of Custody*):** Manajemen fisik lokasi penyimpanan barang bukti (Rak/Gudang BB Kejari Salatiga).
- **🖨️ Generator Laporan Eksekutif Bulanan:** Format cetak laporan rekapitulasi perkara resmi lengkap dengan Kop Surat Kejaksaan Negeri Salatiga dan lembar pengesahan Kajari.
- **⚡ Hybrid Fallback Engine:** Sistem dapat beroperasi secara penuh baik menggunakan **ASP.NET Core REST API (PostgreSQL)** maupun **Hybrid Demo Fallback State** (siap untuk live hosting di Vercel/Netlify).

---

## 🏛️ Arsitektur Monorepo

Repository ini disusun mengikuti standar **Enterprise Clean Architecture Monorepo**:

```
pidsus-case-management/
├── .github/workflows/         # CI/CD Workflows (GitHub Actions)
├── docs/                      # Technical Documentation & User Guides
│   ├── ARCHITECTURE.md        # Architecture & Layering Specs
│   └── USER_GUIDE.md          # User Guide & Login Credentials
├── backend/                   # ASP.NET Core 8 Web API
│   ├── Controllers/           # API Presentation Layer
│   ├── Core/Models/           # Domain Entities (Case, Suspect, Evidence)
│   └── Data/                  # DbContext & Automatic Initializer Seeder
└── frontend/                  # React (Vite) Single Page Application
    ├── src/
    │   ├── components/layout/ # Sidebar, Navbar
    │   ├── components/modals/ # CaseDetailModal, CaseFormModal
    │   ├── components/ui/     # StatCard, ProtectedRoute
    │   ├── context/           # AuthContext & Session Provider
    │   ├── pages/             # Dashboard, Cases, Evidences, Reports, Login
    │   └── services/          # API Services & Client Integration Layer
    └── public/                # Logo Kejaksaan RI & Public Assets
```

---

## 💻 Tech Stack

### **Back-End**
- **Framework:** ASP.NET Core Web API (.NET 8.0)
- **ORM:** Entity Framework Core 8.0
- **Database:** PostgreSQL 15+ (Npgsql Provider)
- **API Spec:** OpenAPI / Swagger UI

### **Front-End**
- **Framework:** React 19 (Vite Build Tool)
- **Design System:** Custom Adhyaksa Corporate CSS Tokens
- **Iconography:** Lucide React
- **Data Visualizations:** Recharts
- **Routing & Auth:** React Router DOM v7 & Auth Context API

---

## 🚀 Cara Menjalankan Project Lokal

### 1. Clone repository
```bash
git clone https://github.com/oktaviannalle/pidsus-case-management.git
cd pidsus-case-management
```

### 2. Menjalankan Frontend
```bash
cd frontend
npm install
npm run dev
```
Aplikasi berjalan di `http://localhost:5173`.

### 3. Menjalankan Backend (Opsional)
```bash
cd ../backend
dotnet restore
dotnet run
```
Backend berjalan di `http://localhost:5118`, Swagger UI di `/swagger`.

---

## 📖 Dokumentasi Lengkap

- 📌 [Panduan Arsitektur & Layering System (`docs/ARCHITECTURE.md`)](file:///c:/Users/User/Documents/pidsus-case-management/docs/ARCHITECTURE.md)
- 📌 [Panduan Penggunaan Sistem (`docs/USER_GUIDE.md`)](file:///c:/Users/User/Documents/pidsus-case-management/docs/USER_GUIDE.md)

---

## 👨‍💻 Penulis & Kontak

**Oktavian Alle, S.H.**  
[LinkedIn](https://linkedin.com/in/oktaviannalle) · oktaviannalle@gmail.com  
*Rekonstruksi Pengalaman Magang Seksi Pidsus, Kejaksaan Negeri Salatiga*
