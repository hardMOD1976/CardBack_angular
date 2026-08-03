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

## 2026-07-24

### Owned Figure Security Completed

The OwnedFigure module has been redesigned to enforce ownership-based authorization.

Implemented

Security

- userId removed from CreateOwnedFigureDto
- userId removed from UpdateOwnedFigureDto
- Authenticated user obtained from JWT
- Owner-only CRUD operations
- Owner-only pagination
- Owner-only search
- Unauthorized access now returns 404

Architecture improvements

- Shared ownership validation through ensureOwnedFigureExists()
- Service methods simplified by reusing ownership validation
- Ownership checks centralized in a single method

Search

Implemented case-insensitive search by:

- condition
- completeness
- packagingState
- purchaseLocation
- storageLocation
- notes
- related Product Release name

Validation

Verified through Swagger

- Pagination
- Search
- Create
- Update
- Delete
- JWT authentication
- DTOs no longer expose userId

Current milestone

OwnedFigure is now fully secured and follows the same architectural standards as the catalog modules.

Next milestone

Start the Angular frontend.

## 2026-07-24

### Owned Figure Security Completed

The OwnedFigure module has been redesigned to enforce ownership-based authorization.

Implemented

Security

- userId removed from CreateOwnedFigureDto
- userId removed from UpdateOwnedFigureDto
- Authenticated user obtained from JWT
- Owner-only CRUD operations
- Owner-only pagination
- Owner-only search
- Unauthorized access now returns 404

Architecture improvements

- Shared ownership validation through ensureOwnedFigureExists()
- Service methods simplified through ownership validation
- Ownership checks centralized

Search

Implemented case-insensitive search by:

- condition
- completeness
- packagingState
- purchaseLocation
- storageLocation
- notes
- Product Release name

Validation

Verified through Swagger

- Pagination
- Search
- Create
- Update
- Delete
- JWT Authentication
- DTOs no longer expose userId

---

### Angular Frontend Started

Created

- Angular workspace
- Feature-first architecture
- Shell layout
- Header component
- Sidebar component
- Dashboard page
- Initial routing
- Responsive shell foundation

Documentation created

- frontend-architecture.md
- frontend-information-architecture.md
- frontend-user-flows.md
- design-system.md
- components.md

---

### Branding Started

The project began defining its product identity beyond the technical implementation.

Created

- brand-strategy.md
- brand-guidelines.md
- naming.md
- logo-sketches.md
- moodboard.md

Current favourite brand candidate

Cardback

Working tagline

Check your collection.

The brand direction focuses on becoming the definitive platform for collectors rather than simply another collection manager.

# History

## 2026-07-27

### Frontend Architecture Consolidation

The Angular frontend architecture was refactored to better separate public and authenticated areas.

Implemented

Architecture

- AppComponent simplified to a single RouterOutlet
- Shell converted into the authenticated application layout
- Nested routing introduced
- Login route prepared outside the Shell
- Dashboard and feature pages moved under Shell children routes

Design System

Created the first reusable UI components

- cb-button
- cb-input
- cb-card

Project structure

- Shared UI folder consolidated
- Global SCSS organization completed
- Design Tokens introduced
- Base styles prepared

Authentication

Frontend authentication started

Created

- Auth feature
- Login models
- AuthService
- Environment-based API configuration
- Login page scaffold

Current milestone

The frontend architecture is now ready to connect with the secured NestJS backend without requiring structural changes.

Next milestone

Implement the complete Login flow:

- TokenService
- JWT persistence
- Dashboard redirection
- AuthGuard
- HTTP Interceptor

## 2026-07-29

### Authentication Completed

Frontend authentication has been fully connected to the secured NestJS backend.

Implemented

Authentication

- Login using username OR email
- JWT persistence
- Refresh Token persistence
- TokenService
- CurrentUserService
- AuthGuard
- HTTP Interceptor
- Logout
- Protected Angular routes
- Protected backend communication

Backend

Authentication improved to support login using either username or email while maintaining JWT-based authorization.

Brand

The project officially adopts Cardback as the product name.

Business Components

Started

- FigureCard reusable component
- CollectionService
- First authenticated communication with Owned Figures endpoint

UI

Header evolution started.

Next milestone

Implement the Collection page using real backend data and reusable FigureCard components.
# Session 2026-07-30

Summary
-------

Today marks the transition from infrastructure work to actual product development.

Completed
---------

Design System

Large SCSS cleanup.

Standardised

- spacing
- shadows
- radius
- cards
- buttons
- inputs

Sidebar

- Logo integration
- Assets configuration fixed

Collection

Implemented

- CollectionService
- Loading state
- Error state
- FigureCard integration

Problem discovered

OwnedFigures API changed because pagination was introduced.

Collection still expects

response.map()

Current API returns

response.data

Databank

Created

- ProductReleaseModel
- DatabankService
- Databank page

Integrated

ProductRelease

↓

FigureCardModel

Backend

ProductRelease endpoint expanded.

Now includes

Variant

↓

Figure

↓

Character

↓

Line

↓

Manufacturer

This eliminates future frontend requests.

FigureCard

Large redesign.

Now considered stable.

Supports

- Collection
- Databank

Current blocker
---------------

OwnedFigures endpoint still returns

productRelease

without nested Variant -> Figure -> Character -> Line -> Manufacturer.

Collection cannot map

character

line

manufacturer

until backend include is expanded.

Important decision
------------------

Backend database fields remain

defaultImage

Frontend contract will expose

imageUrl

through mapping.

Never rename Prisma entities to match frontend contracts.

Incident
--------

A global Replace All changed

defaultImage

to

imageUrl

inside Prisma seed.

Compilation failed.

Issue fixed.

Next Session
------------

1. Expand OwnedFigures include hierarchy.
2. Finish Collection.
3. Finish Databank.
4. Begin Figure Detail.

Estimated progress

Backend

≈ 90%

Frontend

≈ 35%

General feeling

The project has officially moved from "framework setup" to "building Cardback".

# Session 2026-07-31

Summary
-------

Today the Databank MVP was completed.

This session focused on stabilising the frontend architecture, modernising Angular state management, and cleaning the backend public API contract.

Completed
---------

Frontend

Databank

- Migrated from imperative state to Angular Signals.
- Removed manual ChangeDetection usage.
- Loading state is now fully reactive.
- Figure catalogue renders correctly.
- FigureCard reused successfully.
- Pagination and search working correctly.

Angular

- Confirmed Angular 22 Signals as the project standard.
- Established Signals as the preferred state management approach for business pages.

Backend

ProductRelease

- Public DTOs now expose imageUrl.
- Removed defaultImage from the public API contract.
- Introduced explicit mapping between Prisma entities and frontend DTOs.

Prisma

- Database schema aligned with imageUrl.
- Prisma Client regenerated.
- Seed updated.
- Swagger verified.
- Prisma Studio verified.

Problem discovered
------------------

Databank loaded data correctly but the UI never refreshed.

Cause

The page was still using mutable component state under Angular 22.

Solution

Migrated the page to Signals.

The issue disappeared immediately and no manual change detection was required.

Second issue
------------

A previous schema refactor introduced drift between

- Prisma schema
- Migration history
- Neon database

This caused runtime errors such as

ProductRelease.imageUrl does not exist.

Solution

Migration history was repaired.

Database schema and Prisma Client are now aligned again.

Important architectural decision
--------------------------------

Signals become the default reactive state mechanism for new frontend pages.

Observable streams remain the communication layer with HttpClient.

Component-local UI state should be implemented using Signals whenever appropriate.

Current milestone
-----------------

Databank MVP completed.

Next Session
------------

1. Finish Collection.
2. Implement Figure Detail.
3. Connect Collection → Figure Detail.
4. Connect Databank → Figure Detail.

Estimated progress
------------------

Backend

≈ 95%

Frontend

≈ 45%

General feeling
---------------

Today marks the completion of the first fully functional business feature of Cardback.

The project now has a stable catalogue experience and is ready to move towards collection management.

# Session 2026-08-03

Summary
-------

Today's objective was completing the Collection MVP.

Most of the session was spent debugging what initially appeared to be a frontend rendering issue.

Completed
---------

Frontend

Collection

- Implemented Collection page.
- Integrated CollectionHeader.
- Reused the shared FigureCard component.
- Added loading state.
- Added error state.
- Added empty state.
- Implemented OwnedFigure → FigureCardModel mapping.
- Successfully rendered authenticated user collection.

Backend

OwnedFigure

- Verified complete include hierarchy returned by the API.
- Confirmed ProductRelease → Variant → Figure → Character/Line → Manufacturer mapping.

Debugging
---------

Several hypotheses were investigated.

Verified

- Backend response structure.
- Angular template.
- FigureCard component.
- Routing.
- Standalone component configuration.
- DTO mapping.

Problem discovered
------------------

The Collection endpoint started returning HTTP 401 Unauthorized.

Initially this looked like a rendering problem because the mapping completed correctly during previous executions.

Cause

The stored JWT had become invalid.

Solution

Removed the stored token and authenticated again.

The authInterceptor immediately started sending a valid access token and Collection rendered correctly without additional code changes.

Important lesson
----------------

When debugging authenticated pages:

1. Verify the Network tab first.
2. Confirm the Authorization header.
3. Confirm the backend response before investigating Angular rendering.

Current milestone
-----------------

Collection MVP completed.

Next Session
------------

1. Implement Collection sorting.
2. Implement Collection filtering.
3. Figure Detail.
4. Connect Databank → Figure Detail.
5. Connect Collection → Figure Detail.

Estimated progress
------------------

Backend

≈ 95%

Frontend

≈ 55%

General feeling
---------------

Although much of the session consisted of debugging, it validated the complete Collection architecture and confirmed that backend contracts, reusable components and frontend mapping are now working together correctly.