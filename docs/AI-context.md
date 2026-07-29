# Figure Archive (working title) / Cardback (brand candidate)

## Brand

Cardback

(Figure Archive remains the internal project name.)

---

## Goal

Build the definitive platform for action figure collectors.

The platform separates immutable catalog data from personal collection data, providing a scalable foundation for collectors, contributors and future community features.

Long-term ambition

Become the Discogs of action figure collecting.

---

## Current Phase

Frontend development

Authentication completed

First business components

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

backend/

- NestJS 11
- Prisma ORM
- PostgreSQL (Neon)

frontend/

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

Features

- CRUD
- Search
- Pagination
- Soft Delete
- JWT Authentication
- Refresh Token
- Ownership validation

---

## Frontend Progress

Completed

Foundation

- Angular workspace
- Feature-first architecture
- Shell layout
- Nested routing
- Header
- Sidebar
- Dashboard
- Shared UI
    - cb-button
    - cb-input
    - cb-card
- Design Tokens
- Theme variables

Authentication

Completed

- Login
- Logout
- TokenService
- CurrentUserService
- AuthGuard
- HTTP Interceptor
- JWT persistence
- Backend integration
- Login using username OR email

Business components

Started

- FigureCard component

Collection

Started

- CollectionService
- First authenticated endpoint (/owned-figures)

---

## Documentation

Frontend

- frontend-architecture.md
- frontend-information-architecture.md
- frontend-user-flows.md
- design-system.md
- components.md

Brand

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
- Generic Pagination
- JWT
- Refresh Tokens

---

## Database

- Golden Dataset
- Seed
- Referential integrity
- Composite constraints

---

## Current Next Step

Continue building reusable business components.

Immediate roadmap

- Finish FigureCard
- Collection page
- Header UX
- User menu
- Databank
- Figure Detail

Later

- Scanner
- AI Identification
- Notifications
- User Profile
- Marketplace