using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Entities;

namespace ConferenceApi.Services
{
    public class SubmissionService : ISubmissionService
    {
        private static readonly string[] AllowedStatuses = { "Pending", "Approved", "Rejected" };
        private readonly ConferenceDbContext _context;

        public SubmissionService(ConferenceDbContext context) => _context = context;

        public async Task<SubmissionDto> CreateAsync(SubmissionCreateDto dto, string? filePath)
        {
            var entity = new Submission
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Country = dto.Country,
                Title = dto.Title,
                Session = dto.Session,
                ParticipationType = dto.ParticipationType,
                Abstract = dto.Abstract,
                FilePath = filePath,
                Status = "Pending",
                SubmittedAt = DateTime.UtcNow
            };

            _context.Submissions.Add(entity);
            await _context.SaveChangesAsync();

            return ToDto(entity);
        }

        public async Task<IEnumerable<SubmissionDto>> GetAllAsync() =>
            await _context.Submissions
                .OrderByDescending(s => s.SubmittedAt)
                .Select(s => ToDto(s))
                .ToListAsync();

        public async Task<SubmissionDto?> GetByIdAsync(int id)
        {
            var entity = await _context.Submissions.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<SubmissionDto?> UpdateStatusAsync(int id, string status)
        {
            if (!AllowedStatuses.Contains(status))
                throw new ArgumentException($"Geçersiz durum: {status}. İzin verilenler: {string.Join(", ", AllowedStatuses)}");

            var entity = await _context.Submissions.FindAsync(id);
            if (entity is null) return null;

            entity.Status = status;
            await _context.SaveChangesAsync();

            return ToDto(entity);
        }

        private static SubmissionDto ToDto(Submission s) => new()
        {
            Id = s.Id,
            FirstName = s.FirstName,
            LastName = s.LastName,
            Email = s.Email,
            Country = s.Country,
            Title = s.Title,
            Session = s.Session,
            ParticipationType = s.ParticipationType,
            Abstract = s.Abstract,
            FilePath = s.FilePath,
            Status = s.Status,
            SpeakerId = s.SpeakerId,
            SubmittedAt = s.SubmittedAt
        };
    }
}