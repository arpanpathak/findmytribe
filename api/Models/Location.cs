using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models;

/// <summary>
/// Represents a location for an event.
/// This class is currently a placeholder and can be extended in the future.
/// </summary>              
/// remarks>
/// This class can be used to track event locations, including coordinates, address, and any additional
/// metadata.
/// </remarks>  
public class Location
{
    /// <summary>Latitude of the location.</summary>
    public double Latitude { get; set; }

    /// <summary>Longitude of the location.</summary>
    public double Longitude { get; set; }

    /// <summary>Address of the location.</summary>
    public string AddressString { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;

    /// <summary>Optional description of the location.</summary>
    public string Description { get; set; } = string.Empty;
}
