using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    public class ImportantDateCreateDto
    {
        [Required, MaxLength(150)]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }
    }
}