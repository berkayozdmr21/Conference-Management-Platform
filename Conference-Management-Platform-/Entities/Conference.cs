namespace ConferenceApi.Entities
{
    public class Conference
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Location { get; set; } = string.Empty;

        public ICollection<Speaker> Speakers { get; set; } = new List<Speaker>();
        public ICollection<ConferenceTopic> Topics { get; set; } = new List<ConferenceTopic>();
        public ICollection<ImportantDate> ImportantDates { get; set; } = new List<ImportantDate>();
        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}