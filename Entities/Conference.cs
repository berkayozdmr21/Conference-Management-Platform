namespace ConferenceApi.Entities
{
    public class Conference
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Location { get; set; }

        public ICollection<Speaker> Speakers { get; set; }
        public ICollection<ConferenceTopic> Topics { get; set; }
        public ICollection<ImportantDate> ImportantDates { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}