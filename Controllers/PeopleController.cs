using Microsoft.AspNetCore.Mvc;

namespace OliverWhiteTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {

        private readonly SystemContext _context;

        public PeopleController(SystemContext context)
        {
            _context = context;
            _context.Database.EnsureCreated();
        }

        public ActionResult GetPeople([FromQuery] PersonFilter queryParameters)
        {
            IQueryable<PersonModel> people = _context.People;
            if (queryParameters.Search != null)
            {
                String searchText = queryParameters.Search.ToLower();
                people = people.Where(p => (
                    p.FirstName.ToLower().Contains(searchText) 
                    || 
                    p.LastName.ToLower().Contains(searchText)));
            }
            return Ok(people);
        }

        [HttpGet, Route("{id}")] // e.g. api/People/1
        public ActionResult GetPerson(int id)
        {
            var person = _context.People.Find(id);
            if (person == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(person);
            }
        }

        [HttpPost]
        public async Task<ActionResult> PostAspect(PersonModel person)
        {
            _context.People.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerson", new { id = person.Id }, person);
        }

    }
}
