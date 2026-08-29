using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface IConferenceService
    {
        Task<IEnumerable<ConferenceDto>> GetAllAsync();
        Task<ConferenceDto?> GetByIdAsync(int id);
        Task<ConferenceDto> CreateAsync(ConferenceCreateDto dto);
        Task<ConferenceDto?> UpdateAsync(int id, ConferenceCreateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}