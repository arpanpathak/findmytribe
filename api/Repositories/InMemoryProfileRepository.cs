using FindMyTribe.Api.Models;

namespace FindMyTribe.Api.Repositories;

public class InMemoryProfileRepository : IRepository<Profile, string>
{
    private readonly List<Profile> _profiles = new()
    {
        new Profile { Id = "1", DisplayName = "Alice", Gender = Gender.Female },
        new Profile { Id = "2", DisplayName = "Bob", Gender = Gender.Male },
        new Profile { Id = "3", DisplayName = "Casey", Gender = Gender.NonBinary },
        new Profile { Id = "4", DisplayName = "Dana", Gender = Gender.Female },
        new Profile { Id = "5", DisplayName = "Evan", Gender = Gender.Male }
    };

    public IEnumerable<Profile> GetAll() => _profiles;
    public Profile? GetById(string id) => _profiles.FirstOrDefault(p => p.Id == id);
    public void Add(Profile entity) => _profiles.Add(entity);
    public void Update(Profile entity)
    {
        var idx = _profiles.FindIndex(p => p.Id == entity.Id);
        if (idx >= 0) _profiles[idx] = entity;
    }
    public void Delete(string id) => _profiles.RemoveAll(p => p.Id == id);
}
