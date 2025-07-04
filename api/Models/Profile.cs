namespace FindMyTribe.Api.Models;

/// <summary>
/// Represents the gender of a user profile.
/// </summary>
public enum Gender
{
    /// <summary>Unspecified gender.</summary>
    Unspecified,
    /// <summary>Male gender.</summary>
    Male,
    /// <summary>Female gender.</summary>
    Female,
    /// <summary>Non-binary gender.</summary>
    NonBinary,
    /// <summary>Other gender.</summary>
    Other
}

/// <summary>
/// Represents a user profile in the Find My Tribe platform.
/// </summary>
public class Profile
{
    /// <summary>Unique identifier for the profile.</summary>
    public string Id { get; set; } = Guid.NewGuid().ToString();
    /// <summary>Display name of the user.</summary>
    public string DisplayName { get; set; } = string.Empty;
    /// <summary>Email address of the user.</summary>
    public string Email { get; set; } = string.Empty;
    /// <summary>Short biography of the user.</summary>
    public string Bio { get; set; } = string.Empty;
    /// <summary>URL to the user's avatar image.</summary>
    public string AvatarUrl { get; set; } = string.Empty;
    /// <summary>City where the user is located.</summary>
    public string City { get; set; } = string.Empty;
    /// <summary>State where the user is located.</summary>
    public string State { get; set; } = string.Empty;
    /// <summary>Country where the user is located.</summary>
    public string Country { get; set; } = string.Empty;
    /// <summary>Gender of the user.</summary>
    public Gender Gender { get; set; } = Gender.Unspecified;
}
