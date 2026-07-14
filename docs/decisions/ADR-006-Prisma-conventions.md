# ADR-006 - Prisma Conventions

## Status

Accepted

---

## Context

Figure Archive uses Prisma as its Object-Relational Mapper (ORM) to define and manage the application's data model.

To ensure consistency, maintainability and scalability, all Prisma models must follow the same conventions.

These conventions apply to every current and future domain entity.

---

## Decision

### Primary Keys

All entities use string-based identifiers generated with `cuid()`.

```prisma
id String @id @default(cuid())
```

This provides globally unique identifiers that are independent of the database implementation.

---

### Timestamps

Every entity includes audit timestamps.

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

---

### Relationships

Relationships must always be explicitly defined.

Example:

```prisma
manufacturerId String

manufacturer Manufacturer
  @relation(fields: [manufacturerId], references: [id])
```

Implicit relations should be avoided.

---

### Nullable Fields

Only attributes that are genuinely optional should be nullable.

Required business information should never be nullable.

---

### Indexes

Indexes should only be created when they provide measurable value.

Typical candidates include:

- name
- code
- barcode

Indexes must not be added preemptively.

---

### Enums

Enums should only be used when the possible values are finite and controlled.

Examples:

- PackagingState
- FigureCondition
- Completeness

Business entities such as manufacturers, franchises or countries must never be modeled as enums.

---

### Images

Images are never stored in the database.

Only references (paths or URLs) are persisted.

---

### MVP Philosophy

Models should contain only the attributes required by the current business needs.

Additional fields may be introduced through future database migrations.

---

## Consequences

The data model remains:

- Consistent
- Easy to understand
- Easy to evolve
- Independent from implementation details
- Compatible with future application growth