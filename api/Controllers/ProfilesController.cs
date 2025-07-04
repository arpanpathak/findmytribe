using Microsoft.AspNetCore.Mvc;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;

namespace FindMyTribe.Api.Controllers;

/// <summary>
/// Controller for managing user profiles in the Find My Tribe platform.
/// Provides RESTful endpoints for listing, retrieving, creating, updating, and deleting profiles.
/// </summary>
[ApiController]
[Route("api/profiles")]
public class ProfilesController : ControllerBase
{
    /// <summary>
    /// Repository for profile data.
    /// </summary>
    private readonly IRepository<Profile, string> _repo;

    /// <summary>
    /// Initializes a new instance of the <see cref="ProfilesController"/> class.
    /// </summary>
    /// <param name="repo">The profile repository.</param>
    public ProfilesController(IRepository<Profile, string> repo) => _repo = repo;

    /// <summary>
    /// Retrieves all user profiles.
    /// </summary>
    /// <returns>A list of all profiles.</returns>
    [HttpGet]
    public ActionResult<IEnumerable<Profile>> GetAll() => Ok(_repo.GetAll());

    /// <summary>
    /// Retrieves a single profile by its unique identifier.
    /// </summary>
    /// <param name="id">The ID of the profile.</param>
    /// <returns>The profile if found; otherwise, 404 Not Found.</returns>
    [HttpGet("{id}")]
    public ActionResult<Profile> GetById(string id)
    {
        var profile = _repo.GetById(id);
        return profile is null ? NotFound() : Ok(profile);
    }

    /// <summary>
    /// Creates a new user profile.
    /// </summary>
    /// <param name="profile">The profile to create.</param>
    /// <returns>The created profile with its location.</returns>
    [HttpPost]
    public ActionResult<Profile> Create(Profile profile)
    {
        _repo.Add(profile);
        return CreatedAtAction(nameof(GetById), new { id = profile.Id }, profile);
    }

    /// <summary>
    /// Updates an existing user profile.
    /// </summary>
    /// <param name="id">The ID of the profile to update.</param>
    /// <param name="profile">The updated profile data.</param>
    /// <returns>No content if successful; 400 Bad Request if IDs do not match.</returns>
    [HttpPut("{id}")]
    public IActionResult Update(string id, Profile profile)
    {
        if (id != profile.Id) return BadRequest();
        _repo.Update(profile);
        return NoContent();
    }

    /// <summary>
    /// Deletes a user profile by its unique identifier.
    /// </summary>
    /// <param name="id">The ID of the profile to delete.</param>
    /// <returns>No content if successful.</returns>
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        _repo.Delete(id);
        return NoContent();
    }
}
