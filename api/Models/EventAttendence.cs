using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models;

/// <summary>
/// Represents the attendance status of a user for an event.
/// This class is currently a placeholder and can be extended in the future.
/// </summary>
/// remarks>/// This class can be used to track user attendance, including status, timestamps, and any additional metadata.
/// </remarks>
/// example>        /// var attendance = new EventAttendence
/// {
///     UserId = "user123",
///     EventId = Guid.NewGuid(),
///     Status = "Attending",
///     Timestamp = DateTime.UtcNow
/// };
/// </example>          
public class EventAttendence
{
    /// <summary>Unique identifier for the attendance record.</summary>
    /// <remarks>This is generated automatically when a new attendance record is created.</remarks>
    /// <example>Example: "123e4567-e89b-12d3-a456-426614174000"</example>
    public string AttendanceId { get; set; } = Guid.NewGuid().ToString();

    /// <summary>Unique identifier for the user.</summary>
    public string UserId { get; set; } = string.Empty;

    /// <summary>Unique identifier for the event.</summary>
    public Guid EventId { get; set; }

    /// <summary>Status of the user's attendance for the event.</summary>
    public AttendenceStatus Status { get; set; } = AttendenceStatus.Attending;

    /// <summary>Timestamp of when the attendance was recorded.</summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
