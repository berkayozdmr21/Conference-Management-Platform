using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface ITopicService
    {
        Task<IEnumerable<TopicDto>> GetAllAsync();
    }
}