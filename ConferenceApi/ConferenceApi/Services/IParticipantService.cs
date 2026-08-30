using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface IParticipantService
    {
        Task<PagedResult<ParticipantDto>> GetPagedAsync(int page, int pageSize, string? search, string? country, string? session, bool onlyPublished);
        Task<ParticipantDto?> GetByIdAsync(int id);
        Task<ParticipantDto> CreateAsync(ParticipantCreateDto dto);
        Task<ParticipantDto?> UpdateAsync(int id, ParticipantCreateDto dto);
        Task<bool> DeleteAsync(int id);

        // Onaylanan bir basvurudan katilimci olusturur (varsa tekrar olusturmaz)
        Task<ParticipantDto?> CreateFromSubmissionAsync(int submissionId);
    }
}
