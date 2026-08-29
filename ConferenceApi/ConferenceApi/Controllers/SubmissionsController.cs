using Microsoft.AspNetCore.Mvc;
using ConferenceApi.DTOs;
using ConferenceApi.Services;

namespace ConferenceApi.Controllers
{
    [Route("api/submissions")]
    [ApiController]
    public class SubmissionsController : ControllerBase
    {
        private static readonly string[] AllowedExtensions = { ".pdf", ".doc", ".docx" };
        private const long MaxFileSizeBytes = 10 * 1024 * 1024; // 10 MB

        private readonly ISubmissionService _service;
        private readonly IWebHostEnvironment _env;

        public SubmissionsController(ISubmissionService service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        // POST /api/submissions  (multipart/form-data)
        [HttpPost]
        [RequestSizeLimit(MaxFileSizeBytes)]
        public async Task<IActionResult> Create([FromForm] SubmissionCreateDto dto, IFormFile? file)
        {
            string? relativePath = null;

            if (file is not null)
            {
                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!AllowedExtensions.Contains(extension))
                    return BadRequest($"Desteklenmeyen dosya türü. İzin verilenler: {string.Join(", ", AllowedExtensions)}");

                if (file.Length > MaxFileSizeBytes)
                    return BadRequest("Dosya boyutu 10 MB sınırını aşıyor.");

                var uploadsFolder = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads", "submissions");
                Directory.CreateDirectory(uploadsFolder);

                var uniqueName = $"{Guid.NewGuid()}{extension}";
                var fullPath = Path.Combine(uploadsFolder, uniqueName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                relativePath = $"/uploads/submissions/{uniqueName}";
            }

            var created = await _service.CreateAsync(dto, relativePath);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // GET /api/submissions
        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        // GET /api/submissions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result is null ? NotFound() : Ok(result);
        }

        // PUT /api/submissions/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] SubmissionStatusUpdateDto dto)
        {
            try
            {
                var result = await _service.UpdateStatusAsync(id, dto.Status);
                return result is null ? NotFound() : Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // DELETE /api/submissions/{id}
[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    var deleted = await _service.DeleteAsync(id);
    return deleted ? NoContent() : NotFound();
}
    }
}