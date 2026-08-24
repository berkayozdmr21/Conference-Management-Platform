namespace ConferenceApi.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public string Title { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;

        public int ConferenceId { get; set; }
        public Conference Conference { get; set; } = null!;
    }
}