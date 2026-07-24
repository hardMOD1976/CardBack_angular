# Figure Archive Components

## Purpose

This document defines the reusable UI components that compose the Figure Archive frontend.

The objective is to maximize consistency, reduce duplicated code and simplify maintenance.

Components should be designed to be reusable, independent and easily testable.

---

# Component Hierarchy

The application is divided into:

- Layout Components
- Navigation Components
- Shared Components
- Domain Components
- Form Components
- Feedback Components

---

# Layout Components

## AppShell

Main application container.

Responsibilities

- Header
- Navigation
- Main content
- Responsive layout

Used on every authenticated screen.

---

## PageContainer

Standard page wrapper.

Responsibilities

- Page title
- Optional actions
- Content spacing

---

## Section

Visual grouping of related content.

Examples

- Figure information
- Collection statistics
- Purchase information

---

# Navigation Components

## AppToolbar

Top application toolbar.

Contains

- Logo
- Search
- Notifications (future)
- User menu

---

## SideNavigation

Desktop navigation.

Contains

- Dashboard
- My Collection
- Catalog
- Wishlist (future)
- Administration (Admins)

---

## BottomNavigation

Mobile navigation.

Contains

- Home
- Collection
- Search
- Scanner
- Profile

---

## Breadcrumb

Displays navigation hierarchy.

Example

Catalog

↓

Star Wars

↓

The Vintage Collection

↓

Luke Skywalker

---

# Shared Components

## SearchBar

Global search input.

Features

- Debounced search
- Clear button
- Search icon

Reusable throughout the application.

---

## FilterPanel

Expandable filters.

Supports

- Manufacturer
- Franchise
- Line
- Character
- Condition
- Completeness
- Loose/Carded
- Year

---

## SortSelector

Sorting options.

Examples

- Name
- Release Date
- Recently Added
- Estimated Value

---

## Pagination

Reusable pagination component.

Integrated with backend pagination.

---

## EmptyState

Displayed when no data exists.

Reusable everywhere.

---

## LoadingSkeleton

Placeholder displayed while loading.

Different variants

- Card
- List
- Detail page

---

## ConfirmationDialog

Reusable confirmation dialog.

Examples

Delete

Logout

Remove from collection

---

# Domain Components

## FigureCard

Represents a catalog figure.

Displays

- Image
- Character
- Line
- Manufacturer

Actions

- Open details

---

## OwnedFigureCard

Represents a figure owned by the collector.

Displays

- Figure image
- Condition
- Completeness
- Quantity
- Estimated value

Actions

- Edit
- Delete
- View details

---

## ProductReleaseCard

Displays a specific release.

Includes

- Packaging
- Region
- Barcode
- Release date

---

## FigureGallery

Displays multiple product images.

Supports

- Thumbnail navigation
- Fullscreen mode (future)

---

## CollectionSummary

Shows collection statistics.

Examples

- Total figures
- Total variants
- Total estimated value

---

## StatisticCard

Generic statistic widget.

Reusable throughout the application.

---

# Form Components

## FigureForm

Administration.

Create/Edit figures.

---

## VariantForm

Administration.

---

## ProductReleaseForm

Administration.

---

## OwnedFigureForm

Collector interface.

Fields

- Condition
- Completeness
- Packaging state
- Purchase price
- Purchase location
- Storage location
- Notes

---

# Feedback Components

## Snackbar

Success notifications.

Examples

Saved successfully.

Figure added.

---

## ErrorBanner

Displays recoverable errors.

---

## ProgressIndicator

Used during

- Imports
- Synchronization
- Long-running operations

---

# Media Components

## ImageViewer

Displays high-resolution images.

Supports

- Zoom
- Fullscreen
- Swipe (mobile)

---

## ImagePlaceholder

Shown when no image exists.

Uses default franchise artwork.

---

# Future Components

## BarcodeScanner

Mobile camera scanner.

---

## AI Identification

Image recognition assistant.

---

## CollectionCharts

Statistics dashboard.

Charts

- Manufacturers
- Franchises
- Collection growth
- Estimated value

---

## ActivityTimeline

Shows recent collection activity.

Examples

Recently added

Recently modified

Recent purchases

---

# Component Design Rules

Every component should:

- Have a single responsibility.
- Be reusable.
- Be responsive.
- Be accessible.
- Avoid business logic whenever possible.
- Receive data through Inputs.
- Notify changes through Outputs or Signals.
- Keep visual consistency with the Design System.

---

# Angular Organization

Example folder structure

```
shared/
    components/
        search-bar/
        pagination/
        confirmation-dialog/
        loading-skeleton/
        empty-state/

layout/
    app-shell/
    toolbar/
    side-navigation/
    bottom-navigation/

features/

    catalog/
        components/
            figure-card/
            product-release-card/

    collection/
        components/
            owned-figure-card/
            collection-summary/

    admin/
        components/
            figure-form/
            variant-form/
            product-release-form/
```

---

# Implementation Order

Phase 1

- AppShell
- Toolbar
- SideNavigation
- BottomNavigation
- SearchBar
- Pagination
- LoadingSkeleton
- EmptyState

Phase 2

- FigureCard
- OwnedFigureCard
- ProductReleaseCard
- CollectionSummary

Phase 3

- Forms
- Dialogs
- Filters
- Statistics

Phase 4

- Scanner
- AI Identification
- Charts
- Timeline