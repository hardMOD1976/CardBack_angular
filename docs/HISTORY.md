# History

---

## 2026-07-14

### Domain Model Completed

Major decisions:

- Figure became the canonical collectible entity.
- Variant represents physical differences.
- Product Release represents commercial distribution.
- Owned Figure stores collector-specific information.
- Packaging never defines a Figure.

Infrastructure:

- Prisma installed.
- PostgreSQL database created.
- Initial migration executed.

---

## 2026-07-15

### Backend Foundation

Repository reorganized:

- backend/
- frontend/

NestJS created.

Prisma integrated with PostgreSQL.

First migration successfully applied.

Backend server running locally.

Next milestone:

Connect NestJS with Prisma and implement the first REST module.

---

## 2026-07-16

### Backend API Progress

Manufacturer module completed.

Implemented:

- GET
- GET by id
- POST
- PUT
- Soft Delete

Infrastructure improvements:

- Global ValidationPipe
- Global Prisma Exception Filter
- Prisma error mapping (P2002 / P2025)
- Soft Delete strategy
- Prisma Studio workflow adopted

Franchise module created.

Implemented:

- CRUD
- Soft Delete
- DTO validation

---

## 2026-07-17

### Backend Domain Completed

Implemented all remaining core modules:

- Line
- Character
- Figure
- Variant
- Product Release
- Collector
- Owned Figure

All modules now include:

- CRUD operations
- DTO validation
- Soft Delete
- Prisma integration
- Relational validation where required

Architecture improvements:

- Consistent service structure across modules.
- Business validation for foreign-key relationships.
- Separation between catalog data and collector-owned data completed.

Current backend status:

The complete domain model is now available through REST endpoints.

---

## 2026-07-20

### Backend Foundation Completed

Swagger documentation completed.

Implemented:

- Complete OpenAPI documentation
- Standardized endpoint descriptions
- Request and response documentation

Golden Dataset completed.

Implemented:

- Initial catalog dataset
- Manufacturers
- Franchises
- Lines
- Characters
- Figures
- Variants
- Product Releases
- Collectors
- Owned Figures

Infrastructure improvements:

- Robust seed using upsert()
- Composite unique constraints
- Idempotent database seeding
- Referential integrity verification

Current backend status:

The backend is now fully documented, reproducible and ready for application-level development.

Next milestone:

- JWT Authentication
- Authorization
- Search
- Collection features
- Angular frontend

## 2026-07-21

### Authentication (JWT) - Phase 1

User model extended.

Implemented:

- passwordHash
- role
- emailVerifiedAt
- lastLoginAt
- refreshTokenHash

Authentication module created.

Implemented:

- AuthModule
- AuthController
- AuthService
- Login DTO
- Refresh Token DTO

JWT infrastructure:

- ConfigModule integration
- Access Tokens
- Refresh Tokens
- Environment-based configuration

Security:

- Password hashing using bcrypt
- Password validation
- Refresh token hashing
- Refresh token persistence
- Refresh token rotation
- Refresh token invalidation after use

Users module:

- findByUsername()
- updateRefreshToken()

Authentication successfully tested through Swagger.

Verified:

- Login
- Access Token generation
- Refresh Token generation
- Refresh Token rotation
- Refresh Token revocation

Current milestone:

Authentication foundation completed.

Next milestone:

- Logout
- Jwt Strategy
- JwtAuthGuard
- Roles
- Authorization

## 2026-07-22

### Authentication & Authorization Completed

JWT infrastructure finalized.

Implemented

- Passport JWT Strategy
- JwtAuthGuard
- Public decorator
- Roles decorator
- RolesGuard
- Role-based authorization
- Swagger Bearer authentication
- Protected endpoints validated
- ADMIN-only write operations
- Public read-only catalog

Authorization policy established

- GET endpoints remain public.
- POST / PUT / DELETE require authentication.
- Administrative operations require ADMIN role.

Swagger

- JWT Authorize support
- Bearer authentication documentation
- Protected endpoints marked

Pagination

Infrastructure started.

Implemented

- PaginationQueryDto
- PaginationMetaDto
- PaginatedResponseDto

Current milestone

Security layer completed.

Next milestone

Apply reusable pagination to all catalog endpoints before implementing search and filtering.

---

## 2026-07-23

### Pagination & Search Completed

The reusable pagination infrastructure has now been fully adopted across the catalog modules.

Implemented

- buildPaginatedResponse()
- Consistent pagination pattern
- Removal of the previous paginate() helper
- Standardized services across the backend

Catalog search completed

Manufacturer

- Pagination
- Search

Franchise

- Pagination
- Search

Line

- Pagination
- Search

Character

- Pagination
- Search

Figure

- Pagination
- Search

Variant

- Pagination
- Multi-field search
- Search by variant description

Product Release

- Pagination
- Multi-field search
- Search by:
  - name
  - barcode
  - retailer
  - region
  - language
  - packagingType
  - notes
  - related Variant name

Architecture improvements

- Services now follow a common implementation pattern.
- Generic paginated responses are used consistently.
- Search logic standardized using OR clauses and case-insensitive matching.

Security review

A design issue was identified in the OwnedFigure module.

Current implementation allows clients to provide userId inside the CreateOwnedFigureDto.

This will be redesigned.

Next milestone

OwnedFigure security refactor

Planned work

- Remove userId from DTOs
- Read authenticated user from JWT
- Restrict CRUD operations to the collection owner
- Prevent access to collections owned by other users
- Add search after ownership restrictions are completed