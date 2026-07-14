# Line

## Purpose

Represents an official commercial product line within a Franchise.

A Line groups together all collectibles released under the same commercial identity, branding and packaging style.

Examples include The Vintage Collection, Power of the Force, Black Series and Retro Collection.

---

## Definition

A Line represents how a manufacturer commercializes collectibles belonging to a Franchise during a specific period.

A Line defines the commercial identity of a family of products but does not define individual collectibles.

---

## Responsibilities

A Line:

- Belongs to a single Franchise.
- Has an official commercial name.
- Groups Figures and Vehicles sharing the same branding.
- Exists during a specific commercial period.
- May continue for many years with multiple release waves.

---

## Does NOT represent

A Line is NOT:

- A Franchise.
- A Manufacturer.
- A Character.
- A Figure.
- A Product Release.
- A Release Wave.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| franchiseId | Yes | Parent Franchise |
| name | Yes | Official line name |
| manufacturerId | Yes | Primary manufacturer |
| startYear | No | First release year |
| endYear | No | Last release year (if discontinued) |
| scale | No | Primary scale (3.75", 6", etc.) |
| logo | No | Official line logo |
| description | No | Short description |

---

## Relationships

A Line:

- Belongs to one Franchise.
- Is produced by one Manufacturer.
- Contains many Figures.
- Contains many Vehicles.

---

## Examples

### Star Wars

- Vintage Original Kenner
- Power of the Force
- Power of the Force 2
- The Vintage Collection
- The Black Series
- Retro Collection
- Legacy Collection

### Masters of the Universe

- Vintage
- Classics
- Origins
- Masterverse

### G.I. Joe

- A Real American Hero
- Classified Series

---

## Design Principles

A Line represents a commercial family of products.

Packaging variants, retailer exclusives, release waves and production revisions do not create new Lines.

A new Line only exists when officially introduced by the manufacturer.

---

## Future Considerations

Future versions may support:

- Multiple manufacturers.
- Regional branding.
- Line reboots.
- Anniversary editions.
- Line-specific artwork.

---

## Open Questions

- Should release waves become their own entity?
- Can multiple manufacturers share the same Line simultaneously?
- Should a Line support multiple scales?