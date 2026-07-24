# Figure Archive (working title) - Project Status

## Current Phase

Frontend foundation

Brand definition

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

Backend MVP completed.

---

### Frontend

Foundation completed

- Angular workspace
- Feature-first architecture
- Shell
- Header
- Sidebar
- Dashboard page
- Initial Router configuration

Documentation completed

- Frontend Architecture
- Information Architecture
- User Flows
- Design System
- Components

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

Backend

- Swagger integrated
- REST API documented

Frontend

- Architecture documented
- UX documented
- Component architecture documented

Brand

Initial branding documentation created.

---

### Database

- Golden Dataset
- Idempotent seed
- Robust upsert strategy
- Composite unique constraints
- Referential integrity verified

---

## In Progress

Frontend

- Design System
- Header
- Sidebar
- Authentication UI

Brand

- Naming
- Visual identity
- Logo exploration

---

## Pending

### Backend

- Image upload
- Advanced filtering
- Automated testing
- Performance improvements

---

### Frontend

- Login
- Collection
- Databank
- Figure Detail
- Wishlist
- Scanner
- AI Identify
- Dashboard widgets
- Profile

---

## Current Milestone

Build the first functional frontend connected to the secured REST API.

Parallel objective

Define the Cardback brand identity before implementing the complete Design System.