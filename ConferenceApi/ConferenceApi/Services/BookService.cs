using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Entities;

namespace ConferenceApi.Services
{
    public class BookService : IBookService
    {
        private readonly ConferenceDbContext _context;
        private readonly ILogger<BookService> _logger;

        public BookService(ConferenceDbContext context, ILogger<BookService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<BookDto>> GetAllAsync(int? year)
        {
            var query = _context.Books.AsQueryable();

            if (year.HasValue)
                query = query.Where(b => b.Year == year.Value);

            return await query
                .OrderByDescending(b => b.Year)
                .Select(b => ToDto(b))
                .ToListAsync();
        }

        public async Task<BookDto?> GetByIdAsync(int id)
        {
            var entity = await _context.Books.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<BookDto> CreateAsync(BookCreateDto dto, string? filePath)
        {
            var entity = new Book
            {
                Year = dto.Year,
                Title = dto.Title.Trim(),
                Isbn = dto.Isbn,
                FilePath = filePath,
                PublishDate = dto.PublishDate ?? new DateTime(dto.Year, 1, 1)
            };

            _context.Books.Add(entity);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Konferans kitabi eklendi. Id={Id}, Yil={Year}", entity.Id, entity.Year);
            return ToDto(entity);
        }

        public async Task<BookDto?> UpdateAsync(int id, BookCreateDto dto, string? filePath)
        {
            var entity = await _context.Books.FindAsync(id);
            if (entity is null) return null;

            entity.Year = dto.Year;
            entity.Title = dto.Title.Trim();
            entity.Isbn = dto.Isbn;
            entity.PublishDate = dto.PublishDate ?? entity.PublishDate;

            // Yeni dosya gelmediyse eskisini koru
            if (!string.IsNullOrWhiteSpace(filePath))
                entity.FilePath = filePath;

            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Books.FindAsync(id);
            if (entity is null) return false;

            _context.Books.Remove(entity);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Konferans kitabi silindi. Id={Id}", id);
            return true;
        }

        private static BookDto ToDto(Book b) => new()
        {
            Id = b.Id,
            Year = b.Year,
            Title = b.Title,
            Isbn = b.Isbn,
            FilePath = b.FilePath,
            PublishDate = b.PublishDate
        };
    }
}
