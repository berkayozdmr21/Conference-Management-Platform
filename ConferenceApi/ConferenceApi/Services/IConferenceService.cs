using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface IConferenceService
    {
        Task<IEnumerable<ConferenceDto>> GetAllAsync();
    }
}