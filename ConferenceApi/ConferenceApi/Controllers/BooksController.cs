using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ConferenceApi.DTOs;
using ConferenceApi.Services;

namespace ConferenceApi.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private static readonly string[] AllowedExtensions = { ".pdf" };
        private const long MaxFileSizeBytes = 25 * 1024 * 1024; // 25 MB

        private readonly IBookService _service;
        private readonly IWebHostEnvironment _env;

        public BooksController(IBookService service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        /// <summary>Gecmis konferans kitaplari. Ziyaretciye acik.</summary>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] int? year = null)
            => Ok(await _service.GetAllAsync(year));

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result is null ? NotFound() : Ok(result);
        }

        /// <summary>Admin yeni kitap yukler (PDF). multipart/form-data.</summary>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [RequestSizeLimit(MaxFileSizeBytes)]
        public async Task<IActionResult> Create([FromForm] BookCreateDto dto, IFormFile? file)
        {
            var (path, error) = await SaveFileAsync(file);
            if (error is not null) return BadRequest(new { message = error });

            var created = await _service.CreateAsync(dto, path);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [RequestSizeLimit(MaxFileSizeBytes)]
        public async Task<IActionResult> Update(int id, [FromForm] BookCreateDto dto, IFormFile? file)
        {
            var (path, error) = await SaveFileAsync(file);
            if (error is not null) return BadRequest(new { message = error });

            var updated = await _service.UpdateAsync(id, dto, path);
            return updated is null ? NotFound() : Ok(updated);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        // Dosya kaydetme mantigi tek yerde. Hata varsa mesaji doner.
        private async Task<(string? Path, string? Error)> SaveFileAsync(IFormFile? file)
        {
            if (file is null) return (null, null);

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(extension))
                return (null, $"Desteklenmeyen dosya turu. Izin verilenler: {string.Join(", ", AllowedExtensions)}");

            if (file.Length > MaxFileSizeBytes)
                return (null, "Dosya boyutu 25 MB sinirini asiyor.");

            var folder = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads", "books");
            Directory.CreateDirectory(folder);

            // Orijinal ad yerine rastgele ad: ayni isimli dosyalar birbirini ezmesin
            // ve kullanicidan gelen ad ile klasor disina cikilamasin.
            var uniqueName = $"{Guid.NewGuid()}{extension}";
            var fullPath = Path.Combine(folder, uniqueName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return ($"/uploads/books/{uniqueName}", null);
        }
    }
}
