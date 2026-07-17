# Figure Archive - Project Status

## Current Phase

Backend Development

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
- Initial migration
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

---

## Pending

### Backend

- Swagger
- API documentation
- Initial Seed
- Authentication
- Testing
- Pagination
- Filtering
- Search

### Frontend

- Angular workspace
- Design System
- Authentication
- UI Foundation

---

## Current Milestone

Backend domain completed.

Next objective:

Expose and document the API using Swagger, validate the complete REST interface, and prepare the backend for Angular integration.