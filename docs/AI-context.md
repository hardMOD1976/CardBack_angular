# Figure Archive (working title) / Cardback (brand candidate)

## Goal

Build the definitive platform for action figure collectors.

The platform separates immutable catalog data from personal collection data, providing a scalable foundation for collectors, contributors and future community features.

Long-term ambition:

Become the "Discogs of action figure collecting."

---

## Current Phase

Frontend architecture

Authentication foundation

---

## Core Domain

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release
- User
- Owned Figure

---

## Golden Rules

- Packaging never defines a Figure.
- Variants represent physical differences.
- Product Releases represent commercial distributions.
- User data never modifies catalog data.
- A Figure represents the collectible itself.
- An Owned Figure represents a user's physical copy.

---

## Current Architecture

Repository

- backend/
  - NestJS 11
  - Prisma ORM
  - PostgreSQL (Neon)

- frontend/
  - Angular 21
  - Standalone Components
  - Feature-first architecture

---

## Backend Progress

Completed modules

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release
- User
- Owned Figure

(All CRUD + Soft Delete + Pagination + Search)

---

## Frontend Progress

Completed

Project foundation

- Angular workspace
- Feature-first architecture
- Shell layout
- Nested routing
- Dashboard route
- Header
- Sidebar
- Shared UI components
    - cb-button
    - cb-input
    - cb-card
- Design Tokens foundation
- Global SCSS structure
- Theme variables
- Router refactored to use Shell as authenticated layout
- AppComponent simplified to RouterOutlet

Authentication

Started

- Auth feature
- Login models
- AuthService
- Login page structure
- Environment-based API URL

Documentation

- frontend-architecture.md
- frontend-information-architecture.md
- frontend-user-flows.md
- design-system.md
- components.md

Brand

Started

- brand-strategy.md
- brand-guidelines.md
- naming.md
- logo-sketches.md
- moodboard.md

---

## Shared Infrastructure

- PrismaModule
- ValidationPipe
- Prisma Exception Filter
- Soft Delete
- Relational validation
- Prisma Studio
- Generic Pagination
- Generic Paginated Response

---

## Documentation

Backend

- Swagger
- JWT documented

Frontend

- Architecture
- Navigation
- User flows
- Component architecture
- Design System

---

## Database

- Golden Dataset
- Robust Seed
- Referential integrity
- Composite constraints

---

## Authentication & Authorization

Backend completed

Frontend started

Next frontend steps

- TokenService
- Login flow
- LocalStorage
- AuthGuard
- HTTP Interceptor
- Current authenticated user

---

## Pagination

Completed

---

## Search

Completed

---

## Current Next Step

Implement the first working Login connected to the backend.

Immediate milestones

- Login page
- Token persistence
- AuthGuard
- HTTP Interceptor
- First authenticated Dashboard

After authentication

- Collection
- Databank
- Figure Detail
- Scanner
- AI Identification