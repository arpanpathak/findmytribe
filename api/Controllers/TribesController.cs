using Microsoft.AspNetCore.Mvc;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;

namespace FindMyTribe.Api.Controllers;

/// <summary>
/// Controller for managing Tribes in the Find My Tribe platform.
/// Provides RESTful endpoints for listing, retrieving, creating, updating, and deleting tribes.
/// </summary>
[ApiController]
[Route("api/tribes")]
public class TribesController : ControllerBase
{
    /// <summary>
    /// Repository for tribe data.
    /// </summary>
    private readonly IRepository<Tribe, string> _repo;

    /// <summary>
    /// Initializes a new instance of the <see cref="TribesController"/> class.
    /// </summary>
    /// <param name="repo">The tribe repository.</param>
    public TribesController(IRepository<Tribe, string> repo)
    {
        _repo = repo;
    }

    /// <summary>
    /// Retrieves all tribes.
    /// </summary>
    /// <returns>A list of all tribes.</returns>
    [HttpGet]
    public ActionResult<IEnumerable<Tribe>> GetAll() => Ok(_repo.GetAll());

    /// <summary>
    /// Retrieves a single tribe by its unique identifier.
    /// </summary>
    /// <param name="id">The ID of the tribe.</param>
    /// <returns>The tribe if found; otherwise, 404 Not Found.</returns>
    [HttpGet("{id}")]
    public ActionResult<Tribe> GetById(string id)
    {
        var tribe = _repo.GetById(id);
        return tribe is null ? NotFound() : Ok(tribe);
    }

    /// <summary>
    /// Creates a new tribe.
    /// </summary>
    /// <param name="tribe">The tribe to create.</param>
    /// <returns>The created tribe with its location.</returns>
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

    /// <summary>
    /// Updates an existing tribe.
    /// </summary>
    /// <param name="id">The ID of the tribe to update.</param>
    /// <param name="tribe">The updated tribe data.</param>
    /// <returns>No content if successful; 400 Bad Request if IDs do not match.</returns>
    [HttpPut("{id}")]
    public IActionResult Update(string id, Tribe tribe)
    {
        if (id != tribe.Id) return BadRequest();
        _repo.Update(tribe);
        return NoContent();
    }

    /// <summary>
    /// Deletes a tribe by its unique identifier.
    /// </summary>
    /// <param name="id">The ID of the tribe to delete.</param>
    /// <returns>No content if successful.</returns>
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        _repo.Delete(id);
        return NoContent();
    }
}
