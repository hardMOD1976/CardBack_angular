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

## Global Search

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

✔ `GlobalSearchService` created

✔ `global-search.model.ts` created

### Current work

* Define frontend Search result models
* Connect GlobalSearch page to GlobalSearchService
* Consume `GET /search`
* Render real results
* Loading state
* Error state
* Empty state
* Result navigation

---

# Figure Detail

Status:

Not Started

Planned:

* ProductRelease detail page
* Complete catalogue information
* Complete collector information
* Navigation from Databank
* Navigation from Collection

---

# Shared Components

## FigureCard

Status:

Stable

Completed:

✔ Shared by Collection and Databank

✔ Unified Cardback design

✔ Placeholder image

✔ Overlay

✔ Hover effects

✔ Responsive layout

---

## CollectionHeader

Status:

Stable

Completed:

✔ Collection sorting controls

✔ Collection filtering controls

✔ Integration with Collection query flow

---

## `cb-input`

Status:

Stable / Extended

Completed:

✔ ControlValueAccessor

✔ `ngModel` compatibility

✔ FormControl compatibility

✔ Disabled state

✔ Touched state

✔ Configurable input type

✔ Configurable placeholder

✔ Enter output

The component remains generic and does not contain search-specific behaviour.

---

# Routing

Current authenticated Shell routes include:

* dashboard
* collection
* databank
* wishlist
* identify
* scan
* profile
* search

`/login` remains outside the authenticated Shell.

---

# Current Milestone

**Global Search integration in progress.**

The application can now navigate from the Header to:

`/search?q=<query>`

The remaining work is to connect that page to the existing backend Search endpoint and render the returned results.

---

# Next

1. Define Global Search frontend models.
2. Connect GlobalSearchService to the GlobalSearch page.
3. Consume backend Search results.
4. Render Global Search results.
5. Add Search loading/error/empty states.
6. Implement result navigation.
7. Figure Detail.
8. Connect Databank → Figure Detail.
9. Connect Collection → Figure Detail.
10. Collection actions.

---

# Overall Progress

Backend

≈ 95%

Frontend

≈ 60%

Overall project

≈ 70%

---

# Architecture Notes

Angular Signals are the standard mechanism for component-local reactive state.

Observable streams remain the communication layer with `HttpClient`.

Backend entities are never exposed directly to the frontend.

Public DTOs define the application contract.

Frontend models represent the public backend contract independently from NestJS DTO classes.

FigureCard remains the reusable business component shared between Databank and Collection.

Large datasets use server-side pagination, sorting, filtering and search.

Shared UI controls remain generic; feature-specific behaviour belongs to the consuming feature.
