using Microsoft.EntityFrameworkCore;
using PidsusAPI.Models;

namespace PidsusAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Case> Cases { get; set; }
        public DbSet<Suspect> Suspects { get; set; }
        public DbSet<Evidence> Evidences { get; set; }
        public DbSet<CaseStage> CaseStages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Case>()
                .HasMany(c => c.Suspects)
                .WithOne(s => s.Case)
                .HasForeignKey(s => s.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Case>()
                .HasMany(c => c.Evidences)
                .WithOne(e => e.Case)
                .HasForeignKey(e => e.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Case>()
                .HasMany(c => c.CaseStages)
                .WithOne(cs => cs.Case)
                .HasForeignKey(cs => cs.CaseId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}