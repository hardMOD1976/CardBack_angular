
---

### `Project-status.md`

```md
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

Not Started

Planned:

* Transversal domain detail pages
* Character detail information
* Product Releases
* Lines
* Variants
* Related figures
* Clickable related entities
* Navigation from Global Search
* Navigation from Databank
* Navigation from Collection

The detail architecture should represent the domain transversally rather than treating Product Release as the universal detail root.

Example:

```text
Luke detail
 ├── Character information
 ├── Product Releases
 ├── Lines
 ├── Variants
 └── Figures