# Frontend Architecture

## Purpose

The frontend is not a direct representation of the REST API.

Its responsibility is to provide the best possible experience for collectors while consuming the backend services.

The backend models the domain.

The frontend models the user experience.

Both evolve independently.

---

# Design Principles

Figure Archive is designed as a collector-first platform.

Every screen, interaction and navigation flow should help users answer one of these questions:

- What do I own?
- What am I missing?
- What exists?
- How can I identify this figure?
- How complete is my collection?

The application should feel closer to Discogs than to a traditional CRUD application.

---

# Architectural Principles

## Feature-first architecture

The application is organized around user features rather than technical layers.

Example:

Good

Collection
Wishlist
Databank

Bad

Components
Pages
Services

The technical structure supports the functional structure.

---

## Standalone Angular

The application uses Angular Standalone Components.

NgModules are avoided unless Angular requires them.

---

## Smart / Presentational separation

Every screen is divided into:

Smart components

- Routing
- API communication
- State
- Business logic

Presentational components

- Rendering
- Inputs
- Outputs
- UI only

---

## Reusable UI

Buttons

Cards

Dialogs

Inputs

Tables

Search bars

Badges

Pagination

exist only once inside Shared.

Business logic never exists inside reusable UI components.

---

# Folder Structure

src/

app/

core/
authentication
guards
interceptors
configuration
http

shared/
components
directives
pipes
utils
validators

layouts/
main-layout
auth-layout

features/

home/

collection/

wishlist/

databank/

scanner/

ai-identify/

profile/

administration/

models/

services/

assets/

---

# Routing

Public

/login

Authenticated

/

Home

/collection

/collection/:id

/wishlist

/databank

/databank/releases/:id

/profile

/scan

/identify

Administrator only

/admin

/admin/manufacturers

/admin/franchises

/admin/lines

/admin/characters

/admin/figures

/admin/variants

/admin/product-releases

/admin/users

---

# Layout

Main layout

Sidebar

Top toolbar

Content

Optional right panel (future)

The layout never changes between sections.

Only the routed content changes.

---

# Navigation Philosophy

The application revolves around three concepts.

Catalog

Everything that exists.

Collection

Everything the user owns.

Wishlist

Everything the user wants.

Every navigation path eventually reaches one Figure Detail page.

The only difference is how the user arrived there.

---

# Main Features

## Home

Collector dashboard.

Displays:

Collection statistics

Wishlist summary

Collection completion

Estimated collection value

Recent releases

Quick actions

The dashboard is informational.

It never becomes an administration panel.

---

## Collection

Personal collection.

Displays:

Owned figures

Filters

Search

Sorting

Collection statistics

Collection management

---

## Wishlist

Desired figures.

Future roadmap:

Priority

Price alerts

Availability

---

## Databank

Public catalog.

Browse every figure ever released.

Search

Manufacturers

Franchises

Lines

Characters

Figures

Variants

Product Releases

---

## Scanner

Barcode reader.

Primary goal:

Find Product Release.

Secondary goal:

Add to collection.

---

## AI Identify

Image recognition.

Possible future workflow.

Photo

↓

AI detects

↓

Candidate Product Releases

↓

User confirms

↓

Add to collection

---

## Profile

Personal settings.

Language

Theme

Notifications

Export

Import

Account

---

## Administration

Only available to administrators.

Catalog management.

No collector functionality exists here.

---

# Design System

Dark-first.

High information density.

Minimal distractions.

Cards instead of large tables whenever possible.

Progressive disclosure.

Desktop first.

Responsive down to tablet and mobile.

---

# API Communication

Every feature owns its own service.

Example

CollectionService

DatabankService

WishlistService

AuthenticationService

Services never communicate directly.

Shared functionality belongs inside Core.

---

# Authentication

JWT

Refresh Token

HTTP Interceptor

Automatic token refresh

Protected routes

---

# Error Handling

User-friendly messages.

Technical errors never exposed.

Global notification system.

Loading states are mandatory.

---

# State Management

Initial phase

Angular Signals

Component-local state

Services

Future

Global store only if complexity justifies it.

Avoid introducing NgRx prematurely.

---

# Development Order

Phase 1

Application shell

Authentication

Layout

Navigation

Home

Phase 2

Collection

Owned Figure Detail

Collection management

Phase 3

Databank

Search

Product Release

Variant

Figure

Character

Phase 4

Wishlist

Scanner

AI Identify

Phase 5

Administration

Advanced filtering

Statistics

Marketplace features

---

# Long-Term Vision

Figure Archive should become the reference platform for action figure collectors.

The experience should prioritize:

Fast navigation

Visual browsing

Accurate catalog information

Excellent collection management

AI-assisted identification

Community contributions

Marketplace integration (future)

The frontend should always feel like a collector's tool rather than an enterprise management application.
The backend protects the integrity of the data. The frontend maximizes the collector's experience.