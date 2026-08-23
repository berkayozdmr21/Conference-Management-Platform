using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public class ImportantDateService : IImportantDateService
    {
        public async Task<IEnumerable<ImportantDateDto>> GetAllAsync()
        {
            return await Task.FromResult(new List<ImportantDateDto> {
                new ImportantDateDto { Id = 1, Title = "Submission Deadline", Date = DateTime.Now.AddMonths(1) }
            });
        }
    }
}