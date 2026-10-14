# History

---

## Session 2026-10-14

### Detail Work and Architecture Checkpoint

This session resumed the Cardback implementation and revisited the Detail area after the September turbo update.

- Figure Detail is now treated as complete and verified against the canonical architecture.
- The agreed Figure Detail boundary is Figure + Character summary + Line summary + Variants. Product Releases stay under Variant Detail; the earlier WIP note about nested Product Releases in Figure Detail is superseded by this confirmed decision.
- Variant Detail backend behavior was verified with a real ID returning `200` and a nonexistent ID returning `404`. The user manually tested the frontend cases.
- Product Release Detail was aligned to a dedicated public-response model matching the backend contract. `ProductReleaseDetailService` now uses HttpClient directly instead of relying on `DatabankService`. The user confirmed the model, service and TS-page changes compile; backend compilation was also reported successful.
- Product Release ownership state had previously been tested: an already-owned release showed the correct message and hid add-to-collection/wishlist actions. The latest HTML change adding Manufacturer navigation still needs a manual browser check.
- Manufacturer Detail backend code was under review. A dedicated response DTO and explicit service/controller mapping were proposed, but their application and verification were not confirmed. Inspect the current files before assuming this change is present.

### New Neon Development Database

The previous Neon project had exceeded quota. The user created a new Neon project and did not need to preserve the old catalogue/demo data.

- `npx.cmd prisma validate` succeeded.
- `prisma migrate deploy` initially failed with `P3005` because the target schema was not empty.
- `npx.cmd prisma migrate reset --skip-seed` then completed successfully and applied:
  - `20260721065003_init`
  - `20260721081713_auth_user_fields`
  - `20260721154835_refresh_token_hash`
  - `20260723122558_owned_figure_quantity`
  - `20260925120000_password_reset_tokens`
  - `20260925123000_wishlist_entries`
- `prisma.config.ts` is intended to use `DIRECT_URL` for migrations, with `DATABASE_URL` used by the runtime Prisma client.

### Golden Seed Corrections

Seed files were updated for the clean development database:

- Variant-to-Figure lookup now uses Figure name and Line context, avoiding ambiguity when Figure names repeat across Lines.
- Product Release-to-Variant lookup now uses Variant name plus Figure and Line context, avoiding ambiguity for repeated Variant names such as `Standard`.
- Seeded catalogue upserts restore `deletedAt: null`.
- Seeded Owned Figure records are updated when the same user/Product Release is already present, instead of blindly adding another record on each run.
- Demo Owned Figure values were adjusted to match UI options, including a positive quantity, `Unknown` completeness when appropriate, and `Loose` packaging state.
- Golden Dataset size: 5 manufacturers, 1 franchise, 10 lines, 8 characters, 14 figures, 14 variants, 12 product releases, 4 demo users and 7 demo Owned Figure records.

The user then confirmed the database/seed task was done. The exact `db:seed` output was not included in the chat, so a non-destructive runtime smoke test remains the appropriate next verification; do not run another reset without a reason.

### Security Reminder

Database credentials and JWT secrets had been pasted into the troubleshooting conversation. Rotation was recommended but is not confirmed. Verify that the Neon password and both JWT secrets were rotated; do not paste secrets into chat or commit `.env`.

### Next Session

1. Smoke-test sign-in, Databank and Collection against the new Neon database.
2. Inspect the actual Manufacturer Detail files and verify whether the proposed response DTO/service/controller alignment is already present; test a real ID and an invalid ID.
3. Manually test Product Release Detail's latest HTML navigation, including Manufacturer, and confirm the ownership/wishlist action states.
4. Verify Global Search destinations beyond the already verified Franchise and Line flows.
5. Continue the public API DTO audit, then return to Login UX backlog.

---

## Session 2026-09-25

### Turbo Update / React Parity Checkpoint

Today's session documented a major acceleration of the Angular implementation through the new turbo update performed with Codex / Work.

The relevant recent commits are:

```text
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
```

The parallel React project was created as a rapid experimentation/prototyping effort using the existing Neon database. It was initially generated from `AI-context.md` plus a small number of additional directions and has been used to explore product features and UX ideas quickly.

AI Studio also inserted a batch of test catalogue records into Neon during this experimentation. These records use generated/demo image URLs and are not considered canonical Cardback catalogue data.

### Current Angular State

The turbo update has substantially expanded the Angular implementation to cover the same main user-facing journeys already explored in the React version.

The current branch contains implementations for:

- authentication, including registration/session refresh/password change/password reset flow
- wishlist
- dashboard
- barcode lookup/scanning fallbacks
- AI image identification suggestions
- Global Search
- Franchise Detail
- Line Detail
- Figure Detail
- Manufacturer Detail
- Character Detail
- Variant Detail
- Product Release Detail

The existence of code/routes is recorded here as implementation status. Manual runtime verification is still required before every destination is considered verified.

### Detail Architecture — Decision Preserved

The original Cardback architectural rules remain the source of truth.

- Dedicated Detail response contracts are used instead of a universal oversized Detail DTO.
- Public endpoints must not expose raw Prisma entities.
- Small summary/reference DTOs should be used where appropriate.
- Detail pages should avoid recursive descendant loading.
- Prisma domain entities are not to be reshaped merely to satisfy frontend presentation.
- React implementation choices are reference material and experimentation, not automatic architectural decisions for Angular.

### Figure Detail — Current WIP

The current turbo implementation includes:

```text
Figure
 ├── Character
 ├── Line
 │    ├── Manufacturer
 │    └── Franchise
 └── Variants
      └── Product Releases
```

This is broader than the Detail boundary previously agreed for Cardback.

The previously agreed architectural contract was:

```text
Figure Detail
 ├── Figure
 ├── Character summary
 ├── Line summary
 └── Variants
```

with Product Releases reserved for Variant Detail.

Therefore the current nested Product Release implementation is recorded as **WIP / under review**, not as a superseding architectural decision.

No refactor is being made blindly. The next step is to inspect and verify the current implementation and then explicitly decide whether the richer Figure Detail presentation should become part of the canonical Cardback architecture.

### Immediate Next Step

Before adding more features:

1. Verify the current Figure Detail backend with a real and invalid identifier.
2. Review the current Figure Detail frontend model/service/page.
3. Decide the final Figure → Variant → Product Release boundary.
4. Only then continue auditing the remaining Detail destinations.

---

## Session 2026-09-23

### Line Detail Completed

Line Detail was implemented and manually verified end-to-end.

Backend:

- `LineDetailResponseDto`
- `LinesService.findDetail(id)`
- Active Line filtering
- Active Figure filtering
- Active Character filtering
- Manufacturer summary
- Franchise summary
- Figure summaries
- Explicit response mapping
- `404 Not Found` for unknown Line

Verified endpoint:

```text
GET /lines/cms8tgdcb000lukxkqhys2t04
```

Result:

```text
200 OK
```

Frontend:

- Figure summary display
- `/lines/:id`
- Line Detail loading/error/empty states
- Figure cards prepared for deeper navigation

Franchise Detail → Line Detail navigation was also manually verified.

### Global Search Navigation

The existing Global Search navigation map already contained:

```ts
line: 'lines'
```

Therefore no Global Search refactor was required when Line Detail was implemented.

The same mapping pattern remains in place for the other catalogue entity types.

### Figure Detail Planning

The next canonical Detail milestone was defined as Figure Detail.

The agreed initial contract was intentionally limited to Figure data, Character summary, Line summary and active Variants. Product Releases were to remain at Variant Detail in order to avoid recursive payload growth and preserve the Detail hierarchy.

---

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

BackendBackend

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