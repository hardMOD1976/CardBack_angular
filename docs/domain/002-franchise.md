# Franchise

## Purpose

Represents an intellectual property (IP) around which collectible products are created.

A Franchise defines the fictional world to which characters, vehicles, creatures and official collectible lines belong.

Examples include Star Wars, Masters of the Universe, G.I. Joe and Teenage Mutant Ninja Turtles.

---

## Definition

A Franchise is the highest-level domain entity for a collectible catalog.

It exists independently from manufacturers and commercial product lines.

Different manufacturers may produce collectibles from the same franchise under licensing agreements.

---

## Responsibilities

A Franchise:

- Defines the intellectual property.
- Groups all collectible subjects belonging to that IP.
- Defines the official collectible lines.
- Remains independent from manufacturers.
- Can exist across multiple decades.

---

## Does NOT represent

A Franchise is NOT:

- A manufacturer.
- A product line.
- A single movie.
- A TV series.
- A comic issue.
- A product release.
- A collectible.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| name | Yes | Official franchise name |
| owner | No | Current intellectual property owner |
| firstAppearanceYear | No | First public appearance |
| description | No | Short description |
| logo | No | Official logo |
| website | No | Official website |

---

## Relationships

A Franchise owns:

- Characters
- Vehicles
- Creatures (future)
- Playsets (future)
- Collectible Lines

A Franchise can be licensed to one or more Manufacturers over time.

---

## Examples

- Star Wars
- Masters of the Universe
- G.I. Joe
- Teenage Mutant Ninja Turtles
- Marvel
- DC Comics

---

## Design Principles

A Franchise should remain stable over time.

Commercial decisions such as product lines, packaging, exclusives or regional releases must never redefine the Franchise itself.

---

## Future Considerations

Future versions may support:

- Licensing history
- Ownership history
- Canon / Legends separation
- Timeline visualization
- Franchise aliases

---

## Open Questions

- Should licensing become its own domain entity?
- Should ownership history be modeled?
- Should Canon / Legends belong to Franchise or to individual collectibles?
- How should cross-over franchises be represented?