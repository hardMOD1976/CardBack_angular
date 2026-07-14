# Domain Principles

## Status

🟡 Draft

---

# Purpose

This document defines the architectural principles that govern the Figure Archive domain model.

These principles must remain valid regardless of the database implementation, backend technology, frontend framework or supported franchises.

Every domain entity must comply with these principles.

---

# Principle 1 — Domain First

The domain model is designed before the persistence model.

Database tables, APIs and application code are implementations of the domain, not the source of truth.

---

# Principle 2 — Catalog First

The catalog represents the official existence of collectibles.

User data never defines the catalog.

A collectible exists even if no collector owns it.

---

# Principle 3 — Separation of Catalog and Collection

Catalog data and user collection data are completely independent.

Catalog information describes official products.

Collection information describes a collector's owned copy.

These two concerns must never be mixed.

---

# Principle 4 — One Catalog Item, Many Owned Copies

A catalog item may be owned by zero, one or many collectors.

Each owned collectible references exactly one catalog item.

---

# Principle 5 — Historical Accuracy

The catalog should represent historical reality.

Official product information must not be modified by collectors.

Community contributions should be reviewed before becoming part of the official catalog.

---

# Principle 6 — Universal Domain

The domain must support any action figure line and its associated vehicles.

The model must never contain Star Wars specific concepts.

Star Wars is the initial dataset, not the domain definition.

---

# Principle 7 — Commercial Releases Are Independent

A collectible may appear in multiple commercial releases.

Commercial releases do not redefine the collectible itself.

Packaging, retailer exclusives, multipacks and promotional releases belong to the commercialization history.

---

# Principle 8 — Variants Are Independent From Releases

A product variant represents a physical difference in the collectible.

A commercial release represents how that collectible reached the market.

These concepts must remain independent.

---

# Principle 9 — Collector Data Represents Physical Copies

Collectors never own catalog items.

Collectors own physical copies of catalog items.

Each owned collectible has its own condition, purchase history, price, notes and photographs.

---

# Principle 10 — The Catalog Is Immutable

The official catalog evolves through new information.

Collectors cannot directly modify catalog records.

Official data should remain stable and traceable.

---

# Principle 11 — Extensibility

The model should allow future support for new action figure lines without requiring architectural redesign.

New manufacturers, franchises and product lines should be incorporated through data, not code.

---

# Principle 12 — Technology Independence

The domain must not depend on Angular, Prisma, PostgreSQL or any specific technology.

The business model must remain valid regardless of implementation.

---

# Future Principles

The following topics will be evaluated as the project evolves:

- Marketplace integration
- Community moderation
- AI-assisted identification
- Price history
- Collection statistics
- Achievement system
- Social features

These features must adapt to the domain, never redefine it.