# Frontend User Flows

## Purpose

This document defines the main user journeys inside Figure Archive.

A user flow describes the sequence of screens and decisions required to complete one task.

The objective is to ensure that every collector can accomplish common actions with the minimum possible friction.

---

# Primary User

Collector

The collector is the primary user of Figure Archive.

Their goals are:

- Manage a personal collection.
- Browse the global catalog.
- Identify unknown figures.
- Track missing releases.
- Organize storage.
- Maintain collection information.

---

# Secondary User

Administrator

Administrators maintain the catalog.

They never use collector workflows to edit catalog data.

Administration is a completely separate experience.

---

# Flow 01 — Login

Goal

Authenticate the user.

Steps

Splash Screen

↓

Login

↓

JWT Authentication

↓

Home Dashboard

Alternative

Already authenticated

↓

Home Dashboard

---

# Flow 02 — Browse My Collection

Goal

Inspect owned figures.

Home

↓

Collection

↓

Search / Filter (optional)

↓

Owned Figure Detail

Possible actions

- Edit
- Delete
- Add another copy
- Open Product Release

---

# Flow 03 — Add Figure From Databank

Goal

Add an existing Product Release.

Home

↓

Databank

↓

Search

↓

Product Release

↓

Add to Collection

↓

Owned Figure Form

↓

Save

↓

Owned Figure Detail

---

# Flow 04 — Add Figure By Barcode

Goal

Quickly register a figure.

Home

↓

Scanner

↓

Barcode

↓

Product Release Found

↓

Add to Collection

↓

Owned Figure Form

↓

Save

↓

Owned Figure Detail

Alternative

Barcode not found

↓

Manual Search

---

# Flow 05 — AI Identification

Goal

Identify an unknown figure.

Home

↓

AI Identification

↓

Take Photograph

↓

AI Analysis

↓

Possible Matches

↓

User selects Product Release

↓

Product Release Detail

↓

Add to Collection

↓

Save

Future

Accessory recognition

Packaging recognition

Multiple photos

---

# Flow 06 — Edit Owned Figure

Goal

Modify collection information.

Collection

↓

Owned Figure Detail

↓

Edit

↓

Save

↓

Updated Detail

Editable fields

- Condition
- Completeness
- Quantity
- Purchase information
- Estimated value
- Storage location
- Notes

Catalog information is never editable.

---

# Flow 07 — Delete Owned Figure

Goal

Remove an owned copy.

Collection

↓

Owned Figure Detail

↓

Delete

↓

Confirmation

↓

Collection List

Soft delete is performed.

---

# Flow 08 — Browse Catalog

Goal

Discover information.

Home

↓

Databank

↓

Search

↓

Character

↓

Figure

↓

Variant

↓

Product Release

Possible actions

- Add to Collection
- Add to Wishlist

---

# Flow 09 — Wishlist

Goal

Track desired figures.

Wishlist

↓

Search

↓

Product Release

↓

Add

↓

Wishlist

Future

Price alerts

Marketplace integration

---

# Flow 10 — Duplicate Owned Figure

Goal

Register another identical copy.

Owned Figure Detail

↓

Add another copy

↓

Owned Figure Form

↓

Adjust condition

↓

Save

This creates a new Owned Figure.

It does not increase quantity automatically.

Quantity represents identical copies stored together.

Separate purchases should normally create separate Owned Figures.

---

# Flow 11 — Search

Goal

Find information quickly.

Search can start from

- Home
- Collection
- Databank
- Wishlist

Results are contextual.

Collection search returns

Owned Figures.

Databank search returns

Catalog entities.

---

# Flow 12 — Administration

Administrator only.

Dashboard

↓

Manufacturers

↓

Franchises

↓

Lines

↓

Characters

↓

Figures

↓

Variants

↓

Product Releases

CRUD operations

No collector workflows exist inside Administration.

---

# Error Flows

## Product not found

Scanner

↓

Barcode

↓

No Match

↓

Manual Search

---

## AI confidence too low

AI

↓

Analysis

↓

Multiple Results

↓

Collector chooses manually

---

## Authentication expired

Any screen

↓

401

↓

Refresh Token

↓

Retry

If refresh fails

↓

Login

---

# UX Principles

Every flow should satisfy the following goals.

- Minimal number of steps.
- No unnecessary decisions.
- Collector always knows where they are.
- Collector can always go back.
- Search is available whenever appropriate.
- The Product Release is always the central catalog entity.
- Personal data and catalog data remain clearly separated.

---

# Future Flows

The architecture intentionally leaves room for future functionality.

Examples

- Collection statistics.
- Duplicate detection.
- Trading.
- Selling.
- Marketplace synchronization.
- Community contributions.
- Collection sharing.
- Achievement system.
- Missing figures by line.
- Automatic collection completion percentage.

These features should reuse existing navigation rather than introducing new conceptual models.