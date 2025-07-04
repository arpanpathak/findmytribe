using System;
using System.Collections.Generic;
using Xunit;
using FindMyTribe.Api.Models;
using FindMyTribe.Api.Repositories;

namespace FindMyTribe.Api.Tests;

public class InMemoryEventRepositoryTests
{
    [Fact]
    public void Add_And_GetById_Works()
    {
        // Arrange: prepare data and repository
        var repo = new InMemoryEventRepository();
        var ev = new Event { Name = "Test Event" };

        // Act: perform the operation
        var beforeAdd = repo.GetById(ev.Id);
        repo.Add(ev);
        var fetched = repo.GetById(ev.Id);
        var all = repo.GetAll();

        // Assert: verify results
        Assert.Null(beforeAdd); // Should not exist before add
        Assert.NotNull(fetched);
        Assert.Equal(ev.Name, fetched!.Name);
        Assert.Equal(ev.Id, fetched.Id);
        Assert.Single(all);
    }

    [Fact]
    public void Update_Works()
    {
        // Arrange
        var repo = new InMemoryEventRepository();
        var ev = new Event { Name = "Old Name" };
        repo.Add(ev);

        // Act
        ev.Name = "New Name";
        repo.Update(ev);
        var fetched = repo.GetById(ev.Id);

        // Assert
        Assert.Equal("New Name", fetched!.Name);
        Assert.Equal(ev.Id, fetched.Id);
    }

    [Fact]
    public void Delete_Works()
    {
        // Arrange
        var repo = new InMemoryEventRepository();
        var ev = new Event { Name = "To Delete" };
        repo.Add(ev);

        // Act
        repo.Delete(ev.Id);
        var afterDelete = repo.GetById(ev.Id);
        var all = repo.GetAll();

        // Assert
        Assert.Null(afterDelete);
        Assert.Empty(all);
    }

    [Fact]
    public void GetAll_Returns_All_Events()
    {
        // Arrange
        var repo = new InMemoryEventRepository();
        var ev1 = new Event { Name = "A" };
        var ev2 = new Event { Name = "B" };
        repo.Add(ev1);
        repo.Add(ev2);

        // Act
        var all = repo.GetAll();

        // Assert
        Assert.Equal(2, new List<Event>(all).Count);
        Assert.Contains(all, e => e.Name == "A");
        Assert.Contains(all, e => e.Name == "B");
    }

    [Fact]
    public void Add_Overwrites_If_Same_Id()
    {
        // Arrange
        var repo = new InMemoryEventRepository();
        var ev = new Event { Name = "First" };
        repo.Add(ev);
        var ev2 = new Event { Id = ev.Id, Name = "Second" };

        // Act
        repo.Add(ev2);
        var fetched = repo.GetById(ev.Id);
        var all = repo.GetAll();

        // Assert
        Assert.Equal("Second", fetched!.Name);
        Assert.Single(all);
    }
}
