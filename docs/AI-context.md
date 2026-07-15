# Figure Archive

## Goal

Build the best action figure cataloging platform for collectors.

The platform separates immutable catalog data from personal collection data, providing a scalable foundation for collectors, contributors and future community features.

---

## Current Phase

Backend Foundation

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
  - NestJS
  - Prisma ORM
  - PostgreSQL (Neon)

- frontend/
  - (planned) Angular

---

## Current Next Step

Connect NestJS with Prisma by creating the application's PrismaModule.

This will become the single entry point for database access throughout the backend.