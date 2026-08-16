namespace ConferenceApi.Entities
{
    public class Participant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UniversityOrCompany { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}