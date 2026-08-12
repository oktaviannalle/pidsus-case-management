using System.ComponentModel.DataAnnotations;

namespace PidsusAPI.Models
{
    public class Case
    {
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string CaseNumber { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string CrimeType { get; set; } = string.Empty;

        public string Status { get; set; } = "Penyelidikan";

        public string? Description { get; set; }

        public decimal StateLoss { get; set; } = 0;

        public decimal RecoveredAmount { get; set; } = 0;

        public string? ProsecutorTeam { get; set; }

        public DateTime ReportedDate { get; set; } = DateTime.UtcNow;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Suspect> Suspects { get; set; } = new List<Suspect>();
        public ICollection<Evidence> Evidences { get; set; } = new List<Evidence>();
        public ICollection<CaseStage> CaseStages { get; set; } = new List<CaseStage>();
    }
}