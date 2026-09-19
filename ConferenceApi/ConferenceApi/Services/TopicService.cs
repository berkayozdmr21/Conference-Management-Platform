using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Entities;

namespace ConferenceApi.Services
{
    public class TopicService : ITopicService
    {
        private readonly ConferenceDbContext _context;
        public TopicService(ConferenceDbContext context) => _context = context;

        public async Task<IEnumerable<TopicDto>> GetAllAsync() =>
            await _context.ConferenceTopics.Select(t => ToDto(t)).ToListAsync();

        public async Task<TopicDto?> GetByIdAsync(int id)
        {
            var entity = await _context.ConferenceTopics.FindAsync(id);
            return entity is null ? null : ToDto(entity);
        }

        public async Task<TopicDto> CreateAsync(TopicCreateDto dto)
        {
            var entity = new ConferenceTopic { ConferenceId = dto.ConferenceId, Name = dto.Name };
            _context.ConferenceTopics.Add(entity);
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<TopicDto?> UpdateAsync(int id, TopicCreateDto dto)
        {
            var entity = await _context.ConferenceTopics.FindAsync(id);
            if (entity is null) return null;
            entity.ConferenceId = dto.ConferenceId;
            entity.Name = dto.Name;
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.ConferenceTopics.FindAsync(id);
            if (entity is null) return false;
            _context.ConferenceTopics.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        private static TopicDto ToDto(ConferenceTopic t) => new()
        {
            Id = t.Id, ConferenceId = t.ConferenceId, Name = t.Name
        };
    }
}