using FindMyTribe.Api.Models;

namespace FindMyTribe.Api.Repositories;

public class InMemoryTribeRepository : IRepository<Tribe, string>
{
    private readonly List<Tribe> _tribes = new()
    {
        new Tribe {
            Id = "t1",
            Name = "Seattle Indie Music",
            Description = "A tribe for indie music lovers in Seattle.",
            IconUrl = "https://cdn-icons-png.flaticon.com/512/616/616494.png",
            MemberProfileIds = new List<string> { "1", "2" }
        },
        new Tribe {
            Id = "t2",
            Name = "Portland Art Walkers",
            Description = "Art enthusiasts exploring Portland.",
            IconUrl = "https://cdn-icons-png.flaticon.com/512/616/616490.png",
            MemberProfileIds = new List<string> { "3", "4" }
        }
    };

    public IEnumerable<Tribe> GetAll() => _tribes;
    public Tribe? GetById(string id) => _tribes.FirstOrDefault(t => t.Id == id);
    public void Add(Tribe entity) => _tribes.Add(entity);
    public void Update(Tribe entity)
    {
        var idx = _tribes.FindIndex(t => t.Id == entity.Id);
        if (idx >= 0) _tribes[idx] = entity;
    }
    public void Delete(string id) => _tribes.RemoveAll(t => t.Id == id);
}
