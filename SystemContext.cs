using Microsoft.EntityFrameworkCore;

namespace OliverWhiteTest
{
    public class SystemContext : DbContext
    {
        public SystemContext(DbContextOptions<SystemContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PersonModel>();

            modelBuilder.Seed();
        }

        public DbSet<PersonModel>? People { get; set; }

    }

}
