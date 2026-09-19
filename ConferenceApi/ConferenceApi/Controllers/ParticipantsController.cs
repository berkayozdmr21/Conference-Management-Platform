using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ConferenceApi.DTOs;
using ConferenceApi.Services;

namespace ConferenceApi.Controllers
{
    [Route("api/participants")]
    [ApiController]
    public class ParticipantsController : ControllerBase
    {
        private readonly IParticipantService _service;

        public ParticipantsController(IParticipantService service) => _service = service;

        /// <summary>
        /// Katilimci listesi. Ziyaretciye acik ama sadece yayinlanmis kayitlari gorur.
        /// Admin token'i varsa tumunu gorebilir (includeUnpublished=true).
        /// </summary>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string? search = null,
            [FromQuery] string? country = null,
            [FromQuery] string? session = null,
            [FromQuery] bool includeUnpublished = false)
        {
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 20;

            // Yayinlanmamis kayitlari sadece admin gorebilir
            var isAdmin = User.IsInRole("Admin");
            var onlyPublished = !(includeUnpublished && isAdmin);

            var result = await _service.GetPagedAsync(page, pageSize, search, country, session, onlyPublished);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result is null ? NotFound() : Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ParticipantCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ParticipantCreateDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated is null ? NotFound() : Ok(updated);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        /// <summary>Onaylanmis bir basvurudan katilimci olusturur.</summary>
        [Authorize(Roles = "Admin")]
        [HttpPost("from-submission/{submissionId}")]
        public async Task<IActionResult> CreateFromSubmission(int submissionId)
        {
            var result = await _service.CreateFromSubmissionAsync(submissionId);
            return result is null ? NotFound(new { message = "Basvuru bulunamadi." }) : Ok(result);
        }
    }
}
