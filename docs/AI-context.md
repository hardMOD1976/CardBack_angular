# AI Context

## Project

Product name:
Cardback

Repository:
FigureArchive

## Goal

Build the definitive platform for action figure collectors.

The platform separates immutable catalogue information from user-owned collection data.

The product catalogue is the authoritative source for figure information, while collection data represents what each user owns.

---

## Current Phase

Frontend business features.

Infrastructure is finished.

The project is currently focused on implementing and connecting the core MVP business features.

The following major areas are already functional:

* Authentication
* Shell / application layout
* Databank
* Collection
* Collection sorting
* Collection filtering

The current active feature is:

* Global Search

---

## Architecture

### Backend

* NestJS
* Prisma
* PostgreSQL
* REST API
* JWT authentication
* Refresh tokens
* Public DTO mapping
* Server-side pagination
* Server-side sorting
* Server-side filtering

### Frontend

* Angular 22
* Standalone Components
* Signals
* Feature-first architecture
* HttpClient
* RxJS for HTTP communication
* ControlValueAccessor for reusable form controls

---

## Important Architecture Principles

### Backend / Frontend boundary

Backend entities are never exposed directly to the frontend.

Public DTOs define the application contract.

Database entities may use different internal names, but frontend models must consume the stable public API contract.

Mapping between database entities and public DTOs is mandatory.

Current public image field:

`imageUrl`

Never expose Prisma entities directly.

---

## Data Loading Strategy

Cardback must not load entire collections or catalogue datasets into the frontend unnecessarily.

Large datasets must use server-side:

* Pagination
* Sorting
* Filtering
* Search

The frontend sends query parameters to the backend and renders the returned page.

This principle is especially important for user collections, which may grow substantially.

---

# Shared UI

Current reusable components include:

* `cb-button`
* `cb-input`
* `cb-card`
* spinner
* badge

## `cb-input`

`cb-input` is a reusable form control implemented through:

* `ControlValueAccessor`
* `NG_VALUE_ACCESSOR`

It supports:

* value propagation
* disabled state
* touched state
* configurable input type
* configurable placeholder
* Enter key event

The Enter event is exposed through:

`enter = output<void>()`

The shared input does not know what Enter means semantically.

It only reports that the user pressed Enter.

Consumers decide the behaviour.

Example:

```text
cb-input
 ├── ControlValueAccessor
 │      └── value → ngModel / FormControl
 │
 └── enter output
        ├── Header → search()
        └── Login form → submit()
```

For Login, native form submission through `(ngSubmit)` remains preferable to implementing search-like behaviour manually.

---

# Business Components

## FigureCard

`FigureCard` is the shared business component used by:

* Collection
* Databank

Only page-specific behaviour changes.

The visual appearance must remain identical.

---

## CollectionHeader

`CollectionHeader` is responsible for the collection controls related to:

* sorting
* filtering

The actual data retrieval remains the responsibility of the Collection page/service.

Sorting and filtering are server-side.

---

# Databank

Status:

**MVP completed**

Implemented:

* Signals
* Loading state
* Error state
* Empty state
* Search
* Pagination
* Shared `FigureCard`
* Backend DTO mapping
* `imageUrl` contract
* Angular 22 reactive state

The Databank consumes catalogue information from the backend and does not load the complete catalogue into the frontend.

---

# Collection

Status:

**MVP completed**

Implemented:

* Authenticated endpoint
* Complete backend hierarchy consumption
* Shared `FigureCard`
* `CollectionHeader`
* Loading state
* Error state
* Empty state
* Mapping from `OwnedFigure` → `FigureCardModel`
* Server-side pagination
* Server-side sorting
* Server-side filtering
* Collection query parameters
* Collection sort controls
* Collection filter controls

Frontend query model currently supports:

* `page`
* `limit`
* `search`
* `sortBy`
* `sortOrder`
* `condition`
* `completeness`
* `packagingState`

The frontend `CollectionService` builds `HttpParams` from these values and calls:

`GET /owned-figures`

Backend pagination and query handling are implemented through the corresponding DTO/query contract.

---

# Global Search

Status:

**In progress**

Backend Search is already implemented.

Backend capabilities include:

* Global search endpoint
* Pagination
* Public DTO mapping

The frontend Global Search feature has now been started.

## Current frontend implementation

Created:

* `GlobalSearch` page
* `GlobalSearchService`
* `global-search.model.ts`
* `/search` route

The `/search` route is inside the authenticated `Shell` children and therefore protected by the existing `authGuard`.

Current route:

`/search`

The Header navigates to it with:

`/search?q=<query>`

Example:

`/search?q=vader`

## Header integration

The Header search input now uses:

* `cb-input`
* `[(ngModel)]`
* `enter` output

Current flow:

```text
User types "vader"
        ↓
[(ngModel)]
        ↓
searchQuery = "vader"
        ↓
User presses Enter
        ↓
cb-input.enter
        ↓
Header.search()
        ↓
router.navigate()
        ↓
/search?q=vader
        ↓
GlobalSearch
```

The Global Search page currently confirms the received query.

## Current Global Search state

`global-search.model.ts` exists but is currently empty.

The next implementation step is to define the frontend models matching the backend public Search response.

After that:

1. Complete `GlobalSearchService`.
2. Connect `GlobalSearch` to the service.
3. Call `GET /search`.
4. Render real search results.
5. Add result-specific navigation.
6. Refine the Search UI.

The result model must follow the backend public API contract rather than Prisma entities.

---

# Routing

Current application structure:

```text
/login
    ↓
Login

/
    ↓
Shell
    ↓
authGuard
    ↓
├── dashboard
├── collection
├── databank
├── wishlist
├── identify
├── scan
├── profile
└── search
```

Global Search is intentionally a child route of `Shell`, so it shares:

* Header
* Sidebar
* application layout
* authentication protection

---

# Authentication

Implemented:

* Login
* JWT authentication
* Refresh tokens
* Auth interceptor
* Auth guard
* Current user handling
* Logout

Important debugging lesson:

A previous Collection HTTP 401 was caused by an expired/invalid JWT stored on the frontend.

The Collection implementation itself was correct.

When debugging authenticated pages:

1. Check the Network tab.
2. Verify the Authorization header.
3. Verify the backend response.
4. Only then investigate Angular rendering.

---

# Important Domain Rules

The following distinction must remain clear:

### Character

The fictional character.

Example:

Luke Skywalker.

### Figure

A physical figure representation associated with a character.

### Product Release

The catalogue product/release being sold.

Different releases can represent the same character.

Examples:

* Luke Skywalker — Kenner 1978
* Luke Skywalker — POTF2 1995
* Luke Skywalker — TVC VC13 2010
* Luke Skywalker — Black Series #01

These are not separate characters.

---

# Current Priorities

## 1. Finish Global Search

* Define `global-search.model.ts`
* Complete `GlobalSearchService`
* Connect page to service
* Consume `GET /search`
* Render results
* Handle loading/error/empty states
* Add result navigation

## 2. Figure Detail

* Product Release detail page
* Complete catalogue information
* Collector information
* Navigation from Databank

## 3. Connect Databank → Figure Detail

Figure cards/results must navigate to the appropriate Product Release detail.

## 4. Connect Collection → Figure Detail

Owned collection entries must navigate to the corresponding catalogue/product detail.

## 5. Collection actions

After the core navigation flow is established:

* collection-specific actions
* future ownership management interactions

---

# Current Reusable Patterns

For HTTP services:

```text
inject(HttpClient)
        ↓
HttpParams
        ↓
Observable<Response>
```

For component-local reactive state:

```text
Signals
```

For HTTP communication:

```text
Observable
```

For reusable form controls:

```text
ControlValueAccessor
```

For authenticated application pages:

```text
Shell
  ↓
authGuard
  ↓
feature route
```

For large datasets:

```text
Frontend query
  ↓
HTTP query params
  ↓
Backend pagination / sorting / filtering
  ↓
Paginated response
  ↓
Frontend rendering
```

---

# Project Direction

Cardback remains collector-first.

The architecture should favour:

* clear domain boundaries
* reusable UI primitives
* reusable business components
* server-side data operations
* stable API contracts
* predictable Angular state management
* minimal unnecessary frontend complexity

Avoid introducing abstractions before there is a concrete reuse case.
