namespace ConferenceApi.DTOs
{
    public class SubmissionDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string Title { get; set; }
        public string Session { get; set; }
        public string ParticipationType { get; set; }
        public string? Abstract { get; set; }
        public string? FilePath { get; set; }
        public string Status { get; set; }
        public int? SpeakerId { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}