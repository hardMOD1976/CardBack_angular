# API Guidelines

## Status

🟢 Active

---

# Purpose

This document defines the design principles for the FigureArchive REST API.

Its objective is to ensure consistency, predictability and long-term maintainability across all backend endpoints.

The API should be easy to understand for frontend developers and simple to evolve as the platform grows.

---

# Architectural Style

FigureArchive exposes a RESTful API.

Resources are represented by nouns.

Examples:

/manufacturers

/franchises

/lines

/characters

/figures

/variants

/product-releases

/owned-figures

---

# Resource Naming

Endpoints use:

- lowercase
- plural nouns
- hyphen-separated words

Examples:

/product-releases

/owned-figures

Never:

/GetFigures

/getFigure

/ProductRelease

---

# HTTP Methods

GET

Retrieve data.

POST

Create resources.

PUT

Replace an existing resource.

PATCH

Partially update a resource.

DELETE

Remove a resource.

Each endpoint should use the HTTP method that best matches its intent.

---

# JSON

All communication uses JSON.

Example:

```json
{
  "id": "...",
  "name": "Luke Skywalker"
}
```

---

# Status Codes

200

Request completed successfully.

201

Resource created.

204

Operation completed with no response body.

400

Invalid request.

401

Authentication required.

403

Forbidden.

404

Resource not found.

409

Conflict.

422

Validation failed.

500

Unexpected server error.

---

# Validation

All incoming data is validated by the backend.

Frontend validation improves user experience.

Backend validation guarantees data integrity.

The backend is always authoritative.

---

# Error Responses

Errors should be consistent.

Example:

```json
{
  "statusCode": 404,
  "message": "Figure not found",
  "error": "Not Found"
}
```

Errors should help frontend developers while remaining understandable.

---

# Filtering

Collections should support filtering.

Examples:

GET /figures?character=Luke

GET /figures?line=tvc

GET /variants?figure=vc13

---

# Pagination

Large collections should always support pagination.

Typical parameters:

?page=1

&pageSize=50

The API should never return extremely large datasets by default.

---

# Sorting

Endpoints may support sorting.

Example:

?sort=name

?sort=releaseYear

Descending order:

?sort=-releaseYear

---

# Searching

Catalog resources should support text search.

Example:

GET /figures?search=luke

Search should prioritize relevance over strict matching.

---

# Relationships

Resources reference one another by identifiers.

Example:

Figure

↓

Character

↓

Franchise

The backend is responsible for resolving relationships when necessary.

---

# Versioning

The first public API will use:

/api/v1/

Future breaking changes should introduce a new API version.

Existing clients should continue working whenever possible.

---

# Authentication

Protected endpoints require authentication.

Examples:

Owned Figures

Wishlist

Collection management

Catalog browsing may remain public.

---

# Authorization

Authentication identifies the user.

Authorization determines what the user can access.

Collectors should only modify their own personal data.

---

# Performance

Endpoints should avoid:

- unnecessary joins
- duplicated data
- over-fetching

Only the information required by the client should be returned.

---

# Documentation

Every endpoint should be documented.

Swagger/OpenAPI will be generated automatically from NestJS.

The documentation should always match the implementation.

---

# Design Principles

The API follows these principles:

- REST-first
- Predictable
- Consistent
- Versioned
- Secure
- Easy to consume
- Easy to evolve

---

# Related Documents

- 001-system-overview.md
- 002-backend-architecture.md
- 003-frontend-architecture.md
- 004-deployment.md
- ADR-007 – Backend Architecture