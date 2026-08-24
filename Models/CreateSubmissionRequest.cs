using Microsoft.AspNetCore.Http;

namespace ConferenceApi.Models
{
    public class CreateSubmissionRequest
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        public string StudyTitle { get; set; } = string.Empty;

        public string Session { get; set; } = string.Empty;

        public string ParticipationType { get; set; } = string.Empty;

        public IFormFile? File { get; set; }
    }
}