namespace FindMyTribe.Api.Models;

/// <summary>
/// Represents the type of an event (Free or Paid).
/// </summary>
public enum EventType
{
    /// <summary>Free event.</summary>
    Free,
    /// <summary>Paid event.</summary>
    Paid
}

/// <summary>
/// Represents an event in the Find My Tribe platform.
/// </summary>
public class Event
{
    /// <summary>Unique identifier for the event.</summary>
    public Guid Id { get; set; } = Guid.NewGuid();
    /// <summary>Name of the event.</summary>
    public string Name { get; set; } = string.Empty;
    /// <summary>Description of the event.</summary>
    public string Description { get; set; } = string.Empty;
    /// <summary>Start time of the event.</summary>
    public DateTime StartTime { get; set; }
    /// <summary>End time of the event.</summary>
    public DateTime EndTime { get; set; }
    /// <summary>Location of the event.</summary>
    public string Location { get; set; } = string.Empty;
    /// <summary>List of organizer profile IDs.</summary>
    public List<string> OrganizerIds { get; set; } = new();
    /// <summary>Type of the event (Free or Paid).</summary>
    public EventType Type { get; set; } = EventType.Free;
    /// <summary>URL to the cover image for the event.</summary>
    public string CoverImageUrl { get; set; } = string.Empty;
    /// <summary>List of associated tribe IDs.</summary>
    public List<string> TribeIds { get; set; } = new();
}
