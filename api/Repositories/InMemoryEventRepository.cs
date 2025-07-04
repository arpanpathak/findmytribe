using FindMyTribe.Api.Models;

namespace FindMyTribe.Api.Repositories;

/// <summary>
/// In-memory repository for storing and managing events and their attendance.
/// </summary>
public class InMemoryEventRepository : IRepository<Event, Guid>
{
    /// <summary>
    /// Dictionary of events, keyed by event GUID.
    /// </summary>
    private readonly Dictionary<Guid, Event> _events;
    /// <summary>
    /// Attendance dictionary: eventId -> (profileId -> status).
    /// </summary>
    private readonly Dictionary<Guid, Dictionary<string, string>> _attendance = new();

    /// <summary>
    /// Initializes a new instance of the <see cref="InMemoryEventRepository"/> class.
    /// </summary>
    /// <param name="initialCapacity">Initial capacity for the event dictionary.</param>
    public InMemoryEventRepository(int initialCapacity = 12000)
    {
        _events = new Dictionary<Guid, Event>(initialCapacity);
    }

    /// <summary>
    /// Retrieves all events.
    /// </summary>
    public IEnumerable<Event> GetAll() => _events.Values;
    /// <summary>
    /// Retrieves an event by its unique identifier.
    /// </summary>
    public Event? GetById(Guid id) => _events.TryGetValue(id, out var ev) ? ev : null;
    /// <summary>
    /// Adds a new event.
    /// </summary>
    public void Add(Event entity)
    {
        _events[entity.Id] = entity;
        if (!_attendance.ContainsKey(entity.Id))
            _attendance[entity.Id] = new();
    }
    /// <summary>
    /// Adds multiple events at once.
    /// </summary>
    public void AddAll(IEnumerable<Event> entities)
    {
        foreach (var entity in entities)
        {
            Add(entity);
        }
    }
    /// <summary>
    /// Updates an existing event.
    /// </summary>
    public void Update(Event entity) => _events[entity.Id] = entity;
    /// <summary>
    /// Deletes an event and its attendance data.
    /// </summary>
    public void Delete(Guid id)
    {
        _events.Remove(id);
        _attendance.Remove(id);
    }

    // Attendance management

    /// <summary>
    /// Sets the attendance status for a profile on a specific event.
    /// </summary>
    public void SetAttendance(Guid eventId, string profileId, string status)
    {
        if (!_attendance.ContainsKey(eventId)) _attendance[eventId] = new();
        _attendance[eventId][profileId] = status;
    }
    /// <summary>
    /// Retrieves the attendance dictionary for a specific event.
    /// </summary>
    public Dictionary<string, string> GetAttendance(Guid eventId)
        => _attendance.TryGetValue(eventId, out var dict) ? dict : new();
}
