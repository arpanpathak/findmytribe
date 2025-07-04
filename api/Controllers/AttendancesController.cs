using Microsoft.AspNetCore.Mvc;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;

namespace FindMyTribe.Api.Controllers;

/// <summary>
/// Controller for managing event attendance in the Find My Tribe platform.
/// Provides endpoints for attendance statistics and setting attendance status.
/// </summary>
[ApiController]
[Route("api/attendances")]
public class AttendancesController : ControllerBase
{
    /// <summary>
    /// In-memory event repository for attendance data.
    /// </summary>
    private readonly InMemoryEventRepository _eventRepo;
    /// <summary>
    /// Repository for user profiles.
    /// </summary>
    private readonly IRepository<Profile, string> _profileRepo;

    /// <summary>
    /// Initializes a new instance of the <see cref="AttendancesController"/> class.
    /// </summary>
    /// <param name="eventRepo">The event repository.</param>
    /// <param name="profileRepo">The profile repository.</param>
    public AttendancesController(IRepository<Event, Guid> eventRepo, IRepository<Profile, string> profileRepo)
    {
        _eventRepo = (InMemoryEventRepository)eventRepo;
        _profileRepo = profileRepo;
    }

    /// <summary>
    /// Retrieves attendance statistics for a specific event.
    /// </summary>
    /// <param name="eventId">The GUID of the event.</param>
    /// <returns>Attendance statistics including gender balance.</returns>
    [HttpGet("event/{eventId}/statistics")]
    public ActionResult<object> GetStatistics(Guid eventId)
    {
        var eventObj = _eventRepo.GetById(eventId);
        if (eventObj == null) return NotFound();
        var attendance = _eventRepo.GetAttendance(eventId);
        var profiles = _profileRepo.GetAll().ToDictionary(p => p.Id, p => p);
        var stats = new {
            Attending = attendance.Values.Count(s => s == "Attending"),
            MightGo = attendance.Values.Count(s => s == "MightGo"),
            NotAttending = attendance.Values.Count(s => s == "NotAttending"),
            GenderBalance = attendance
                .Where(kv => kv.Value == "Attending")
                .GroupBy(kv => profiles.ContainsKey(kv.Key) ? profiles[kv.Key].Gender.ToString() : "Unspecified")
                .ToDictionary(g => g.Key, g => g.Count())
        };
        return Ok(stats);
    }

    /// <summary>
    /// Sets the attendance status for a user on a specific event.
    /// </summary>
    /// <param name="eventId">The GUID of the event.</param>
    /// <param name="req">The attendance request containing profile ID and status.</param>
    /// <returns>200 OK if successful; 404 Not Found if event does not exist.</returns>
    [HttpPost("event/{eventId}")]
    public IActionResult SetAttendance(Guid eventId, [FromBody] AttendRequest req)
    {
        var eventObj = _eventRepo.GetById(eventId);
        if (eventObj == null) return NotFound();
        _eventRepo.SetAttendance(eventId, req.ProfileId, req.Status);
        return Ok();
    }

    /// <summary>
    /// Request body for setting attendance status.
    /// </summary>
    public class AttendRequest
    {
        /// <summary>Profile ID of the attendee.</summary>
        public string ProfileId { get; set; } = string.Empty;
        /// <summary>Status of attendance (Attending, MightGo, NotAttending).</summary>
        public string Status { get; set; } = string.Empty; // Attending, MightGo, NotAttending
    }
}
