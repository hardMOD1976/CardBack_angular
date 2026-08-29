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

# Current Phase

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

# Architecture

## Backend

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

## Frontend

* Angular 22
* Standalone Components
* Signals
* Feature-first architecture
* HttpClient
* RxJS for HTTP communication
* ControlValueAccessor for reusable form controls

---

# Important Architecture Principles

## Backend / Frontend boundary

Backend entities are never exposed directly to the frontend.

Public DTOs define the application contract.

Database entities may use different internal names, but frontend models must consume the stable public API contract.

Mapping between database entities and public DTOs is mandatory.

Current public image field:

`imageUrl`

Never expose Prisma entities directly.

---

# Data Loading Strategy

Cardback must not load entire collections or catalogue datasets into the frontend unnecessarily.

Large datasets must use server-side:

* Pagination
* Sorting
* Filtering
* Search

The frontend sends query parameters to the backend and renders the returned page.

This principle is especially important for user collections, which may grow substantially.

---

# Domain Model

The catalogue domain is intentionally separated into distinct concepts.

```text
Franchise
   │
   ├── Line
   │     │
   │     └── Figure
   │           │
   │           └── Variant
   │                 │
   │                 └── Product Release
   │
   └── Character
         │
         └── Figure
```

This is a domain relationship model, not necessarily the exact visual hierarchy used by the frontend.

## Character

Represents the character as a lore / fictional entity.

Examples:

* Luke Skywalker
* Darth Vader
* Han Solo

Character information may include:

* name
* species
* homeworld
* affiliation
* description
* image
* franchise

A Character may appear in multiple Figures across different Lines.

---

## Figure

Represents a specific representation of a Character within a Line.

A Figure is therefore not simply another name for a Character.

Example:

```text
Character:
Darth Vader

Figure:
Darth Vader — The Power of the Force / Kenner
```

Figure-specific information may include:

* name
* code
* description
* image
* character
* line
* variants

Character information can be surfaced as contextual information on a Figure detail page, while maintaining Character as a separate domain entity.

---

## Variant

Variant has its own cataloguing identity.

It is not merely a visual difference inside a Figure.

A Variant may have:

* its own name
* its own image
* description of what differentiates it
* associated Figure / Product Releases
* regional information where relevant
* packaging information where relevant
* accessories where relevant
* first or unique appearance information
* photographs

Example:

```text
Figure:
Darth Vader — POTF / Kenner / 1997

Variants:
├── Darth Vader POTF Kenner 1997 — Long Saber
├── Darth Vader POTF Kenner 1997 — Short Saber
├── Darth Vader POTF Kenner 1997 — Walmart Exclusive
└── Darth Vader POTF Kenner 1997 — Fan Club Promotion Exclusive
```

The examples above are conceptual examples only.

Variant is therefore a first-class catalog entity and requires its own dedicated detail contract.

---

## Product Release

Product Release represents a concrete commercial product release.

It is not the universal root of the domain.

Example conceptual hierarchy:

```text
Figure
   └── Variant
         └── Product Release
```

Product Release may contain:

* name
* packaging type
* region
* language
* retailer
* release date
* barcode
* notes
* image
* associated Variant

Product Release has its own detail page.

The Product Release detail page represents the concrete commercial product and does not need to absorb the complete Variant detail model.

---

# Detail Architecture

## Status

Conceptually defined.

Technical implementation:

Not Started.

The Detail feature must be designed around the domain rather than around existing feature-specific frontend models.

The transversal detail experience should support:

* Franchise
* Manufacturer
* Line
* Character
* Figure
* Variant
* Product Release

The frontend must not blindly reuse Collection or Databank models for Detail.

---

## Detail API Contract Strategy

Do not create one universal, oversized `DetailResponseDto`.

Each domain entity should have a dedicated detail response contract.

Planned contracts:

```text
FranchiseDetailResponseDto
ManufacturerDetailResponseDto
LineDetailResponseDto
CharacterDetailResponseDto
FigureDetailResponseDto
VariantDetailResponseDto
ProductReleaseDetailResponseDto
```

Small summary/reference DTOs may be introduced where useful to prevent unnecessary recursive payloads.

The exact DTO structure will be designed from the collector-facing experience first and then mapped from Prisma entities.

---

# Detail Navigation Concept

The Detail pages form a navigable catalogue hierarchy.

```text
Global Search ────────┐
Databank ─────────────┤
Collection ───────────┼──→ Detail
                       │
other future flows ───┘
```

The same detail system should therefore become the common destination for catalogue entities discovered through different application features.

---

# Franchise Detail

Franchise Detail is intended to act as an entry point into the catalogue.

Example:

```text
Star Wars
```

The page should provide:

* Identifying franchise/logo image
* Descriptive introduction
* Franchise origin / history
* Historical context related to action figures
* Available Lines

Lines should be visually represented and clickable.

Example conceptual navigation:

```text
Star Wars
   │
   ├── Kenner 77
   ├── Power of the Force
   ├── Power of the Force 2
   ├── Power of the Jedi
   └── ...
```

Selecting a Line leads to its Detail page.

The Franchise page is therefore a gateway deeper into the catalogue rather than an exhaustive dump of all descendant data.

---

# Line Detail

Line Detail should provide:

* Line logo where available
* Text fallback when no logo exists
* Representative image showing the Line as a collection rather than a single product
* Manufacturer
* Start / commercialisation year
* End year where applicable
* Indicator when the Line is still active / available
* Total number of products associated with the Line
* All Figures belonging to the Line

Figures should not be represented as plain text links.

Each Figure should have an identifying image so collectors can visually recognise the figure without having to rely solely on its name.

The intended experience is closer to a catalogue card than to a conventional text list.

---

# Character Detail

Character Detail should provide:

* Character name
* Representative image / visual identity
* Lore history
* First appearance in the fictional universe
* First appearance as an action figure / first Product Release
* Lines in which the Character appears
* All Figure appearances across those Lines
* Variant information where relevant
* Product Release galleries

The Character page should distinguish between:

1. First appearance in lore
2. First incarnation as an action figure
3. Appearances across Lines
4. Variants and their appearances
5. Photographic catalogue history

The presentation should prioritise collector usefulness rather than merely exposing database fields.

---

# Variant Detail

Variant is a first-class catalogue entity.

The Variant detail page should be capable of explaining why the Variant matters to a collector.

Potential information includes:

* Variant name
* Dedicated image
* Description of the distinguishing characteristics
* Associated Figure
* Product Releases in which it appears
* Regions where relevant as historical distribution information
* Packaging information
* Accessories
* First appearance or unique appearance
* Photographs

Regional information should not become the primary focus of Variant Detail.

For collectible purposes, the more useful questions are generally:

* What makes this Variant special?
* How can I identify it?
* Where did it appear?
* Which Product Releases contain it?
* How can I recognise or acquire it today?

---

# Product Release Detail

Product Release has its own dedicated detail page.

It represents the concrete commercial product rather than the Variant itself.

The page should focus on the product-specific information previously defined for the catalogue, including:

* Product Release identity
* Packaging
* Region
* Language
* Retailer
* Release date
* Barcode
* Notes
* Product image
* Associated Variant
* Parent Figure
* Character / Line / Franchise context where useful

The Product Release page should not duplicate the complete Variant detail unnecessarily.

---

# Detail Data Loading

Detail pages should also avoid unnecessary over-fetching.

The API contract should provide enough information to render the page and its immediately useful navigation, while related collections should be paginated where their size can become significant.

The frontend should not receive an uncontrolled recursive representation of the complete catalogue graph.

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
```

---

# UX Backlog

## Login

The current login UX needs improvement.

Planned improvements:

* Clear error messages for invalid credentials
* "Forgot password?" flow
* Review of the complete login experience
* General UX refinement of authentication

Priority:

After the transversal Detail page if it fits naturally into the development plan; otherwise later.

---

# Current Development Priorities

1. Finish and verify Global Search clearing behaviour
2. Implement Global Search result navigation
3. Define and implement the reusable Detail URL pattern
4. Design Detail response contracts
5. Implement transversal Detail architecture
6. Connect Global Search → Detail
7. Connect Databank → Detail
8. Connect Collection → Detail
9. Continue Collection actions
10. Address Login UX improvements

The Detail DTO design should begin with:

```text
FranchiseDetailResponseDto
```

and establish reusable summary/reference DTO patterns from there.

The implementation should then proceed conceptually down the catalogue:

```text
Franchise
   ↓
Line
   ↓
Figure
   ↓
Variant
   ↓
Product Release
```

with Character treated as a parallel domain entity connected to Figures.
