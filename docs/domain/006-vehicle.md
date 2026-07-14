# Vehicle

## Purpose

Represents a fictional vehicle belonging to a Franchise.

A Vehicle is an immutable catalog entity that serves as the subject for one or more collectible vehicles.

Examples include X-Wing Fighter, Millennium Falcon, AT-AT and TIE Fighter.

---

## Definition

A Vehicle represents an identifiable fictional vehicle within a Franchise.

Vehicles exist independently from product lines, manufacturers, packaging or commercial releases.

They are the conceptual identity behind collectible vehicle products.

---

## Responsibilities

A Vehicle:

- Belongs to a single Franchise.
- Has an official name.
- May appear in multiple Lines.
- May have multiple collectible versions.
- Remains independent from commercial products.

---

## Does NOT represent

A Vehicle is NOT:

- A Character.
- A Figure.
- A Variant.
- A Product Release.
- A Manufacturer.
- A Line.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| franchiseId | Yes | Parent Franchise |
| name | Yes | Official vehicle name |
| vehicleClass | No | Vehicle category (Starfighter, Walker, Transport, etc.) |
| faction | No | Associated faction |
| firstAppearance | No | First appearance in canon |
| description | No | Short description |
| image | No | Representative catalog image |

---

## Relationships

A Vehicle:

- Belongs to one Franchise.
- Can have many collectible versions.

---

## Examples

### Star Wars

- X-Wing Fighter
- Millennium Falcon
- TIE Fighter
- AT-AT
- Snowspeeder

### Masters of the Universe

- Battle Ram
- Wind Raider
- Land Shark

### G.I. Joe

- H.I.S.S. Tank
- Skystriker
- Dragonfly

---

## Design Principles

A Vehicle never changes because of:

- Product Line
- Packaging
- Scale
- Paint
- Manufacturer

Those differences belong to collectible versions or Variants.

---

## Future Considerations

Future versions may support:

- Vehicle crews
- Vehicle classes
- Alternate configurations
- Canon / Legends information

---

## Open Questions

- Should creatures used as mounts be modeled as Vehicles?
- Should playsets become a separate entity?
- How should transforming vehicles be represented?