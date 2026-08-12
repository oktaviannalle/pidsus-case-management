using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PidsusAPI.Models
{
    public class Evidence
    {
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Type { get; set; }

        public string? StorageLocation { get; set; }

        public string Status { get; set; } = "Disimpan";

        public DateTime CollectedDate { get; set; }

        public int CaseId { get; set; }

        [ForeignKey("CaseId")]
        public Case? Case { get; set; }
    }
}