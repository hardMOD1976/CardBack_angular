# ADR-001 - Project Vision

## Status

Accepted

---

## Date

2026-07-13

---

## Context

Existing action figure collection applications are primarily focused on inventory management rather than providing a complete collector experience.

Many existing solutions suffer from one or more of the following limitations:

- Poor user experience.
- Outdated user interfaces.
- Limited or incomplete catalogs.
- Weak search and filtering capabilities.
- Poor mobile experience.
- No intelligent figure identification.
- Limited community participation.
- Little or no support for collection statistics.
- No centralized reference platform comparable to Discogs.

Collectors often need to combine several different websites and applications to manage their collections effectively.

---

## Vision

Figure Archive aims to become the reference platform for action figure collectors.

The project combines:

- A complete collectible catalog.
- Personal collection management.
- Intelligent search.
- Community contributions.
- AI-assisted identification.
- Modern user experience.
- Cross-platform accessibility.

The application should become the equivalent of Discogs for action figures.

---

## Initial Scope

Version 1 focuses exclusively on Star Wars action figures.

Supporting additional franchises is considered a future evolution, but the domain model must be designed from the beginning to support them without architectural changes.

Examples include:

- Masters of the Universe
- G.I. Joe
- Teenage Mutant Ninja Turtles
- Marvel Legends
- DC Multiverse

---

## Architectural Principles

The application will prioritize:

- Collector-first design.
- Clean and intuitive UX.
- Mobile-first responsive experience.
- High performance.
- Modular architecture.
- Scalability.
- Long-term maintainability.

Catalog data and user-owned data are independent domains and must never be mixed.

Business rules belong to the backend whenever possible.

The frontend should remain focused on presentation and user interaction.

---

## Product Principles

The project will always prioritize features that provide direct value to collectors.

The initial MVP will focus on:

- Catalog browsing.
- Figure search.
- Barcode scanning.
- Personal collection.
- Wishlist.
- AI-based loose figure identification.

Marketplace integration, price tracking, grading integration and other advanced features are considered future enhancements.

---

## Business Model

The platform is intended to be free for collectors.

Future monetization, if any, must never compromise the core collector experience.

No premium features are defined during the initial phases of the project.

---

## Consequences

Every architectural decision should support future scalability.

Every domain entity must represent real-world concepts used by collectors.

The domain model must remain independent from implementation technologies.

User data must never modify catalog data.

The project should remain understandable, maintainable and extensible over many years.