# Figure Archive - Project Status

## Current Phase

Frontend preparation

---

## Completed

### Vision

- Project Vision
- MVP Scope
- Architecture Decision Records (ADR)

---

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

---

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

---

### Backend

Catalog modules

- CRUD
- DTO validation
- Soft Delete
- Pagination
- Search
- Relational validation

Product Release

- Multi-field search
- Variant relational search

Owned Figure

Completed

- Owner-only CRUD
- userId removed from DTOs
- JWT-based ownership
- CurrentUserId decorator
- Pagination
- Search
- Soft Delete
- Ownership verification
- 404 returned when accessing another user's collection

---

### Authentication & Authorization

Completed

- AuthModule
- AuthController
- AuthService
- JWT configuration
- ConfigModule integration
- Login
- Refresh
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
- CurrentUser decorator
- CurrentUserId decorator
- Swagger Authorize integration

Validated

- Login
- Refresh
- JWT validation
- Protected endpoints
- ADMIN-only catalog writes
- Public catalog
- Private collections

---

### Documentation

- Swagger integrated
- REST API documented
- JWT Authorization documented

---

### Database

- Golden Dataset
- Idempotent seed
- Robust upsert strategy
- Composite unique constraints
- Referential integrity verified

---

## In Progress

Nothing.

The backend MVP is considered complete.

---

## Pending

### Backend

- Image upload
- Advanced filtering
- Automated testing
- Performance improvements

---

### Frontend

- Angular workspace
- Authentication
- Design System
- Collection management
- Catalog browser
- Dashboard

---

## Current Milestone

Begin Angular frontend development.

Next objective

Connect Angular to the secured REST API and implement the first authenticated collection screens.