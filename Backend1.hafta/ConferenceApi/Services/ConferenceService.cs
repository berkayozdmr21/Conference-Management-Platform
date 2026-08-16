using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public class ConferenceService : IConferenceService
    {
        public async Task<IEnumerable<ConferenceDto>> GetAllAsync()
        {
            return await Task.FromResult(new List<ConferenceDto> {
                new ConferenceDto { Id = 1, Title = "ICOMATH 2026", Location = "Türkiye" }
            });
        }
    }
}