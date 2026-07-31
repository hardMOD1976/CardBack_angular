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

Current blocker has been resolved.

OwnedFigure now returns the complete hierarchy

ProductRelease
 └── Variant
      └── Figure
           ├── Character
           └── Line
                └── Manufacturer

Collection is now the next feature to complete.

Next session
------------

1. Finish Collection.
2. Implement Figure Detail.
3. Connect Databank → Figure Detail.
4. Connect Collection → Figure Detail.