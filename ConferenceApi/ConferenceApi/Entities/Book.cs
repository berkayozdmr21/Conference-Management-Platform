namespace ConferenceApi.Entities
{
    public class Book
    {
        public int Id { get; set; }

        // Hangi yılın konferans kitabı (2023, 2024, 2025 ...)
        public int Year { get; set; }

        public string Title { get; set; }

        public string? Isbn { get; set; }

        // Yuklenen PDF dosyasinin sunucudaki yolu
        public string? FilePath { get; set; }

        public DateTime PublishDate { get; set; }
    }
}
