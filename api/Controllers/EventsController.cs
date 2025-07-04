using Microsoft.AspNetCore.Mvc;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;
using FindMyTribe.Api.Data;

namespace FindMyTribe.Api.Controllers;

[ApiController]
[Route("api/events")]
public class EventsController : ControllerBase
{
    private readonly InMemoryEventRepository _repo;
    private readonly IRepository<Profile, string> _profileRepo;
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

    [HttpGet("{id}")]
    public ActionResult<Event> GetById(Guid id)
    {
        var ev = _repo.GetById(id);
        return ev is null ? NotFound() : Ok(ev);
    }

    [HttpPost]
    public ActionResult<Event> Create(Event ev)
    {
        _repo.Add(ev);
        return CreatedAtAction(nameof(GetById), new { id = ev.Id }, ev);
    }

    [HttpPut("{id}")]
    public IActionResult Update(Guid id, Event ev)
    {
        if (id != ev.Id) return BadRequest();
        _repo.Update(ev);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        _repo.Delete(id);
        return NoContent();
    }
}
