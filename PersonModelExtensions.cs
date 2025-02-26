using Microsoft.EntityFrameworkCore;

namespace OliverWhiteTest
{
    public static class PersonModelExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PersonModel>().HasData(
                new PersonModel { Id = 1, FirstName = "David", LastName = "Jones", JobTitle = "Developer", Phone = "07789 543768", Email = "djones@test.com" },
                new PersonModel { Id = 2, FirstName = "Lisa", LastName = "Holmes", JobTitle = "Development Lead", Phone = "07756 896512", Email = "lholmes@test.com" },
                new PersonModel { Id = 3, FirstName = "Alex", LastName = "Smith", JobTitle = "QA Lead", Phone = "07723 743289", Email = "asmith@test.com" },
                new PersonModel { Id = 4, FirstName = "Kieran", LastName = "James", JobTitle = "Developer", Phone = "07898 654123", Email = "kjames@test.com" },
                new PersonModel { Id = 5, FirstName = "Gavin", LastName = "Miles", JobTitle = "UX Designer", Phone = "07881 987554", Email = "gmiles@test.com" },
                new PersonModel { Id = 6, FirstName = "Kathy", LastName = "Smith", JobTitle = "UX Lead", Phone = "07765 332287", Email = "ksmith@test.com" },
                new PersonModel { Id = 7, FirstName = "Phil", LastName = "Walker", JobTitle = "Senior QA", Phone = "07889 984447", Email = "pwalker@test.com" },
                new PersonModel { Id = 8, FirstName = "Rebecca", LastName = "Bates", JobTitle = "Product Development Manager", Phone = "07798 548733", Email = "rbates@test.com" },
                new PersonModel { Id = 9, FirstName = "Hayley", LastName = "Walker-Smith", JobTitle = "Developer", Phone = "07888 932145", Email = "hwalker@test.com" },
                new PersonModel { Id = 10, FirstName = "Alexis", LastName = "Crawley", JobTitle = "DevOps Engineer", Phone = "07778 667412", Email = "acrawley@test.com" },
                new PersonModel { Id = 11, FirstName = "David", LastName = "Gold", JobTitle = "DevOps Engineer", Phone = "07768 479563", Email = "dgold@test.com" },
                new PersonModel { Id = 12, FirstName = "Phillipa", LastName = "Walker", JobTitle = "QA Lead", Phone = "07775 357951", Email = "pwalker2@test.com" }
                );
        }
    
    }
}

