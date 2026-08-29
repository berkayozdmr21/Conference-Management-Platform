using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface ITopicService
    {
        Task<IEnumerable<TopicDto>> GetAllAsync();
        Task<TopicDto?> GetByIdAsync(int id);
        Task<TopicDto> CreateAsync(TopicCreateDto dto);
        Task<TopicDto?> UpdateAsync(int id, TopicCreateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}