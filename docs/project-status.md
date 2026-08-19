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

✔ GlobalSearch frontend result models

✔ `GlobalSearchService`

✔ `GET /search` integration

✔ Search query parameters

✔ Loading state

✔ Error state

✔ Empty state

✔ Real Search results

✔ `GlobalSearchResultCard` component

### Current work

* Integrate `GlobalSearchResultCard` into GlobalSearch
* Render real results
* Validate result presentation with the real `luke` response
* Verify differentiation of the seven result types
* Implement result navigation
* Define a reusable Search/navigation URL pattern

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

## GlobalSearchResultCard

Status:

Created / Not yet integrated

Completed:

✔ Dedicated Global Search result presentation component

✔ Required `GlobalSearchResult` signal input

✔ Result image / placeholder

✔ Result type display

✔ Result name display

✔ Context information display

✔ Presentation separated from HTTP/service logic

### Remaining

* Integrate into GlobalSearch page
* Validate responsive presentation
* Add navigation after the routing pattern is defined

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

Current Global Search navigation:

`/search?q=<query>`

The URL pattern is currently functional but not yet considered final.

---

# Current Milestone

**Global Search result rendering in progress.**

The application can now:

1. Navigate from the Header to:
   `/search?q=<query>`
2. Load the Search results from the backend.
3. Handle loading/error/empty states.
4. Represent results through `GlobalSearchResult`.
5. Use `GlobalSearchResultCard` for result presentation.

The immediate remaining task is to render the cards in the Global Search page and validate them with real API results.

---

# Next

1. Integrate GlobalSearchResultCard into GlobalSearch.
2. Render Global Search results.
3. Validate the result cards with the real `luke` search.
4. Verify all seven result types.
5. Implement result navigation.
6. Define the reusable Search/navigation URL pattern.
7. Figure Detail.
8. Connect Databank → Figure Detail.
9. Connect Collection → Figure Detail.
10. Collection actions.

---

# Overall Progress

Backend

≈ 95%

Frontend

≈ 65%

Overall project

≈ 72%

---

# Architecture Notes

Angular Signals are the standard mechanism for component-local reactive state.

Observable streams remain the communication layer with `HttpClient`.

Backend entities are never exposed directly to the frontend.

Public DTOs define the application contract.

Frontend models represent the public backend contract independently from NestJS DTO classes.

FigureCard remains the reusable business component shared between Databank and Collection.

GlobalSearchResultCard is a separate feature-specific component because Global Search represents heterogeneous domain results.

Large datasets use server-side pagination, sorting, filtering and search.

Shared UI controls remain generic; feature-specific behaviour belongs to the consuming feature.

Navigation should not be prematurely abstracted. Establish the actual Figure Detail and Global Search navigation flows first, then extract a reusable pattern only where concrete reuse exists.