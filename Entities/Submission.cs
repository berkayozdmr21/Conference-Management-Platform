namespace ConferenceApi.Entities
{
    public class Submission
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string StudyTitle { get; set; }
        public string Session { get; set; }
        public string ParticipationType { get; set; }
        public string FilePath { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}