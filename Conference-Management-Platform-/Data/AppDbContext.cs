using ConferenceApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Conference> Conferences { get; set; }
        public DbSet<Speaker> Speakers { get; set; }
        public DbSet<ConferenceTopic> ConferenceTopics { get; set; }
        public DbSet<ImportantDate> ImportantDates { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ---------- SÜTUN UZUNLUKLARI ----------

            modelBuilder.Entity<Conference>(entity =>
            {
                entity.Property(e => e.Title).HasMaxLength(200);
                entity.Property(e => e.Location).HasMaxLength(200);
            });

            modelBuilder.Entity<Speaker>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.Title).HasMaxLength(50);
                entity.Property(e => e.University).HasMaxLength(100);
                entity.Property(e => e.Country).HasMaxLength(50);
                entity.Property(e => e.Photo).HasMaxLength(255);
            });

            modelBuilder.Entity<ConferenceTopic>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<ImportantDate>(entity =>
            {
                entity.Property(e => e.Title).HasMaxLength(50);
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.Title).HasMaxLength(50);
                entity.Property(e => e.FilePath).HasMaxLength(255);
            });

            modelBuilder.Entity<Submission>(entity =>
            {
                entity.Property(e => e.FirstName).HasMaxLength(50);
                entity.Property(e => e.LastName).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Country).HasMaxLength(50);
                entity.Property(e => e.StudyTitle).HasMaxLength(100);
                entity.Property(e => e.Session).HasMaxLength(50);
                entity.Property(e => e.ParticipationType).HasMaxLength(50);
                entity.Property(e => e.FilePath).HasMaxLength(255);
                entity.Property(e => e.Status).HasMaxLength(20);
            });

            modelBuilder.Entity<ContactMessage>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Subject).HasMaxLength(100);
            });

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.PasswordHash).HasMaxLength(100);
            });

            // ---------- SEED DATA ----------

            modelBuilder.Entity<Conference>().HasData(
                new Conference
                {
                    Id = 1,
                    Title = "ICOMATH 2026",
                    Description = "International Conference on Mathematics and Applications",
                    StartDate = new DateTime(2026, 10, 15),
                    EndDate = new DateTime(2026, 10, 17),
                    Location = "Ankara, Türkiye"
                }
            );

            modelBuilder.Entity<ConferenceTopic>().HasData(
                new ConferenceTopic { Id = 1, ConferenceId = 1, Name = "Applied Mathematics" },
                new ConferenceTopic { Id = 2, ConferenceId = 1, Name = "Artificial Intelligence" },
                new ConferenceTopic { Id = 3, ConferenceId = 1, Name = "Data Science" }
            );

            modelBuilder.Entity<Speaker>().HasData(
                new Speaker
                {
                    Id = 1,
                    Name = "Prof. Dr. Ayse Yilmaz",
                    Title = "Prof. Dr.",
                    University = "Middle East Technical University",
                    Country = "Türkiye",
                    Photo = "/uploads/speakers/speaker1.jpg",
                    Description = "Applied mathematics and numerical analysis researcher.",
                    ConferenceId = 1
                },
                new Speaker
                {
                    Id = 2,
                    Name = "Dr. John Smith",
                    Title = "Assoc. Prof.",
                    University = "University of Manchester",
                    Country = "United Kingdom",
                    Photo = "/uploads/speakers/speaker2.jpg",
                    Description = "Machine learning and data science researcher.",
                    ConferenceId = 1
                }
            );

            modelBuilder.Entity<ImportantDate>().HasData(
                new ImportantDate
                {
                    Id = 1,
                    Title = "Abstract Submission Deadline",
                    Date = new DateTime(2026, 8, 30),
                    Description = "Last day to submit your abstract.",
                    ConferenceId = 1
                },
                new ImportantDate
                {
                    Id = 2,
                    Title = "Notification of Acceptance",
                    Date = new DateTime(2026, 9, 15),
                    Description = "Authors will be notified about acceptance.",
                    ConferenceId = 1
                }
            );

            modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    Id = 1,
                    Name = "Gozde Zubari",
                    Email = "admin@icomath.com",
                    PasswordHash = "$2a$11$DITKiDxXDonde.H6JrKTmuFnGDuSqjbREHzYiWeBMxUtKsVeMkMT."
                }
            );
        }
    }
}