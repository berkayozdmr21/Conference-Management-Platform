using Microsoft.EntityFrameworkCore;
using ConferenceApi.Entities;

namespace ConferenceApi.Data
{
    public class ConferenceDbContext : DbContext
    {
        public ConferenceDbContext(DbContextOptions<ConferenceDbContext> options) : base(options) { }

        public DbSet<Conference> Conferences { get; set; }
        public DbSet<ConferenceTopic> ConferenceTopics { get; set; }
        public DbSet<ImportantDate> ImportantDates { get; set; }
        public DbSet<Speaker> Speakers { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Sik aranan/filtrelenen kolonlara index.
            // Index = kitabin arka sayfasindaki dizin. Aramayi hizlandirir,
            // karsiliginda yazma islemi bir miktar yavaslar.
            modelBuilder.Entity<Submission>().HasIndex(s => s.Status);
            modelBuilder.Entity<Submission>().HasIndex(s => s.Email);
            modelBuilder.Entity<Submission>().HasIndex(s => s.Country);

            modelBuilder.Entity<Participant>().HasIndex(p => p.SubmissionId);
            modelBuilder.Entity<Admin>().HasIndex(a => a.Email).IsUnique();
            modelBuilder.Entity<Book>().HasIndex(b => b.Year);

            // Baslangic verileri
            DbSeeder.Seed(modelBuilder);
        }
    }
}
