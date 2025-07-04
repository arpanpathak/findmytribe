namespace FindMyTribe.Api.Repositories;

/// <summary>
/// Generic repository interface for CRUD operations.
/// </summary>
/// <typeparam name="T">Entity type.</typeparam>
/// <typeparam name="TId">Type of the entity's unique identifier.</typeparam>
public interface IRepository<T, TId>
{
    /// <summary>Retrieves all entities.</summary>
    IEnumerable<T> GetAll();
    /// <summary>Retrieves an entity by its unique identifier.</summary>
    T? GetById(TId id);
    /// <summary>Adds a new entity.</summary>
    void Add(T entity);
    /// <summary>Updates an existing entity.</summary>
    void Update(T entity);
    /// <summary>Deletes an entity by its unique identifier.</summary>
    void Delete(TId id);
}
