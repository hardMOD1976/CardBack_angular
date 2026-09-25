Cardback — AI Context

Project Overview

Cardback (repository/folder: FigureArchive) is a collector-first platform for action figure collectors, initially focused on Star Wars figures from the 1970s to current releases.

The goal is a free, community-driven, Discogs-like platform for action figures, with a strong catalogue, collection management, and collector-oriented UX.

Core principles:

Collector-first, UX-first, mobile-first.

Separate immutable catalogue data from user-owned collection data.

High-quality catalogue and community contribution.

Fast navigation and accessible interfaces.

Avoid unnecessary abstractions and overengineering.

Do not expose Prisma entities directly through the API.

No marketplace as a core MVP feature.

No spending until the product is close to the intended vision and ready for community release.

Parallel prototypes may be used for experimentation, but they do not automatically redefine Cardback's architecture.

Tech Stack

Backend

NestJS

Prisma ORM

PostgreSQL / Neon

JWT authentication

DTO-based public API contracts

Server-side pagination, sorting, filtering, and search

Soft delete

Frontend

Angular 22

Standalone components

Feature-first architecture

Signals and RxJS

HttpClient

ControlValueAccessor for shared inputs

Authenticated Shell and route guard

Light/dark theme support

Domain Model

Core catalogue entities:

Manufacturer

Franchise

Line

Character

Figure

Variant

Product Release

User-owned entity:

Owned Figure

Domain distinctions:

Character = fictional identity.

Figure = physical representation of a Character within a Line.

Variant = distinct variation of a Figure.

Product Release = concrete commercial release, packaging, region, retailer, language, barcode, etc.

Owned Figure = a user's collection entry referencing a Product Release.

Vehicles/accessories may be supported later as a separate category. They are not Characters.

Catalogue Hierarchy

Franchise
   └── Line
        └── Figure
             └── Variant
                  └── Product Release

Character is a parallel domain entity related to Franchise and Figure:

Franchise
   └── Character
         └── Figure

This is a domain relationship model, not a requirement that every Detail endpoint recursively load the entire tree.

Current Implementation

Backend

Authentication and protected routes are implemented.

Databank API supports paginated Product Releases.

Collection API supports server-side pagination, search, sorting, and filtering.

Global Search endpoint is implemented with public DTO mapping and multiple result types.

Product Release response DTO exists.

Franchise Detail backend is implemented and verified.

Line Detail backend is implemented and verified.

Figure Detail backend implementation exists in the current branch as part of the turbo update and is currently being verified/reviewed.

Manufacturer, Character, Variant and Product Release Detail backend implementations are present in the current branch but still require explicit runtime verification before being considered fully verified.

Public DTO mapping is mandatory.

Never return raw Prisma entities from public endpoints.

Frontend

Databank MVP complete.

Collection MVP complete, including server-side sort/filter.

Global Search page and result cards implemented.

Search navigation uses /search?q=<query>.

Global Search result types:
franchise, manufacturer, line, character, figure, variant, productRelease.

Shared FigureCard exists.

Shared cb-input supports ControlValueAccessor and Enter output.

Franchise Detail frontend is implemented and verified.

Line Detail frontend is implemented and verified.

Figure, Manufacturer, Character, Variant and Product Release detail frontend pages/routes are present in the current branch after the turbo update; runtime verification is still required where not explicitly validated.

Wishlist is separate from collection data and references Product Releases.

Owned Figures public responses are explicitly mapped to API contracts.

Dashboard uses per-user collection aggregates and recent records.

Barcode lookup resolves against the local Product Release catalogue; browser camera/image detection remains capability-dependent.

AI image identification is a suggestion workflow and does not create catalogue records automatically.

Registration, session refresh, password change and password reset are implemented; password reset delivery still requires Resend configuration and a public application URL.

/franchises/:id exists.

/lines/:id exists.

/figures/:id exists.

/manufacturers/:id exists.

/characters/:id exists.

/variants/:id exists.

/product-releases/:id exists.

Franchise Detail Line cards navigate to Line Detail.

Global Search already contains the navigation map for all seven result types.

Current Parity / Prototype Work

A parallel React version of Cardback was generated as a rapid experimentation/prototyping effort. It used the existing Neon database and was initially based on this context plus a small number of additional directions.

The React version is useful as a source of product and UX ideas and as a fast way to test features.

It is not the architectural authority for Angular Cardback.

Do not automatically copy:

React-specific implementation choices.

Demo-only behaviour.

External web lookup used only to make a prototype look populated.

Unverified catalogue data.

UX decisions that conflict with the established Cardback domain model or API boundaries.

AI Studio also inserted a batch of test catalogue data into Neon during experimentation. Those records use demo image URLs and are not canonical catalogue data.

Build / Verification State

Current branch contains a substantial turbo update intended to align Angular feature coverage with the parallel React prototype.

Known verification status:

Franchise Detail backend: verified.

Franchise Detail frontend: verified.

Line Detail backend: verified.

Line Detail frontend: verified.

Figure Detail: implemented/WIP; backend and frontend require current-session verification.

Remaining newly added Detail destinations: implemented/present, verification pending unless explicitly recorded otherwise.

Angular template/type checking has been used during development; do not claim full release build or end-to-end verification unless it has actually been run successfully.

Database migrations still need to be applied to the intended environment where required.

Automated tests have not been treated as complete unless explicitly run and recorded.

Detail Pages — Architecture Decisions

Detail pages are common destinations from Global Search, Databank and Collection.

Do not create one oversized universal Detail DTO.

Use:

Dedicated Detail response contracts.

Small summary/reference DTOs.

Explicit response mapping.

Active-record filtering.

No uncontrolled recursive descendant loading.

The intended canonical hierarchy remains:

Franchise
   └── Line
        └── Figure
             └── Variant
                  └── Product Release

Each Detail page should expose the next relevant level without automatically absorbing all deeper levels.

Important rule for current WIP

The current turbo Figure Detail implementation includes Product Releases nested under Variants.

This is a current implementation detail under review, not a replacement of the established architectural decision.

The previously agreed canonical Figure Detail contract intentionally excluded Product Releases:

Figure Detail
 ├── Figure
 ├── Character summary
 ├── Line summary
 └── Variants

Product Releases remain conceptually owned by Variant Detail unless an explicit product/architecture review changes that decision.

Do not refactor this blindly. First inspect the current implementation and compare it with the intended collector experience and the parallel React feature.

Franchise Detail

Backend

FranchiseDetailResponseDto:

id

name

owner

firstAppearance

description

logo

lines: LineSummaryDto[]

LineSummaryDto:

id

name

startYear

endYear

scale

logo

FranchisesService.findDetail(id):

Returns only active Franchises (deletedAt: null).

Returns only active Lines (deletedAt: null).

Orders Lines by name ascending.

Explicitly maps Franchise and Line data.

Throws NotFoundException for unknown/inactive Franchise.

Verified with a real Star Wars Franchise ID returning 200 OK.

Frontend

Implemented and verified:

features/franchise-detail/models/franchise-detail.model.ts

features/franchise-detail/services/franchise-detail.service.ts

features/franchise-detail/pages/franchise-detail/franchise-detail.ts

features/franchise-detail/pages/franchise-detail/franchise-detail.html

features/franchise-detail/pages/franchise-detail/franchise-detail.scss

/franchises/:id

Line cards use RouterLink and navigate to /lines/:id.

Line Detail

Backend

LineDetailResponseDto contains:

id

name

startYear

endYear

scale

logo

description

manufacturer summary

franchise summary

figure summaries

Figure summary contains:

id

name

code

imageUrl

characterId

characterName

LinesService.findDetail(id):

Loads only an active Line.

Loads related Manufacturer and Franchise.

Loads only active Figures.

Loads only active Characters for those Figures.

Orders Figures by name.

Explicitly maps the response.

Returns 404 when the Line does not exist.

Verified with:

GET /lines/cms8tgdcb000lukxkqhys2t04

Result: 200 OK.

Frontend

Implemented and verified:

Figure summaries.

/lines/:id.

Loading/error/empty states.

Line metadata.

Figure navigation groundwork.

Franchise Detail → Line Detail has been manually verified.

Figure Detail — Current WIP

Prisma relationships:

Figure
 ├── Character
 ├── Line
 └── Variants

Variant:

Variant
 └── Product Releases

Current backend implementation

The current branch now contains FigureDetailResponseDto and FiguresService.findDetail(id).

Current DTO shape includes:

Figure
 ├── id
 ├── name
 ├── code
 ├── description
 ├── imageUrl
 │
 ├── character
 │    ├── id
 │    ├── name
 │    └── image
 │
 ├── line
 │    ├── id
 │    ├── name
 │    ├── scale
 │    ├── logo
 │    ├── manufacturer
 │    └── franchise
 │
 └── variants
      ├── id
      ├── name
      ├── description
      ├── imageUrl
      └── productReleases   ← current WIP implementation

Current backend behaviour includes:

Active Figure filtering.

Active Character filtering.

Active Character → Franchise filtering.

Active Line filtering.

Active Line → Manufacturer filtering.

Active Line → Franchise filtering.

Active Variant filtering.

Active Product Release filtering in the current WIP implementation.

Variant ordering by name.

Product Release ordering by name.

Explicit response mapping.

404 Not Found for an unknown/inactive Figure.

The presence of nested Product Releases must still be reviewed against the canonical architecture before Figure Detail is considered final.

Current frontend implementation

The current branch contains:

Figure Detail page.

Figure Detail service/model.

/figures/:id route.

Character navigation.

Line navigation.

Franchise navigation.

Variant navigation.

Product Release navigation.

Variant and Product Release sections.

Current implementation is considered WIP until backend verification and the Product Release boundary are explicitly settled.

Global Search

Global Search is implemented.

Result types:

franchise

manufacturer

line

character

figure

variant

productRelease

The page receives q from query parameters and calls the backend search service.

Result cards emit the selected GlobalSearchResult.

The navigation map already exists:

franchise: 'franchises'
manufacturer: 'manufacturers'
line: 'lines'
character: 'characters'
figure: 'figures'
variant: 'variants'
productRelease: 'product-releases'

No change to global-search.ts was required when Line Detail was added because line: 'lines' was already present.

Only routes/pages that exist and have been runtime-verified should be considered fully functional.

Transversal Detail Navigation

Verified:

Global Search
     │
     ├── Franchise → Franchise Detail
     │                    │
     │                    └── Line → Line Detail
     │
     └── Line → Line Detail

Current implemented route network:

Global Search
 ├── Franchise → Franchise Detail
 ├── Manufacturer → Manufacturer Detail
 ├── Line → Line Detail
 ├── Character → Character Detail
 ├── Figure → Figure Detail
 ├── Variant → Variant Detail
 └── Product Release → Product Release Detail

Only the Franchise and Line branches are currently recorded as manually verified.

Login UX Backlog

The current login experience still needs improvement:

Clear feedback for incorrect credentials.

“Forgot password?” flow review/finish.

Overall login UX review and refinement.

Priority remains after the transversal Detail work, unless implementation sequencing changes.

Data / Demo Database Note

The parallel AI Studio experiment inserted a batch of Figure test records into the shared Neon database on 2026-09-23.

Those records include demo image URLs and must be treated as experimental data.

They are useful for testing UI and navigation but must not be mistaken for canonical Cardback catalogue data.

Working Rules for Future Sessions

Provide complete changed files for copy/paste when code changes are requested.

Return only the files requested.

Preserve working code and existing conventions.

Do not invent assumptions about the codebase.

Avoid premature abstractions.

Preserve the established Cardback domain model.

Use the Angular implementation as the canonical implementation for this repository.

Use the parallel React project as a reference/prototype, not as an automatic source of architectural truth.

Do not silently replace agreed architectural decisions because the prototype chose another implementation.

Keep AI-context.md, HISTORY.md, and project-status.md separate.

HISTORY.md is append-only; add the newest session at the top and preserve previous entries.

When pausing a session, update all three state documents separately.

Do not repeat already completed DTO reviews unless a concrete implementation issue requires it.