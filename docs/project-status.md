# Project Status

Brand
-----

Cardback

Current Phase
-------------

Frontend MVP development.

Infrastructure is complete.

The focus is now on delivering the core collector experience.

Completed
---------

Backend

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

✔ Soft Delete

✔ Public DTO Mapping

✔ imageUrl public contract

Frontend

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

Business Features
-----------------

Databank

Status

✔ MVP Completed

Completed

✔ ProductReleaseModel

✔ DatabankService

✔ Signals

✔ Search

✔ Pagination

✔ Loading state

✔ Error state

✔ FigureCard integration

✔ Backend DTO mapping

✔ imageUrl contract

✔ Catalogue rendering

Collection

Status

Next Feature

Completed

✔ Authenticated endpoint

✔ Loading state

✔ Error state

✔ FigureCard integration

✔ Backend include hierarchy

Pending

- Consume updated backend hierarchy
- Signals migration
- Collection rendering
- Collection actions

Figure Detail

Status

Not Started

Planned

- ProductRelease detail page
- Complete collector information
- Navigation from Databank
- Navigation from Collection

Shared Components
-----------------

FigureCard

Status

Stable

Completed

✔ Shared by Collection and Databank

✔ Unified Cardback design

✔ Placeholder image

✔ Overlay

✔ Hover effects

✔ Responsive layout

Current Milestone
-----------------

Complete Collection MVP.

Next
----

1. Finish Collection.

2. Implement Figure Detail.

3. Connect Databank → Figure Detail.

4. Connect Collection → Figure Detail.

Overall Progress
----------------

Backend

≈ 95%

Frontend

≈ 45%

Overall project

≈ 60%

Architecture Notes
------------------

Angular Signals are now the standard mechanism for component-local reactive state.

Backend entities are never exposed directly to the frontend.

Public DTOs define the application contract.

FigureCard remains the single reusable business card component across the application.