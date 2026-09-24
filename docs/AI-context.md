# Cardback — AI Context

## Project Overview

**Cardback** (repository/folder: `FigureArchive`) is a collector-first platform for action figure collectors, initially focused on Star Wars figures, from the 1970s to current releases.

The goal is to build a free, community-driven, Discogs-like platform for action figures, with a strong catalogue, collection management, and collector-oriented UX.

Core principles:

* Collector-first, UX-first, mobile-first.
* Separate immutable catalogue data from user-owned collection data.
* High-quality catalogue and community contribution.
* Fast navigation and accessible interfaces.
* Avoid unnecessary abstractions and overengineering.
* Do not expose Prisma entities directly through the API.
* No marketplace as a core MVP feature.
* No spending until the product is close to the intended vision and ready for community release.

## Tech Stack

### Backend

* NestJS
* Prisma ORM
* PostgreSQL
* JWT authentication
* DTO-based public API contracts
* Server-side pagination, sorting, filtering, and search
* Soft delete

### Frontend

* Angular 22
* Standalone components
* Feature-first architecture
* Signals and RxJS
* HttpClient
* ControlValueAccessor for shared inputs
* Authenticated Shell and route guard
* Light/dark theme support

## Domain Model

Core catalogue entities:

* Manufacturer
* Franchise
* Line
* Character
* Figure
* Variant
* Product Release

User-owned entity:

* Owned Figure

Domain distinctions:

* Character = fictional identity.
* Figure = physical representation of a Character within a Line.
* Variant = distinct variation of a Figure.
* Product Release = concrete commercial release, packaging, region, retailer, etc.
* Owned Figure = a user's collection entry referencing a Product Release.

Vehicles/accessories may be supported as a separate category later. They are not Characters.

## Current Implementation

### Backend

* Authentication and protected routes are implemented.
* Databank API supports paginated Product Releases.
* Collection API supports server-side pagination, search, sorting, and filtering.
* Global Search endpoint is implemented with public DTO mapping and multiple result types.
* Product Release response DTO exists.
* Franchise Detail backend is implemented and verified.
* Line Detail backend is implemented and verified.
* Dedicated detail contracts are used instead of exposing Prisma entities.
* Never return raw Prisma entities from public endpoints.

### Frontend

* Databank MVP complete.
* Collection MVP complete, including server-side sort/filter.
* Global Search page and result cards implemented.
* Search navigation uses `/search?q=<query>`.
* Global Search result types:
  `franchise`, `manufacturer`, `line`, `character`, `figure`, `variant`, `productRelease`.
* Shared `FigureCard` exists.
* Shared `cb-input` supports ControlValueAccessor and Enter output.
* Franchise Detail frontend is implemented and verified.
* Line Detail frontend is implemented and verified.
* Figure, Manufacturer, Character, Variant, and Product Release detail routes and frontend pages are implemented, using dedicated detail services/models and explicit backend response projections.
* User-specific Wishlist entries reference Product Releases and remain separate from `Owned Figure` collection records.
* Owned Figures public responses are explicitly mapped to API contracts; relation trees and user records are not serialized directly.
* The dashboard uses per-user collection aggregates and recent records. Barcode search resolves against the local Product Release catalogue; browser camera/image detection is capability-dependent.
* AI image identification is a suggestion workflow. It requires `GEMINI_API_KEY` and never creates catalogue records automatically.
* Registration, session refresh, password change, and password reset are implemented. Password reset delivery requires Resend configuration and a public application URL.
* `/franchises/:id` route exists.
* `/lines/:id` route exists.
* Franchise Detail Line cards navigate to Line Detail.
* Global Search already contains `line: 'lines'` in its navigation map, so Line Search navigation is now connected to the implemented Line Detail route.
* Global Search Franchise navigation is connected to Franchise Detail.

## Current parity work and release constraints (2026-09-25)

The main user-facing journeys now present in the parallel React project have Angular implementations, adapted to the established catalogue/ownership domain. React-only demo behavior, broad theme skins, and any external web lookup are not copied where they would undermine catalogue provenance or require unverified data.

The new PasswordResetToken and WishlistEntry schema additions require applying their checked-in migrations to the intended database before those functions work. No production database migration was run as part of local development.

The Angular project still lacks application-wide localization. Add a language service/selector and migrate all visible copy before claiming language parity. Release readiness also requires environment-specific migration, email/Gemini configuration, deployment configuration, security review, and end-to-end verification.

The Angular compiler's template/type check passes with `ngc`; `npm run build` currently stops because the build worker is denied filesystem access to the repository under `Desktop`. Backend compilation and Prisma schema validation pass. Automated tests were not run.

## Detail Pages — Architecture Decisions

Detail pages are common destinations from Global Search, Databank, and Collection.

Do not create one oversized universal detail DTO. Use dedicated detail contracts and small summary/reference DTOs to avoid recursive payloads and overfetching.

The intended hierarchy is:

```text
Franchise
   └── Line
        └── Figure
             └── Variant
                  └── Product Release
```

Detail pages should follow this hierarchy without recursively loading all descendant data.

## Franchise Detail

### Backend

`FranchiseDetailResponseDto`:

* id
* name
* owner
* firstAppearance
* description
* logo
* lines: `LineSummaryDto[]`

`LineSummaryDto`:

* id
* name
* startYear
* endYear
* scale
* logo

`FranchisesService.findDetail(id)`:

* Returns only active Franchises (`deletedAt: null`).
* Returns only active Lines (`deletedAt: null`).
* Orders Lines by name ascending.
* Explicitly maps Franchise and Line data to the detail response.
* Throws `NotFoundException` for an unknown/inactive Franchise.

Verified with a real Star Wars Franchise ID returning `200 OK`.

### Frontend

Implemented:

* `features/franchise-detail/models/franchise-detail.model.ts`
* `features/franchise-detail/services/franchise-detail.service.ts`
* `features/franchise-detail/pages/franchise-detail/franchise-detail.ts`
* `features/franchise-detail/pages/franchise-detail/franchise-detail.html`
* `features/franchise-detail/pages/franchise-detail/franchise-detail.scss`

The page displays:

* Franchise logo/name.
* Owner.
* First appearance.
* Description.
* Available Lines.
* Line count.
* Line metadata.

Line cards use `RouterLink` and navigate to:

```text
/lines/:id
```

The frontend compiles and the route has been manually validated.

## Line Detail

### Backend

`LineDetailResponseDto`:

* id
* name
* startYear
* endYear
* scale
* logo
* description
* manufacturer summary
* franchise summary
* figures

Manufacturer summary:

* id
* name

Franchise summary:

* id
* name
* logo

Figure summary:

* id
* name
* code
* imageUrl
* characterId
* characterName

`LinesService.findDetail(id)`:

* Loads only an active Line.
* Loads the related Manufacturer and Franchise.
* Loads only active Figures.
* Loads only active Characters for those Figures.
* Orders Figures by name.
* Explicitly maps the response to the detail contract.
* Returns `404 Not Found` when the Line does not exist.

Verified with:

```text
GET /lines/cms8tgdcb000lukxkqhys2t04
```

The endpoint returned `200 OK` for Star Wars PBP with its Manufacturer, Franchise, and Figures array.

### Frontend

Implemented:

* `features/line-detail/models/line-detail.model.ts`
* `features/line-detail/services/line-detail.service.ts`
* `features/line-detail/pages/line-detail/line-detail.ts`
* `features/line-detail/pages/line-detail/line-detail.html`
* `features/line-detail/pages/line-detail/line-detail.scss`

The page displays:

* Line logo/name.
* Manufacturer.
* Franchise.
* Start/end years.
* Scale.
* Description.
* Figure count.
* Figure summaries.

The component compiles successfully.

Route:

```text
/lines/:id
```

The route has been manually validated and loads the Line Detail correctly.

## Current Detail Navigation Flow

The currently implemented transversal flow is:

```text
Global Search
     │
     ├── Franchise ──→ Franchise Detail
     │                      │
     │                      └── Line ──→ Line Detail
     │
     ├── Line ────────→ Line Detail
     │
     ├── Manufacturer → pending
     ├── Character ───→ pending
     ├── Figure ──────→ pending
     ├── Variant ─────→ pending
     └── Product Release → pending
```

Global Search already contains navigation mappings for all seven result types:

```ts
franchise: 'franchises'
manufacturer: 'manufacturers'
line: 'lines'
character: 'characters'
figure: 'figures'
variant: 'variants'
productRelease: 'product-releases'
```

Only routes/pages that actually exist should be considered functional.

## Current Next Detail: Figure Detail

The next detail page to implement is **Figure Detail**.

Prisma model relationships have been reviewed.

Current Figure model:

* id
* name
* code
* description
* imageUrl
* characterId
* lineId
* deletedAt
* createdAt
* updatedAt
* character relation
* line relation
* variants relation

Variant model:

* id
* name
* description
* imageUrl
* figureId
* deletedAt
* productReleases relation

ProductRelease should not be loaded recursively from Figure Detail.

### Proposed Figure Detail contract

`FigureDetailResponseDto` should contain:

* Figure fields:

  * id
  * name
  * code
  * description
  * imageUrl
* Character summary:

  * id
  * name
  * image
* Line summary:

  * id
  * name
  * scale
  * logo
* Variants:

  * id
  * name
  * description
  * imageUrl

Expected hierarchy:

```text
Figure Detail
     ├── Character summary
     ├── Line summary
     └── Variants
             └── Product Releases belong to Variant Detail
```

Expected backend behaviour:

* Only active Figure.
* Only active Character.
* Only active Line.
* Only active Variants.
* Explicit DTO mapping.
* `404 Not Found` for unknown/inactive Figure.
* Variants ordered by name.
* No Prisma entity exposure.
* No Product Releases included in Figure Detail.

### Current Figure backend files

`figures.service.ts` currently contains:

* `findAll`
* `findOne`
* `create`
* `update`
* `remove`
* Character/Line existence helpers

`figures.controller.ts` currently exposes:

* `GET /figures`
* `GET /figures/:id`
* `POST /figures`
* `PUT /figures/:id`
* `DELETE /figures/:id`

Current Figure DTOs:

* `CreateFigureDto`
* `UpdateFigureDto`

There is currently no Figure response DTO.

The next implementation should add the dedicated Figure Detail response contract and `findDetail()` following the established Franchise/Line Detail pattern.

## Global Search

Global Search is implemented.

Result types:

* franchise
* manufacturer
* line
* character
* figure
* variant
* productRelease

The page receives `q` from query parameters and calls the backend search service.

Result cards emit the selected `GlobalSearchResult`.

The page navigation map already exists.

No changes are currently required to `global-search.ts` for Line navigation because:

```ts
line: 'lines'
```

is already present and `/lines/:id` is now implemented.

Search clearing has already been fixed and is considered completed unless a new regression appears.

## Login UX Backlog

The current login experience needs improvement:

* Clear feedback for incorrect credentials.
* “Forgot password?” flow.
* Review and improve the overall login experience.

Priority: after the transversal Detail work, if it fits the implementation plan.

## Collaboration Rules

* Provide complete changed files for copy/paste when code changes are requested.
* Return only the files requested.
* Preserve working code and existing conventions.
* Do not invent assumptions about the codebase.
* Avoid premature abstractions.
* Keep state documents separate:

  * `AI-context.md`
  * `HISTORY.md`
  * `project-status.md`
* `HISTORY.md` is append-only; add the newest session at the top and preserve previous entries.
* When pausing a session, update all three state documents separately.
