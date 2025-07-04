namespace FindMyTribe.Api.Models;

public enum Gender
{
    Unspecified,
    Male,
    Female,
    NonBinary,
    Other
}

public class Profile
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public Gender Gender { get; set; } = Gender.Unspecified;
}
