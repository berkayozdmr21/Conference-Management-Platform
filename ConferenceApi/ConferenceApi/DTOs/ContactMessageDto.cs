using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    // Disariya donen sekil
    public class ContactMessageDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    // Ziyaretcinin gonderdigi sekil
    public class ContactMessageCreateDto
    {
        [Required(ErrorMessage = "Ad Soyad zorunludur.")]
        [MaxLength(120)]
        public string Name { get; set; }

        [Required(ErrorMessage = "E-posta zorunludur.")]
        [EmailAddress(ErrorMessage = "Gecerli bir e-posta adresi giriniz.")]
        [MaxLength(150)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Konu zorunludur.")]
        [MaxLength(200)]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Mesaj zorunludur.")]
        [MinLength(10, ErrorMessage = "Mesaj en az 10 karakter olmalidir.")]
        [MaxLength(2000)]
        public string Message { get; set; }
    }
}
