using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Entities;

namespace ConferenceApi.Services
{
    public class ConferenceService : IConferenceService
    {
        private readonly ConferenceDbContext _context;
        public ConferenceService(ConferenceDbContext context) => _context = context;

        public async Task<IEnumerable<ConferenceDto>> GetAllAsync() =>
            await _context.Conferences.Select(c => ToDto(c)).ToListAsync();

        public async Task<ConferenceDto?> GetByIdAsync(int id)
        {
            var entity = await _context.Conferences.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<ConferenceDto> CreateAsync(ConferenceCreateDto dto)
        {
            var entity = new Conference
            {
                Title = dto.Title,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Location = dto.Location
            };
            _context.Conferences.Add(entity);
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<ConferenceDto?> UpdateAsync(int id, ConferenceCreateDto dto)
        {
            var entity = await _context.Conferences.FindAsync(id);
            if (entity is null) return null;

            entity.Title = dto.Title;
            entity.Description = dto.Description;
            entity.StartDate = dto.StartDate;
            entity.EndDate = dto.EndDate;
            entity.Location = dto.Location;
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Conferences.FindAsync(id);
            if (entity is null) return false;
            _context.Conferences.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        private static ConferenceDto ToDto(Conference c) => new()
        {
            Id = c.Id, Title = c.Title, Description = c.Description,
            StartDate = c.StartDate, EndDate = c.EndDate, Location = c.Location
        };
    }
}