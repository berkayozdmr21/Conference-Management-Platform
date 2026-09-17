namespace ConferenceApi.Entities
{
    public class Participant
    {
        public int Id { get; set; }

        // Hangi basvurudan olustu (Approved olan basvuru buraya aktarilir)
        public int? SubmissionId { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string UniversityOrCompany { get; set; }

        public string? Country { get; set; }
        public string? StudyTitle { get; set; }
        public string? ParticipationType { get; set; }
        public string? Session { get; set; }

        // Ziyaretci tarafinda gorunsun mu
        public bool Published { get; set; } = true;

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
    }
}
