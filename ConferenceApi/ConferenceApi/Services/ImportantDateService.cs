using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Entities;

namespace ConferenceApi.Services
{
    public class ImportantDateService : IImportantDateService
    {
        private readonly ConferenceDbContext _context;
        public ImportantDateService(ConferenceDbContext context) => _context = context;

        public async Task<IEnumerable<ImportantDateDto>> GetAllAsync() =>
            await _context.ImportantDates.Select(d => ToDto(d)).ToListAsync();

        public async Task<ImportantDateDto?> GetByIdAsync(int id)
        {
            var entity = await _context.ImportantDates.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<ImportantDateDto> CreateAsync(ImportantDateCreateDto dto)
        {
            var entity = new ImportantDate
            {
                Title = dto.Title,
                Date = dto.Date,
                Description = dto.Description ?? ""
            };
            _context.ImportantDates.Add(entity);
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<ImportantDateDto?> UpdateAsync(int id, ImportantDateCreateDto dto)
        {
            var entity = await _context.ImportantDates.FindAsync(id);
            if (entity is null) return null;

            entity.Title = dto.Title;
            entity.Date = dto.Date;
            entity.Description = dto.Description ?? "";
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.ImportantDates.FindAsync(id);
            if (entity is null) return false;
            _context.ImportantDates.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        private static ImportantDateDto ToDto(ImportantDate d) => new()
        {
            Id = d.Id, Title = d.Title, Date = d.Date, Description = d.Description
        };
    }
}