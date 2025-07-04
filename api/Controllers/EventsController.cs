using Microsoft.AspNetCore.Mvc;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;
using FindMyTribe.Api.Data;

namespace FindMyTribe.Api.Controllers;

/// <summary>
/// Controller for managing Events in the Find My Tribe platform.
/// Provides RESTful endpoints for listing, retrieving, creating, updating, and deleting events.
/// </summary>
[ApiController]
[Route("api/events")]
public class EventsController : ControllerBase
{
    /// <summary>
    /// In-memory repository for event data.
    /// </summary>
    private readonly InMemoryEventRepository _repo;
    /// <summary>
    /// Repository for user profiles (not used directly in this controller).
    /// </summary>
    private readonly IRepository<Profile, string> _profileRepo;

    /// <summary>
    /// Initializes a new instance of the <see cref="EventsController"/> class.
    /// Seeds the repository with demo events if empty.
    /// </summary>
    /// <param name="repo">The event repository.</param>
    /// <param name="profileRepo">The profile repository.</param>
    public EventsController(IRepository<Event, Guid> repo, IRepository<Profile, string> profileRepo)
    {
        _repo = (InMemoryEventRepository)repo;
        _profileRepo = profileRepo;
        // Seed with some dummy events if empty
        if (!_repo.GetAll().Any())
        {
            _repo.AddAll(EventSeedData.Events);
        }
    }

    /// <summary>
    /// Retrieves a paginated list of all events.
    /// </summary>
    /// <param name="page">The page number (1-based).</param>
    /// <param name="pageSize">The number of events per page.</param>
    /// <returns>A paginated list of events with total count.</returns>
    [HttpGet]
    public ActionResult<object> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var allEvents = _repo.GetAll().ToList();
        var total = allEvents.Count;
        var items = allEvents.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        return Ok(new {
            total,
            page,
            pageSize,
            items
        });
    }

    /// <summary>
    /// Retrieves a single event by its unique identifier.
    /// </summary>
    /// <param name="id">The GUID of the event.</param>
    /// <returns>The event if found; otherwise, 404 Not Found.</returns>
    [HttpGet("{id}")]
    public ActionResult<Event> GetById(Guid id)
    {
        var ev = _repo.GetById(id);
        return ev is null ? NotFound() : Ok(ev);
    }

    /// <summary>
    /// Creates a new event.
    /// </summary>
    /// <param name="ev">The event to create.</param>
    /// <returns>The created event with its location.</returns>
    [HttpPost]
    public ActionResult<Event> Create(Event ev)
    {
        _repo.Add(ev);
        return CreatedAtAction(nameof(GetById), new { id = ev.Id }, ev);
    }

    /// <summary>
    /// Updates an existing event.
    /// </summary>
    /// <param name="id">The GUID of the event to update.</param>
    /// <param name="ev">The updated event data.</param>
    /// <returns>No content if successful; 400 Bad Request if IDs do not match.</returns>
    [HttpPut("{id}")]
    public IActionResult Update(Guid id, Event ev)
    {
        if (id != ev.Id) return BadRequest();
        _repo.Update(ev);
        return NoContent();
    }

    /// <summary>
    /// Deletes an event by its unique identifier.
    /// </summary>
    /// <param name="id">The GUID of the event to delete.</param>
    /// <returns>No content if successful.</returns>
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        _repo.Delete(id);
        return NoContent();
    }
}
