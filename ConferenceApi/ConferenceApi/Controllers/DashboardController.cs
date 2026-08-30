using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ConferenceApi.Services;

namespace ConferenceApi.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _service;

        public DashboardController(IDashboardService service) => _service = service;

        /// <summary>Admin panelinin ust kismindaki sayaclar ve dagilimlar.</summary>
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats() => Ok(await _service.GetStatsAsync());
    }
}
