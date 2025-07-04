# Find My Tribe API

This is the backend RESTful API for the Find My Tribe platform, built with .NET 9. It provides endpoints for managing events, tribes, profiles, and attendances.

---

## Endpoints Overview

### Events
- `GET /api/events` — List events (pagination: `page`, `pageSize`)
- `GET /api/events/{id}` — Get event by ID
- `POST /api/events` — Create event
- `PUT /api/events/{id}` — Update event
- `DELETE /api/events/{id}` — Delete event

### Tribes
- `GET /api/tribes` — List all tribes
- `GET /api/tribes/{id}` — Get tribe by ID
- `POST /api/tribes` — Create tribe (name & description required)
- `PUT /api/tribes/{id}` — Update tribe
- `DELETE /api/tribes/{id}` — Delete tribe

### Profiles
- `GET /api/profiles` — List all profiles
- `GET /api/profiles/{id}` — Get profile by ID
- `POST /api/profiles` — Create profile
- `PUT /api/profiles/{id}` — Update profile
- `DELETE /api/profiles/{id}` — Delete profile

### Attendances
- `GET /api/attendances/event/{eventId}/statistics` — Get event attendance stats
- `POST /api/attendances/event/{eventId}` — Set attendance for a profile

---

## Usage

- Run with `dotnet run` in the `api/` directory.
- In-memory data is seeded for demo/testing.
- See XML doc comments in controllers/models for details on request/response formats.

---

## Notes
- All endpoints return JSON.
- Pagination is supported for events.
- Validation is enforced for tribe creation.

---

For more, see the main [README](../README.md).
