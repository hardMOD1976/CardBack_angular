# Frontend Information Architecture

## Purpose

This document defines the functional structure of Figure Archive.

It describes every section of the application from the collector's point of view.

It does not describe Angular routing or technical implementation.

Its objective is to answer one question:

> What can the user do inside Figure Archive?

---

# Navigation Levels

The application is organized into six primary areas.

- Home
- Collection
- Databank
- Wishlist
- Scanner
- Profile

Some areas contain multiple functional sections.

---

# Home

Purpose

Provide an overview of the collector's activity.

Main content

- Collection statistics
- Wishlist summary
- Completion percentage
- Estimated market value
- Recently added releases
- Recent activity
- Quick actions

Quick actions

- Scan barcode
- AI Identification
- My Collection
- Databank

The Home page is a dashboard.

It never becomes an administration panel.

---

# Collection

Purpose

Manage the user's personal collection.

Sections

## Collection List

Displays every owned figure.

Features

- Pagination
- Search
- Sorting
- Filters

Possible filters

- Franchise
- Line
- Character
- Condition
- Completeness
- Packaging
- Purchase date
- Storage location

Actions

- View figure
- Edit
- Delete
- Duplicate
- Add another copy

---

## Owned Figure Detail

Displays every property of one owned figure.

Information

- Product Release
- Variant
- Character
- Quantity
- Condition
- Completeness
- Purchase information
- Estimated value
- Notes

Actions

- Edit
- Delete
- Open Product Release
- Open Character

---

## Create Owned Figure

Entry points

- Barcode scanner
- AI Identification
- Databank
- Manual search

Purpose

Add a Product Release to the user's collection.

---

# Databank

Purpose

Browse the global catalog.

The Databank is independent from the user's collection.

The catalog belongs to Figure Archive.

---

## Global Search

Searches across

- Product Releases
- Variants
- Figures
- Characters

Results are grouped by entity type.

---

## Manufacturers

Displays every manufacturer.

Navigation

Manufacturer

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

---

## Product Release Detail

Displays

Commercial information

Images

Barcode

Packaging

Language

Region

Retailer

Relationships

Variant

Figure

Character

Line

Franchise

Manufacturer

Collector information

If the user owns it

- Quantity owned
- Condition
- Collection status

Actions

- Add to Collection
- Add to Wishlist

---

# Wishlist

Purpose

Store desired Product Releases.

Features

- Search
- Sorting
- Priority
- Notes

Future roadmap

- Price alerts
- Availability
- Marketplace links

---

# Scanner

Purpose

Identify a Product Release using its barcode.

Flow

Scan

↓

Match Product Release

↓

Display information

↓

Add to Collection

---

# AI Identification

Purpose

Identify figures using photographs.

Flow

Take photo

↓

AI analysis

↓

Possible matches

↓

User confirmation

↓

Product Release Detail

↓

Add to Collection

Future

Multiple-angle recognition

Accessory recognition

Packaging recognition

---

# Profile

Purpose

Manage the collector account.

Sections

Personal information

Preferences

Notifications

Language

Theme

Export

Import

Security

Logout

---

# Administration

Visible only to administrators.

Purpose

Maintain the catalog.

Sections

Manufacturers

Franchises

Lines

Characters

Figures

Variants

Product Releases

Users

No collector functionality exists inside Administration.

---

# Global Features

Available from almost every screen.

## Search

Contextual search.

## Notifications

System messages.

## User menu

Account options.

## Theme selector

Dark / Light (future).

---

# Relationships Between Sections

The application revolves around one central concept.

Product Release.

Most navigation paths eventually reach a Product Release.

Example

Home

↓

Collection

↓

Owned Figure

↓

Product Release

↓

Variant

↓

Figure

↓

Character

Another example

Databank

↓

Character

↓

Figure

↓

Variant

↓

Product Release

↓

Add to Collection

This keeps navigation consistent regardless of where the user starts.

---

# Information Hierarchy

Priority 1

Collection

Priority 2

Databank

Priority 3

Wishlist

Priority 4

Scanner

Priority 5

AI Identification

Priority 6

Profile

Administration remains isolated from the collector experience.

---

# UX Principles

Every screen should help the collector answer one of these questions.

What do I own?

What exists?

What am I missing?

How can I identify this figure?

Where is this figure stored?

How complete is my collection?

If a screen cannot answer at least one of these questions, its purpose should be reconsidered.