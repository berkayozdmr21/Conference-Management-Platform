using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Entities;

namespace ConferenceApi.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly ConferenceDbContext _context;
        private readonly ILogger<ParticipantService> _logger;

        public ParticipantService(ConferenceDbContext context, ILogger<ParticipantService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<PagedResult<ParticipantDto>> GetPagedAsync(
            int page, int pageSize, string? search, string? country, string? session, bool onlyPublished)
        {
            var query = _context.Participants.AsQueryable();

            if (onlyPublished)
                query = query.Where(p => p.Published);

            if (!string.IsNullOrWhiteSpace(country))
                query = query.Where(p => p.Country == country);

            if (!string.IsNullOrWhiteSpace(session))
                query = query.Where(p => p.Session == session);

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim();
                query = query.Where(p =>
                    p.Name.Contains(term) ||
                    p.Email.Contains(term) ||
                    (p.StudyTitle != null && p.StudyTitle.Contains(term)));
            }

            var total = await query.CountAsync();

            var items = await query
                .OrderBy(p => p.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => ToDto(p))
                .ToListAsync();

            return new PagedResult<ParticipantDto>
            {
                Items = items,
                Page = page,
                PageSize = pageSize,
                TotalCount = total
            };
        }

        public async Task<ParticipantDto?> GetByIdAsync(int id)
        {
            var entity = await _context.Participants.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<ParticipantDto> CreateAsync(ParticipantCreateDto dto)
        {
            var entity = new Participant
            {
                Name = dto.Name.Trim(),
                Email = dto.Email.Trim(),
                UniversityOrCompany = dto.UniversityOrCompany ?? string.Empty,
                Country = dto.Country,
                StudyTitle = dto.StudyTitle,
                ParticipationType = dto.ParticipationType,
                Session = dto.Session,
                Published = dto.Published,
                RegistrationDate = DateTime.UtcNow
            };

            _context.Participants.Add(entity);
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<ParticipantDto?> UpdateAsync(int id, ParticipantCreateDto dto)
        {
            var entity = await _context.Participants.FindAsync(id);
            if (entity is null) return null;

            entity.Name = dto.Name.Trim();
            entity.Email = dto.Email.Trim();
            entity.UniversityOrCompany = dto.UniversityOrCompany ?? entity.UniversityOrCompany;
            entity.Country = dto.Country;
            entity.StudyTitle = dto.StudyTitle;
            entity.ParticipationType = dto.ParticipationType;
            entity.Session = dto.Session;
            entity.Published = dto.Published;

            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Participants.FindAsync(id);
            if (entity is null) return false;

            _context.Participants.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ParticipantDto?> CreateFromSubmissionAsync(int submissionId)
        {
            var submission = await _context.Submissions.FindAsync(submissionId);
            if (submission is null) return null;

            // Ayni basvurudan ikinci kez katilimci olusturma
            var existing = await _context.Participants
                .FirstOrDefaultAsync(p => p.SubmissionId == submissionId);
            if (existing is not null) return ToDto(existing);

            var entity = new Participant
            {
                SubmissionId = submission.Id,
                Name = $"{submission.FirstName} {submission.LastName}".Trim(),
                Email = submission.Email,
                UniversityOrCompany = string.Empty,
                Country = submission.Country,
                StudyTitle = submission.Title,
                ParticipationType = submission.ParticipationType,
                Session = submission.Session,
                Published = true,
                RegistrationDate = DateTime.UtcNow
            };

            _context.Participants.Add(entity);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Basvuru {SubmissionId} onaylandi, katilimci olusturuldu. ParticipantId={Id}",
                submissionId, entity.Id);

            return ToDto(entity);
        }

        private static ParticipantDto ToDto(Participant p) => new()
        {
            Id = p.Id,
            SubmissionId = p.SubmissionId,
            Name = p.Name,
            Email = p.Email,
            UniversityOrCompany = p.UniversityOrCompany,
            Country = p.Country,
            StudyTitle = p.StudyTitle,
            ParticipationType = p.ParticipationType,
            Session = p.Session,
            Published = p.Published,
            RegistrationDate = p.RegistrationDate
        };
    }
}
