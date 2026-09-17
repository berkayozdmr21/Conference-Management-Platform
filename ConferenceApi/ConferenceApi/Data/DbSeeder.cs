using Microsoft.EntityFrameworkCore;
using ConferenceApi.Entities;

namespace ConferenceApi.Data
{
    public static class DbSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Conference>().HasData(
                new Conference
                {
                    Id = 1,
                    Title = "ICOMATH 2026",
                    Description = "Mühendislik Konferansı",
                    StartDate = new DateTime(2026, 10, 15),
                    EndDate = new DateTime(2026, 10, 17),
                    Location = "Antalya, Türkiye"
                }
            );

            modelBuilder.Entity<ConferenceTopic>().HasData(
                new ConferenceTopic { Id = 1, ConferenceId = 1, Name = "Yapay Zeka" },
                new ConferenceTopic { Id = 2, ConferenceId = 1, Name = "Bilgisayar Mühendisliği" }
            );

            // Baslangic admin hesabi.
            // Sifre: Admin123!  -> asagidaki deger SHA256 hash'idir, duz sifre tutulmaz.
            modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@conference.com",
                    PasswordHash = "PrP+ZrMeO00Q+nC1ytSccRIpSvauTkdqHEBRVdRaoSE="
                }
            );
        }
    }
}
