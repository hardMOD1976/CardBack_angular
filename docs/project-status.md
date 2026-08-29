# Project Status

## Brand

Cardback

## Repository

FigureArchive

## Current Phase

Frontend MVP development.

Infrastructure is complete.

The current focus is connecting and completing the core collector-facing business features.

---

# Completed

## Backend

✔ Manufacturer

✔ Franchise

✔ Line

✔ Character

✔ Figure

✔ Variant

✔ Product Release

✔ User

✔ Owned Figure

✔ JWT Authentication

✔ Refresh Tokens

✔ Search

✔ Pagination

✔ Server-side sorting

✔ Server-side filtering

✔ Soft Delete

✔ Public DTO Mapping

✔ `imageUrl` public contract

---

## Frontend Foundation

✔ Angular 22

✔ Standalone Components

✔ Signals

✔ Feature-first architecture

✔ Shell

✔ Routing

✔ Authentication

✔ Header

✔ Sidebar

✔ Shared UI

✔ Design Tokens

✔ Auth Guard

✔ HTTP authentication interceptor

✔ Light / dark theme switching

---

# Business Features

## Databank

Status:

✔ MVP Completed

Completed:

✔ ProductReleaseModel

✔ DatabankService

✔ Signals

✔ Search

✔ Pagination

✔ Loading state

✔ Error state

✔ Empty state

✔ FigureCard integration

✔ Backend DTO mapping

✔ `imageUrl` contract

✔ Catalogue rendering

---

## Collection

Status:

✔ MVP Completed

Completed:

✔ Authenticated endpoint

✔ Backend hierarchy consumption

✔ FigureCard integration

✔ CollectionHeader

✔ Loading state

✔ Error state

✔ Empty state

✔ Collection rendering

✔ Server-side pagination

✔ Server-side sorting

✔ Server-side filtering

✔ Collection query parameters

✔ Sort controls

✔ Filter controls

### Remaining

* Collection actions

---

# Global Search

Status:

🔄 In Progress

Completed:

✔ Backend Search endpoint

✔ Backend pagination

✔ Backend public DTO contract

✔ GlobalSearch page

✔ `/search` route

✔ Route integrated inside Shell

✔ Authentication protection through `authGuard`

✔ Header search input

✔ `cb-input` ControlValueAccessor integration

✔ `cb-input` Enter output

✔ Header `ngModel` search binding

✔ Header navigation to `/search?q=...`

✔ GlobalSearch receives and displays the query

✔ GlobalSearch frontend result models

✔ `GlobalSearchService`

✔ `GET /search` integration

✔ Search query parameters

✔ Loading state

✔ Error state

✔ Empty state

✔ Real Search results

✔ `GlobalSearchResultCard` component

✔ GlobalSearchResultCard integrated into GlobalSearch

✔ Responsive Search result grid

✔ Shared Cardback placeholder

✔ Search result count

✔ Optional clear button added to `cb-input`

✔ Header Search configured as clearable

### Current work

* Fix end-to-end Search clearing
* Verify URL query removal
* Verify GlobalSearch results are cleared
* Verify empty-search state after clear
* Implement result navigation
* Define reusable Search/detail URL pattern

---

# Figure / Domain Detail

Status:

🟡 Conceptually Defined — Implementation Not Started

The Detail architecture has now been defined at the domain level.

The transversal Detail system will provide dedicated detail contracts and pages for:

* Franchise
* Manufacturer
* Line
* Character
* Figure
* Variant
* Product Release

The Detail architecture must not blindly reuse Collection or Databank feature models.

---

## Domain hierarchy

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

This represents domain relationships rather than a mandatory visual page hierarchy.

---

## Detail response contracts

Planned:

* `FranchiseDetailResponseDto`
* `ManufacturerDetailResponseDto`
* `LineDetailResponseDto`
* `CharacterDetailResponseDto`
* `FigureDetailResponseDto`
* `VariantDetailResponseDto`
* `ProductReleaseDetailResponseDto`

Small summary/reference DTOs may be introduced to avoid unnecessarily recursive payloads.

### First contract to design

`FranchiseDetailResponseDto`

The DTO design should start from the collector-facing experience and then map the Prisma data into that contract.

---

## Franchise Detail

Concept:

Franchise Detail acts as a gateway into the catalogue.

Expected content:

* Franchise/logo image
* Franchise description
* Origin / history
* Historical context related to action figures
* Available Lines

Lines should be visual and clickable.

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

---

## Line Detail

Expected content:

* Line logo where available
* Text fallback where no logo exists
* Representative collection image
* Manufacturer
* Start / commercialisation year
* End year where applicable
* Active / still available indicator
* Total number of products
* Figures belonging to the Line

Figures should be displayed using identifying images rather than plain text links.

The intended presentation is a catalogue/card experience useful to collectors.

---

## Character Detail

Expected content:

* Character name
* Representative image
* Lore history
* First appearance in lore
* First action figure appearance / first Product Release
* Lines in which the Character appears
* All Figure appearances across those Lines
* Variants
* Product Release photographic galleries

The page should distinguish between lore history and collecting history.

---

## Variant Detail

Variant is a first-class catalogue entity, not merely a visual difference inside Figure.

Expected information may include:

* Name
* Dedicated image
* Distinguishing description
* Associated Figure
* Product Releases
* Region information where historically useful
* Packaging
* Accessories
* First or unique appearance
* Photographs

The primary collector-oriented questions are:

* What makes the Variant special?
* How do I identify it?
* Where did it appear?
* Which Product Releases contain it?
* How can I recognise or acquire it today?

---

## Product Release Detail

Product Release has its own dedicated detail page.

It represents the concrete commercial product.

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

Product Release should not become the universal Detail root.

---

## Navigation into Detail

The Detail system should become the common destination for catalogue entities discovered through:

```text
Global Search ────────┐
Databank ─────────────┤
Collection ───────────┼──→ Detail
                       │
future features ──────┘
```

Planned navigation:

* Global Search → Detail
* Databank → Detail
* Collection → Detail

---

# Next Development Steps

## Immediate

1. Complete Global Search clearing behaviour
2. Verify query parameter removal
3. Implement Global Search result navigation
4. Define reusable Detail URL pattern

## Then

5. Design `FranchiseDetailResponseDto`
6. Define reusable summary/reference DTOs
7. Design remaining Detail response contracts
8. Implement backend `findOne()` mappings for Detail
9. Implement transversal Detail frontend architecture
10. Connect Global Search → Detail
11. Connect Databank → Detail
12. Connect Collection → Detail

---

# UX Backlog

## Login

Status:

⏳ Planned

Needs:

* Clear invalid-credentials feedback
* "Forgot password?" flow
* Review and improve the complete login experience

Priority:

After the transversal Detail page if it fits the development plan; otherwise later.
