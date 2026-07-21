# Figure Archive - Project Status

## Current Phase

Authentication (JWT) in progress

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

All modules include:

- CRUD
- DTO validation
- Soft Delete
- Relational validation where applicable

### Authentication

Completed

- AuthModule
- AuthController
- AuthService
- JWT configuration
- ConfigModule integration
- Login endpoint
- Password hashing (bcrypt)
- Access Token generation
- Refresh Token generation
- Refresh Token hashing
- Refresh Token persistence
- Refresh Token rotation
- Token revocation support

Validated

- Login endpoint
- Refresh endpoint
- Token rotation
- Invalidated refresh tokens rejected

### Documentation

- Swagger integrated
- REST API fully documented
- Authentication endpoints documented

### Database

- Golden Dataset
- Idempotent seed
- Robust upsert strategy
- Composite unique constraints
- Referential integrity verified

---

## Pending

### Authentication

- Logout endpoint
- Jwt Strategy
- Passport integration
- JwtAuthGuard
- Roles Guard
- Authorization decorators
- Protect existing endpoints

### Backend

- Search
- Pagination
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

Complete authentication.

Next objective:

Protect the REST API using JWT Guards and Role-based authorization before starting application-level features.