# Panduan Penggunaan Sistem Manajemen Kasus Pidsus
**Kejaksaan Negeri Salatiga (Seksi Tindak Pidana Khusus)**

---

## 📌 Pengantar
Aplikasi ini adalah rekonstruksi portofolio enterprise dari sistem manajemen kasus Tindak Pidana Khusus (Pidsus) di Kejaksaan Negeri Salatiga. Aplikasi ini mencakup seluruh tahapan penanganan perkara pidana khusus, pengelolaan tersangka, gudang barang bukti (*chain of custody*), pelacakan pemulihan kerugian negara (*asset recovery*), serta pembuatan laporan eksekutif resmi untuk Kepala Kejaksaan Negeri (Kajari).

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Menjalankan Front-End (React + Vite)
Buka terminal di folder `pidsus-frontend`:
```bash
cd pidsus-frontend
npm install      # jika belum memasang node_modules
npm run dev
```
Buka browser di alamat: **`http://localhost:5173`** atau **`http://localhost:5174`**

### 2. Menjalankan Back-End (ASP.NET Core API - Opsional)
Buka terminal di folder `PidsusAPI`:
```bash
cd PidsusAPI
dotnet run
```
*Catatan:* Aplikasi front-end memiliki **Hybrid Fallback Mode**. Jika backend API lokal tidak dinyalakan (misal saat demo Vercel/Netlify), sistem akan otomatis beralih ke data demo interaktif bawaan.

---

## 🔐 Halaman Login & Akses Cepat (Multi-Role)

Sistem dilengkapi dengan **Halaman Login Berkonsep Adhyaksa Corporate** dan fitur **Quick Access Demo**:

1. **Login sebagai Admin Pidsus / Jaksa Utama**
   - **Nama:** Oktavian Alle, S.H.
   - **Akses:** CRUD Penuh (Tambah/Edit/Hapus Perkara, Barang Bukti, Tersangka)
2. **Login sebagai Kajari (Executive View)**
   - **Nama:** Dr. Heru Prasetyo, S.H., M.H.
   - **Akses:** Tampilan Laporan Eksekutif Bulanan & Lembar Pengesahan Resmi
3. **Login sebagai Ketua Tim Penyidik**
   - **Nama:** Wahyu Hidayat, S.H., M.H.
   - **Akses:** Pelacakan Timeline Persuratan (P-16, P-21, P-31)

---

## 📋 Panduan Fitur Utama & Modul

### 1. 📊 Dashboard Analitik Perkara (`/dashboard`)
- **KPI Metrics:** Total Perkara, Estimasi Kerugian Keuangan Negara, Total Asset Recovery (Uang/Aset Disita), dan Total Item di Gudang Barang Bukti.
- **Grafik Batang (Tahapan Persuratan):** Distribusi perkara berdasarkan kode persuratan hukum (Penyelidikan P-2, Penyidikan P-16/P-21, Penuntutan P-31, Eksekusi P-48).
- **Grafik Donut (Jenis Pidana):** Kategori kasus (Korupsi Pengadaan, Korupsi Dana Desa, TPPU, Perpajakan).
- **Tombol Register Perkara Baru:** Membuka modal form untuk pendaftaran kasus baru.

### 2. 📁 Manajemen Perkara (`/cases`)
- **Tabel Data Perkara:** Menampilkan Nomor Perkara (PRINT), Judul, Jenis Pidana, Kerugian Negara, Nilai Aset Disita, dan Status Badge.
- **Pencarian Live & Filter:** Cari kasus secara instan berdasarkan Nomor Perkara/Judul, serta filter berdasarkan Status Persuratan atau Jenis Pidana.
- **Modal Detail Multi-Tab:** Klik tombol **"Detail"** pada baris perkara untuk membuka popup interaktif dengan 4 tab:
  - *Ringkasan Perkara:* Nilai kerugian negara vs. recovery, kronologi, tim penyidik.
  - *Tahapan Persuratan:* Timeline vertikal proses P-16, P-21, P-31.
  - *Daftar Tersangka:* NIK, Alamat, dan Status Penahanan (Rutan/Kota/Rumah).
  - *Barang Bukti:* Item barang bukti disita dan lokasi fisiknya.

### 3. 📦 Gudang Barang Bukti (`/evidences`)
- **Pelacakan Rantai Penjagaan (*Chain of Custody*):** Monitoring lokasi penyimpanan fisik barang bukti (contoh: *Gudang BB Kejari Salatiga - Area A*, *Brankas Utama*, *Rekening Penampungan RPL*).
- **Filter Kategori BB:** Filter berdasarkan Kendaraan, Dokumen/Sertifikat, Uang Tunai, Elektronik/IT, atau Logam Mulia/Emas.

### 4. 🖨️ Laporan & Rekapitulasi Eksekutif (`/reports`)
- **Format Resmi Kejaksaan RI:** Tampilan rekapitulasi perkara dengan Kop Surat resmi *Kejaksaan Negeri Salatiga*.
- **Lembar Pengesahan Tanda Tangan:** Dilengkapi blok tanda tangan Kepala Kejaksaan Negeri Salatiga & Kepala Seksi Pidsus.
- **Fitur Cetak / Simpan PDF:** Klik tombol **"Cetak / Simpan PDF"** untuk mengunduh laporan format cetak resmi.

---

## 📝 Riwayat Commit Git Lengkap
```bash
3ca3ddb feat(auth): implement Adhyaksa login page, auth context, protected routes, and quick access roles
3aa8cdb feat(api): add automatic database seeder with 5 realistic Pidsus demo cases
2b147f8 fix(app): correct react-router-dom import to resolve blank screen
9a571f5 feat(pages): overhaul Dashboard, Cases list, Evidence Vault, and Executive Reports views
4aa893a feat(components): add Sidebar, Navbar, StatCard, CaseDetailModal, and CaseFormModal
587d86e feat(api): add Pidsus domain mock dataset and hybrid fallback service layer
57d223a feat(ui): install lucide-react and implement Adhyaksa Corporate design system
```
