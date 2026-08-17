namespace ConferenceApi.Entities
{
    public class ImportantDate
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
       
        public int ConferenceId { get; set; }
        public Conference Conference { get; set; }
    }
}