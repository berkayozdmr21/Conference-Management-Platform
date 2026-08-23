using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface ISubmissionService
    {
        Task<SubmissionDto> CreateAsync(SubmissionCreateDto dto, string? filePath);
        Task<IEnumerable<SubmissionDto>> GetAllAsync();
        Task<SubmissionDto?> GetByIdAsync(int id);
        Task<SubmissionDto?> UpdateStatusAsync(int id, string status);
    }
}