using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface ISpeakerService
    {
        Task<IEnumerable<SpeakerDto>> GetAllAsync();
    }
}