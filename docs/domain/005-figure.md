# Figure

## Purpose

Represents the canonical collectible product within a specific Line.

A Figure defines the collectible independently of packaging, distribution, ownership or physical condition.

It is the central catalog entity between a Character (or Vehicle in the future) and its commercial releases.

---

## Definition

A Figure is the canonical representation of a collectible subject within a specific Line.

It defines the identity of the collectible as recognized by collectors.

Different physical revisions may exist as Variants.

Different commercial distributions may exist as Product Releases.

---

## Responsibilities

A Figure:

- Belongs to a single Character.
- Belongs to a single Line.
- Defines the collectible's canonical identity.
- Groups all physical Variants of that collectible.
- Remains independent from packaging, country and ownership.
- Represents the collectible independently from its commercial distribution.

---

## Does NOT represent

A Figure is NOT:

- A Character.
- A Variant.
- A Product Release.
- An Owned Figure.
- A packaging format.
- A retailer exclusive.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| characterId | Yes | Parent Character |
| lineId | Yes | Parent Line |
| name | Yes | Official catalog name |
| code | No | Manufacturer catalog code (e.g. VC13) |
| description | No | Short catalog description |
| imageUrl | No | Primary catalog image |

---

## Relationships

A Figure:

- Belongs to one Character.
- Belongs to one Line.
- Has many Variants.

---

## What defines a new Figure?

A new Figure is created whenever the collectible represents a different canonical product.

Typical reasons include:

- Different character appearance.
- Different outfit.
- New sculpt.
- Different base accessory set.
- Different conceptual version of the character.

Examples:

- Luke Skywalker (Farmboy)
- Luke Skywalker (Bespin)
- Luke Skywalker (Jedi Knight)
- Luke Skywalker (Stormtrooper Disguise)

These are different Figures.

---

## What does NOT create a new Figure?

The following differences do NOT create a new Figure:

- Different country.
- Different language.
- Different barcode.
- Different packaging.
- Different retailer.
- Different release wave.
- Pack-in promotions (coin, Freeze Frame, comic, etc.).
- Minor production changes.

These belong to Variants or Product Releases.

---

## Design Principles

The identity of a Figure is determined by what the collector recognizes after removing the packaging.

Packaging never defines a Figure.

Physical identity does.

---

## Examples

### Same Figure

Luke Skywalker (The Vintage Collection VC13)

Variants:

- Brown Hair
- Blonde Hair

Product Releases:

- US Card
- Canadian Card
- Tri-Logo

---

### Different Figures

Luke Skywalker (Farmboy)

Luke Skywalker (Bespin)

Luke Skywalker (Jedi Knight)

Luke Skywalker (Stormtrooper Disguise)

Each represents a different Figure.

---

## Future Considerations

Future versions may support:

- Figure aliases.
- Figure timelines.
- Digital 3D models.
- Multiple official images.
- Cross-line equivalences.

---

## Open Questions

- Should accessory sets become their own entity?
- Should deluxe editions belong to the same Figure?
- How should figures with interchangeable heads or bodies be modeled?
- Should convention-exclusive sculpts always create new Figures?