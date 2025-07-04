using Microsoft.AspNetCore.Mvc;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;

namespace FindMyTribe.Api.Controllers;

[ApiController]
[Route("api/tribes")]
public class TribesController : ControllerBase
{
    private readonly IRepository<Tribe, string> _repo;
    public TribesController(IRepository<Tribe, string> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Tribe>> GetAll() => Ok(_repo.GetAll());

    [HttpGet("{id}")]
    public ActionResult<Tribe> GetById(string id)
    {
        var tribe = _repo.GetById(id);
        return tribe is null ? NotFound() : Ok(tribe);
    }

    [HttpPost]
    public ActionResult<Tribe> Create(Tribe tribe)
    {
        if (string.IsNullOrWhiteSpace(tribe.Name) || string.IsNullOrWhiteSpace(tribe.Description))
        {
            return BadRequest(new { error = "Name and Description are required." });
        }
        _repo.Add(tribe);
        return CreatedAtAction(nameof(GetById), new { id = tribe.Id }, tribe);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, Tribe tribe)
    {
        if (id != tribe.Id) return BadRequest();
        _repo.Update(tribe);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        _repo.Delete(id);
        return NoContent();
    }
}
