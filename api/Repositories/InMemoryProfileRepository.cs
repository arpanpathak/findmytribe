using FindMyTribe.Api.Models;

namespace FindMyTribe.Api.Repositories;

/// <summary>
/// In-memory repository for storing and managing user profiles.
/// </summary>
public class InMemoryProfileRepository : IRepository<Profile, string>
{
    /// <summary>
    /// List of user profiles.
    /// </summary>
    private readonly List<Profile> _profiles = new()
    {
        new Profile { Id = "1", DisplayName = "Alice", Gender = Gender.Female },
        new Profile { Id = "2", DisplayName = "Bob", Gender = Gender.Male },
        new Profile { Id = "3", DisplayName = "Casey", Gender = Gender.NonBinary },
        new Profile { Id = "4", DisplayName = "Dana", Gender = Gender.Female },
        new Profile { Id = "5", DisplayName = "Evan", Gender = Gender.Male }
    };

    /// <summary>
    /// Retrieves all user profiles.
    /// </summary>
    public IEnumerable<Profile> GetAll() => _profiles;
    /// <summary>
    /// Retrieves a user profile by its unique identifier.
    /// </summary>
    public Profile? GetById(string id) => _profiles.FirstOrDefault(p => p.Id == id);
    /// <summary>
    /// Adds a new user profile.
    /// </summary>
    public void Add(Profile entity) => _profiles.Add(entity);
    /// <summary>
    /// Updates an existing user profile.
    /// </summary>
    public void Update(Profile entity)
    {
        var idx = _profiles.FindIndex(p => p.Id == entity.Id);
        if (idx >= 0) _profiles[idx] = entity;
    }
    /// <summary>
    /// Deletes a user profile by its unique identifier.
    /// </summary>
    public void Delete(string id) => _profiles.RemoveAll(p => p.Id == id);
}
