using System.ComponentModel.DataAnnotations;

namespace OliverWhiteTest
{
    public class PersonModel
    {
        public int Id { get; set; }
        
        public required string FirstName { get; set; }
        
        public required string LastName { get; set; }
        // (note https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/
        // but see https://history.stackexchange.com/questions/54917)

        public string? JobTitle { get; set; }
        
        public string? Phone { get; set; }
        
        public string? Email { get; set; }

    }
}
