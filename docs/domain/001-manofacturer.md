# Manufacturer

## Status

🟡 Draft

---

## Purpose

Represents the company responsible for manufacturing and/or distributing collectible products.

A manufacturer may produce multiple product lines across one or more franchises.

---

## Examples

- Kenner
- Hasbro
- Mattel
- Jazwares
- McFarlane Toys

---

## Properties

(To be defined in the next iteration.)

---

## Relationships

Manufacturer
    │
    └───► Line (1:N)# Manufacturer

## Purpose

Represents the company responsible for manufacturing or distributing a collectible product.

A manufacturer can produce one or more franchises, lines or product releases depending on licensing agreements.

Examples include Kenner, Hasbro, Mattel, Playmates, Super7 and Jazwares.

---

## Responsibilities

A Manufacturer:

- Has an official identity.
- May own one or more brands.
- Produces one or more collectible lines.
- Can exist across multiple decades.
- May change ownership over time.

---

## Does NOT represent

A Manufacturer is NOT:

- A franchise.
- A product line.
- A license holder.
- A retailer.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| name | Yes | Official manufacturer name |
| foundedYear | No | Company foundation year |
| dissolvedYear | No | If no longer exists |
| country | No | Country of origin |
| website | No | Official website |
| logo | No | Brand logo |
| notes | No | Historical notes |

---

## Relationships

Manufacturer

↓

has many

↓

Lines

---

## Examples

Kenner

Hasbro

Mattel

Playmates Toys

Super7

Jazwares

---

## Future considerations

Future versions may support:

- Company mergers
- Parent companies
- Historical ownership timeline
- Multiple logos over time

---

## Business Rules

- A manufacturer can own multiple product lines.
- A product line belongs to a single manufacturer.
- A manufacturer may produce lines from different franchises.

---

## Future Considerations

- Country of origin.
- Official website.
- Company logo.
- Historical information (mergers, acquisitions, etc.).

## Open Questions

- Should a manufacturer own brands?
- Should licensors be modeled separately?
- How should mergers be represented?