namespace FindMyTribe.Api.Repositories;

public interface IRepository<T, TId>
{
    IEnumerable<T> GetAll();
    T? GetById(TId id);
    void Add(T entity);
    void Update(T entity);
    void Delete(TId id);
}
