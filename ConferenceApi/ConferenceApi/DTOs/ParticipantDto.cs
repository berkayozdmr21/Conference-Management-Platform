using System.ComponentModel.DataAnnotations;

namespace ConferenceApi.DTOs
{
    public class ParticipantDto
    {
        public int Id { get; set; }
        public int? SubmissionId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UniversityOrCompany { get; set; }
        public string? Country { get; set; }
        public string? StudyTitle { get; set; }
        public string? ParticipationType { get; set; }
        public string? Session { get; set; }
        public bool Published { get; set; }
        public DateTime RegistrationDate { get; set; }
    }

    public class ParticipantCreateDto
    {
        [Required(ErrorMessage = "Ad Soyad zorunludur.")]
        [MaxLength(120)]
        public string Name { get; set; }

        [Required(ErrorMessage = "E-posta zorunludur.")]
        [EmailAddress(ErrorMessage = "Gecerli bir e-posta adresi giriniz.")]
        [MaxLength(150)]
        public string Email { get; set; }

        [MaxLength(200)]
        public string? UniversityOrCompany { get; set; }

        [MaxLength(80)]
        public string? Country { get; set; }

        [MaxLength(250)]
        public string? StudyTitle { get; set; }

        [MaxLength(40)]
        public string? ParticipationType { get; set; }

        [MaxLength(120)]
        public string? Session { get; set; }

        public bool Published { get; set; } = true;
    }
}
