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
    }
}