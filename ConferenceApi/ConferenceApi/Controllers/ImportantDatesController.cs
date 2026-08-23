using Microsoft.AspNetCore.Mvc;
using ConferenceApi.Services;

namespace ConferenceApi.Controllers
{
    [Route("api/important-dates")]
    [ApiController]
    public class ImportantDatesController : ControllerBase
    {
        private readonly IImportantDateService _service;
        public ImportantDatesController(IImportantDateService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());
    }
}