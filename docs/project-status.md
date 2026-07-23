# Figure Archive - Project Status

## Current Phase

Owned Figure security refactor

---

## Completed

### Vision

- Project Vision
- MVP Scope
- Architecture Decision Records (ADR)

### Domain

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release
- User
- Owned Figure

### Infrastructure

- Repository restructured
- backend/ and frontend/ separation
- PostgreSQL (Neon)
- Prisma ORM
- Prisma schema completed
- Database migrations
- Prisma Client
- NestJS application
- ValidationPipe
- Prisma Exception Filter
- Soft Delete infrastructure
- Relational validation infrastructure
- Generic Pagination
- Generic Paginated Response

### Backend

All catalog modules

- CRUD
- DTO validation
- Soft Delete
- Relational validation
- Pagination
- Search

Product Release

- Multi-field search
- Relational search

### Authentication & Authorization

Completed

- AuthModule
- AuthController
- AuthService
- JWT configuration
- ConfigModule integration
- Login endpoint
- Refresh endpoint
- Password hashing
- Refresh Token hashing
- Access Token generation
- Refresh Token rotation
- Token revocation
- Passport JWT Strategy
- JwtAuthGuard
- Public decorator
- Roles decorator
- RolesGuard
- Swagger Authorize integration
- Role-based authorization

Validated

- Login
- Refresh
- JWT validation
- Protected endpoints
- ADMIN-only write operations
- Public catalog access

### Documentation

- Swagger integrated
- REST API fully documented
- Authentication documented
- JWT Authorization documented

### Database

- Golden Dataset
- Idempotent seed
- Robust upsert strategy
- Composite unique constraints
- Referential integrity verified

---

## In Progress

### Owned Figure

Pending redesign

- Ownership enforcement
- JWT user extraction
- Remove userId from DTOs
- Owner-only CRUD
- Search

---

## Pending

### Backend

- Owned Figure security
- Advanced filtering
- Image upload
- Testing

### Frontend

- Angular workspace
- Design System
- Authentication
- UI Foundation
- Collection management

---

## Current Milestone

Secure personal collections.

Next objective

Implement owner-only access for OwnedFigure before starting the Angular frontend.