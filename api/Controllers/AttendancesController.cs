using Microsoft.AspNetCore.Mvc;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;

namespace FindMyTribe.Api.Controllers;

[ApiController]
[Route("api/attendances")]
public class AttendancesController : ControllerBase
{
    private readonly InMemoryEventRepository _eventRepo;
    private readonly IRepository<Profile, string> _profileRepo;
    public AttendancesController(IRepository<Event, Guid> eventRepo, IRepository<Profile, string> profileRepo)
    {
        _eventRepo = (InMemoryEventRepository)eventRepo;
        _profileRepo = profileRepo;
    }

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

    [HttpPost("event/{eventId}")]
    public IActionResult SetAttendance(Guid eventId, [FromBody] AttendRequest req)
    {
        var eventObj = _eventRepo.GetById(eventId);
        if (eventObj == null) return NotFound();
        _eventRepo.SetAttendance(eventId, req.ProfileId, req.Status);
        return Ok();
    }

    public class AttendRequest
    {
        public string ProfileId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty; // Attending, MightGo, NotAttending
    }
}
