using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.Entities
{
    public class Submission
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }=string.Empty;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }= string.Empty;

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }=string.Empty ;

        [Required]
        [MaxLength(50)]
        public string Country { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string StudyTitle { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Session { get; set; }=string.Empty;

        [Required]
        [MaxLength(50)]
        public string ParticipationType { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string FilePath { get; set; } = string.Empty;

       
        [MaxLength(20)]
        public string Status { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}