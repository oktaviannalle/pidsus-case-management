using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PidsusAPI.Models
{
    public class Suspect
    {
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? NIK { get; set; }

        public string? Address { get; set; }

        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        public int CaseId { get; set; }

        [ForeignKey("CaseId")]
        public Case? Case { get; set; }
    }
}