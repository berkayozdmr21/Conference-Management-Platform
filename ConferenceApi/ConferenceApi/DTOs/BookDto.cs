using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public string Title { get; set; }
        public string? Isbn { get; set; }
        public string? FilePath { get; set; }
        public DateTime PublishDate { get; set; }
    }

    // Admin kitap yuklerken gonderir (multipart/form-data, dosya ile birlikte)
    public class BookCreateDto
    {
        [Required(ErrorMessage = "Yil zorunludur.")]
        [Range(1990, 2100, ErrorMessage = "Yil 1990 ile 2100 arasinda olmalidir.")]
        public int Year { get; set; }

        [Required(ErrorMessage = "Baslik zorunludur.")]
        [MaxLength(250)]
        public string Title { get; set; }

        [MaxLength(30)]
        public string? Isbn { get; set; }

        public DateTime? PublishDate { get; set; }
    }
}
