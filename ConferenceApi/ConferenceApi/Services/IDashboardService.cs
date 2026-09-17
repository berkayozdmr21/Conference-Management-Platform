using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface IDashboardService
    {
        Task<DashboardStatsDto> GetStatsAsync();
    }
}
