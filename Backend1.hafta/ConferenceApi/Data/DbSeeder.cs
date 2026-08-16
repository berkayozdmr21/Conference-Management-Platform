using Microsoft.EntityFrameworkCore;
using ConferenceApi.Entities;

namespace ConferenceApi.Data
{
    public static class DbSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            // örnek
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

            // Konu için örnek başlangıç verisi
            modelBuilder.Entity<ConferenceTopic>().HasData(
                new ConferenceTopic { Id = 1, ConferenceId = 1, Name = "Yapay Zeka" },
                new ConferenceTopic { Id = 2, ConferenceId = 1, Name = "Bilgisayar Mühendisliği" }
            );
        }
    }
}