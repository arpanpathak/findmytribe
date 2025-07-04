# FindMyTribe API v1 (Privacy-First)

RESTful API for a privacy-focused event/tribe platform.  
**Base URL**: `https://api.findmytribe.xyz/v1`

---

## Authentication
### Anonymous Session
```http
POST /anonymous-identities
```
Generates a temporary pseudonymous identity.  
**Response**:
```json
{
  "id": "anon_xyz123",
  "expires_at": "2025-01-01T00:00:00Z"
}
```

### Verified Identity
```http
POST /verified-identities
```
Creates a persistent account using blinded OAuth tokens.  
**Request**:
```json
{
  "provider": "google|apple",
  "token": "oauth_token_xyz"
}
```

---

## Resources
### Profiles
```http
GET /profiles/{id}
```
**Response** (visibility depends on user settings):
```json
{
  "display_name": "ForestHiker",
  "interests": ["hiking", "photography"],
  "privacy_level": "public|friends|hidden"
}
```

```http
PUT /profiles/{id}
```
Full profile replace (all fields required).

---

### Tribes
```http
POST /tribes
```
**Request**:
```json
{
  "name": "Urban Cyclists",
  "location_granularity": "exact|neighborhood|hidden"
}
```

```http
GET /tribes/{id}/events
```
Lists events with privacy-aware filtering.

---

### Events
```http
POST /tribes/{tribe_id}/events
```
**Request**:
```json
{
  "title": "Full Moon Ride",
  "message_retention_days": 7,
  "location_visibility": "members|public"
}
```

---

### Participation
```http
POST /events/{event_id}/participants
```
**Request** (anonymous option):
```json
{
  "reveal_identity": false
}
```

---

## Privacy Operations
### Data Export
```http
GET /user-data-exports
```
Generates GDPR-compliant export (ZIP download).

### Account Deletion
```http
DELETE /identities/{id}
```
Hard-deletes all data within 72h.

---

## Headers
All responses include:
```http
Privacy-Policy: https://findmytribe.xyz/privacy
X-Data-Retention-Days: 30
X-No-Tracking: true
```

---

## Rate Limits
| Identity Type      | Requests/Min |
|--------------------|-------------|
| Anonymous          | 10          |
| Verified           | 100         |
| Tor/Proxy          | 5           |

---

## Error Codes
| Code | Meaning               |
|------|-----------------------|
| 401  | Unauthorized          |
| 403  | Privacy restriction   |
| 404  | Resource not found    |
| 429  | Rate limit exceeded   |
```

Save this as `API_SPECS.md` for developer documentation. Need **OpenAPI 3.0** or **Postman collection** exports?