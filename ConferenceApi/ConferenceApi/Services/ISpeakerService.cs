using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface ISpeakerService
    {
        Task<IEnumerable<SpeakerDto>> GetAllAsync();
        Task<SpeakerDto?> GetByIdAsync(int id);
        Task<SpeakerDto> CreateAsync(SpeakerCreateDto dto);
        Task<SpeakerDto?> UpdateAsync(int id, SpeakerCreateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}