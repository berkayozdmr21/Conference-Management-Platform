using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    public class ConferenceCreateDto
    {
        [Required, MaxLength(200)]
        public string Title { get; set; }

        [Required, MaxLength(2000)]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required, MaxLength(150)]
        public string Location { get; set; }
    }
}