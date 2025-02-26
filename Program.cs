using OliverWhiteTest;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// In-memory database - restart the server to forget any additional data.
// See PersonModelExtensions for the preconfigured example database.
builder.Services.AddDbContext<SystemContext>(options => {
    options.UseInMemoryDatabase("db");
});

var app = builder.Build();
app.MapControllers();

// Vue.js front-end in the same webserver as the data API
app.UseDefaultFiles();
app.UseStaticFiles();

// Swagger isn't currently used here - ask for access to Oliver's "Postman" workspace
// for the API tests, or just browse to api/People and take it from there.

// Cross-origin request headers aren't used here because we are serving the html and
// JavaScript, so it's already compliant with same-origin policy.

app.Run();
