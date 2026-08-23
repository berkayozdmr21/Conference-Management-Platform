using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public class SpeakerService : ISpeakerService
    {
        public async Task<IEnumerable<SpeakerDto>> GetAllAsync()
        {
            return await Task.FromResult(new List<SpeakerDto> {
                new SpeakerDto { Id = 1, Name = "Cemre", Title = "Lead", University = "Tech Uni" }
            });
        }
    }
}