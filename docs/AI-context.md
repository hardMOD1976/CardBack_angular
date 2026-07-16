# Figure Archive

## Goal

Build the best action figure cataloging platform for collectors.

The platform separates immutable catalog data from personal collection data, providing a scalable foundation for collectors, contributors and future community features.

---

## Current Phase

Backend Development

---

## Core Domain

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release
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

Current module:

- Line

Shared infrastructure:

- PrismaModule
- ValidationPipe
- Prisma Exception Filter
- Soft Delete pattern

---

## Current Next Step

Implement the Line module.

This is the first module that introduces relationships between entities:

- Manufacturer → Line
- Franchise → Line

It will become the template for the remaining relational modules.