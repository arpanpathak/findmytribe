# FindMyTribe API

A modular, professional .NET API for a meetup competitor, following strict RESTful resource naming and best practices. Easily swappable data layer via repository pattern.

## Quick Start for Developers

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd findmytribe
   ```
2. **Restore dependencies**
   ```sh
   dotnet restore
   ```
3. **Run the API**
   ```sh
   dotnet run --project api/FindMyTribe.csproj
   ```
   - The API will be available at `http://localhost:5200` (or the port shown in the console).
   - **To change the port:**
     - Edit `api/Properties/launchSettings.json` (for dev, see `applicationUrl`)
     - Or run with a custom port: `dotnet run --project api/FindMyTribe.csproj --urls=http://localhost:5005`
   - Swagger UI for interactive docs: `http://localhost:5200/swagger`
4. **Run all tests with coverage and generate HTML report**
   ```sh
   dotnet test api/api.sln
   # After test run, open:
   open api.Tests/TestResults/html/index.html
   ```
   - This gives you a visual code coverage report (red/green heatmap).

## API Endpoints

### Events

- `GET /api/events` — List all events
- `GET /api/events/{id}` — Get event by ID
- `POST /api/events` — Create a new event
- `PUT /api/events/{id}` — Update an event
- `DELETE /api/events/{id}` — Delete an event

#### Event Model
```json
{
  "id": "string (guid)",
  "name": "string",
  "description": "string",
  "startTime": "string (date-time)",
  "endTime": "string (date-time)",
  "location": "string",
  "organizerIds": ["string"],
  "type": "Free | Paid"
}
```

### Profiles

- `GET /api/profiles` — List all profiles
- `GET /api/profiles/{id}` — Get profile by ID
- `POST /api/profiles` — Create a new profile
- `PUT /api/profiles/{id}` — Update a profile
- `DELETE /api/profiles/{id}` — Delete a profile

#### Profile Model
```json
{
  "id": "string",
  "displayName": "string",
  "email": "string",
  "bio": "string",
  "avatarUrl": "string",
  "city": "string",
  "state": "string",
  "country": "string"
}
```

## Running the API

1. `dotnet restore`
2. `dotnet run --project api/FindMyTribe.csproj`

Swagger UI available at `/swagger` in development mode.

## Notes
- Data is stored in-memory for now. Swap repository implementation for a real database with zero business logic changes.
- Follows Google REST API resource naming. No verbs in endpoint paths.
- Friendly for both new users and experienced developers.
