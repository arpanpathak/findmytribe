namespace FindMyTribe.Api.Models;

public class Tribe
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public List<string> MemberProfileIds { get; set; } = new();
}
