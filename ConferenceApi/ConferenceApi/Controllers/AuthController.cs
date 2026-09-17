using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ConferenceApi.Data;
using ConferenceApi.DTOs;
using ConferenceApi.Helpers;

namespace ConferenceApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ConferenceDbContext _context;
        private readonly TokenService _tokenService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ConferenceDbContext context, TokenService tokenService, ILogger<AuthController> logger)
        {
            _context = context;
            _tokenService = tokenService;
            _logger = logger;
        }

        /// <summary>Admin girisi. Basarili olursa JWT doner.</summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AdminLoginDto dto)
        {
            var admin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Email == dto.Email);

            // Guvenlik: "e-posta yok" ile "sifre yanlis" ayni mesaji doner.
            // Aksi halde saldirgan hangi e-postalarin kayitli oldugunu ogrenir.
            if (admin is null || !PasswordHasher.Verify(dto.Password, admin.PasswordHash))
            {
                _logger.LogWarning("Basarisiz giris denemesi. Email={Email}", dto.Email);
                return Unauthorized(new { message = "E-posta veya sifre hatali." });
            }

            var (token, expiresAt) = _tokenService.CreateToken(admin);

            _logger.LogInformation("Admin giris yapti. Email={Email}", admin.Email);

            return Ok(new AuthResponseDto
            {
                Token = token,
                Username = admin.Username,
                Email = admin.Email,
                ExpiresAt = expiresAt
            });
        }

        /// <summary>Token gecerli mi diye kontrol eder, giris yapan admini doner.</summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new
            {
                email = User.FindFirst(ClaimTypes.Email)?.Value,
                username = User.FindFirst(ClaimTypes.Name)?.Value,
                role = User.FindFirst(ClaimTypes.Role)?.Value
            });
        }
    }
}
