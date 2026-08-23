using Microsoft.AspNetCore.Mvc;
using ConferenceApi.Services;

namespace ConferenceApi.Controllers
{
    [Route("api/conferences")]
    [ApiController]
    public class ConferencesController : ControllerBase
    {
        private readonly IConferenceService _service;
        public ConferencesController(IConferenceService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());
    }
}