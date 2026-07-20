# Figure Archive - Project Status

## Current Phase

Backend Foundation Completed

---

## Completed

### Vision

- Project Vision
- MVP Scope
- Architecture Decision Records (ADR)

### Domain

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release
- Collector
- Owned Figure

### Infrastructure

- Repository restructured
- backend/ and frontend/ separation
- PostgreSQL (Neon)
- Prisma ORM
- Prisma schema completed
- Database migrations
- Prisma Client
- NestJS application
- ValidationPipe
- Prisma Exception Filter
- Soft Delete infrastructure
- Relational validation infrastructure

### Backend

#### Manufacturer

- CRUD
- DTO validation
- Soft Delete

#### Franchise

- CRUD
- DTO validation
- Soft Delete

#### Line

- CRUD
- DTO validation
- Soft Delete
- Manufacturer validation
- Franchise validation

#### Character

- CRUD
- DTO validation
- Soft Delete
- Franchise validation

#### Figure

- CRUD
- DTO validation
- Soft Delete
- Character validation
- Line validation

#### Variant

- CRUD
- DTO validation
- Soft Delete
- Figure validation

#### Product Release

- CRUD
- DTO validation
- Soft Delete
- Variant validation

#### Collector

- CRUD
- DTO validation
- Soft Delete

#### Owned Figure

- CRUD
- DTO validation
- Soft Delete
- Collector validation
- Product Release validation

### Documentation

- Swagger integrated
- REST API fully documented
- Endpoint consistency reviewed

### Database

- Golden Dataset
- Idempotent seed
- Robust upsert strategy
- Composite unique constraints
- Referential integrity verified

---

## Pending

### Backend

- Authentication (JWT)
- Authorization / Roles
- Search
- Pagination
- Filtering
- Testing
- Image upload

### Frontend

- Angular workspace
- Design System
- Authentication
- UI Foundation
- Collection management

---

## Current Milestone

Backend Foundation completed.

Next objective:

Implement authentication and authorization, then begin application-level features (search, collection management and Angular frontend integration).