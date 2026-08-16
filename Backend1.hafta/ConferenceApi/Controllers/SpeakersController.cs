using Microsoft.AspNetCore.Mvc;
using ConferenceApi.Services;

namespace ConferenceApi.Controllers
{
    [Route("api/speakers")]
    [ApiController]
    public class SpeakersController : ControllerBase
    {
        private readonly ISpeakerService _service;
        public SpeakersController(ISpeakerService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());
    }
}