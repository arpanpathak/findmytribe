namespace FindMyTribe.Api.Models;

/// <summary>
/// Represents a tribe (community/group) in the Find My Tribe platform.
/// </summary>
public class Tribe
{
    /// <summary>Unique identifier for the tribe.</summary>
    public string Id { get; set; } = Guid.NewGuid().ToString();
    /// <summary>Name of the tribe.</summary>
    public string Name { get; set; } = string.Empty;
    /// <summary>Description of the tribe.</summary>
    public string Description { get; set; } = string.Empty;
    /// <summary>URL to the tribe's icon image.</summary>
    public string IconUrl { get; set; } = string.Empty;
    /// <summary>List of member profile IDs.</summary>
    public List<string> MemberProfileIds { get; set; } = new();
}
