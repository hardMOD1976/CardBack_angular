# Figure Archive

## Goal

Build the best action figure cataloging platform for collectors.

The platform separates immutable catalog data from personal collection data, providing a scalable foundation for collectors, contributors and future community features.

---

## Current Phase

Authentication (JWT) in progress

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
  - Angular (planned)

---

## Backend Progress

Completed modules

- Manufacturer (CRUD + Soft Delete)
- Franchise (CRUD + Soft Delete)
- Line (CRUD + Soft Delete + relational validation)
- Character (CRUD + Soft Delete + relational validation)
- Figure (CRUD + Soft Delete + relational validation)
- Variant (CRUD + Soft Delete + relational validation)
- Product Release (CRUD + Soft Delete + relational validation)
- User (CRUD + Soft Delete)
- Owned Figure (CRUD + Soft Delete + relational validation)

Shared infrastructure

- PrismaModule
- ValidationPipe
- Prisma Exception Filter
- Soft Delete pattern
- Relational validation
- Prisma Studio workflow

Documentation

- Swagger integrated
- Complete REST API documentation
- Endpoint consistency reviewed

Database

- Golden Dataset implemented
- Robust seed with upsert()
- Referential integrity verified
- Unique constraints reviewed

Authentication (implemented)

- JWT Access Token
- JWT Refresh Token
- Login endpoint
- Password hashing (bcrypt)
- Refresh token hashing
- Refresh token rotation
- Refresh token persistence in database
- Token revocation support
- ConfigModule integration
- JwtModule configured through environment variables

Authentication (pending)

- Logout endpoint
- JWT Guard
- Passport JWT Strategy
- Current User decorator
- Roles Guard
- Authorization decorators
- Protected endpoints

---

## Current Next Step

Continue authentication module.

Immediate milestone:

- Logout endpoint
- JWT Strategy
- JwtAuthGuard
- Roles authorization
- Protect REST endpoints

After authentication:

- Global Search
- Collection management
- Angular frontend integration