using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ConferenceApi.Entities;
using Microsoft.IdentityModel.Tokens;

namespace ConferenceApi.Helpers
{
    /// <summary>
    /// Admin giris yapinca imzali bir JWT uretir.
    /// Token'in icinde kim oldugu (claims) yazar, sonunda gizli anahtarla imzalanir.
    /// Imza sayesinde token'in icerigi degistirilirse sunucu bunu anlar.
    /// </summary>
    public class TokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config) => _config = config;

        public (string Token, DateTime ExpiresAt) CreateToken(Admin admin)
        {
            var keyValue = _config["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key ayari bulunamadi.");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, admin.Id.ToString()),
                new(ClaimTypes.Name, admin.Username ?? string.Empty),
                new(ClaimTypes.Email, admin.Email ?? string.Empty),
                new(ClaimTypes.Role, "Admin")
            };

            var minutes = int.TryParse(_config["Jwt:ExpiryMinutes"], out var m) ? m : 120;
            var expiresAt = DateTime.UtcNow.AddMinutes(minutes);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expiresAt,
                signingCredentials: credentials);

            return (new JwtSecurityTokenHandler().WriteToken(token), expiresAt);
        }
    }
}
