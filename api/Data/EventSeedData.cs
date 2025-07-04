using System;
using System.Collections.Generic;
using FindMyTribe.Api.Models;

namespace FindMyTribe.Api.Data;

/// <summary>
/// Provides seed data for events in the Find My Tribe platform.
/// </summary>
public static class EventSeedData
{
    /// <summary>
    /// Gets a large list of seeded events for demo and testing purposes.
    /// </summary>
    public static List<Event> Events => GenerateEvents(10000);

    /// <summary>
    /// Generates a list of random events for seeding.
    /// </summary>
    /// <param name="count">The number of events to generate.</param>
    /// <returns>A list of generated events.</returns>
    private static List<Event> GenerateEvents(int count)
    {
        var events = new List<Event>(count);
        var random = new Random(42);
        var locations = new[]
        {
            "Seattle, WA", "Portland, OR", "Vancouver, BC", "Denver, CO", "San Francisco, CA",
            "Banff National Park", "Yosemite Valley", "Lake Tahoe, CA", "Whistler, BC", "Jackson Hole, WY",
            "Mount Rainier National Park", "Zion National Park", "Aspen, CO", "Boulder, CO", "Salt Lake City, UT"
        };
        var eventTypes = new[] { EventType.Free, EventType.Paid };
        var tribeIds = new[] { "t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10" };
        var coverImages = new[]
        {
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
        };
        var adjectives = new[] { "Epic", "Icy", "Glacier", "Summit", "Chill", "Wild", "Frozen", "Mystic", "Sunset", "Moonlit", "Urban", "Mountain", "River", "Forest", "Peak", "Adventure", "Tribe", "Crew", "Night", "Day", "Trail", "Hiking", "Climb", "Party", "Meetup", "Festival", "Jam", "Gathering", "Expedition", "Retreat" };
        var activities = new[] { "Hike", "Climb", "Party", "Meetup", "Festival", "Jam", "Gathering", "Expedition", "Retreat", "Run", "Yoga", "Picnic", "Bar Hop", "Music Night", "Art Walk", "Food Crawl", "Sunrise Trek", "Stargazing", "Snowshoe", "Ski", "Board", "Kayak", "Camp", "Swim", "Bike", "Trail Run" };
        var descTemplates = new[]
        {
            "Join us for a {0} {1} at {2}. Meet new friends and experience the best of the outdoors!",
            "Don't miss this {0} {1} in {2}—adventure, fun, and memories await!",
            "A {0} {1} for all levels. Explore {2} with awesome people!",
            "Experience the {0} {1}—nature, music, and good vibes at {2}.",
            "{0} {1} at {2}: discover, connect, and enjoy!"
        };
        for (int i = 0; i < count; i++)
        {
            var adj = adjectives[random.Next(adjectives.Length)];
            var act = activities[random.Next(activities.Length)];
            var loc = locations[random.Next(locations.Length)];
            var type = eventTypes[random.Next(eventTypes.Length)];
            var tribe = tribeIds[random.Next(tribeIds.Length)];
            var img = coverImages[random.Next(coverImages.Length)];
            var name = $"{adj} {act} {i + 1}";
            var desc = string.Format(descTemplates[random.Next(descTemplates.Length)], adj, act, loc);
            var start = DateTime.Now.AddDays(random.Next(1, 365)).AddHours(random.Next(0, 24));
            var end = start.AddHours(random.Next(2, 10));
            events.Add(new Event
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = desc,
                StartTime = start,
                EndTime = end,
                Location = loc,
                OrganizerIds = new List<string> { random.Next(1, 10).ToString() },
                Type = type,
                CoverImageUrl = img,
                TribeIds = new List<string> { tribe }
            });
        }
        return events;
    }
}
