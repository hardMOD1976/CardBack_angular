# ADR-007 - Backend Architecture

## Status

Accepted

---

## Context

Figure Archive will expose its business capabilities through a REST API consumed primarily by the Angular frontend.

The backend must remain independent of the presentation layer while enforcing business rules defined by the domain model.

The architecture should prioritize maintainability, testability and scalability over premature optimization.

---

## Decision

The backend will be implemented using NestJS.

The application will follow a layered architecture with clear separation of responsibilities.

```
Controller
    │
    ▼
Service
    │
    ▼
Prisma
    │
    ▼
PostgreSQL
```

Each domain concept (Manufacturer, Franchise, Line, Figure, etc.) will be implemented as an independent NestJS module.

---

## Architectural Principles

### Single Responsibility

Every class should have a single responsibility.

Controllers handle HTTP.

Services implement business logic.

Prisma provides data persistence.

---

### Thin Controllers

Controllers should:

- Validate requests.
- Delegate work to Services.
- Return HTTP responses.

Business logic must never be implemented inside controllers.

---

### Business Logic in Services

Services are responsible for:

- Applying business rules.
- Coordinating persistence.
- Throwing domain-specific exceptions.
- Orchestrating related entities.

---

### Prisma as Persistence Layer

Prisma is the only component responsible for database access.

No raw SQL should be used unless a measurable performance reason exists.

---

### DTO-based API

Every endpoint will expose Data Transfer Objects (DTOs).

Database models must never be returned directly to API consumers.

---

### Validation

Incoming requests will be validated using:

- class-validator
- class-transformer

Invalid requests must return meaningful validation errors.

---

### REST Conventions

Resources will follow REST naming conventions.

Examples:

GET    /manufacturers

GET    /manufacturers/:id

POST   /manufacturers

PATCH  /manufacturers/:id

DELETE /manufacturers/:id

Plural resource names will be used consistently.

---

### Error Handling

The application will use NestJS Exception Filters.

Known business errors should return meaningful HTTP status codes.

Unexpected errors should never expose internal implementation details.

---

### Dependency Injection

All services will be resolved through NestJS Dependency Injection.

Manual object creation inside business classes should be avoided.

---

## Initial Module Structure

```
src/

    app.module.ts

    manufacturer/
    franchise/
    line/
    character/
    figure/
    variant/
    product-release/
    owned-figure/

    prisma/

    common/
```

---

## Out of Scope

This ADR does not define:

- Authentication
- Authorization
- Caching
- Background jobs
- Event bus
- Messaging
- File storage

These concerns will be addressed in future ADRs.

---

## Consequences

Benefits:

- High maintainability.
- Predictable code organization.
- Easy unit testing.
- Scalable module structure.
- Consistent REST API.

Trade-offs:

- Slightly more boilerplate.
- More files per feature.
- Higher initial setup cost.

---

## Future Considerations

Future ADRs may define:

- JWT authentication.
- Role-based authorization.
- Repository abstraction.
- CQRS.
- Event-driven architecture.
- API versioning.
- OpenAPI documentation strategy.