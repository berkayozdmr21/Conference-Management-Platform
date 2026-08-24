namespace ConferenceApi.Entities
{
    public class Participant
    {
        public int Id { get; set; }
        public int SubmissionId { get; set; }
        public bool Published { get; set; }

        public Submission Submission { get; set; } = null!;
    }
}