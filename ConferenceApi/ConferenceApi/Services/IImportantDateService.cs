using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface IImportantDateService
    {
        Task<IEnumerable<ImportantDateDto>> GetAllAsync();
        Task<ImportantDateDto?> GetByIdAsync(int id);
        Task<ImportantDateDto> CreateAsync(ImportantDateCreateDto dto);
        Task<ImportantDateDto?> UpdateAsync(int id, ImportantDateCreateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}