# Cardback — AI Context

**Last updated:** 2026-10-29  
**Repository/folder:** `FigureArchive`  
**Current phase:** Angular MVP feature development; catalogue detail and Global Search verified; User Administration implemented through initial list/search UI; next step is to validate user mutations and choose the next feature/refinement priority.

## Project Overview

Cardback is a collector-first platform for action-figure collectors, initially focused on Star Wars figures from the 1970s to current releases. The goal is a free, community-driven, Discogs-like catalogue and collection app with collector-oriented UX.

Core principles:

- Collector-first, UX-first, mobile-first.
- Catalogue records are separate from user-owned collection records.
- No marketplace as a core MVP feature.
- No spending until the product is close to the intended vision and ready for the collector community.
- Avoid unnecessary abstractions and overengineering.
- Do not expose raw Prisma entities from public API endpoints.
- The Angular repository is canonical. React / AI Studio prototypes are for experimentation and UX reference, not automatic architectural authority.
- Prototype/test records and generated image URLs are not canonical catalogue data.

## Technology Stack

### Backend

- NestJS, Prisma ORM 6.19.3, PostgreSQL on Neon.
- JWT access/refresh-token authentication.
- DTO-based public API contracts, validation, role checks, soft delete.
- Server-side pagination, search, filtering and sorting where implemented.

### Frontend

- Angular 22, standalone components, feature-first structure.
- Signals for business-page state; RxJS for asynchronous flows and HttpClient communication.
- Shared `cb-input` uses `ControlValueAccessor` and has an Enter output.
- Authenticated Shell and route guard; login route is outside the Shell.
- Light/dark theme support.

## Domain Model and Canonical Hierarchy

Core catalogue entities:

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release

User-owned entities include Owned Figure and Wishlist Entry.

Domain distinctions:

- **Character:** fictional identity.
- **Figure:** physical representation of a Character within a Line.
- **Variant:** a distinct physical variation of a Figure.
- **Product Release:** a concrete commercial release, packaging, region, language, retailer, barcode, and related release-specific attributes.
- **Owned Figure:** a user's collection entry referencing a Product Release.
- **Wishlist Entry:** a user's watchlist entry for a Product Release; it is separate from ownership.

Canonical catalogue hierarchy:

```text
Franchise
   └── Line
        └── Figure
             └── Variant
                  └── Product Release

Franchise
   └── Character
        └── Figure
```

This is a domain relationship model, not a requirement for each Detail endpoint to load all descendants.
Vehicles/accessories may be considered later as a separate category; they are not Characters. Packaging does not define the canonical Figure.

## Detail Architecture — Decisions to Preserve

- Use dedicated Detail response contracts instead of one oversized universal Detail DTO.
- Use small summary/reference DTOs where appropriate.
- Explicitly map public responses; do not return raw Prisma entities.
- Filter soft-deleted/inactive records and related records appropriately.
- Avoid recursive descendant loading and unnecessary overfetching.
- Do not reshape Prisma domain entities merely to satisfy a frontend presentation.
- **Figure Detail is settled:** Figure + Character summary + Line summary + Variants. Product Releases belong to Variant Detail, not Figure Detail.
- Do not reopen the Figure → Variant → Product Release boundary without a concrete product/architecture reason.

## Current Implementation State

### Backend — Core

- CRUD for Manufacturer, Franchise, Line, Character, Figure, Variant, Product Release, Collector/User and Owned Figure is present.
- Auth module includes bcrypt, access/refresh tokens and rotation, JWT strategy/guards, public-route metadata and role guards.
- Catalogue pagination/search and the Databank Product Release endpoint are implemented.
- Owned Figure operations derive user identity from JWT; no user ID should be trusted from client DTOs. Owner-only access and explicit public DTO mapping were implemented.
- Global Search endpoint is implemented with public DTO mapping. Supported result types: `franchise`, `manufacturer`, `line`, `character`, `figure`, `variant`, `productRelease`.
- Wishlist and password-reset backend flows are present.

### Frontend — Core

- Databank MVP is complete: Product Release list, server-side pagination/search, loading/error/empty states.
- Collection MVP is complete: `/owned-figures`, server-side pagination/search/sort/filters, loading/error/empty states.
- Shared `FigureCard` is used by Collection/Databank where appropriate.
- Global Search page and result cards are implemented at `/search?q=<query>`, including clearing the query and query-parameter-driven search.
- Dashboard, wishlist, barcode lookup/scanning fallback, and AI image-identification suggestions are implemented in the current branch.
- AI identification is a suggestion workflow; it must not create catalogue records automatically.
- Registration, session refresh, password change and password-reset flow are implemented. Actual email delivery requires Resend configuration and a public application URL.

## Detail Pages and Verification State

Treat implementation existence and runtime verification as separate statuses.

| Detail | Backend / response | Frontend / runtime verification |
|---|---|---|
| Franchise | Dedicated response DTO and explicit mapping; real ID returned `200`, unknown/inactive ID `404` | Verified in prior session; Franchise → Line and Global Search destination work |
| Line | Dedicated detail response, Manufacturer/Franchise summaries, active Figure summaries; real ID returned `200`, unknown ID `404` | Verified in prior session; direct route and Global Search destination work |
| Figure | Detail response uses Figure + Character summary + Line summary + Variants; Product Releases excluded by design | Real detail loads; invalid ID is handled as not found; Figure → Character, Line and Variant links work; Global Search destination verified |
| Variant | Backend real ID returned `200`, nonexistent ID `404` | Standard Variant loads and lists its Product Release(s); invalid ID handled; navigation from Product Release → Variant and the Global Search destination verified |
| Product Release | Public `GET /product-releases/:id` contract and dedicated frontend model/service are aligned | The Mandalorian Retro detail loads release metadata and related links; already-owned state is correct; Product Release → Variant and Global Search destination verified; invalid ID handled |
| Manufacturer | Detail endpoint loads manufacturer metadata and related Line summaries; public DTO audit remains a broader ongoing task | Hasbro shows its three associated Lines; Manufacturer → Line works; invalid ID displays `Manufacturer not found`; console was clean; Global Search destination verified |
| Character | Detail endpoint loads Character data and associated Figures | Luke Skywalker displays associated Figures; Character → Figure works; invalid ID displays `Character not found` with clean console; Global Search destination verified |

Global Search destination map:

```ts
franchise: 'franchises'
manufacturer: 'manufacturers'
line: 'lines'
character: 'characters'
figure: 'figures'
variant: 'variants'
productRelease: 'product-releases'
```

**All seven Global Search destination types have now been manually exercised and confirmed functional:** Franchise, Manufacturer, Line, Character, Figure, Variant and Product Release. Cross-detail navigation was also checked for Manufacturer → Line, Character → Figure, Figure → Character/Line/Variant, and Product Release → Variant. Variant Detail also visibly lists its associated Product Release.

## Detail Contract Reference Notes

These shapes summarize the recorded contracts/decisions. Check the current code before changing field names or assuming an unverified recent edit is present.

### Franchise Detail

`FranchiseDetailResponseDto` has `id`, `name`, `owner`, `firstAppearance`, `description`, `logo`, and `lines: LineSummaryDto[]`.

`LineSummaryDto` has `id`, `name`, `startYear`, `endYear`, `scale`, and `logo`. `FranchisesService.findDetail(id)` returns active Franchise data, active Lines ordered by name, explicit mappings, and `404 Not Found` for unknown/inactive IDs.

### Line Detail

`LineDetailResponseDto` has Line identity/metadata (`id`, `name`, `startYear`, `endYear`, `scale`, `logo`, `description`), Manufacturer and Franchise summaries, and Figure summaries. Figure summaries contain `id`, `name`, `code`, `imageUrl`, `characterId`, and `characterName`. The service filters inactive Line/Figures/Characters and explicitly maps the result. The previously recorded smoke test `GET /lines/cms8tgdcb000lukxkqhys2t04` returned `200 OK`.

### Figure Detail

The agreed response includes Figure fields (`id`, `name`, `code`, `description`, `imageUrl`), a Character summary (`id`, `name`, `image`), a Line summary (including `id`, `name`, `scale`, `logo`, and concise Manufacturer/Franchise context), and active Variants (`id`, `name`, `description`, `imageUrl`). **Do not include `productReleases` under each Variant in the canonical Figure Detail response.** Those releases belong under Variant Detail.

### Product Release Detail

The current frontend `ProductReleaseDetailModel` reflects the backend response shape:

```ts
export interface ProductReleaseDetailModel {
  id: string;
  name: string;
  barcode: string | null;
  releaseYear: number | null;
  releaseDate: string | null;
  packagingType: string | null;
  region: string | null;
  language: string | null;
  retailer: string | null;
  notes: string | null;
  imageUrl: string | null;
  variant: {
    id: string;
    name: string | null;
    figure: {
      id: string;
      name: string;
      code: string | null;
      imageUrl: string | null;
      character: { id: string; name: string; image: string | null };
      line: { id: string; name: string; manufacturer: { id: string; name: string } };
    };
  };
}
```

The service now calls `GET ${environment.apiUrl}/product-releases/${id}` directly with HttpClient, not through `DatabankService`. The user confirmed the model/service/TS-page changes compile and backend compilation was successful. The page was manually checked in the browser. The Manufacturer reference is displayed; navigation to Variant Detail was exercised and works. The already-in-collection state was also confirmed.

### Manufacturer Detail

Manual runtime verification is complete for the current development environment. The Hasbro detail displayed its metadata and three associated Lines (Retro Collection, The Power of the Force II and The Vintage Collection); opening a Line navigated to Line Detail. An invalid Manufacturer ID displayed `Manufacturer not found` and the browser console was clean. Keep the wider public API DTO audit open separately; do not rework this feature without evidence of a contract issue.

## Database Recovery — Current Development Environment

The previous Neon account/project had exceeded its quota. The user created a **new Neon project** and does not need to preserve the old database contents. AI Studio/React test records in the former database are not canonical and need not be migrated.

Confirmed during setup:

- `npx.cmd prisma validate` succeeded: schema valid.
- `prisma migrate deploy` initially failed with `P3005` because the new database was not empty.
- `npx.cmd prisma migrate reset --skip-seed` then completed successfully and applied all six migrations:
  - `20260721065003_init`
  - `20260721081713_auth_user_fields`
  - `20260721154835_refresh_token_hash`
  - `20260723122558_owned_figure_quantity`
  - `20260925120000_password_reset_tokens`
  - `20260925123000_wishlist_entries`
- The Prisma client was regenerated as part of reset.
- `prisma.config.ts` is configured to use `DIRECT_URL` for migrations; the Prisma schema/client uses `DATABASE_URL` for runtime access. The intended pattern is pooled `DATABASE_URL` for application runtime and direct `DIRECT_URL` for migration operations.
- `npm` / `npx` PowerShell aliases may be blocked by ExecutionPolicy; use `npm.cmd` / `npx.cmd` in PowerShell.

### Golden Seed Dataset

The seed scripts were adjusted for the fresh development database:

- Resolve duplicated names using the full catalogue context (`figureName` + `lineName`) when creating Variants.
- Resolve Product Release Variants using `variantName` plus the associated Figure and Line, rather than `variantName` alone (names such as `Standard` repeat).
- Reactivate seeded catalogue entities with `deletedAt: null` on upsert updates.
- Make seeded Owned Figure handling repeatable for the same user/Product Release instead of blindly inserting duplicates.
- Correct demo Owned Figure values to match UI/domain options: positive quantity, completeness `Unknown` where appropriate, and `Loose` as packaging state.

The supplied Golden Dataset includes 5 manufacturers, 1 franchise, 10 lines, 8 characters, 14 figures, 14 variants, 12 product releases, 4 demo users, and 7 demo Owned Figure records. The user reported the database/seed setup complete. Subsequent authenticated frontend checks displayed seeded catalogue and collection data, and the user confirmed the backend responds to queries both with IDs and without IDs. The exact seed command output and a second-run idempotency test were not recorded. Do not run a destructive reset just to verify it.

Demo users/passwords are local development seed credentials only; do not reuse them outside the local test environment.

### Secrets and Environment Safety

Real Neon credentials and JWT secrets were pasted into the conversation during troubleshooting. Rotation was recommended, but completion has not been confirmed. **Before relying on this environment, confirm that the Neon password and both JWT secrets have been rotated** and update the local `.env`. Do not paste credentials into chat or commit `.env`.

Expected `.env` shape (placeholders only):

```dotenv
DATABASE_URL="<pooled Neon connection string>"
DIRECT_URL="<direct Neon connection string>"
JWT_SECRET="<new random secret>"
JWT_REFRESH_SECRET="<different new random secret>"
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:4200
```

## User Administration and Security — 2026-10-29

### Agreed access rules

- There is intended to be only one administrator account. Other accounts have the `USER` role.
- User creation through administration must always create a `USER`; role is not a client-editable field.
- Editing a user profile must not modify the user's role or password.
- The administrator account must not be archivable through normal user-management routes.
- Collection records remain owner-protected by the backend; user administration must not weaken ownership checks.
- Seed reruns must not silently change the role of an existing account. Review the Users upsert in `prisma/seed.ts` and ensure `role` is not in its `update` data.
- Never rely on frontend hiding/disabling alone for authorization; enforce these rules in the backend and database where appropriate.

### Database enforcement

A migration named `20261029092143_enforce_single_admin` was successfully applied to the current Neon database. It adds a PostgreSQL partial unique index on `User.role` for rows where `role = 'ADMIN'`, enforcing at most one ADMIN row at the database level. The migration command reported the database in sync. A subsequent Prisma Client generation completed successfully with Prisma 6.19.3.

During `migrate dev`, Prisma reported an `EPERM` rename error for a temporary Windows query-engine DLL after reporting the migration as applied. The user then ran `npx prisma generate` successfully. Do not treat the earlier transient rename error as an unresolved migration failure.

### Angular User Administration — initial implementation

Files introduced for the feature:

- `features/admin/models/user-admin.model.ts`
- `features/admin/services/user-admin.service.ts`
- `features/admin/pages/users-admin/users-admin.ts`
- `features/admin/pages/users-admin/users-admin.html`
- `features/admin/pages/users-admin/users-admin.scss`

The route is `/admin/users`, guarded by `adminGuard`, and the NavigationService item is role-gated to `ADMIN`. The page includes user listing, client-side search, summary counts, create/edit form UI, role indication, and an archive confirmation flow.

**Verified by the user on 2026-10-29:** backend compiles; frontend compiles; the page displays users and search works. Creation, profile update, and archive operations have not yet been explicitly reported as runtime-tested. Do not mark those mutation flows as verified until tested.

### API contract assumptions to validate

The frontend service currently assumes `GET /users` returns `UserAdmin[]`, `POST /users` creates a user, `PUT /users/:id` updates profile fields, and `DELETE /users/:id` archives the user. Before treating the full feature as complete, verify these shapes and the create/update/archive responses against the actual controller and DTOs. The frontend model is not a substitute for checking the backend contract.

## Login UX Backlog

After current Detail navigation/database integration checks:

- Clear, specific feedback for incorrect credentials.
- Review/finish the “Forgot password?” user flow and email delivery integration.
- Review and refine the overall login UX.

## Recommended Next Actions

1. Finish validating User Administration against the actual Users controller/DTO contracts. Manually test create, profile update, archive, duplicate username/email handling, and the prohibition on archiving the administrator.
2. Review the Users upsert in `prisma/seed.ts`: ensure rerunning the seed does not update the role of an existing user. Do not assume this has been changed unless confirmed in the current file.
3. Decide the next product priority after User Administration validation. Existing candidates include the public API DTO audit and Login UX improvements; do not begin a broad refactor without choosing a specific scope.
4. Verify Resend email delivery and public-URL configuration when those values are configured for the intended environment.
5. Confirm Neon password and both JWT secrets were rotated after they were exposed during troubleshooting; keep `.env` local and out of version control.
6. Keep application-wide localization as a later task unless priorities change.

The Detail verification round is complete. Do not repeat the same manual Detail/Global Search checks unless a code change introduces a regression or a specific issue appears.
## Collaboration Rules

- Provide complete changed files for copy/paste when code changes are requested.
- Return only the files requested.
- Preserve working code and established conventions; never invent files, APIs or codebase assumptions.
- Do not use Replace All for model/API field changes without checking every boundary.
- Do not introduce abstractions without concrete reuse.
- Prefer Signals for business-page state and RxJS/HttpClient for communication, consistent with existing features.
- Keep `AI-context.md`, `HISTORY.md`, and `project-status.md` separate.
- `HISTORY.md` is append-only: add the newest session at the top and preserve all prior sessions.
- When pausing a session, update all three status documents separately.
- Do not repeat completed DTO reviews unless a concrete implementation issue requires it.
- Never claim a build, test, runtime verification or database operation succeeded unless the user/tool output actually confirms it.
