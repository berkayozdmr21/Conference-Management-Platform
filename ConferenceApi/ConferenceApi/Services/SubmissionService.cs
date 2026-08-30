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
        private readonly IParticipantService _participantService;
        private readonly ILogger<SubmissionService> _logger;

        public SubmissionService(
            ConferenceDbContext context,
            IParticipantService participantService,
            ILogger<SubmissionService> logger)
        {
            _context = context;
            _participantService = participantService;
            _logger = logger;
        }

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

            _logger.LogInformation("Yeni basvuru alindi. Id={Id}, Email={Email}", entity.Id, entity.Email);
            return ToDto(entity);
        }

        public async Task<IEnumerable<SubmissionDto>> GetAllAsync() =>
            await _context.Submissions
                .OrderByDescending(s => s.SubmittedAt)
                .Select(s => ToDto(s))
                .ToListAsync();

        public async Task<PagedResult<SubmissionDto>> GetPagedAsync(SubmissionQueryParameters q)
        {
            // 1) Temel sorgu. AsQueryable henuz veritabanina gitmez,
            //    asagidaki Where'ler tek bir SQL cumlesine eklenir.
            var query = _context.Submissions.AsQueryable();

            // 2) FILTRELEME
            if (!string.IsNullOrWhiteSpace(q.Status))
                query = query.Where(s => s.Status == q.Status);

            if (!string.IsNullOrWhiteSpace(q.Country))
                query = query.Where(s => s.Country == q.Country);

            if (!string.IsNullOrWhiteSpace(q.Session))
                query = query.Where(s => s.Session == q.Session);

            if (!string.IsNullOrWhiteSpace(q.ParticipationType))
                query = query.Where(s => s.ParticipationType == q.ParticipationType);

            // 3) ARAMA - ad, soyad, e-posta, calisma basligi
            if (!string.IsNullOrWhiteSpace(q.Search))
            {
                var term = q.Search.Trim();
                query = query.Where(s =>
                    s.FirstName.Contains(term) ||
                    s.LastName.Contains(term) ||
                    s.Email.Contains(term) ||
                    s.Title.Contains(term));
            }

            // 4) SIRALAMA
            query = (q.SortBy?.ToLowerInvariant()) switch
            {
                "firstname" => q.Desc ? query.OrderByDescending(s => s.FirstName) : query.OrderBy(s => s.FirstName),
                "lastname" => q.Desc ? query.OrderByDescending(s => s.LastName) : query.OrderBy(s => s.LastName),
                "country" => q.Desc ? query.OrderByDescending(s => s.Country) : query.OrderBy(s => s.Country),
                "status" => q.Desc ? query.OrderByDescending(s => s.Status) : query.OrderBy(s => s.Status),
                _ => q.Desc ? query.OrderByDescending(s => s.SubmittedAt) : query.OrderBy(s => s.SubmittedAt)
            };

            // 5) Toplam kayit sayisi (filtreler uygulanmis halde)
            var total = await query.CountAsync();

            // 6) SAYFALAMA - Skip = atlanacak kayit, Take = alinacak kayit
            var items = await query
                .Skip((q.Page - 1) * q.PageSize)
                .Take(q.PageSize)
                .Select(s => ToDto(s))
                .ToListAsync();

            return new PagedResult<SubmissionDto>
            {
                Items = items,
                Page = q.Page,
                PageSize = q.PageSize,
                TotalCount = total
            };
        }

        public async Task<SubmissionDto?> GetByIdAsync(int id)
        {
            var entity = await _context.Submissions.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<SubmissionDto?> UpdateStatusAsync(int id, string status)
        {
            if (!AllowedStatuses.Contains(status))
                throw new ArgumentException(
                    $"Gecersiz durum: {status}. Izin verilenler: {string.Join(", ", AllowedStatuses)}");

            var entity = await _context.Submissions.FindAsync(id);
            if (entity is null) return null;

            entity.Status = status;
            await _context.SaveChangesAsync();

            _logger.LogInformation("Basvuru durumu guncellendi. Id={Id}, Durum={Status}", id, status);

            // Onaylanan basvuru otomatik olarak katilimci listesine gecer
            if (status == "Approved")
                await _participantService.CreateFromSubmissionAsync(entity.Id);

            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Submissions.FindAsync(id);
            if (entity is null) return false;

            _context.Submissions.Remove(entity);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Basvuru silindi. Id={Id}", id);
            return true;
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
