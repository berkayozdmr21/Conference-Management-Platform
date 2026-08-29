using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    public class TopicCreateDto
    {
        [Required]
        public int ConferenceId { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; }
    }
}