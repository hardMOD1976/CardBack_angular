# Owned Figure

## Purpose

Represents a physical copy owned by a Collector.

An Owned Figure contains all personal information about a collectible and never modifies the catalog itself.

---

## Definition

An Owned Figure represents a single physical copy of a Product Release owned by a collector.

Every Owned Figure is unique, even if multiple collectors own the same Product Release.

---

## Responsibilities

An Owned Figure:

- Belongs to one Collector.
- References one Product Release.
- Stores the collectible's condition.
- Stores completeness information.
- Stores acquisition details.
- Stores personal notes and photographs.

---

## Does NOT represent

An Owned Figure is NOT:

- Catalog data.
- A Figure.
- A Variant.
- A Product Release.
- Shared between collectors.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| collectorId | Yes | Owner |
| productReleaseId | Yes | Referenced Product Release |
| condition | Yes | Physical condition |
| completeness | Yes | Complete / Incomplete |
| packagingState | No | Loose, MOC, MISB, Open Box, etc. |
| purchaseDate | No | Purchase date |
| purchasePrice | No | Purchase price |
| purchaseLocation | No | Seller or marketplace |
| estimatedValue | No | Personal estimated value |
| storageLocation | No | Shelf, box, room, etc. |
| personalRating | No | Collector rating |
| notes | No | Personal notes |
| createdAt | Yes | Record creation |
| updatedAt | Yes | Last update |

---

## Relationships

An Owned Figure:

- Belongs to one Collector.
- References one Product Release.
- May contain many personal Photos.

---

## Design Principles

Every Owned Figure is unique.

Two collectors owning the same Product Release still have different Owned Figures.

Personal information always belongs to the Owned Figure.

Catalog information never changes because of collectors.

---

## Examples

Collector:

Isaac

Owns:

Luke Skywalker VC13

Product Release:

US Card

Condition:

Excellent

Packaging:

Loose

Complete:

Yes

Purchase Price:

€18.00

Storage:

Display Shelf 2

---

## Future Considerations

Future versions may support:

- Insurance information.
- Maintenance history.
- Restoration records.
- Sale history.
- Trade history.
- QR identification.
- NFC tags.

---

## Open Questions

- Should restoration history become a dedicated entity?
- Should valuation history be stored?
- Should ownership transfers preserve history?