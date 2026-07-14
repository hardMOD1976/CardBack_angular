# Variant

## Purpose

Represents a physical variation of a Figure.

A Variant defines differences in the collectible itself while preserving the identity of the Figure.

Variants exist independently from packaging, distribution and ownership.

---

## Definition

A Variant is a physical version of a Figure.

Collectors still recognize all Variants as the same Figure, despite minor physical differences introduced during production.

Variants represent manufacturing differences, not commercial releases.

Two Variants may coexist simultaneously in the same Product Release if the manufacturer introduced undocumented production changes.

The catalog represents the physical collectible, not the commercial intention.

---

## Responsibilities

A Variant:

- Belongs to a single Figure.
- Defines physical differences.
- Groups all Product Releases sharing the same physical characteristics.
- Remains independent from packaging and distribution.

---

## Does NOT represent

A Variant is NOT:

- A Character.
- A Figure.
- A Product Release.
- An Owned Figure.
- A packaging variation.
- A country release.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| figureId | Yes | Parent Figure |
| name | Yes | Variant name |
| description | No | Description of the physical differences |
| defaultImage | No | Representative image |
| confidence | No | Official / Community Verified / Unconfirmed |

---

## Relationships

A Variant:

- Belongs to one Figure.
- Has many Product Releases.

---

## What creates a Variant?

Typical examples include:

- Different paint application.
- Different hair color.
- Different plastic color.
- Different sculpt revision.
- Running production changes.
- Alternative head sculpt.
- Alternative hands.
- Different accessory version.
- Telescoping vs. non-telescoping lightsaber.
- Different molded parts.
- Different assembly.

---

## What does NOT create a Variant?

The following differences do NOT create a Variant:

- Packaging design.
- Country.
- Language.
- Barcode.
- Retail exclusive sticker.
- Release wave.
- Promotional inserts.
- Included catalogs or flyers.
- Price stickers.
- Retailer labels.

Those belong to Product Releases.

---

## Design Principles

A Variant represents physical differences only.

If removing the packaging leaves two collectibles physically different while still being recognized as the same Figure, they are Variants.

---

## Examples

### Luke Skywalker (Vintage Kenner)

Figure:

Luke Skywalker

Variants:

- Blonde Hair
- Brown Hair
- Double-Telescoping Lightsaber
- Standard Lightsaber

---

### Darth Vader

Figure:

Darth Vader

Variants:

- Soft Cape
- Hard Cape

---

## Future Considerations

Future versions may support:

- Manufacturing dates.
- Factory identifiers.
- Mold identifiers.
- Production batches.
- Collector confidence level.
- Variant discovery history.

---

## Open Questions

- Should running changes always create a Variant?
- Should confidence become a dedicated entity instead of an enum?
- Should community-discovered variants require moderator approval?

---

## Definition

A Variant is a physical version of a Figure.

Collectors still recognize all Variants as the same Figure, despite minor physical differences introduced during production.

Variants represent manufacturing differences, not commercial releases.

---

## Responsibilities

A Variant:

- Belongs to a single Figure.
- Defines physical differences.
- Groups all Product Releases sharing the same physical characteristics.
- Remains independent from packaging and distribution.

---

## Does NOT represent

A Variant is NOT:

- A Character.
- A Figure.
- A Product Release.
- An Owned Figure.
- A packaging variation.
- A country release.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| figureId | Yes | Parent Figure |
| name | Yes | Variant name |
| description | No | Description of the physical differences |
| defaultImage | No | Representative image |

---

## Relationships

A Variant:

- Belongs to one Figure.
- Has many Product Releases.

---

## What creates a Variant?

Typical examples include:

- Different paint application.
- Different hair color.
- Different plastic color.
- Different sculpt revision.
- Running production changes.
- Alternative head sculpt.
- Alternative hands.
- Different accessory version.
- Telescoping vs. non-telescoping lightsaber.

---

## What does NOT create a Variant?

The following differences do NOT create a Variant:

- Packaging design.
- Country.
- Language.
- Barcode.
- Retail exclusive sticker.
- Release wave.
- Promotional inserts.
- Included catalogs or flyers.

Those belong to Product Releases.

---

## Design Principles

A Variant represents physical differences only.

If removing the packaging leaves two collectibles physically different while still being recognized as the same Figure, they are Variants.

---

## Examples

### Luke Skywalker (Vintage Kenner)

Figure:

Luke Skywalker

Variants:

- Blonde Hair
- Brown Hair
- Double-Telescoping Lightsaber
- Standard Lightsaber

---

### Darth Vader

Figure:

Darth Vader

Variants:

- Soft Cape
- Hard Cape

---

## Future Considerations

Future versions may support:

- Manufacturing dates.
- Factory identifiers.
- Mold identifiers.
- Production batches.
- Collector confidence level.

---

## Open Questions

- Should running changes always create a Variant?
- Should undocumented factory changes be accepted?
- Should community-discovered variants require moderator approval?