using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public class TopicService : ITopicService
    {
        public async Task<IEnumerable<TopicDto>> GetAllAsync()
        {
            return await Task.FromResult(new List<TopicDto> {
                new TopicDto { Id = 1, Name = "Software Engineering" }
            });
        }
    }
}