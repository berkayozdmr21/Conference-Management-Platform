using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Entities;

namespace ConferenceApi.Services
{
    public class SpeakerService : ISpeakerService
    {
        private readonly ConferenceDbContext _context;
        public SpeakerService(ConferenceDbContext context) => _context = context;

        public async Task<IEnumerable<SpeakerDto>> GetAllAsync() =>
            await _context.Speakers.Select(s => ToDto(s)).ToListAsync();

        public async Task<SpeakerDto?> GetByIdAsync(int id)
        {
            var entity = await _context.Speakers.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<SpeakerDto> CreateAsync(SpeakerCreateDto dto)
        {
            var entity = new Speaker
            {
                Name = dto.Name,
                Title = dto.Title,
                University = dto.University,
                Country = dto.Country,
                Photo = dto.Photo ?? "",
                Description = dto.Description ?? ""
            };
            _context.Speakers.Add(entity);
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<SpeakerDto?> UpdateAsync(int id, SpeakerCreateDto dto)
        {
            var entity = await _context.Speakers.FindAsync(id);
            if (entity is null) return null;

            entity.Name = dto.Name;
            entity.Title = dto.Title;
            entity.University = dto.University;
            entity.Country = dto.Country;
            entity.Photo = dto.Photo ?? "";
            entity.Description = dto.Description ?? "";
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Speakers.FindAsync(id);
            if (entity is null) return false;
            _context.Speakers.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        private static SpeakerDto ToDto(Speaker s) => new()
        {
            Id = s.Id, Name = s.Name, Title = s.Title,
            University = s.University, Country = s.Country, Photo = s.Photo
        };
    }
}