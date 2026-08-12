using PidsusAPI.Models;

namespace PidsusAPI.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // Clear old dummy single case if exists or seed if empty
            if (context.Cases.Count() > 1) return;

            if (context.Cases.Any())
            {
                context.Cases.RemoveRange(context.Cases);
                context.SaveChanges();
            }

            var cases = new List<Case>
            {
                new Case
                {
                    CaseNumber = "PRINT-04/M.3.20/Fd.1/03/2024",
                    Title = "Dugaan Korupsi Pengadaan Alat Kesehatan RSUD Salatiga TA 2023",
                    CrimeType = "Tindak Pidana Korupsi (Pengadaan)",
                    Status = "Penyidikan (P-21)",
                    Description = "Indikasi mark-up harga dan perbuatan melawan hukum pada pengadaan alat CT-Scan & Ventilator RSUD Salatiga yang merugikan keuangan negara.",
                    ReportedDate = DateTime.SpecifyKind(new DateTime(2024, 3, 15), DateTimeKind.Utc),
                    CreatedAt = DateTime.UtcNow,
                    Suspects = new List<Suspect>
                    {
                        new Suspect { FullName = "Drs. Bambang Haryono, M.Kes", NIK = "3373011204680001", Address = "Jl. Diponegoro No. 45, Salatiga", PhoneNumber = "081234567890" },
                        new Suspect { FullName = "Ir. Setyo Utomo", NIK = "3373021809720003", Address = "Jl. Veteran No. 12, Semarang", PhoneNumber = "081198765432" }
                    },
                    Evidences = new List<Evidence>
                    {
                        new Evidence { Name = "1 Unit Mobil Toyota Fortuner 2.8 VRZ AB 1234 CD", Type = "Kendaraan Bermotor", StorageLocation = "Gudang BB Kejari Salatiga - Area A", Status = "Disita", CollectedDate = DateTime.SpecifyKind(new DateTime(2024, 4, 10), DateTimeKind.Utc) },
                        new Evidence { Name = "Sertifikat Tanah Hak Milik (SHM) No. 402/Sidorejo 450 m2", Type = "Dokumen / Sertifikat", StorageLocation = "Brankas Barang Bukti Utama - Kejari Salatiga", Status = "Disita", CollectedDate = DateTime.SpecifyKind(new DateTime(2024, 4, 12), DateTimeKind.Utc) }
                    },
                    CaseStages = new List<CaseStage>
                    {
                        new CaseStage { StageName = "Penyelidikan (P-2)", StartDate = DateTime.SpecifyKind(new DateTime(2024, 1, 10), DateTimeKind.Utc), EndDate = DateTime.SpecifyKind(new DateTime(2024, 3, 14), DateTimeKind.Utc), Status = "Selesai", Notes = "LHP menemukan temuan awal." },
                        new CaseStage { StageName = "Penyidikan (P-16)", StartDate = DateTime.SpecifyKind(new DateTime(2024, 3, 15), DateTimeKind.Utc), EndDate = DateTime.SpecifyKind(new DateTime(2024, 6, 1), DateTimeKind.Utc), Status = "Selesai", Notes = "Pemeriksaan 14 saksi & ahli BPKP." },
                        new CaseStage { StageName = "P-21 Berkas Lengkap", StartDate = DateTime.SpecifyKind(new DateTime(2024, 6, 2), DateTimeKind.Utc), Status = "Berjalan", Notes = "Penyerahan Tahap II." }
                    }
                },
                new Case
                {
                    CaseNumber = "PRINT-01/M.3.20/Fd.1/01/2024",
                    Title = "Penyalahgunaan Dana Hibah Karang Taruna Kota Salatiga TA 2022-2023",
                    CrimeType = "Tindak Pidana Korupsi (Dana Hibah)",
                    Status = "Penuntutan (P-31)",
                    Description = "Penggelembungan nota pertanggungjawaban dan kegiatan fiktif dalam penyaluran dana hibah kepemudaan.",
                    ReportedDate = DateTime.SpecifyKind(new DateTime(2024, 1, 20), DateTimeKind.Utc),
                    CreatedAt = DateTime.UtcNow,
                    Suspects = new List<Suspect>
                    {
                        new Suspect { FullName = "Agus Pratama, S.E.", NIK = "3373030510800005", Address = "Jl. Osamaliki No. 88, Salatiga", PhoneNumber = "085640123987" }
                    },
                    Evidences = new List<Evidence>
                    {
                        new Evidence { Name = "Uang Tunai Rp 450.000.000 (Pengembalian Kerugian Negara)", Type = "Uang Tunai", StorageLocation = "Rekening Penampungan RPL Kejari Salatiga", Status = "Disita", CollectedDate = DateTime.SpecifyKind(new DateTime(2024, 2, 15), DateTimeKind.Utc) }
                    },
                    CaseStages = new List<CaseStage>
                    {
                        new CaseStage { StageName = "Penyelidikan (P-2)", StartDate = DateTime.SpecifyKind(new DateTime(2024, 1, 5), DateTimeKind.Utc), EndDate = DateTime.SpecifyKind(new DateTime(2024, 1, 19), DateTimeKind.Utc), Status = "Selesai", Notes = "Ditemukan selisih kas fisik." },
                        new CaseStage { StageName = "Penuntutan (P-31)", StartDate = DateTime.SpecifyKind(new DateTime(2024, 4, 15), DateTimeKind.Utc), Status = "Berjalan", Notes = "Sidang PN Tipikor." }
                    }
                },
                new Case
                {
                    CaseNumber = "PRINT-08/M.3.20/Fd.2/06/2024",
                    Title = "Dugaan TPPU pada Transaksi Rekening Fiktif Lembaga Keuangan Mikro",
                    CrimeType = "Pencucian Uang (TPPU)",
                    Status = "Penyelidikan",
                    Description = "Investigasi perputaran dana hasil kejahatan pencucian uang menggunakan rekening nominee.",
                    ReportedDate = DateTime.SpecifyKind(new DateTime(2024, 6, 5), DateTimeKind.Utc),
                    CreatedAt = DateTime.UtcNow,
                    Suspects = new List<Suspect>
                    {
                        new Suspect { FullName = "Hendra Wijaya, S.T.", NIK = "3373041211780002", Address = "Kavling Argomulyo Blok C4, Salatiga", PhoneNumber = "081322334455" }
                    },
                    Evidences = new List<Evidence>
                    {
                        new Evidence { Name = "45 Potong Perhiasan Emas Logam Mulia (Total 500 Gram)", Type = "Logam Mulia / Emas", StorageLocation = "Brankas Utama Kejari Salatiga", Status = "Disita", CollectedDate = DateTime.SpecifyKind(new DateTime(2024, 6, 18), DateTimeKind.Utc) }
                    },
                    CaseStages = new List<CaseStage>
                    {
                        new CaseStage { StageName = "Penyelidikan (P-2)", StartDate = DateTime.SpecifyKind(new DateTime(2024, 6, 5), DateTimeKind.Utc), Status = "Berjalan", Notes = "Asset tracing PPATK." }
                    }
                },
                new Case
                {
                    CaseNumber = "PRINT-02/M.3.20/Fd.1/02/2023",
                    Title = "Korupsi Alokasi Dana Kelurahan (ADK) Bugel Salatiga TA 2022",
                    CrimeType = "Tindak Pidana Korupsi (Dana Desa)",
                    Status = "Eksekusi (P-48)",
                    Description = "Penggelapan anggaran alokasi fasilitas fisik sarana prasarana warga Kelurahan Bugel.",
                    ReportedDate = DateTime.SpecifyKind(new DateTime(2023, 2, 10), DateTimeKind.Utc),
                    CreatedAt = DateTime.UtcNow,
                    Suspects = new List<Suspect>
                    {
                        new Suspect { FullName = "Slamet Rahardjo", NIK = "3373010101650009", Address = "Kel. Bugel Kec. Sidorejo, Salatiga", PhoneNumber = "087700112233" }
                    },
                    Evidences = new List<Evidence>
                    {
                        new Evidence { Name = "Laptop Lenovo ThinkPad L14 & Data Anggaran", Type = "Elektronik / IT", StorageLocation = "Arsip Penyimpanan Barang Bukti", Status = "Dirampas Negara", CollectedDate = DateTime.SpecifyKind(new DateTime(2023, 3, 1), DateTimeKind.Utc) }
                    },
                    CaseStages = new List<CaseStage>
                    {
                        new CaseStage { StageName = "Pelaksanaan Putusan Hakim (P-48)", StartDate = DateTime.SpecifyKind(new DateTime(2023, 12, 1), DateTimeKind.Utc), EndDate = DateTime.SpecifyKind(new DateTime(2023, 12, 10), DateTimeKind.Utc), Status = "Selesai", Notes = "Eksekusi pidana badan & pengembalian kerugian negara." }
                    }
                },
                new Case
                {
                    CaseNumber = "PRINT-05/M.3.20/Fd.1/04/2024",
                    Title = "Dugaan Manipulasi Pajak Hiburan & Hotel Kota Salatiga",
                    CrimeType = "Tindak Pidana Perpajakan",
                    Status = "Penyidikan (P-16)",
                    Description = "Pengurangan secara tidak sah pada pelaporan omset pajak hiburan usaha hotel.",
                    ReportedDate = DateTime.SpecifyKind(new DateTime(2024, 4, 18), DateTimeKind.Utc),
                    CreatedAt = DateTime.UtcNow,
                    Suspects = new List<Suspect>
                    {
                        new Suspect { FullName = "Linda Susanti", NIK = "3373024407820004", Address = "Jl. Sukowati No. 19, Salatiga", PhoneNumber = "081299887766" }
                    },
                    Evidences = new List<Evidence>
                    {
                        new Evidence { Name = "3 Set Mesin POS Kasir Digital Touchscreen", Type = "Elektronik / IT", StorageLocation = "Gudang BB Kejari Salatiga - Rak B1", Status = "Disita", CollectedDate = DateTime.SpecifyKind(new DateTime(2024, 5, 2), DateTimeKind.Utc) }
                    },
                    CaseStages = new List<CaseStage>
                    {
                        new CaseStage { StageName = "Surat Perintah Penyidikan (P-16)", StartDate = DateTime.SpecifyKind(new DateTime(2024, 5, 11), DateTimeKind.Utc), Status = "Berjalan", Notes = "Audit Inspektorat." }
                    }
                }
            };

            context.Cases.AddRange(cases);
            context.SaveChanges();
        }
    }
}
