using FindMyTribe.Api.Models;

namespace FindMyTribe.Api.Repositories;

public class InMemoryEventRepository : IRepository<Event, Guid>
{
    private readonly Dictionary<Guid, Event> _events;
    private readonly Dictionary<Guid, Dictionary<string, string>> _attendance = new(); // eventId -> (profileId -> status)

    public InMemoryEventRepository(int initialCapacity = 12000)
    {
        _events = new Dictionary<Guid, Event>(initialCapacity);
    }

    public IEnumerable<Event> GetAll() => _events.Values;
    public Event? GetById(Guid id) => _events.TryGetValue(id, out var ev) ? ev : null;
    public void Add(Event entity)
    {
        _events[entity.Id] = entity;
        if (!_attendance.ContainsKey(entity.Id))
            _attendance[entity.Id] = new();
    }
    public void AddAll(IEnumerable<Event> entities)
    {
        foreach (var entity in entities)
        {
            Add(entity);
        }
    }
    public void Update(Event entity) => _events[entity.Id] = entity;
    public void Delete(Guid id)
    {
        _events.Remove(id);
        _attendance.Remove(id);
    }

    // Attendance management
    public void SetAttendance(Guid eventId, string profileId, string status)
    {
        if (!_attendance.ContainsKey(eventId)) _attendance[eventId] = new();
        _attendance[eventId][profileId] = status;
    }
    public Dictionary<string, string> GetAttendance(Guid eventId)
        => _attendance.TryGetValue(eventId, out var dict) ? dict : new();
}
