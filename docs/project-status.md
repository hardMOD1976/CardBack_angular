# Figure Archive - Project Status

## Current Phase

Pagination infrastructure

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

### Backend

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release
- User
- Owned Figure

All modules include

- CRUD
- DTO validation
- Soft Delete
- Relational validation where applicable

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

### Pagination

- Generic Pagination DTO
- Generic Pagination Response
- Manufacturers endpoint migration

---

## Pending

### Backend

- Apply pagination to remaining modules
- Global Search
- Filtering
- Testing
- Image upload

### Frontend

- Angular workspace
- Design System
- Authentication
- UI Foundation
- Collection management

---

## Current Milestone

Implement reusable pagination across the REST API.

Next objective

Complete pagination and filtering before starting the Angular frontend.