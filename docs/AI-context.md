# Figure Archive

## Goal

Build the best action figure cataloging platform for collectors.

The platform separates immutable catalog data from personal collection data, providing a scalable foundation for collectors, contributors and future community features.

---

## Current Phase

Owned Figure secured
Frontend preparation

---

## Core Domain

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

## Golden Rules

- Packaging never defines a Figure.
- Variants represent physical differences.
- Product Releases represent commercial distributions.
- User data never modifies catalog data.
- A Figure represents the collectible itself.
- An Owned Figure represents a user's physical copy.

---

## Current Architecture

Repository

- backend/
  - NestJS 11
  - Prisma ORM
  - PostgreSQL (Neon)

- frontend/
  - Angular (planned)

---

## Backend Progress

Completed modules

- Manufacturer (CRUD + Soft Delete + Pagination + Search)
- Franchise (CRUD + Soft Delete + Pagination + Search)
- Line (CRUD + Soft Delete + Relational Validation + Pagination + Search)
- Character (CRUD + Soft Delete + Relational Validation + Pagination + Search)
- Figure (CRUD + Soft Delete + Relational Validation + Pagination + Search)
- Variant (CRUD + Soft Delete + Relational Validation + Pagination + Search)
- Product Release (CRUD + Soft Delete + Relational Validation + Pagination + Multi-field Search)
- User (CRUD + Soft Delete)
- Owned Figure (Owner-only CRUD + Pagination + Search + Soft Delete)

---

## Shared Infrastructure

- PrismaModule
- ValidationPipe
- Prisma Exception Filter
- Soft Delete pattern
- Relational validation
- Prisma Studio workflow
- Generic Pagination
- Generic Paginated Response

---

## Documentation

- Swagger integrated
- Complete REST API documentation
- JWT Authentication documented
- Protected endpoints documented

---

## Database

- Golden Dataset implemented
- Robust seed using upsert()
- Referential integrity verified
- Composite unique constraints reviewed

---

## Authentication & Authorization

Implemented

- JWT Access Token
- JWT Refresh Token
- Login
- Refresh Token Rotation
- Refresh Token Revocation
- Password hashing (bcrypt)
- Passport JWT Strategy
- JwtAuthGuard
- RolesGuard
- Roles decorator
- CurrentUser decorator
- CurrentUserId decorator
- Swagger Authorize integration

Current authorization model

Catalog

- Public GET endpoints
- ADMIN creates, updates and deletes

Collections

- Authenticated users only
- Every Owned Figure belongs to exactly one user
- Ownership enforced at service level
- Users cannot access another user's collection
- userId is never accepted from the client
- userId always comes from the authenticated JWT

---

## Pagination

Completed

- Generic Pagination DTO
- Generic Pagination Response
- buildPaginatedResponse()
- Applied consistently across all modules

---

## Search

Completed

Catalog

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release

Owned Figure

- Search by condition
- completeness
- packagingState
- purchaseLocation
- storageLocation
- notes
- Product Release name

Search is case-insensitive and owner-restricted.

---

## Current Next Step

Angular frontend.

Immediate milestones

- Authentication flow
- Login screen
- Collection screens
- Catalog browser
- Add figure to collection

After frontend

- Image upload
- Advanced filters
- Dashboard
- Statistics
- Marketplace features