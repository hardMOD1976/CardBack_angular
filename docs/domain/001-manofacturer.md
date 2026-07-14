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
    └───► Line (1:N)

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