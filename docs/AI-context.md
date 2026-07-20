# Figure Archive

## Goal

Build the best action figure cataloging platform for collectors.

The platform separates immutable catalog data from personal collection data, providing a scalable foundation for collectors, contributors and future community features.

---

## Current Phase

Backend Foundation Completed

---

## Core Domain

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release
- Collector
- Owned Figure

---

## Golden Rules

- Packaging never defines a Figure.
- Variants represent physical differences.
- Product Releases represent commercial distributions.
- Collector data never modifies catalog data.
- A Figure represents the collectible itself.
- An Owned Figure represents a collector's physical copy.

---

## Current Architecture

Repository

- backend/
  - NestJS 11
  - Prisma ORM
  - PostgreSQL (Neon)

- frontend/
  - Angular (planned)

---

## Backend Progress

Completed modules:

- Manufacturer (CRUD + Soft Delete)
- Franchise (CRUD + Soft Delete)
- Line (CRUD + Soft Delete + relational validation)
- Character (CRUD + Soft Delete + relational validation)
- Figure (CRUD + Soft Delete + relational validation)
- Variant (CRUD + Soft Delete + relational validation)
- Product Release (CRUD + Soft Delete + relational validation)
- Collector (CRUD + Soft Delete)
- Owned Figure (CRUD + Soft Delete + relational validation)

Shared infrastructure:

- PrismaModule
- ValidationPipe
- Prisma Exception Filter
- Soft Delete pattern
- Relational validation
- Prisma Studio workflow

Documentation:

- Swagger integrated
- Complete REST API documentation
- Endpoint consistency reviewed

Database:

- Golden Dataset implemented
- Robust seed with upsert()
- Referential integrity verified
- Unique constraints reviewed

---

## Current Next Step

Backend foundation is complete.

Next milestone:

- Authentication (JWT)
- Authorization / Roles
- Global Search
- Collection management
- Angular frontend integration