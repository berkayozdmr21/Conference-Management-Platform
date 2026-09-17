using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface ISubmissionService
    {
        Task<SubmissionDto> CreateAsync(SubmissionCreateDto dto, string? filePath);

        // Eski davranis (tum liste) - geriye donuk uyumluluk icin duruyor
        Task<IEnumerable<SubmissionDto>> GetAllAsync();

        // 3. hafta: sayfalama + filtreleme + arama
        Task<PagedResult<SubmissionDto>> GetPagedAsync(SubmissionQueryParameters query);

        Task<SubmissionDto?> GetByIdAsync(int id);
        Task<SubmissionDto?> UpdateStatusAsync(int id, string status);
        Task<bool> DeleteAsync(int id);
    }
}
