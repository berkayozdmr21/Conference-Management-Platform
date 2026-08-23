using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    public class SubmissionStatusUpdateDto
    {
        [Required]
        public string Status { get; set; } 
    }
}