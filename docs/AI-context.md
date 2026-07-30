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

Infrastructure is mostly finished.

The project is now entering feature development.

Architecture
------------

Backend

- NestJS
- Prisma
- PostgreSQL

Frontend

- Angular 21
- Standalone Components
- Feature-first architecture

Current priorities
------------------

1. Finish Databank
2. Figure Detail
3. Connect Collection <-> Figure Detail
4. Connect Databank <-> Figure Detail

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

ProductRelease is the public catalogue entity used by the frontend.

The backend may internally use fields like

defaultImage

but the frontend contract should expose

imageUrl

through mapping.

Do NOT leak database naming to the frontend.

FigureCard
----------

FigureCard is now the common card for

- Collection
- Databank

Only behaviour changes.

Visual appearance remains identical.

Current issue
-------------

OwnedFigures endpoint still returns ProductRelease without the nested hierarchy

ProductRelease
 └── Variant
      └── Figure
           ├── Character
           └── Line
                └── Manufacturer

Collection cannot be completed until this include is added.

Next session
------------

1. Finish OwnedFigures include hierarchy.
2. Finish Collection.
3. Finish Databank.
4. Start Figure Detail.