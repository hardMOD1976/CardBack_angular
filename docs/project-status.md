# Cardback — Project Status

**Last updated:** 2026-10-15  
**Repository:** `FigureArchive`  
**Current phase:** Angular MVP consolidation; Detail and all Global Search destinations manually verified; next focus is public API DTO audit and Login UX.

## Overall Status

Cardback has the main catalogue and collector journeys implemented in Angular: account flows, Databank, Collection, Global Search, all seven Detail destinations, wishlist, dashboard, barcode lookup and AI-assisted image suggestions. During the 2026-10-14/15 manual verification session, every Global Search destination and the tested cross-detail links worked. The invalid-ID states tested during that session were handled as not found; Manufacturer and Character not-found cases showed a clean browser console.

This is feature implementation progress, not a release-readiness sign-off. The previous Neon project hit its quota. A new Neon project has been created and all six current migrations were successfully applied with `prisma migrate reset --skip-seed`. The user reported the database/seed setup done; seeded catalogue and collection data are now being returned in runtime UI/API checks. The exact seed command output and a second-run idempotency test were not recorded. Do not reset the database merely for verification.

## Feature Status

| Area | Status | Notes |
|---|---|---|
| Backend infrastructure | Implemented | NestJS, Prisma, PostgreSQL/Neon, validation, auth and DTO approach |
| New Neon schema | Migrations applied | Six migrations applied; Prisma Client regenerated |
| Golden seed dataset | Runtime data confirmed; repeatability check not recorded | Seeded catalogue/collection data appears in authenticated UI/API; seed command output and a second run were not recorded |
| Authentication | Implemented; configuration checks remain | Authenticated session is in use; password-reset email requires Resend and public URL configuration |
| Databank | MVP complete | Product Release listing, pagination/search and loading/error/empty states |
| Collection | MVP complete | Server-side pagination, search, sort and filters; ownership state confirmed for a Product Release |
| Global Search backend | Implemented | Search endpoint and mapped public result DTO |
| Global Search frontend | Complete and manually verified | Page, service, result cards, query parameter handling and query clearing |
| Global Search navigation | Complete and manually verified | All seven result types navigate to their Detail pages: Franchise, Manufacturer, Line, Character, Figure, Variant and Product Release |
| Franchise Detail | Complete and verified | Backend real ID `200`, unknown/inactive ID `404`; frontend and Line navigation verified |
| Line Detail | Complete and verified | Backend mapping/filtering; real ID `200`, unknown ID `404`; frontend display and navigation verified |
| Figure Detail | Complete and verified | Canonical response is Figure + Character summary + Line summary + Variants; invalid ID handled; links to Character, Line and Variant work |
| Manufacturer Detail | Complete and manually verified | Hasbro metadata and three Lines display; Manufacturer → Line works; invalid ID shows `Manufacturer not found` with clean console |
| Character Detail | Complete and manually verified | Character displays associated Figures; Character → Figure works; invalid ID shows `Character not found` with clean console |
| Variant Detail | Complete and verified | Variant displays associated Product Releases; navigation from Product Release works; invalid ID handled |
| Product Release Detail | Complete and verified | Release metadata and related links display; already-in-collection state works; Variant navigation and invalid-ID case verified |
| Wishlist | Implemented | Per-user Product Release watchlist, separate from owned collection |
| Dashboard | Implemented | Collection aggregates and recently added items |
| Barcode lookup/scanning | Implemented | Browser scanner when supported, image/manual fallback, catalogue lookup |
| AI identification | Implemented; key/config needed | Suggestions only; does not automatically write catalogue records |
| Public API DTO boundary | Ongoing audit | Never expose raw Prisma records; Owned Figure responses explicitly mapped |
| Localization | Pending | Application-wide language system not complete |

## Database and Environment

- A new Neon project is the current development target; old prototype/demo data does not need to be preserved.
- `npx.cmd prisma validate` succeeded.
- A normal `migrate deploy` first failed with `P3005` because the database schema was not empty. Then `npx.cmd prisma migrate reset --skip-seed` succeeded and applied all six migrations.
- Migrations use `DIRECT_URL` in `prisma.config.ts`; the runtime Prisma client uses `DATABASE_URL`.
- Use `npm.cmd` / `npx.cmd` in PowerShell where ExecutionPolicy blocks aliases.
- Golden seed logic now resolves duplicate names using Figure + Line context, updates seeded soft-delete state, and handles seeded Owned Figure records repeatably. Demo collection values were aligned with UI options.
- Runtime API/UI checks now confirm that the seeded catalogue and collection data are available. Continue development without another destructive reset; seed idempotency was not re-tested in this verification round.
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

### Franchise and Line

Both Detail pages were already verified in previous sessions. Franchise Detail displays active Lines and links to Line Detail. Line Detail displays related Manufacturer/Franchise context and Figure summaries. Their API real-ID and not-found behavior is recorded in the earlier verification notes above and in `HISTORY.md`.

### Figure

The current canonical response contains Figure fields, Character summary, Line summary, and Variants. Product Releases are excluded. The user confirmed an invalid ID is handled as not found and verified Figure → Character, Figure → Line and Figure → Variant navigation.

### Manufacturer

Hasbro Detail displayed its metadata and three Lines: Retro Collection, The Power of the Force II and The Vintage Collection. Selecting a Line navigates to Line Detail. An invalid ID displays `Manufacturer not found`, with no console errors reported.

### Character

Luke Skywalker Detail displays associated Figures. Selecting a Figure navigates to Figure Detail. An invalid ID displays `Character not found`, with no console errors reported.

### Variant

The `Standard` Variant displays the related `The Mandalorian Retro` Product Release. Navigation from Product Release Detail to Variant Detail works, and the invalid-ID case was reported as working.

### Product Release

`The Mandalorian Retro` Detail displays release metadata and links to Variant, Figure, Line, Character and Manufacturer. The page correctly identifies that this release is already in the user's collection. The Variant link opens Variant Detail, which displays its associated Product Release. The invalid-ID case was reported as working.

### Global Search and Cross-Detail Navigation

All seven Global Search result types have been opened and confirmed working: Franchise, Manufacturer, Line, Character, Figure, Variant and Product Release. Confirmed cross-detail navigation includes Manufacturer → Line, Character → Figure, Figure → Character/Line/Variant, and Product Release → Variant; Variant Detail lists associated Product Releases.

### Architecture

Do not create a universal oversized Detail DTO. Use dedicated response contracts, summary/reference DTOs, explicit mapping, active-record filtering, and no uncontrolled recursive loading. Figure Detail intentionally excludes Product Releases; those belong to Variant Detail.

## Next Actions

1. Continue the public API DTO audit. Inspect current controller/service responses and ensure public endpoints explicitly map contracts rather than returning raw Prisma entities. Track completed reviews and do not repeat them without a concrete issue.
2. Improve Login UX: clear incorrect-credential feedback, review/finish the "Forgot password?" flow, and refine the overall login experience.
3. Verify Resend email delivery and public-URL configuration when available for the intended environment.
4. Confirm the Neon password and both JWT secrets were rotated after being exposed during troubleshooting; keep `.env` local and out of version control.
5. Keep application-wide localization as a later task unless priorities change.

The current Detail and Global Search manual verification round is complete. Do not repeat these checks unless code changes introduce a regression or a specific issue appears.
## Collaboration Rules

- Return the complete files requested, separately, for copy/paste.
- Preserve working code and existing naming/conventions; do not invent repository details.
- Avoid premature abstraction and blind refactors.
- Keep `AI-context.md`, `HISTORY.md`, and `project-status.md` as three separate files.
- `HISTORY.md` is append-only; never delete prior sessions.
- Update all three documents at session end.
