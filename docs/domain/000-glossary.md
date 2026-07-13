# Glossary

## Purpose

This document defines the business terminology used throughout the project.

Every domain entity, API, database model and UI component should use these definitions consistently.

If a new concept appears during development, it must first be added to this glossary before becoming part of the domain model.

---

# Franchise

A collectible intellectual property (IP).

Examples:
- Star Wars
- Masters of the Universe
- Teenage Mutant Ninja Turtles
- G.I. Joe
- Marvel Legends

A franchise contains one or more product lines.

---

# Manufacturer

The company that produced the figure.

Examples:
- Kenner
- Hasbro
- Jazwares
- Mattel

A manufacturer can produce multiple product lines.

---

# Line

A commercial collection released by a manufacturer.

Examples:
- The Vintage Collection
- Black Series
- Power of the Force
- The Legacy Collection

A line contains many figures.

---

# Character

A fictional character represented by one or more figures.

Examples:
- Luke Skywalker
- Darth Vader
- Boba Fett

A character may appear in multiple product lines.

---

# Figure

The conceptual collectible.

It represents the product independently of its packaging, condition or owner.

Examples:

- VC13 Luke Skywalker (Bespin)
- Black Series #01 Luke Skywalker

A figure may have one or more variants.

---

# Variant

A specific commercial release of a figure.

Variants may differ by:

- Country
- Barcode
- Packaging
- Language
- Exclusive retailer
- Release wave
- Production revision

All users reference the same variant.

---

# Owned Figure

A physical copy owned by a collector.

Every owned figure references exactly one variant.

Each owned figure has its own:

- Condition
- Completeness
- Purchase information
- Personal notes
- Photos
- Storage location

Different collectors may own different copies of the same variant.

---

# Loose Figure

An owned figure that is no longer sealed in its original packaging.

A loose figure is not a different catalog item.

It is simply an owned figure whose completeness and condition are evaluated independently.

---

# MOC (Mint On Card)

A figure that remains factory sealed on its original card.

---

# MISB (Mint In Sealed Box)

A figure that remains factory sealed inside its original box.

---

# Complete

A figure that includes every original accessory.

---

# Incomplete

A figure that is missing one or more original accessories.

---

# Wishlist Item

A figure or variant the collector wishes to own.

A wishlist item is not part of the collection.

---

# Collection

The complete set of owned figures belonging to a collector.

The collection is automatically derived from all owned figures.

---

# Accessory

An original item included with a figure.

Examples:

- Lightsaber
- Helmet
- Blaster
- Cape
- Coin
- Display stand

Accessories belong to catalog data, not to users.

Whether a specific owned figure still includes them belongs to the owned figure.

---

# Community Photo

A photograph uploaded by collectors.

Community photos are independent from official catalog images.

---

# Official Image

An image belonging to the catalog.

It represents the official appearance of a figure or variant.

---

# Marketplace Price

A market price collected from external sources.

Marketplace prices never modify catalog data.

They are historical snapshots.

---

# Barcode

A UPC, EAN or similar identifier assigned to a specific variant.

Barcodes belong to variants, not figures.

---

# Completion Percentage

The percentage of figures owned within a product line.

This value is calculated automatically.

It is never manually edited.

---

# Catalog

The complete database of collectible information.

The catalog exists independently of users.

It contains franchises, manufacturers, lines, figures and variants.

---

# Collector

A registered user of the application.

Collectors own figures, upload photos, maintain wishlists and contribute to the community.