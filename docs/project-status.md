# Cardback — Project Status

**Last updated:** 2026-10-14  
**Repository:** `FigureArchive`  
**Current phase:** Angular MVP consolidation, detail navigation verification, new Neon development database.

## Overall Status

Cardback has the main catalogue and collector journeys implemented in Angular: account flows, Databank, Collection, Global Search, a set of Detail destinations, wishlist, dashboard, barcode lookup and AI-assisted image suggestions. This is feature implementation progress, not a release-readiness sign-off.

The previous Neon project hit its quota. A new Neon project has been created; Prisma schema validation succeeded and all six current migrations were successfully applied with `prisma migrate reset --skip-seed`. Seed scripts were corrected for reliable entity association. The user reported the database/seed task done, but the seed command output was not shared in the conversation. Confirm functionality with a non-destructive smoke test rather than resetting the database again.

## Feature Status

| Area | Status | Notes |
|---|---|---|
| Backend infrastructure | Implemented | NestJS, Prisma, PostgreSQL/Neon, validation, auth and DTO approach |
| New Neon schema | Migrations applied | Six migrations applied by reset; Prisma Client regenerated |
| Golden seed dataset | Updated; runtime smoke test pending | Association lookup and repeatability fixes made; user indicated setup was done, command output not recorded here |
| Authentication | Implemented; integration/configuration checks remain | Registration, login, refresh, password change/reset; Resend/public URL needed for email delivery |
| Databank | MVP complete | Product Release listing, pagination/search, loading/error/empty states |
| Collection | MVP complete | Server-side pagination, search, sort and filters |
| Global Search backend | Implemented | Search endpoint and mapped public DTO |
| Global Search frontend | Implemented | Page, service, result cards, query parameters and query clearing |
| Global Search navigation | Partially verified | All seven result routes are mapped; Franchise and Line are the recorded verified branches |
| Franchise Detail | Complete and verified | Backend real ID `200`, unknown/inactive ID `404`; frontend and Line navigation verified |
| Line Detail | Complete and verified | Backend active filtering/mapping; backend real ID `200`, unknown ID `404`; frontend verified |
| Figure Detail | Complete and verified | Canonical response is Figure + Character summary + Line summary + Variants; excludes Product Releases |
| Variant Detail | Complete and verified | Backend real ID `200`, nonexistent ID `404`; frontend manually tested by user |
| Product Release Detail | Implemented; latest HTML check pending | Dedicated model/service; model/service/TS changes compiled per user; ownership state tested; latest Manufacturer link needs UI check |
| Manufacturer Detail | Implemented; contract/runtime verification pending | Current branch has page/service/model; exact recent DTO/controller/service alignment not confirmed applied and verified |
| Character Detail | Implemented; runtime verification pending | Destination exists; record API and UI outcomes after manual testing |
| Wishlist | Implemented | Per-user Product Release watchlist, separate from owned collection |
| Dashboard | Implemented | Collection aggregates and recently added items |
| Barcode lookup/scanning | Implemented | Browser scanner when supported, image/manual fallback, catalogue lookup |
| AI identification | Implemented; key/config needed | Gemini-style suggestions only; does not write catalogue records |
| Public API DTO boundary | Ongoing audit | Never expose raw Prisma records; Owned Figure responses explicitly mapped |
| Localization | Pending | Application-wide language system not complete |

## Database and Environment

- A new Neon project is the current development target; old prototype/demo data does not need to be preserved.
- `npx.cmd prisma validate` succeeded.
- A normal `migrate deploy` first failed with `P3005` because the database schema was not empty. Then `npx.cmd prisma migrate reset --skip-seed` succeeded and applied all six migrations.
- Migrations use `DIRECT_URL` in `prisma.config.ts`; the runtime Prisma client uses `DATABASE_URL`.
- Use `npm.cmd` / `npx.cmd` in PowerShell where ExecutionPolicy blocks aliases.
- Golden seed logic now resolves duplicate names using Figure + Line context, updates seeded soft-delete state, and handles seeded Owned Figure records repeatably. Demo collection values were aligned with UI options.
- Next step: verify login and catalogue/collection data against the new database without another destructive reset.
- **Security follow-up:** rotate the Neon password and both JWT secrets previously exposed in chat, unless already done. Keep `.env` local and never paste secrets into chat.

## Detail Architecture — Canonical Decision

No universal oversized Detail DTO. Each detail endpoint uses a dedicated response contract, small summaries/references, explicit mapping and active-record filtering. Avoid recursive descendant fetching.

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

**Figure Detail is settled:** it exposes Figure information, Character summary, Line summary and Variants. Product Releases belong in Variant Detail. The richer nested Product Release implementation recorded as WIP on 2026-09-25 is no longer the canonical Figure Detail contract; do not restore it without an explicit architecture review.

## Detail Verification Notes

### Franchise

Backend dedicated detail response, active Franchise/Line filtering, alphabetical Lines and explicit mapping. Real ID and unknown/inactive ID behavior were verified. Frontend page/model/service/route and Franchise → Line navigation verified.

### Line

Backend response includes Line metadata, Manufacturer/Franchise summaries and active Figure summaries. Real ID returned `200`; unknown Line returned `404`. Frontend direct route and display verified.

### Figure

Backend/frontend detail implemented and verified. Product Releases are excluded from the canonical Figure response. Variant navigation is the next level.

### Variant

Backend verified with a real identifier (`200`) and a nonexistent identifier (`404`). User manually tested the frontend cases. Variant Detail is the destination for associated Product Releases.

### Product Release

The backend `GET /product-releases/:id` response contract was checked previously. The dedicated frontend model matches the public response and the service now calls HttpClient directly rather than depending on `DatabankService`. The user confirmed that the model, service and TS-page changes compile; backend compilation was also reported successful. The already-in-collection state was manually observed for a test release: the page stated it was already in the collection and hid the add-to-collection/wishlist actions. The latest HTML navigation addition (including Manufacturer) still needs a manual UI check.

### Manufacturer

The destination exists, but don't call it verified yet. During the current session the backend `findOne` response and Angular page/model/service were reviewed. A dedicated response DTO and explicit backend mapping/controller wiring were proposed, but there is no confirmation in the recorded session that those exact changes were applied and built. Inspect the actual working tree before modifying it further.

### Character and Global Search routes

Character Detail and navigation destinations for all seven Global Search result types exist in the current branch; runtime verification still needs to be recorded for destinations other than the explicitly verified Franchise and Line paths.

## Next Actions

1. Smoke-test the new Neon database using a seed account; confirm sign-in, Databank results and Collection data.
2. Review the actual Manufacturer Detail files and determine whether the proposed dedicated DTO/service/controller mapping is already present. If it is, build and test a real ID plus an invalid ID; if not, continue from the existing conventions.
3. Manually test the latest Product Release Detail HTML navigation and its ownership/wishlist/add-collection states.
4. Verify Global Search → Manufacturer, Character, Figure, Variant and Product Release; record each destination's result.
5. Continue the public DTO audit.
6. Improve Login UX: incorrect-credential feedback, forgotten-password flow and general login polish. Keep this after current Detail checks unless priorities change.
7. Localization remains a later, application-wide task.

## Collaboration Rules

- Return the complete files requested, separately, for copy/paste.
- Preserve working code and existing naming/conventions; do not invent repository details.
- Avoid premature abstraction and blind refactors.
- Keep `AI-context.md`, `HISTORY.md`, and `project-status.md` as three separate files.
- `HISTORY.md` is append-only; never delete prior sessions.
- Update all three documents at session end.
