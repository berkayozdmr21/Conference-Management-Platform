using Microsoft.AspNetCore.Mvc;
using ConferenceApi.DTOs;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result is null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SpeakerCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SpeakerCreateDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated is null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}