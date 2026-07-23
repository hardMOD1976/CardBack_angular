# Figure Archive

## Goal

Build the best action figure cataloging platform for collectors.

The platform separates immutable catalog data from personal collection data, providing a scalable foundation for collectors, contributors and future community features.

---

## Current Phase

Pagination & Search completed for catalog modules
OwnedFigure security refactor pending

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
- Line (CRUD + Soft Delete + relational validation + Pagination + Search)
- Character (CRUD + Soft Delete + relational validation + Pagination + Search)
- Figure (CRUD + Soft Delete + relational validation + Pagination + Search)
- Variant (CRUD + Soft Delete + relational validation + Pagination + Search)
- Product Release (CRUD + Soft Delete + relational validation + Pagination + Multi-field Search)
- User (CRUD + Soft Delete)
- Owned Figure (CRUD + Soft Delete + relational validation)

Shared infrastructure

- PrismaModule
- ValidationPipe
- Prisma Exception Filter
- Soft Delete pattern
- Relational validation
- Prisma Studio workflow
- Generic Pagination
- Generic Paginated Response

Documentation

- Swagger integrated
- Complete REST API documentation
- Swagger JWT authentication
- Protected endpoints documented

Database

- Golden Dataset implemented
- Robust seed with upsert()
- Referential integrity verified
- Unique constraints reviewed

Authentication & Authorization

Implemented

- JWT Access Token
- JWT Refresh Token
- Login endpoint
- Password hashing (bcrypt)
- Refresh token hashing
- Refresh token rotation
- Refresh token persistence
- Token revocation support
- ConfigModule integration
- JwtModule configured through environment variables
- Passport JWT Strategy
- JwtAuthGuard
- Public decorator
- Roles decorator
- RolesGuard
- Role-based authorization
- Swagger Authorize integration
- Protected endpoints validated

Current authorization model

- Public catalog (GET endpoints)
- Authenticated users can browse catalog
- Only ADMIN users can create, update or delete catalog entities

Pagination

Completed

- PaginationQueryDto
- PaginationMetaDto
- PaginatedResponseDto
- buildPaginatedResponse()
- Applied to every catalog endpoint

Search

Completed for catalog entities

Implemented

- Case-insensitive search
- Multi-field search where appropriate
- Relational search
- Consistent OR filtering

Product Release search includes

- name
- barcode
- notes
- retailer
- region
- language
- packagingType
- variant.name

---

## Current Next Step

Owned Figure security redesign.

Immediate milestone

- Remove userId from DTOs
- Obtain authenticated user from JWT
- Restrict CRUD operations to the collection owner
- Prevent access to other users' collections
- Add search to OwnedFigure after security refactor

After Owned Figure

- Angular frontend
- Collection management
- Images
- Advanced filtering