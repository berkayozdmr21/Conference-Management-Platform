using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    public class SpeakerCreateDto
    {
        [Required, MaxLength(120)]
        public string Name { get; set; }

        [Required, MaxLength(120)]
        public string Title { get; set; }

        [Required, MaxLength(150)]
        public string University { get; set; }

        [Required, MaxLength(80)]
        public string Country { get; set; }

        public string? Photo { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }
    }
}