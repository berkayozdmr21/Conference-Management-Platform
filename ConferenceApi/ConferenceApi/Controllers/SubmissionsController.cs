using Microsoft.AspNetCore.Authorization;
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
        private readonly ILogger<SubmissionsController> _logger;

        public SubmissionsController(
            ISubmissionService service,
            IWebHostEnvironment env,
            ILogger<SubmissionsController> logger)
        {
            _service = service;
            _env = env;
            _logger = logger;
        }

        /// <summary>Ziyaretci bildiri gonderir. Herkese acik. multipart/form-data.</summary>
        [HttpPost]
        [AllowAnonymous]
        [RequestSizeLimit(MaxFileSizeBytes)]
        public async Task<IActionResult> Create([FromForm] SubmissionCreateDto dto, IFormFile? file)
        {
            string? relativePath = null;

            if (file is not null)
            {
                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!AllowedExtensions.Contains(extension))
                    return BadRequest(new { message = $"Desteklenmeyen dosya turu. Izin verilenler: {string.Join(", ", AllowedExtensions)}" });

                if (file.Length > MaxFileSizeBytes)
                    return BadRequest(new { message = "Dosya boyutu 10 MB sinirini asiyor." });

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

        /// <summary>
        /// Basvuru listesi - sayfalama, filtreleme ve arama destekli. Sadece admin.
        /// Ornek: /api/submissions?page=1&amp;pageSize=10&amp;status=Pending&amp;country=Turkiye&amp;search=gozde
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SubmissionQueryParameters query)
            => Ok(await _service.GetPagedAsync(query));

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result is null ? NotFound() : Ok(result);
        }

        /// <summary>Basvuruyu onayla / reddet. Onaylanan basvuru katilimci listesine eklenir.</summary>
        [Authorize(Roles = "Admin")]
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
                _logger.LogWarning("Gecersiz durum degeri denendi. Id={Id}, Deger={Status}", id, dto.Status);
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
