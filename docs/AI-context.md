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
* Global Search API integration
* Global Search result rendering
* Light / dark theme switching

The current active feature is:

* Global Search

The immediate unfinished task is:

* Complete and verify Global Search clearing behaviour

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
* optional clear button

The Enter event is exposed through:

`enter = output<void>()`

The clear event is exposed through:

`clear = output<void>()`

The clear button is controlled through:

`clearable = input(false)`

The shared input does not know what Enter or Clear mean semantically.

It only reports that the user pressed Enter or requested a clear.

Consumers decide the behaviour.

Example:

```text
cb-input
 ├── ControlValueAccessor
 │      └── value → ngModel / FormControl
 │
 ├── enter output
 │      ├── Header → search()
 │      └── Login form → submit()
 │
 └── clear output
        └── Header → clearSearch()