using System.ComponentModel.DataAnnotations.Schema;

namespace PidsusAPI.Models
{
    public class CaseStage
    {
        public int Id { get; set; }

        public string StageName { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? Notes { get; set; }

        public string Status { get; set; } = "Berjalan";

        public int CaseId { get; set; }

        [ForeignKey("CaseId")]
        public Case? Case { get; set; }
    }
}