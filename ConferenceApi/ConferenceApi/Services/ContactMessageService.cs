using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Entities;

namespace ConferenceApi.Services
{
    public class ContactMessageService : IContactMessageService
    {
        private readonly ConferenceDbContext _context;
        private readonly ILogger<ContactMessageService> _logger;

        public ContactMessageService(ConferenceDbContext context, ILogger<ContactMessageService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<ContactMessageDto> CreateAsync(ContactMessageCreateDto dto)
        {
            var entity = new ContactMessage
            {
                Name = dto.Name.Trim(),
                Email = dto.Email.Trim(),
                Subject = dto.Subject.Trim(),
                Message = dto.Message.Trim(),
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.ContactMessages.Add(entity);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Yeni iletisim mesaji kaydedildi. Id={Id}, Email={Email}", entity.Id, entity.Email);
            return ToDto(entity);
        }

        public async Task<PagedResult<ContactMessageDto>> GetPagedAsync(int page, int pageSize, bool? isRead, string? search)
        {
            // 1) Sorguyu kur (henuz veritabanina gitmedi)
            var query = _context.ContactMessages.AsQueryable();

            if (isRead.HasValue)
                query = query.Where(m => m.IsRead == isRead.Value);

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim();
                query = query.Where(m =>
                    m.Name.Contains(term) ||
                    m.Email.Contains(term) ||
                    m.Subject.Contains(term));
            }

            // 2) Once toplam sayiyi al (SELECT COUNT)
            var total = await query.CountAsync();

            // 3) Sonra sadece istenen sayfayi cek (LIMIT/OFFSET)
            var items = await query
                .OrderByDescending(m => m.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(m => ToDto(m))
                .ToListAsync();

            return new PagedResult<ContactMessageDto>
            {
                Items = items,
                Page = page,
                PageSize = pageSize,
                TotalCount = total
            };
        }

        public async Task<ContactMessageDto?> GetByIdAsync(int id)
        {
            var entity = await _context.ContactMessages.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<ContactMessageDto?> MarkAsReadAsync(int id)
        {
            var entity = await _context.ContactMessages.FindAsync(id);
            if (entity is null) return null;

            entity.IsRead = true;
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.ContactMessages.FindAsync(id);
            if (entity is null) return false;

            _context.ContactMessages.Remove(entity);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Iletisim mesaji silindi. Id={Id}", id);
            return true;
        }

        private static ContactMessageDto ToDto(ContactMessage m) => new()
        {
            Id = m.Id,
            Name = m.Name,
            Email = m.Email,
            Subject = m.Subject,
            Message = m.Message,
            IsRead = m.IsRead,
            CreatedAt = m.CreatedAt
        };
    }
}
