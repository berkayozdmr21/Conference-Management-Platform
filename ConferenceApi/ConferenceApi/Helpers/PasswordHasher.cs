using System.Security.Cryptography;
using System.Text;

namespace ConferenceApi.Helpers
{
    public static class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        /// <summary>
        /// Girilen sifreyi hash'leyip veritabanindaki hash ile karsilastirir.
        /// Sifreyi asla geri cozmuyoruz - hash tek yonludur.
        /// </summary>
        public static bool Verify(string password, string storedHash)
        {
            if (string.IsNullOrEmpty(storedHash)) return false;
            return HashPassword(password) == storedHash;
        }
    }
}
