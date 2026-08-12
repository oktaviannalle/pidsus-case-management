export const MOCK_CASES = [
  {
    id: 1,
    caseNumber: "PRINT-04/M.3.20/Fd.1/03/2024",
    title: "Dugaan Korupsi Pengadaan Alat Kesehatan RSUD Salatiga TA 2023",
    crimeType: "Korupsi (Pengadaan Barang/Jasa)",
    status: "Penyidikan (P-21)",
    description: "Indikasi mark-up harga dan perbuatan melawan hukum pada pengadaan alat CT-Scan & Ventilator RSUD Salatiga yang merugikan keuangan negara.",
    reportedDate: "2024-03-15",
    stateLoss: 1850000000,
    recoveredAmount: 1200000000,
    prosecutorTeam: "Tim Penyidik P-16 A (Ketua: Wahyu Hidayat, S.H., M.H.)",
    suspects: [
      {
        id: 101,
        fullName: "Drs. Bambang Haryono, M.Kes",
        nik: "3373011204680001",
        address: "Jl. Diponegoro No. 45, Salatiga",
        phoneNumber: "081234567890",
        detentionStatus: "Ditahan di Rutan Kelas IIB Salatiga"
      },
      {
        id: 102,
        fullName: "Ir. Setyo Utomo",
        nik: "3373021809720003",
        address: "Jl. Veteran No. 12, Semarang",
        phoneNumber: "081198765432",
        detentionStatus: "Tahanan Kota"
      }
    ],
    evidences: [
      {
        id: 201,
        name: "1 Unit Mobil Toyota Fortuner 2.8 VRZ AB 1234 CD",
        type: "Kendaraan Bermotor",
        storageLocation: "Gudang BB Kejari Salatiga - Area A",
        status: "Disita",
        collectedDate: "2024-04-10"
      },
      {
        id: 202,
        name: "Sertifikat Tanah Hak Milik (SHM) No. 402/Sidorejo 450 m2",
        type: "Dokumen / Sertifikat",
        storageLocation: "Brankas Barang Bukti Utama - Kejari Salatiga",
        status: "Disita",
        collectedDate: "2024-04-12"
      },
      {
        id: 203,
        name: "Bundel Dokumen Kontrak & Berita Acara Serah Terima (BAST) Alat Kesehatan",
        type: "Dokumen Administrasi",
        storageLocation: "Gudang BB Kejari Salatiga - Rak B3",
        status: "Disita",
        collectedDate: "2024-03-20"
      }
    ],
    caseStages: [
      { id: 301, stageName: "Penyelidikan (P-2)", startDate: "2024-01-10", endDate: "2024-03-14", status: "Selesai", notes: "Laporan Hasil Penyelidikan (LHP) menemukan indikasi awal tindak pidana." },
      { id: 302, stageName: "Surat Perintah Penyidikan (P-16)", startDate: "2024-03-15", endDate: "2024-06-01", status: "Selesai", notes: "Pemeriksaan 14 saksi & 2 ahli keuangan negara (BPKP)." },
      { id: 303, stageName: "Pemberitahuan Berkas Lengkap (P-21)", startDate: "2024-06-02", endDate: "2024-06-15", status: "Selesai", notes: "Penyerahan tersangka & barang bukti (Tahap II) dari penyidik ke JPU." },
      { id: 304, stageName: "Pelimpahan Perkara ke PN/Tipikor (P-31)", startDate: "2024-06-16", endDate: null, status: "Berjalan", notes: "Penyusunan Surat Dakwaan oleh Tim JPU Pidsus." }
    ]
  },
  {
    id: 2,
    caseNumber: "PRINT-01/M.3.20/Fd.1/01/2024",
    title: "Penyalahgunaan Dana Hibah Karang Taruna Kota Salatiga TA 2022-2023",
    crimeType: "Korupsi (Penyalahgunaan Wewenang)",
    status: "Penuntutan (P-31)",
    description: "Penggelembungan nota pertanggungjawaban dan kegiatan fiktif dalam penyaluran dana hibah kepemudaan.",
    reportedDate: "2024-01-20",
    stateLoss: 450000000,
    recoveredAmount: 450000000,
    prosecutorTeam: "Tim JPU Pidsus (Ketua: Anita Rahayu, S.H.)",
    suspects: [
      {
        id: 103,
        fullName: "Agus Pratama, S.E.",
        nik: "3373030510800005",
        address: "Jl. Osamaliki No. 88, Salatiga",
        phoneNumber: "085640123987",
        detentionStatus: "Ditahan di Rutan Kelas IIB Salatiga"
      }
    ],
    evidences: [
      {
        id: 204,
        name: "Uang Tunai Rp 450.000.000 (Pengembalian Kerugian Negara)",
        type: "Uang Tunai",
        storageLocation: "Rekening Penampungan RPL Kejari Salatiga (Bank Jateng)",
        status: "Titipan / Disita",
        collectedDate: "2024-02-15"
      },
      {
        id: 205,
        name: "15 Berkas Nota & LPJ Fiktif Pengadaan Seragam dan Pelatihan",
        type: "Dokumen Administrasi",
        storageLocation: "Gudang BB Kejari Salatiga - Rak A1",
        status: "Disita",
        collectedDate: "2024-01-25"
      }
    ],
    caseStages: [
      { id: 305, stageName: "Penyelidikan (P-2)", startDate: "2024-01-05", endDate: "2024-01-19", status: "Selesai", notes: "Ditemukan selisih kas fisik dan laporan LPJ." },
      { id: 306, stageName: "Penyidikan (P-16)", startDate: "2024-01-20", endDate: "2024-03-30", status: "Selesai", notes: "Tersangka mengembalikan seluruh kerugian negara." },
      { id: 307, stageName: "P-21 (Berkas P-21)", startDate: "2024-04-01", endDate: "2024-04-10", status: "Selesai", notes: "Tahap II selesai diserahkan ke JPU." },
      { id: 308, stageName: "Penuntutan di PN Tipikor Semarang (P-31)", startDate: "2024-04-15", endDate: null, status: "Berjalan", notes: "Sidang pembacaan surat dakwaan." }
    ]
  },
  {
    id: 3,
    caseNumber: "PRINT-08/M.3.20/Fd.2/06/2024",
    title: "Dugaan TPPU pada Transaksi Rekening Fiktif Lembaga Keuangan Mikro",
    crimeType: "Pencucian Uang (TPPU)",
    status: "Penyelidikan",
    description: "Investigasi perputaran dana hasil kejahatan pencucian uang menggunakan rekening nominee atas nama warga lokal.",
    reportedDate: "2024-06-05",
    stateLoss: 3200000000,
    recoveredAmount: 800000000,
    prosecutorTeam: "Tim Intel-Pidsus Gabungan (Ketua: Tri Nugroho, S.H.)",
    suspects: [
      {
        id: 104,
        fullName: "Hendra Wijaya, S.T.",
        nik: "3373041211780002",
        address: "Kavling Argomulyo Blok C4, Salatiga",
        phoneNumber: "081322334455",
        detentionStatus: "Wajib Lapor / Belum Ditahan"
      }
    ],
    evidences: [
      {
        id: 206,
        name: "45 Potong Perhiasan Emas Logam Mulia (Total 500 Gram)",
        type: "Logam Mulia / Emas",
        storageLocation: "Brankas Utama Kejari Salatiga",
        status: "Disita",
        collectedDate: "2024-06-18"
      },
      {
        id: 207,
        name: "1 Unit Motor Sport Ducati Monster 821 Tahun 2021",
        type: "Kendaraan Bermotor",
        storageLocation: "Gudang BB Kejari Salatiga - Area A",
        status: "Disita",
        collectedDate: "2024-06-20"
      }
    ],
    caseStages: [
      { id: 309, stageName: "Penyelidikan (P-2)", startDate: "2024-06-05", endDate: null, status: "Berjalan", notes: "Koordinasi dengan PPATK untuk penelusuran aset (asset tracing)." }
    ]
  },
  {
    id: 4,
    caseNumber: "PRINT-02/M.3.20/Fd.1/02/2023",
    title: "Korupsi Alokasi Dana Kelurahan (ADK) Bugel Salatiga TA 2022",
    crimeType: "Korupsi (Dana Desa/Kelurahan)",
    status: "Eksekusi (P-48)",
    description: "Penggelapan anggaran alokasi fasilitas fisik sarana prasarana warga Kelurahan Bugel.",
    reportedDate: "2023-02-10",
    stateLoss: 280000000,
    recoveredAmount: 280000000,
    prosecutorTeam: "Tim Eksekutor Pidsus (Ketua: Bambang H., S.H.)",
    suspects: [
      {
        id: 105,
        fullName: "Slamet Rahardjo",
        nik: "3373010101650009",
        address: "Kel. Bugel Kec. Sidorejo, Salatiga",
        phoneNumber: "087700112233",
        detentionStatus: "Terpidana (Lembaga Pemasyarakatan Ambarawa)"
      }
    ],
    evidences: [
      {
        id: 208,
        name: "Laptop Lenovo ThinkPad L14 & Flashdisk 64GB Data Anggaran",
        type: "Elektronik / IT",
        storageLocation: "Arsip Penyimpanan Barang Bukti",
        status: "Dirampas untuk Negara",
        collectedDate: "2023-03-01"
      }
    ],
    caseStages: [
      { id: 310, stageName: "Penyelidikan (P-2)", startDate: "2023-02-10", endDate: "2023-03-01", status: "Selesai", notes: "Penyelidikan awal." },
      { id: 311, stageName: "Penyidikan (P-16)", startDate: "2023-03-02", endDate: "2023-06-15", status: "Selesai", notes: "Penyidikan selesai." },
      { id: 312, stageName: "Penuntutan (P-31)", startDate: "2023-06-16", endDate: "2023-11-20", status: "Selesai", notes: "Putusan PN Tipikor berkekuatan hukum tetap." },
      { id: 313, stageName: "Pelaksanaan Putusan Hakim (P-48)", startDate: "2023-12-01", endDate: "2023-12-10", status: "Selesai", notes: "Eksekusi pidana badan & penyetoran uang pengganti ke kas negara." }
    ]
  },
  {
    id: 5,
    caseNumber: "PRINT-05/M.3.20/Fd.1/04/2024",
    title: "Dugaan Manipulasi Pajak Hiburan & Hotel Kota Salatiga",
    crimeType: "Tindak Pidana Perpajakan",
    status: "Penyidikan (P-16)",
    description: "Pengurangan secara tidak sah pada pelaporan omset pajak hiburan usaha hotel & karaoke keluarga.",
    reportedDate: "2024-04-18",
    stateLoss: 920000000,
    recoveredAmount: 300000000,
    prosecutorTeam: "Tim Penyidik Pidsus (Ketua: Wahyu Hidayat, S.H.)",
    suspects: [
      {
        id: 106,
        fullName: "Linda Susanti",
        nik: "3373024407820004",
        address: "Jl. Sukowati No. 19, Salatiga",
        phoneNumber: "081299887766",
        detentionStatus: "Tahanan Rumah"
      }
    ],
    evidences: [
      {
        id: 209,
        name: "3 Set Mesin POS Kasir Digital Touchscreen & Thermal Printer",
        type: "Elektronik / IT",
        storageLocation: "Gudang BB Kejari Salatiga - Rak B1",
        status: "Disita",
        collectedDate: "2024-05-02"
      },
      {
        id: 210,
        name: "Harddisk External Western Digital 2TB Database Penjualan Sampingan",
        type: "Elektronik / IT",
        storageLocation: "Brankas Barang Bukti Utama",
        status: "Disita",
        collectedDate: "2024-05-02"
      }
    ],
    caseStages: [
      { id: 314, stageName: "Penyelidikan (P-2)", startDate: "2024-04-18", endDate: "2024-05-10", status: "Selesai", notes: "Pemeriksaan saksi ahli perpajakan daerah." },
      { id: 315, stageName: "Surat Perintah Penyidikan (P-16)", startDate: "2024-05-11", endDate: null, status: "Berjalan", notes: "Audit kerugian daerah oleh Inspektorat." }
    ]
  }
];

export const MOCK_SUMMARY = {
  totalCases: 5,
  activeCases: 3,
  inkrachtCases: 1,
  totalStateLoss: 6700000000,
  totalRecoveredAmount: 3030000000,
  totalEvidences: 10,
  byStatus: [
    { status: "Penyelidikan", count: 1, color: "#F59E0B" },
    { status: "Penyidikan (P-16)", count: 1, color: "#3B82F6" },
    { status: "Penyidikan (P-21)", count: 1, color: "#6366F1" },
    { status: "Penuntutan (P-31)", count: 1, color: "#8B5CF6" },
    { status: "Eksekusi (P-48)", count: 1, color: "#10B981" }
  ],
  byCrimeType: [
    { crimeType: "Korupsi (Pengadaan)", count: 1, amount: 1850000000 },
    { crimeType: "Korupsi (Wewenang)", count: 1, amount: 450000000 },
    { crimeType: "Korupsi (Dana Desa)", count: 1, amount: 280000000 },
    { crimeType: "Pencucian Uang (TPPU)", count: 1, amount: 3200000000 },
    { crimeType: "Perpajakan", count: 1, amount: 920000000 }
  ]
};
