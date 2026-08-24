namespace ConferenceApi.Entities
{
    public class Speaker
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string University { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int ConferenceId { get; set; }
        public Conference Conference { get; set; } = null!;
    }
}