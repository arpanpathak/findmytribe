using Microsoft.AspNetCore.Mvc;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;

namespace FindMyTribe.Api.Controllers;

[ApiController]
[Route("api/profiles")]
public class ProfilesController : ControllerBase
{
    private readonly IRepository<Profile, string> _repo;
    public ProfilesController(IRepository<Profile, string> repo) => _repo = repo;

    [HttpGet]
    public ActionResult<IEnumerable<Profile>> GetAll() => Ok(_repo.GetAll());

    [HttpGet("{id}")]
    public ActionResult<Profile> GetById(string id)
    {
        var profile = _repo.GetById(id);
        return profile is null ? NotFound() : Ok(profile);
    }

    [HttpPost]
    public ActionResult<Profile> Create(Profile profile)
    {
        _repo.Add(profile);
        return CreatedAtAction(nameof(GetById), new { id = profile.Id }, profile);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, Profile profile)
    {
        if (id != profile.Id) return BadRequest();
        _repo.Update(profile);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        _repo.Delete(id);
        return NoContent();
    }
}
