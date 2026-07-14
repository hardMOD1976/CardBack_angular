# Product Release

## Purpose

Represents a specific commercial release of a Variant.

A Product Release defines how a Variant was marketed and distributed to collectors.

It represents packaging, regional distribution, retailer exclusives and promotional content, while preserving the physical identity of the Variant.

---

## Definition

A Product Release is the commercial representation of a Variant.

Multiple Product Releases may exist for the same Variant.

Each Product Release defines how collectors could acquire that collectible at retail or through promotional channels.

---

## Responsibilities

A Product Release:

- Belongs to a single Variant.
- Defines the commercial packaging.
- Defines the market or region.
- Defines promotional inclusions.
- Defines retailer exclusivity.
- May define release dates.

---

## Does NOT represent

A Product Release is NOT:

- A Character.
- A Figure.
- A physical Variant.
- An Owned Figure.
- A collector's copy.

---

## Core Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Internal unique identifier |
| variantId | Yes | Parent Variant |
| name | Yes | Commercial release name |
| packagingType | No | Card, Box, Window Box, Bagged... |
| region | No | US, Europe, Canada, Japan... |
| language | No | Packaging language |
| retailer | No | Exclusive retailer (if applicable) |
| releaseDate | No | Official release date |
| barcode | No | UPC / EAN |
| notes | No | Additional release information |
| defaultImage | No | Representative packaging image |

---

## Relationships

A Product Release:

- Belongs to one Variant.
- Can have many Owned Figures.

---

## What creates a new Product Release?

Typical examples include:

- New cardback design.
- New box artwork.
- Different language.
- Different barcode.
- Regional packaging.
- Retailer exclusive.
- Promotional insert.
- Multipack release.
- Mail-away release.

---

## What does NOT create a new Product Release?

The following differences do NOT create a new Product Release:

- Paint changes.
- Sculpt revisions.
- Mold changes.
- Different accessories.
- Factory production changes.

Those belong to Variants.

---

## Design Principles

A Product Release represents how a collectible reached the market.

Removing the packaging should never change the identity of the Product Release's Variant.

---

## Examples

### Luke Skywalker (VC13)

Variant:

- Brown Hair

Product Releases:

- US Card
- Canadian Card
- Tri-Logo
- Toys R Us Exclusive

---

### Darth Vader

Variant:

- Standard Release

Product Releases:

- 12 Back
- 20 Back
- Empire Card
- Return of the Jedi Card

---

## Future Considerations

Future versions may support:

- Release waves.
- MSRP.
- Distribution countries.
- Production quantities.
- Packaging revisions.
- Historical market availability.

---

## Open Questions

- Should Release Wave become its own entity?
- Should packaging types become an enum or a dedicated entity?
- Should promotional campaigns be modeled separately?