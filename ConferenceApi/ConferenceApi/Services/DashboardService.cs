using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ConferenceDbContext _context;

        public DashboardService(ConferenceDbContext context) => _context = context;

        public async Task<DashboardStatsDto> GetStatsAsync()
        {
            var submissions = _context.Submissions.AsQueryable();

            var stats = new DashboardStatsDto
            {
                TotalSubmissions = await submissions.CountAsync(),
                PendingSubmissions = await submissions.CountAsync(s => s.Status == "Pending"),
                ApprovedSubmissions = await submissions.CountAsync(s => s.Status == "Approved"),
                RejectedSubmissions = await submissions.CountAsync(s => s.Status == "Rejected"),

                OnlineCount = await submissions.CountAsync(s => s.ParticipationType == "Online"),
                PhysicalCount = await submissions.CountAsync(s => s.ParticipationType == "Physical"),

                TotalParticipants = await _context.Participants.CountAsync(),
                TotalSpeakers = await _context.Speakers.CountAsync(),
                TotalTopics = await _context.ConferenceTopics.CountAsync(),
                TotalBooks = await _context.Books.CountAsync(),
                UnreadMessages = await _context.ContactMessages.CountAsync(m => !m.IsRead)
            };

            // Ulkeye gore dagilim: SQL tarafinda GROUP BY Country
            stats.ByCountry = await submissions
                .GroupBy(s => s.Country)
                .Select(g => new CountByKeyDto { Key = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .ToListAsync();

            // Oturuma gore dagilim
            stats.BySession = await submissions
                .GroupBy(s => s.Session)
                .Select(g => new CountByKeyDto { Key = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .ToListAsync();

            return stats;
        }
    }
}
