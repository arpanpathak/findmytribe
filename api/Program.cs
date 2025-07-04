using FindMyTribe.Api.Repositories;
using FindMyTribe.Api.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FindMyTribe API", Version = "v1" });
});

// Register repositories for dependency injection
builder.Services.AddSingleton<IRepository<Event, Guid>>(sp => new InMemoryEventRepository(12000));
builder.Services.AddSingleton<IRepository<Profile, string>, InMemoryProfileRepository>();
builder.Services.AddSingleton<IRepository<Tribe, string>, InMemoryTribeRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "FindMyTribe API V1");
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Print the port info on startup for developer clarity
var urls = app.Urls.Any() ? string.Join(", ", app.Urls) : "default Kestrel config";
Console.WriteLine($"\nFindMyTribe API running on: {urls}\n");
Console.WriteLine("To change the port, edit Properties/launchSettings.json (for dev) or use --urls on dotnet run.");

app.Run();
