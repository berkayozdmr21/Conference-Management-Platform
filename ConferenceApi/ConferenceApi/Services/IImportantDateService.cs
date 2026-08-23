using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface IImportantDateService
    {
        Task<IEnumerable<ImportantDateDto>> GetAllAsync();
    }
}