# AI Context

Project
-------

Product name:
Cardback

Repository:
FigureArchive

Goal
----

Build the definitive platform for action figure collectors.

The platform separates immutable catalogue information from user-owned collection data.

Current Phase
-------------

Frontend business features.

Infrastructure is finished.

The project is now focused on implementing the MVP features.

Architecture
------------

Backend

- NestJS
- Prisma
- PostgreSQL

Frontend

- Angular 22
- Standalone Components
- Signals
- Feature-first architecture

Current priorities
------------------

1. Finish Collection
2. Figure Detail
3. Connect Collection ↔ Figure Detail
4. Connect Databank ↔ Figure Detail

Current reusable components
---------------------------

Shared UI

- cb-button
- cb-input
- cb-card
- spinner
- badge

Business components

- FigureCard
- CollectionHeader

Important architectural decisions
---------------------------------

ProductRelease is the public catalogue entity exposed by the backend.

Database entities may use different internal names, but frontend DTOs must expose a stable public contract.

Current public image field:

imageUrl

Mapping between database entities and public DTOs is mandatory.

Never expose Prisma entities directly.

FigureCard
----------

FigureCard is the shared business component used by

- Collection
- Databank

Only behaviour changes between pages.

Visual appearance must remain identical.

Databank
--------

Status

Completed (MVP)

Implemented

- Signals
- Loading state
- Search
- Pagination
- Shared FigureCard
- Backend DTO mapping
- imageUrl contract
- Angular 22 reactive state

Collection
----------

Status

MVP completed.

Implemented

- Authenticated endpoint
- Complete backend hierarchy consumption
- Shared FigureCard
- CollectionHeader
- Loading state
- Error state
- Empty state
- Mapping from OwnedFigure → FigureCardModel

Lessons learned

A temporary 401 Unauthorized was caused by an expired/invalid JWT stored on the frontend.

The Collection implementation itself was correct.

After obtaining a fresh access token the page rendered correctly without code changes.

Next session
------------

1. Sort.
2. Filters.
3. Figure Detail.
4. Connect Databank → Figure Detail.
5. Connect Collection → Figure Detail.