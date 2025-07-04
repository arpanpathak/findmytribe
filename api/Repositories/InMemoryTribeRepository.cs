using FindMyTribe.Api.Models;

namespace FindMyTribe.Api.Repositories;

/// <summary>
/// In-memory repository for storing and managing tribes.
/// </summary>
public class InMemoryTribeRepository : IRepository<Tribe, string>
{
    /// <summary>
    /// List of tribes.
    /// </summary>
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

    /// <summary>
    /// Retrieves all tribes.
    /// </summary>
    public IEnumerable<Tribe> GetAll() => _tribes;
    /// <summary>
    /// Retrieves a tribe by its unique identifier.
    /// </summary>
    public Tribe? GetById(string id) => _tribes.FirstOrDefault(t => t.Id == id);
    /// <summary>
    /// Adds a new tribe.
    /// </summary>
    public void Add(Tribe entity) => _tribes.Add(entity);
    /// <summary>
    /// Updates an existing tribe.
    /// </summary>
    public void Update(Tribe entity)
    {
        var idx = _tribes.FindIndex(t => t.Id == entity.Id);
        if (idx >= 0) _tribes[idx] = entity;
    }
    /// <summary>
    /// Deletes a tribe by its unique identifier.
    /// </summary>
    public void Delete(string id) => _tribes.RemoveAll(t => t.Id == id);
}
