# Sistem Manajemen Kasus Pidsus

Aplikasi manajemen kasus tindak pidana khusus (Pidsus) berbasis web, dibangun dengan ASP.NET Core Web API, PostgreSQL, dan React. Mencakup pengelolaan data kasus, tersangka, barang bukti, tahapan prosedural, serta dashboard analitik.

> ⚠️ **Disclaimer:** Project ini adalah rekonstruksi personal yang terinspirasi dari pengalaman magang penulis di divisi Pidsus, Kejaksaan Negeri Salatiga. Seluruh data yang ditampilkan (nomor perkara, nama, kasus) adalah **data fiktif/dummy** untuk keperluan demonstrasi portofolio. Ini bukan sistem resmi milik instansi manapun.

## Screenshot

### Daftar Kasus

![Daftar Kasus](screenshots/cases-list.png)

### Dashboard Analitik

![Dashboard Analitik](screenshots/dashboard-analytics.png)

## Fitur Utama

- CRUD data kasus (nomor perkara, judul, jenis tindak pidana, status)
- Manajemen tersangka per kasus
- Manajemen barang bukti (evidence tracking) per kasus
- Tahapan prosedural kasus (Penyelidikan → Penyidikan → Penuntutan → Persidangan)
- Dashboard analitik dengan agregasi data (jumlah kasus per status & jenis tindak pidana) menggunakan LINQ GroupBy
- Navigasi single-page application (SPA) tanpa reload

## Tech Stack

**Backend**

- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- PostgreSQL
- Swagger / OpenAPI

**Frontend**

- React (Vite)
- React Router DOM
- Axios
- Recharts

## Arsitektur

Project ini mengikuti pola **layered architecture** di sisi backend:

React Frontend → Controllers → DbContext (EF Core) → PostgreSQL

- `Models/` — struktur entitas (Case, Suspect, Evidence, CaseStage)
- `Data/` — DbContext, jembatan ke database
- `Controllers/` — REST API endpoints
- `DTOs/` — kontrak data masuk/keluar API

## Cara Menjalankan Project

### Prasyarat

- .NET SDK 8.0+
- PostgreSQL 15+
- Node.js 18+

### 1. Clone repository

```bash
git clone https://github.com/oktaviannalle/pidsus-case-management.git
cd pidsus-case-management
```

### 2. Setup Backend

```bash
cd PidsusAPI
dotnet restore
```

Buat database:

```sql
CREATE DATABASE pidsus_db;
```

Buat file `appsettings.Development.json` (tidak ikut di-commit, harus dibuat manual), isi:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=pidsus_db;Username=postgres;Password="
  }
}
```

Jalankan migration & server:

```bash
dotnet ef database update
dotnet run
```

Backend jalan di `http://localhost:5118` (cek port persis di terminal), Swagger di `/swagger`.

### 3. Setup Frontend

```bash
cd ../pidsus-frontend
npm install
npm run dev
```

Frontend jalan di `http://localhost:5173`.

## API Endpoints

| Method              | Endpoint                 | Deskripsi               |
| ------------------- | ------------------------ | ----------------------- |
| GET                 | `/api/cases`             | Daftar semua kasus      |
| GET                 | `/api/cases/{id}`        | Detail satu kasus       |
| POST                | `/api/cases`             | Buat kasus baru         |
| PUT                 | `/api/cases/{id}`        | Update kasus            |
| DELETE              | `/api/cases/{id}`        | Hapus kasus             |
| GET/POST/PUT/DELETE | `/api/suspects`          | CRUD tersangka          |
| GET/POST/PUT/DELETE | `/api/evidences`         | CRUD barang bukti       |
| GET/POST/PUT/DELETE | `/api/casestages`        | CRUD tahapan kasus      |
| GET                 | `/api/dashboard/summary` | Statistik agregat kasus |

## Pengembangan Selanjutnya

- Autentikasi & otorisasi (JWT, role Admin/Jaksa)
- Pagination & filter/search
- Deployment ke Railway/Render (backend) & Vercel (frontend)

## Kontak

**Oktavian Alle**
[LinkedIn](https://linkedin.com/in/oktaviannalle) · oktaviannalle@gmail.com
