# Product Release

The commercial distribution of a Variant.

A Product Release defines how a Variant reached the market.

Examples include:

- Carded release
- Boxed release
- Multipack
- Mail-away
- Convention exclusive
- Retail exclusive

Product Releases define packaging, barcode, region and distribution.

They do not modify the physical characteristics of a Variant.# Product Release

## Purpose

Represents the commercial distribution of a Variant.

A Product Release defines how and where a Variant was sold without modifying the physical collectible itself.

---

## Definition

A Product Release represents a specific commercial release of a Variant.

It defines packaging, distribution, region and retail information.

Multiple Product Releases may exist for the same Variant.

---

## Responsibilities

A Product Release:

- Belongs to a single Variant.
- Defines the commercial packaging.
- Defines the distribution market.
- Defines commercial identifiers such as barcodes.
- Remains independent from collectors.

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
| packagingType | No | Card, Box, Multipack, Mail-away, etc. |
| region | No | Market or country |
| language | No | Packaging language |
| barcode | No | UPC / EAN |
| releaseDate | No | Commercial release date |
| retailer | No | Exclusive retailer |
| wave | No | Release wave |
| notes | No | Additional release information |

---

## Relationships

A Product Release:

- Belongs to one Variant.
- Can be owned by many Collectors through Owned Figures.

---

## What creates a new Product Release?

Typical examples include:

- Different packaging.
- Different barcode.
- Different language.
- Different country.
- Retail exclusive.
- Convention exclusive.
- Multipack release.
- Mail-away release.
- Anniversary packaging.
- Promotional packaging.

---

## Design Principles

Product Releases define commercial distribution.

They never define the physical identity of the collectible.

---

## Examples

Luke Skywalker (VC13)

Variant:

Brown Hair

Product Releases:

- US Card
- Canadian Card
- Tri-Logo
- Toys R Us Exclusive
- Convention Exclusive

---

## Future Considerations

Future versions may support:

- MSRP
- Production quantities
- Release status
- Distribution timeline
- Market availability

---

## Open Questions

- Should retailer exclusives become their own entity?
- Should release waves be modeled independently?
- Should packaging artwork have its own gallery?