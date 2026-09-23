# Cardback — Project Status

**Last updated:** 2026-09-23

## Overall Status

Cardback is in the frontend business-features phase.

Core infrastructure, Databank, Collection, Global Search, Franchise Detail, and Line Detail foundations are in place.

The current milestone is the implementation of catalogue Detail pages.

**Franchise Detail and Line Detail are complete and verified.**

The next Detail page is **Figure Detail**.

## Feature Status

| Area                      | Status                  | Notes                                                                     |
| ------------------------- | ----------------------- | ------------------------------------------------------------------------- |
| Backend infrastructure    | Complete                | NestJS, Prisma, PostgreSQL, auth, validation, DTO approach                |
| Authentication            | Implemented; UX backlog | Improve error feedback and password recovery                              |
| Databank                  | MVP complete            | Product Release listing, pagination, search, loading/error/empty states   |
| Collection                | MVP complete            | Server-side pagination, search, sort, and filters                         |
| Global Search backend     | Implemented             | Search endpoint and public result DTO                                     |
| Global Search frontend    | Implemented             | Page, service, result cards, query-param search, clearing fixed           |
| Search result navigation  | Partially complete      | Franchise and Line destinations now functional                            |
| Franchise Detail backend  | Complete                | Dedicated detail DTO, Line summary DTO, service mapping, 200/404 verified |
| Franchise Detail frontend | Complete                | Page, model, service, route, Line navigation verified                     |
| Line Detail backend       | Complete                | Dedicated detail contract, summaries, service mapping, 200 verified       |
| Line Detail frontend      | Complete                | Page, model, service, route verified                                      |
| Figure Detail             | Next                    | Backend contract and implementation pending                               |
| Manufacturer Detail       | Pending                 | Not started                                                               |
| Character Detail          | Pending                 | Not started                                                               |
| Variant Detail            | Pending                 | Not started                                                               |
| Product Release Detail    | Pending                 | Not started                                                               |

## Global Search

### Completed

* Global Search API integration.
* Search result model and service.
* Loading, error, empty, and result states.
* Result cards.
* Result selection event.
* Navigation map for all seven result types.
* Search clearing fix.
* Correct page binding:
  `(selected)="onResultSelected($event)`.

### Currently Functional Destinations

```text
Global Search → Franchise Detail
Global Search → Line Detail
```

The existing navigation map contains:

```ts
franchise: 'franchises'
manufacturer: 'manufacturers'
line: 'lines'
character: 'characters'
figure: 'figures'
variant: 'variants'
productRelease: 'product-releases'
```

Only implemented destination routes should be considered functional.

### Remaining

Connect additional result navigation as their Detail pages are implemented.

## Detail Navigation

Current verified flow:

```text
Global Search
     │
     ├── Franchise
     │      ↓
     │  Franchise Detail
     │      ↓
     │    Line
     │      ↓
     │  Line Detail
     │
     └── Line
            ↓
       Line Detail
```

Planned continuation:

```text
Line Detail
     ↓
Figure Detail
     ↓
Variant Detail
     ↓
Product Release Detail
```

## Franchise Detail

### Backend

Complete and verified.

Implemented:

* `FranchiseDetailResponseDto`
* `LineSummaryDto`
* `FranchisesService.findDetail(id)`
* Active Franchise filtering.
* Active Line filtering.
* Alphabetical Line ordering.
* Explicit response mapping.
* `404 Not Found` for unknown Franchise IDs.

### Frontend

Complete and verified.

Implemented:

* Franchise Detail model.
* Franchise Detail service.
* Franchise Detail page.
* `/franchises/:id` route.
* Franchise information display.
* Line summary display.
* Line navigation through `RouterLink`.

Verified flow:

```text
Franchise Detail → Line Detail
```

## Line Detail

### Backend

Complete and verified.

The Line Detail response contains:

* Line identity and metadata.
* Manufacturer summary.
* Franchise summary.
* Figure summaries.

Figure summary contains:

* id
* name
* code
* imageUrl
* characterId
* characterName

Backend behaviour:

* Active Line only.
* Active Figures only.
* Active Characters only.
* Figures ordered by name.
* Explicit response mapping.
* `404` for unknown Line.

Verified with:

```text
GET /lines/cms8tgdcb000lukxkqhys2t04
```

Result: `200 OK`.

### Frontend

Complete and verified.

Implemented:

* Line Detail model.
* Line Detail service.
* Line Detail page.
* `/lines/:id` route.
* Loading/error/not-found/empty states.
* Line metadata.
* Figure summary display.

Verified direct navigation:

```text
/lines/cms8tgdcb000lukxkqhys2t04
```

Result: Line Detail loads correctly.

## Next Milestone: Figure Detail

### Current Backend State

Figure currently has only:

* `CreateFigureDto`
* `UpdateFigureDto`

There is no Figure response DTO.

Current Figure Prisma relationships:

```text
Figure
 ├── Character
 ├── Line
 └── Variants
```

Variant:

```text
Variant
 └── Product Releases
```

### Proposed Figure Detail Contract

`FigureDetailResponseDto`:

```text
Figure
 ├── id
 ├── name
 ├── code
 ├── description
 ├── imageUrl
 │
 ├── character
 │    ├── id
 │    ├── name
 │    └── image
 │
 ├── line
 │    ├── id
 │    ├── name
 │    ├── scale
 │    └── logo
 │
 └── variants[]
      ├── id
      ├── name
      ├── description
      └── imageUrl
```

Product Releases are intentionally excluded from Figure Detail.

They will belong to Variant Detail.

### Planned Figure Backend Work

1. Create `FigureDetailResponseDto`.
2. Add `FiguresService.findDetail(id)`.
3. Update `GET /figures/:id` to return the dedicated detail contract.
4. Filter inactive Figure, Character, Line, and Variants.
5. Order Variants by name.
6. Explicitly map the response.
7. Verify `200 OK` with an existing Figure.
8. Verify `404 Not Found` with an unknown Figure ID.

### Planned Figure Frontend Work

After backend verification:

1. Create Figure Detail model.
2. Create Figure Detail service.
3. Create Figure Detail page.
4. Add `/figures/:id`.
5. Connect Line Detail → Figure Detail.
6. Verify Global Search Figure navigation.

## Detail Architecture

Do not create one universal Detail DTO.

Use:

* Dedicated Detail response contracts.
* Small summary/reference DTOs.
* Explicit response mapping.
* Active-record filtering.
* No recursive descendant loading.

Current hierarchy:

```text
Franchise
   └── Line
        └── Figure
             └── Variant
                  └── Product Release
```

Each Detail page should expose the next relevant level without overfetching deeper descendants.

## Login UX Backlog

* Clear incorrect-credentials feedback.
* Implement “Forgot password?” flow.
* Review and improve the overall login experience.

**Priority:** After the transversal Detail work, if it fits the implementation plan.

## Immediate Next Actions

1. Implement Figure Detail backend.
2. Verify Figure Detail API with real and invalid IDs.
3. Implement Figure Detail frontend.
4. Add `/figures/:id`.
5. Connect Line Detail → Figure Detail.
6. Verify Global Search Figure navigation.
7. Continue with Variant Detail.
8. Continue with Product Release Detail.

## Collaboration Rules

* Provide complete changed files for copy/paste when code changes are requested.
* Return only the files requested.
* Preserve working code and existing conventions.
* Do not invent assumptions about the codebase.
* Avoid premature abstractions.
* Keep `AI-context.md`, `HISTORY.md`, and `project-status.md` separate.
* `HISTORY.md` is append-only.
* Do not repeat already completed DTO reviews unless a concrete implementation issue requires it.
