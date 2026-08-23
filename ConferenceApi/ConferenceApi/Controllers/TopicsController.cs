using Microsoft.AspNetCore.Mvc;
using ConferenceApi.Services;

namespace ConferenceApi.Controllers
{
    [Route("api/topics")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly ITopicService _service;
        public TopicsController(ITopicService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());
    }
}