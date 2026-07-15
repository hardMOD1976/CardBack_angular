# Backend Architecture

## Status

🟢 Active

---

# Purpose

This document describes the architecture of the FigureArchive backend.

It defines the organization of the codebase, module boundaries, responsibilities, and communication between components.

Implementation decisions are documented in ADR-007.

---

# Technology Stack

Framework

- NestJS

Language

- TypeScript

ORM

- Prisma

Database

- PostgreSQL

Validation

- class-validator
- class-transformer

Documentation

- Swagger (OpenAPI)

---

# Architectural Style

The backend follows a layered architecture.

```
HTTP Request

↓

Controller

↓

Service

↓

Prisma

↓

PostgreSQL
```

Each layer has a single responsibility.

---

# Module Organization

Every business concept is implemented as an independent NestJS module.

```
src/

    app.module.ts

    common/

    prisma/

    manufacturer/

    franchise/

    line/

    character/

    vehicle/

    figure/

    variant/

    product-release/

    owned-figure/
```

Each module contains its own:

- Controller
- Service
- DTOs
- Tests

Business logic never leaks into other modules.

---

# Request Lifecycle

```
Client

↓

Controller

↓

DTO Validation

↓

Service

↓

Prisma

↓

Database

↓

Service

↓

Controller

↓

HTTP Response
```

---

# Controllers

Controllers are responsible for:

- Receiving HTTP requests.
- Validating input.
- Calling Services.
- Returning responses.

Controllers should never contain business logic.

---

# Services

Services contain the business rules.

Responsibilities include:

- Applying domain rules.
- Coordinating multiple entities.
- Throwing business exceptions.
- Calling Prisma.

Services should remain independent from HTTP.

---

# Prisma Layer

Prisma is the persistence layer.

Responsibilities:

- Database access.
- Type-safe queries.
- Transactions.
- Migrations.

No raw SQL should be used unless strictly necessary.

---

# Data Transfer Objects (DTO)

Every endpoint uses DTOs.

DTOs define:

- Input validation.
- API contracts.
- Serialization.

Database models must never be exposed directly.

---

# Validation

Validation is performed before business logic.

Validation includes:

- Required fields.
- Data types.
- String length.
- Numeric ranges.
- Custom business validation (when necessary).

---

# Exception Handling

Errors are categorized into:

- Validation errors (400)
- Resource not found (404)
- Business rule violations (409)
- Unauthorized (401)
- Forbidden (403)
- Internal errors (500)

Internal implementation details must never be exposed.

---

# Dependency Injection

Services are resolved through NestJS Dependency Injection.

Manual instantiation should be avoided.

---

# Logging

Application logging should be centralized.

Typical events include:

- Startup
- Requests
- Errors
- Unexpected exceptions

Sensitive information must never be logged.

---

# Domain Ownership

Each module owns its business domain.

For example:

Manufacturer owns manufacturer-related rules.

Figure owns figure-related rules.

Variant owns variant-related rules.

Modules communicate through services rather than accessing each other's persistence directly.

This minimizes coupling and keeps business rules localized.

---

# API Documentation

Swagger will be generated automatically.

Every endpoint should include:

- Summary
- Parameters
- Request body
- Response model
- Possible error responses

---

# Future Architecture

Future versions may introduce:

- JWT Authentication
- Role-based Authorization
- File Storage
- Background Jobs
- Event Bus
- Caching
- Email Services
- AI Integrations

These concerns should remain isolated from the core domain.

---

# Design Principles

The backend follows these principles:

- Domain-first.
- Modular architecture.
- Strong typing.
- Dependency Injection.
- Separation of concerns.
- Testability.
- Scalability.

---

# Related Documents

- ADR-006 – Prisma Conventions
- ADR-007 – Backend Architecture
- 001-system-overview.md
- 005-api-guidelines.md