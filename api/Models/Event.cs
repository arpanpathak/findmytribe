namespace FindMyTribe.Api.Models;

public enum EventType
{
    Free,
    Paid
}

public class Event
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Location { get; set; } = string.Empty;
    public List<string> OrganizerIds { get; set; } = new();
    public EventType Type { get; set; } = EventType.Free;
    public string CoverImageUrl { get; set; } = string.Empty;
    public List<string> TribeIds { get; set; } = new();
}
