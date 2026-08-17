namespace ConferenceApi.Entities
{
    public class Submission
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Abstract { get; set; }
        public string Status { get; set; }
        public int SpeakerId { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}