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

✔ MVP Completed

Completed

✔ Authenticated endpoint

✔ Backend hierarchy consumption

✔ FigureCard integration

✔ CollectionHeader

✔ Loading state

✔ Error state

✔ Empty state

✔ Collection rendering

Pending

- Sorting
- Filters
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

Collection MVP completed.

Next
----

1. Collection Sort.

2. Collection Filters.

3. Figure Detail.

4. Connect Databank → Figure Detail.

5. Connect Collection → Figure Detail.

Overall Progress
----------------

Backend

≈ 95%

Frontend

≈ 55%

Overall project

≈ 65%

Architecture Notes
------------------

Angular Signals are the standard mechanism for component-local reactive state.

Observable streams remain the communication layer with HttpClient.

Backend entities are never exposed directly to the frontend.

Public DTOs define the application contract.

FigureCard remains the reusable business component shared between Databank and Collection.