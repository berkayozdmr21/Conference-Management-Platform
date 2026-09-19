using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    public class SubmissionCreateDto
    {
        [Required, MaxLength(80)]
        public string FirstName { get; set; }

        [Required, MaxLength(80)]
        public string LastName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, MaxLength(80)]
        public string Country { get; set; }

        [Required, MaxLength(250)]
        public string Title { get; set; }

        [Required, MaxLength(120)]
        public string Session { get; set; }

        [Required]
        public string ParticipationType { get; set; }

        [MaxLength(1000)]
        public string? Abstract { get; set; }
    }
}