# Character

## Purpose

Represents a fictional character belonging to a Franchise.

A Character is an immutable catalog entity that serves as the subject for one or more Figures.

Examples include Luke Skywalker, Darth Vader, Boba Fett and Stormtrooper.

---

## Definition

A Character represents a fictional individual, creature or named persona within a Franchise.

Characters exist independently from product lines, manufacturers, packaging or commercial releases.

They are the conceptual identity behind collectible figures.

---

## Responsibilities

A Character:

- Belongs to a single Franchise.
- Has an official name.
- May appear in multiple Lines.
- May have multiple Figures.
- Remains independent from commercial products.

---

## Does NOT represent

A Character is NOT:

- A Figure.
- A Variant.
- A Product Release.
- A Manufacturer.
- A Line.
- A Vehicle.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| franchiseId | Yes | Parent Franchise |
| name | Yes | Official character name |
| species | No | Character species |
| homeworld | No | Planet or place of origin |
| affiliation | No | Faction or organization |
| description | No | Short biography |
| image | No | Representative catalog image |

---

## Relationships

A Character:

- Belongs to one Franchise.
- Can have many Figures.

---

## Examples

### Star Wars

- Luke Skywalker
- Darth Vader
- Boba Fett
- Han Solo
- Chewbacca
- Stormtrooper

### Masters of the Universe

- He-Man
- Skeletor
- Man-At-Arms

### G.I. Joe

- Duke
- Snake Eyes
- Cobra Commander

---

## Design Principles

A Character never changes because of:

- Product Line
- Packaging
- Scale
- Sculpt
- Paint
- Accessories
- Manufacturer

Those differences belong to Figures or Variants.

---

## Future Considerations

Future versions may support:

- Aliases
- Alternative identities
- Character groups
- Canon / Legends information
- Timeline appearances
- Add  'status' as attribute

---

## Open Questions

- Should alternate identities become separate Characters?
- Should generic troops (Stormtrooper, Clone Trooper, Battle Droid...) be treated as Characters?
- Should Characters and Vehicles eventually inherit from a common Collectible Subject?