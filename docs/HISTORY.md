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



## Session 2026-08-18

## Summary

Today's work moved Cardback from the completed Collection MVP into the next phase of frontend business features.

The Collection feature was extended with server-side sorting and filtering, and the first end-to-end structure for Global Search was implemented.

The session also established a reusable Enter-key mechanism for the shared `cb-input` component.

---

## Completed

### Collection

Collection sorting and filtering were implemented.

The frontend `CollectionService` now supports query parameters for:

* page
* limit
* search
* sortBy
* sortOrder
* condition
* completeness
* packagingState

The service builds the corresponding `HttpParams` and sends them to the authenticated:

`GET /owned-figures`

Sorting and filtering therefore remain server-side.

This preserves the architectural decision not to load large collection datasets into the frontend merely to perform local operations.

---

### Collection Header

`CollectionHeader` is now part of the Collection query flow.

The component provides the UI controls for collection sorting and filtering while the Collection service remains responsible for HTTP communication.

---

### Shared `cb-input`

`cb-input` was extended to work as a reusable form control through `ControlValueAccessor`.

It now supports:

* value propagation
* disabled state
* touched state
* configurable type
* configurable placeholder
* Enter key detection

An `enter` output was added.

The component emits the event but does not define its semantic meaning.

This allows the same mechanism to be reused by different consumers.

Example:

```text
cb-input.enter
    ├── Header → search()
    └── other form/action → corresponding behaviour
```

For Login, native form submission through `(ngSubmit)` remains the preferred implementation.

---

### Header Search

The Header search field is now connected to the shared `cb-input`.

Implemented:

* `FormsModule`
* `[(ngModel)]="searchQuery"`
* `(enter)="search()"`

The Header now normalizes the query with `trim()` and navigates to:

`/search?q=<query>`

Example:

`/search?q=vader`

Empty queries are ignored.

---

### Global Search Route

The Global Search page was added to the authenticated Shell route tree.

The route is:

`/search`

It is a child of `Shell` and is therefore protected by the existing `authGuard`.

The resulting navigation flow is:

```text
Header
  ↓
cb-input
  ↓
Enter
  ↓
Header.search()
  ↓
/search?q=vader
  ↓
Shell
  ↓
authGuard
  ↓
GlobalSearch
```

The route was tested successfully.

The Global Search page currently displays the received query.

---

### Global Search Frontend Structure

The Global Search feature now contains the initial frontend structure for:

* page
* service
* models

`GlobalSearchService` has been created/planned following the same HTTP service pattern already established by `CollectionService`.

The service targets:

`GET /search`

and uses `HttpParams` for:

* q
* page
* limit

`global-search.model.ts` has also been created.

At the end of this session it is intentionally still empty because the frontend result model has not yet been defined against the backend Search public response.

---

## Backend

The Search backend was already implemented before the current frontend integration.

Existing capabilities include:

* global search endpoint
* pagination
* public DTO mapping

The frontend integration must consume the public Search contract rather than backend Prisma entities.

---

## Architecture Decisions Reinforced

### Server-side operations

Collection sorting and filtering remain server-side.

Do not move these operations into the frontend unless there is a specific architectural reason.

### Shared input vs feature behaviour

`cb-input` remains a generic form control.

It emits the Enter action but does not know whether the consumer is performing:

* a search
* form submission
* another action

Feature components decide what the event means.

### Search composition

The current Header search is intentionally kept simple.

A future `cb-search` composition may encapsulate:

* `cb-input`
* clear action
* search action

without making `cb-input` responsible for search-specific UI.

---

## Current State

### Databank

MVP completed.

### Collection

MVP completed.

Sorting and filtering are now implemented.

### Global Search

In progress.

Navigation and initial frontend structure are working.

The actual API result consumption and result rendering are the next step.

### Figure Detail

Not started.

---

## Next Session

1. Define `global-search.model.ts`.
2. Complete/verify `GlobalSearchService`.
3. Connect `GlobalSearch` to `GlobalSearchService`.
4. Call the backend Search endpoint.
5. Render real search results.
6. Implement loading, error and empty states.
7. Define result navigation.
8. Continue with Figure Detail.

---

## Important Lessons

When implementing new feature integrations:

* Reuse established HTTP service patterns.
* Keep backend DTOs and frontend models separate.
* Keep Prisma entities out of the public contract.
* Prefer server-side operations for potentially large datasets.
* Keep shared UI components generic.
* Let feature components define behaviour.


## Session 2026-08-19

## Summary

Today's work completed the frontend integration of the Global Search API and moved the feature into the result presentation phase.

The Global Search frontend model and service are now implemented, the page consumes the real backend Search endpoint, and loading/error/empty states are handled.

A dedicated `GlobalSearchResultCard` component was also created to represent heterogeneous search results.

The next step is to integrate the result card into the Global Search page and validate the real `luke` search results before defining navigation.

---

## Completed

### Global Search Model

The frontend Search result model is now defined against the backend public Search contract.

The model supports the seven Global Search result types:

* franchise
* manufacturer
* line
* character
* figure
* variant
* productRelease

The model remains independent from:

* Prisma entities
* NestJS DTO classes
* backend implementation details

The public image field remains:

`imageUrl`

---

### Global Search Service

`GlobalSearchService` is implemented using the established Angular HTTP service pattern.

The service calls:

`GET /search`

and builds query parameters through `HttpParams`.

Current parameters include:

* q
* page
* limit

The service returns the public Search response through an Observable.

---

### Global Search Page

`GlobalSearch` is now connected to `GlobalSearchService`.

The page receives the search query from the route and requests the corresponding Search results from the backend.

The API integration has been tested with:

`luke`

The page handles:

* loading
* error
* empty
* results

states.

Real heterogeneous Search results are now available to the frontend.

---

### Global Search Result Data

The real `luke` response demonstrates the intended heterogeneous Search behaviour.

Examples include:

* Luke Skywalker — Character
* Luke Skywalker — Figure
* Luke Skywalker — Product Release

Results also contain contextual information such as:

* Franchise
* Manufacturer
* Line
* Character
* Figure
* Variant

This confirms that Global Search can provide enough context to distinguish otherwise similarly named results.

---

### GlobalSearchResultCard

A dedicated:

`GlobalSearchResultCard`

component has been created under the Global Search feature.

The component receives:

`GlobalSearchResult`

through a required Angular signal input.

The card currently displays:

* image or placeholder
* result type
* result name
* contextual information

The component is intentionally presentation-only.

It does not:

* perform HTTP requests
* know about `GlobalSearchService`
* handle the search query
* decide application routing

Navigation will be added only after the Cardback navigation pattern has been established.

---

## Architecture Decisions Reinforced

### Heterogeneous Search Results

Global Search results represent different domain concepts.

Therefore, `GlobalSearchResultCard` is kept separate from `FigureCard`.

`FigureCard` remains the business component for catalogue/collection figure presentation.

`GlobalSearchResultCard` represents the result of a global cross-domain search.

---

### Presentation vs Navigation

The result card does not currently own navigation behaviour.

The intended flow is:

```text
GlobalSearch
    ↓
GlobalSearchResultCard
    ↓
GlobalSearchResult


---

### `History.md`


# History

## Session 2026-08-24

## Summary

Today's work focused on completing the Global Search interaction and improving the shared search input.

The Global Search result cards are already integrated and working.

The shared `cb-input` was extended with an optional clear button so the Header Search can provide a direct way to clear the current search.

The input itself clears correctly, but the complete end-to-end Search reset is currently not working correctly: the input is emptied while the Global Search results remain visible.

The issue is intentionally left for the next development session rather than being considered complete.

---

## Completed

### Global Search Result Rendering

`GlobalSearchResultCard` is now integrated into the `GlobalSearch` page.

The page renders the real heterogeneous Search results returned by the backend.

The result grid supports:

* responsive desktop layout
* two-column mobile layout
* single-column narrow mobile layout

The result card displays:

* image
* placeholder when no image exists
* result type
* result name
* contextual information

The real `luke` search was successfully tested.

---

### Search Result Placeholder

The Global Search result card now uses the same Cardback placeholder image as `FigureCard`:

`assets/cardback_placeholder.jpeg`

This keeps the visual identity consistent between catalogue cards and Search results.

---

### Global Search Result Count

The Global Search page now consumes:

`response.meta.total`

through:

`totalResults`

The UI displays:

* `1 result found`
* `N results found`

depending on the returned total.

---

### Light / Dark Theme

A transversal light / dark theme switch was implemented.

The switch is located in the application Header.

This is an application-wide feature and is not specific to Global Search.

The current theme switch works across the application.

Visual refinement against the Figma reference is intentionally postponed.

---

### `cb-input` Clear Capability

The reusable `cb-input` component was extended with:

```text
clearable = input(false)
clear = output<void>()

## Session 2026-08-24

## Summary

Today's work focused on completing the Global Search interaction and improving the shared search input.

The Global Search result cards are already integrated and working.

The shared `cb-input` was extended with an optional clear button so the Header Search can provide a direct way to clear the current search.

The input itself clears correctly, but the complete end-to-end Search reset is currently not working correctly: the input is emptied while the Global Search results remain visible.

The issue is intentionally left for the next development session rather than being considered complete.

---

## Completed

### Global Search Result Rendering

`GlobalSearchResultCard` is now integrated into the `GlobalSearch` page.

The page renders the real heterogeneous Search results returned by the backend.

The result grid supports:

* responsive desktop layout
* two-column mobile layout
* single-column narrow mobile layout

The result card displays:

* image
* placeholder when no image exists
* result type
* result name
* contextual information

The real `luke` search was successfully tested.

---

### Search Result Placeholder

The Global Search result card now uses the same Cardback placeholder image as `FigureCard`:

`assets/cardback_placeholder.jpeg`

This keeps the visual identity consistent between catalogue cards and Search results.

---

### Global Search Result Count

The Global Search page now consumes:

`response.meta.total`

through:

`totalResults`

The UI displays:

* `1 result found`
* `N results found`

depending on the returned total.

---

### Light / Dark Theme

A transversal light / dark theme switch was implemented.

The switch is located in the application Header.

This is an application-wide feature and is not specific to Global Search.

The current theme switch works across the application.

Visual refinement against the Figma reference is intentionally postponed.

---

### `cb-input` Clear Capability

The reusable `cb-input` component was extended with:

```text
clearable = input(false)
clear = output<void>()

## Session 2026-08-29

## Summary

Today's work focused on defining the conceptual architecture of the transversal catalogue Detail experience.

We reviewed the existing Prisma domain model, backend controllers and services for:

* Franchise
* Manufacturer
* Line
* Character
* Figure
* Variant
* Product Release

The existing `findOne()` implementations already return useful relational hierarchies, but the current public response DTO layer is insufficient for the collector-facing Detail experience.

The main conclusion is that Detail must be designed from the collector's perspective rather than by reusing existing Collection, Databank or list response models.

The domain model itself remains valid and does not need restructuring.

---

# Domain Model Consensus

The existing distinction between Character and Figure remains important.

```text
Franchise
   │
   ├── Line
   │     │
   │     └── Figure
   │           │
   │           └── Variant
   │                 │
   │                 └── Product Release
   │
   └── Character
         │
         └── Figure
```

This represents domain relationships, not necessarily the exact visual hierarchy of the Detail pages.

### Character

Character represents the fictional/lore entity.

Example:

`Darth Vader`

Character information can provide contextual information to Figure Detail, but Character remains a separate domain entity.

### Figure

Figure represents a specific representation of a Character within a Line.

Example:

`Darth Vader — POTF / Kenner`

Figure therefore remains distinct from Character.

### Variant

Variant has its own cataloguing identity.

It is not merely a visual difference inside Figure.

Conceptually:

```text
Figure
└── Variant
    ├── Long Saber
    ├── Short Saber
    ├── Retailer Exclusive
    └── Fan Club Promotion Exclusive
```

Variants may have their own:

* name
* image
* distinguishing description
* associated Product Releases
* regional information where relevant
* packaging information
* accessories
* first / unique appearance
* photographs

### Product Release

Product Release represents the concrete commercial product.

It is not the universal root of the catalogue hierarchy.

Conceptually:

```text
Figure
└── Variant
    └── Product Release
```

Product Release has its own Detail page focused on the concrete commercial release.

---

# Detail Architecture Decision

A single generic, oversized `DetailResponseDto` will not be created.

The Detail API will use dedicated response contracts:

```text
FranchiseDetailResponseDto
ManufacturerDetailResponseDto
LineDetailResponseDto
CharacterDetailResponseDto
FigureDetailResponseDto
VariantDetailResponseDto
ProductReleaseDetailResponseDto
```

Reusable summary/reference DTOs may be introduced where useful to avoid uncontrolled recursive payloads.

The exact DTO structures have not yet been implemented.

The first contract to design will be:

`FranchiseDetailResponseDto`

The DTO design should begin with the collector-facing experience and then be mapped from the existing Prisma domain.

---

# Franchise Detail Concept

Franchise Detail should act as a gateway into the catalogue.

Example:

`Star Wars`

Expected structure:

1. Identifying franchise/logo image
2. Descriptive introduction
3. Origin/history of the franchise
4. Historical context related to action figures
5. Available Lines

Lines should be visually represented and clickable.

Example:

```text
Star Wars
   │
   ├── Kenner 77
   ├── Power of the Force
   ├── Power of the Force 2
   ├── Power of the Jedi
   └── ...
```

Selecting a Line leads to Line Detail.

The Franchise page should provide enough context to establish the franchise while acting as an entry point into deeper catalogue levels.

---

# Line Detail Concept

Line Detail should provide:

* Line logo where available
* Text fallback when no logo exists
* Representative image showing the Line as a collection
* Manufacturer
* Start / commercialisation year
* End year where applicable
* Indicator when the Line is still active / available
* Total number of products
* All Figures belonging to the Line

Figures should be represented visually rather than as plain text links.

Each Figure should have an identifying image so collectors can recognise it without relying solely on the name.

---

# Character Detail Concept

Character Detail should provide:

* Character name
* Representative image
* Lore history
* First appearance in lore
* First action figure appearance / first Product Release
* Lines in which the Character appears
* All Figure appearances across those Lines
* Variants
* Product Release photographic galleries

The experience should distinguish between:

1. First appearance in lore
2. First incarnation as an action figure
3. Appearances across Lines
4. Variants
5. Product Release photographic history

---

# Variant Detail Concept

Variant has first-class catalogue identity.

The Variant Detail page should answer the collector-oriented question:

"What makes this variant special, and how do I identify it?"

Expected information includes:

* Variant name
* Dedicated image
* Description of distinguishing characteristics
* Associated Figure
* Product Releases where it appears
* Region information where historically useful
* Packaging
* Accessories
* First or unique appearance
* Photographs

Regional information should remain contextual rather than becoming the main focus.

The emphasis is on identification, collecting relevance and differentiation.

---

# Product Release Detail Concept

Product Release has its own dedicated Detail page.

It represents the concrete commercial product rather than the Variant.

Expected information includes:

* Product Release identity
* Packaging
* Region
* Language
* Retailer
* Release date
* Barcode
* Notes
* Product image
* Associated Variant
* Parent Figure
* Character / Line / Franchise context where useful

The Product Release Detail page should not duplicate the complete Variant Detail unnecessarily.

---

# Transversal Navigation

The Detail system should become the common destination for catalogue entities discovered through different features.

```text
Global Search ────────┐
Databank ─────────────┤
Collection ───────────┼──→ Detail
                       │
future features ──────┘
```

Planned connections:

* Global Search → Detail
* Databank → Detail
* Collection → Detail

This reinforces the decision that Detail should be a transversal domain experience rather than a feature-specific extension of Collection or Databank.

---

# Current State

No Detail DTOs have been implemented yet.

No Detail frontend page has been implemented yet.

No Detail navigation has been implemented yet.

The conceptual architecture is now agreed.

The next technical step is to design:

`FranchiseDetailResponseDto`

followed by the necessary reusable summary/reference DTOs and the remaining Detail contracts.

---

# Important Decision

Do not modify the existing Prisma domain model merely to support Detail.

The current separation between:

```text
Character
Figure
Variant
Product Release
```

is considered correct and should be preserved.

Detail should compose these entities into collector-oriented response contracts rather than collapsing them into a single generic entity hierarchy.

# Cardback — History

## Session: 2026-09-19 — Franchise Detail Backend Implemented

### Global Search

* Global Search result cards emit a `selected` event containing the selected result.
* The page has a prepared navigation map for all seven result types:
  Franchise, Manufacturer, Line, Character, Figure, Variant, and Product Release.
* The corresponding detail routes/pages do not yet exist, so navigation is not fully functional.
* The Global Search page HTML correctly binds:
  `(selected)="onResultSelected($event)"`.
* Search clearing has already been fixed in a previous session and is considered completed.
* The relevant fix is represented by commit `a094f8f` (`Fix global search clear i restyle login`).
* Do not treat search clearing as an outstanding task unless a new regression is observed.

### Detail Pages

* The review of existing response DTOs for Character, Figure, Variant, Franchise, Manufacturer, and Line has already been completed.
* Do not repeat the DTO review.
* Line does not have a dedicated general-purpose response DTO.
* Franchise Detail was selected as the first detail-page vertical.
* `FranchiseDetailResponseDto` has now been created with:
  `id`, `name`, `owner`, `firstAppearance`, `description`, `logo`, `lines`.
* `LineSummaryDto` has now been created with:
  `id`, `name`, `startYear`, `endYear`, `scale`, `logo`.
* `FranchisesService.findDetail(id)` has been implemented.
* The existing `GET /franchises/:id` endpoint now returns the Franchise Detail response.
* Only active Lines are included (`deletedAt: null`).
* Lines are ordered alphabetically by name.
* The response is explicitly mapped instead of exposing Prisma entities.
* No Prisma schema changes were required.
* `NotFoundException` was added so an unknown Franchise ID correctly returns HTTP `404`.

### Backend Verification

* `GET /franchises/1` was tested first.
* Because Franchise ID `1` does not exist, the endpoint initially returned `200` with an empty body.
* This was corrected by changing `findDetail()` to throw `NotFoundException` when no active Franchise is found.
* The same request was retested and correctly returned:
  `404 Not Found`.
* A real Star Wars Franchise ID was then tested:
  `GET /franchises/cms8tgcbq0005ukxkcehh2ybw`.
* The endpoint correctly returned:
  `200 OK`.
* The response contained the Franchise data and its active Lines using the new detail contract.

### Current State

The **Franchise Detail backend is complete and verified**.

The frontend implementation has not started yet.

### Next Session

1. Implement the Franchise Detail frontend page.
2. Follow existing Angular feature/page/service conventions rather than introducing new abstractions.
3. Add the `/franchises/:id` frontend route.
4. Connect the Franchise Detail page to `GET /franchises/:id`.
5. Connect Global Search Franchise result navigation to the new route.
6. Continue with the remaining Detail pages.

### Backlog

* Improve Login UX:

  * Clear incorrect-credentials feedback.
  * “Forgot password?” flow.
  * Review the overall login experience.
* Login UX remains behind the transversal Detail work in priority.
# Cardback — Development History

## Session: 2026-09-23 — Line Detail Frontend and Navigation Completed

### Line Detail Frontend

Implemented and verified the Line Detail frontend.

Created:

* `features/line-detail/models/line-detail.model.ts`
* `features/line-detail/services/line-detail.service.ts`
* `features/line-detail/pages/line-detail/line-detail.ts`
* `features/line-detail/pages/line-detail/line-detail.html`
* `features/line-detail/pages/line-detail/line-detail.scss`

The Line Detail model matches the backend detail contract:

* Figure/Line identity and metadata.
* Manufacturer summary.
* Franchise summary.
* Figure summaries.

The Line Detail component:

* Reads the Line ID from the route.
* Loads the detail through `LineDetailService`.
* Handles loading, not-found, and generic error states.
* Displays Line metadata and Figures.
* Uses the existing Cardback styling tokens.
* Compiles successfully.

### Line Detail Route

Added:

```text
/lines/:id
```

to the protected Shell routes.

The route was manually validated with:

```text
/lines/cms8tgdcb000lukxkqhys2t04
```

and loads the Star Wars PBP Line Detail correctly.

### Franchise Detail → Line Detail

Updated Franchise Detail so Line cards are navigable.

The Line cards now use:

```text
RouterLink → /lines/:id
```

No service or DTO changes were required.

The complete flow was tested successfully:

```text
Franchise Detail
      ↓
select Line
      ↓
Line Detail
```

### Global Search Verification

Reviewed the existing `global-search.ts`.

No change was required.

The existing navigation map already contains:

```ts
franchise: 'franchises',
manufacturer: 'manufacturers',
line: 'lines',
character: 'characters',
figure: 'figures',
variant: 'variants',
productRelease: 'product-releases'
```

Therefore, because `/lines/:id` now exists, Global Search Line results are automatically connected to Line Detail.

Current functional paths:

```text
Global Search → Franchise Detail
Global Search → Line Detail
Franchise Detail → Line Detail
```

Other Global Search destination routes remain pending until their corresponding Detail pages are implemented.

---

## Session: 2026-09-23 — Figure Detail Planning Started

### Figure Prisma Model Reviewed

Reviewed the current Prisma schema for:

* Figure
* Character
* Line
* Variant
* ProductRelease

Figure relationships:

```text
Figure
 ├── Character
 ├── Line
 └── Variants
```

Variant relationship:

```text
Variant
 └── ProductReleases
```

### Figure Detail Architecture Decision

The next Detail page is Figure Detail.

Following the established Detail architecture, Figure Detail will use a dedicated response DTO rather than exposing the Prisma entity or creating a universal Detail DTO.

Proposed Figure Detail response:

```text
Figure
 ├── id
 ├── name
 ├── code
 ├── description
 ├── imageUrl
 │
 ├── Character summary
 │    ├── id
 │    ├── name
 │    └── image
 │
 ├── Line summary
 │    ├── id
 │    ├── name
 │    ├── scale
 │    └── logo
 │
 └── Variants[]
      ├── id
      ├── name
      ├── description
      └── imageUrl
```

Product Releases will **not** be included in Figure Detail.

They belong to the Variant Detail level to avoid recursive/overloaded payloads.

Expected backend rules:

* Active Figure only.
* Active Character only.
* Active Line only.
* Active Variants only.
* Variants ordered by name.
* Explicit DTO mapping.
* `404 Not Found` for an unknown/inactive Figure.
* No Prisma entity exposure.

### Current Figure DTO State

Figure currently has:

* `CreateFigureDto`
* `UpdateFigureDto`

There is no existing Figure response DTO.

The current `figures.service.ts` contains:

* `findAll`
* `findOne`
* `create`
* `update`
* `remove`
* Character/Line existence validation helpers

The current `figures.controller.ts` exposes:

* `GET /figures`
* `GET /figures/:id`
* `POST /figures`
* `PUT /figures/:id`
* `DELETE /figures/:id`

### Next Session

Implement Figure Detail backend:

1. Create `FigureDetailResponseDto`.
2. Add `FiguresService.findDetail(id)`.
3. Update `GET /figures/:id` to use the detail contract.
4. Verify `200 OK` with a real Figure.
5. Verify `404 Not Found` with an unknown Figure ID.
6. Then implement the Angular Figure Detail page and route.
7. Connect Line Detail → Figure Detail.
8. Global Search already has `figure: 'figures'`, so its navigation will become functional once the route exists.

---

## Session: 2026-09-19 — Franchise Detail Backend Implemented

### Global Search

* Global Search result cards emit a `selected` event containing the selected result.
* The page has a prepared navigation map for all seven result types.
* Search clearing was already fixed.
* The page correctly binds `(selected)="onResultSelected($event)`.

### Franchise Detail Backend

Implemented:

* `FranchiseDetailResponseDto`
* `LineSummaryDto`
* `FranchisesService.findDetail(id)`
* Existing `GET /franchises/:id` mapped to the detail response.
* Active Franchise filtering.
* Active Line filtering.
* Alphabetical Line ordering.
* Explicit DTO-shaped response mapping.
* `404 Not Found` for unknown Franchise IDs.

### Backend Verification

* `GET /franchises/1` correctly returns `404 Not Found`.
* Real Star Wars Franchise:
  `GET /franchises/cms8tgcbq0005ukxkcehh2ybw`
  returned `200 OK`.

### Current State

The Franchise Detail backend was complete and verified.

### Next Session

Implement the Franchise Detail frontend, route integration, Global Search connection, and then continue with subsequent Detail pages.

---

## Previous Sessions

Previous project history remains below this point and should not be removed.
Session 2026-09-25

Turbo Update / React Parity Checkpoint

Today's session documented a major acceleration of the Angular implementation through the new turbo update performed with Codex / Work.

The relevant recent commits are:

Turbo update per alinear amb projecte react
Add detail for franchise, line and WIP figure
Add detail to global search
Update global search
bg update
Add legal disclaimer and bg image to login
Update status files
Remove doble X on cb-input
Fix global search clear i restyle login
Add logo for dark theme
Add global search result card in gbs page
Update status files

The parallel React project was created as a rapid experimentation/prototyping effort using the existing Neon database. It was initially generated from AI-context.md plus a small number of additional directions and has been used to explore product features and UX ideas quickly.

AI Studio also inserted a batch of test catalogue records into Neon during this experimentation. These records use generated/demo image URLs and are not considered canonical Cardback catalogue data.

Current Angular State

The turbo update has substantially expanded the Angular implementation to cover the same main user-facing journeys already explored in the React version.

The current branch contains implementations for:

authentication, including registration/session refresh/password change/password reset flow

wishlist

dashboard

barcode lookup/scanning fallbacks

AI image identification suggestions

Global Search

Franchise Detail

Line Detail

Figure Detail

Manufacturer Detail

Character Detail

Variant Detail

Product Release Detail

The existence of code/routes is recorded here as implementation status. Manual runtime verification is still required before every destination is considered verified.

Detail Architecture — Decision Preserved

The original Cardback architectural rules remain the source of truth.

Dedicated Detail response contracts are used instead of a universal oversized Detail DTO.

Public endpoints must not expose raw Prisma entities.

Small summary/reference DTOs should be used where appropriate.

Detail pages should avoid recursive descendant loading.

Prisma domain entities are not to be reshaped merely to satisfy frontend presentation.

React implementation choices are reference material and experimentation, not automatic architectural decisions for Angular.

Figure Detail — Current WIP

The current turbo implementation includes:

Figure
 ├── Character
 ├── Line
 │    ├── Manufacturer
 │    └── Franchise
 └── Variants
      └── Product Releases

This is broader than the Detail boundary previously agreed for Cardback.

The previously agreed architectural contract was:

Figure Detail
 ├── Figure
 ├── Character summary
 ├── Line summary
 └── Variants

with Product Releases reserved for Variant Detail.

Therefore the current nested Product Release implementation is recorded as WIP / under review, not as a superseding architectural decision.

No refactor is being made blindly. The next step is to inspect and verify the current implementation and then explicitly decide whether the richer Figure Detail presentation should become part of the canonical Cardback architecture.

Immediate Next Step

Before adding more features:

Verify the current Figure Detail backend with a real and invalid identifier.

Review the current Figure Detail frontend model/service/page.

Decide the final Figure → Variant → Product Release boundary.

Only then continue auditing the remaining Detail destinations.
