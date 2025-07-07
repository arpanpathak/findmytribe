namespace api.Models;

/// <summary>
/// Represents the attendance status of a user for an event.
/// This class is currently a placeholder and can be extended in the future.
/// </summary>
/// <remarks>
/// This class can be used to track user attendance, including status, timestamps, and any additional metadata.
/// </remarks>
/// <example>                                                                                                                       
/// var attendance = new EventAttendence
/// {
///     UserId = "user123", 
///     EventId = Guid.NewGuid(),
///    Status = "Attending",    
///   Timestamp = DateTime.UtcNow
/// };
/// </example>
public enum AttendenceStatus
{
    /// <summary>
    /// User is attending the event.
    /// </summary>
    Attending,

    /// <summary>
    /// User might attend the event.
    /// </summary>
    MightGo,

    /// <summary>
    /// User is not attending the event.
    /// </summary>
    NotAttending
}
