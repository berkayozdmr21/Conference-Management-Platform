using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ConferenceApi.Data;
using ConferenceApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ConferenceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var admin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Email == request.Email);

            if (admin == null)
                return Unauthorized("E-posta veya şifre hatalı.");

            if (!PasswordHasher.Verify(request.Password, admin.PasswordHash))
                return Unauthorized("E-posta veya şifre hatalı.");

            var token = _tokenService.CreateToken(admin);

            return Ok(new { token });
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("me")]
        public IActionResult GetCurrentAdmin()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var name = User.FindFirst(ClaimTypes.Name)?.Value;
            return Ok(new { email, name });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}