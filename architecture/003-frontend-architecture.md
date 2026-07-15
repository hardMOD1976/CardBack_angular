# Frontend Architecture

## Status

🟢 Active

---

# Purpose

This document describes the architecture of the FigureArchive frontend.

It defines how the Angular application is organized, how features are isolated, and how the UI communicates with the backend.

The frontend is responsible for presentation only.

Business rules belong to the backend.

The frontend should never expose the underlying complexity of the catalog model. Collectors interact with collectibles, not with entities and relationships.

---

# Technology Stack

Framework

- Angular

Language

- TypeScript

Styling

- SCSS

HTTP Client

- Angular HttpClient

Forms

- Reactive Forms

State

- Angular Signals (where appropriate)

---

# Architectural Principles

The frontend follows a feature-based architecture.

Features remain isolated from one another while sharing common infrastructure through Core and Shared modules.

Business logic should remain minimal.

The frontend consumes backend services but does not implement domain rules.

---

# Project Structure

```
src/

    app/

        core/

        shared/

        features/

            catalog/

            collection/

            wishlist/

            settings/

            authentication/

        layout/

        assets/

        environments/
```

---

# Core

The Core layer contains application-wide services.

Examples:

- Authentication
- API configuration
- HTTP Interceptors
- Route Guards
- Global Error Handling

Core should only be instantiated once.

---

# Shared

Shared contains reusable UI elements.

Examples:

- Buttons
- Dialogs
- Inputs
- Tables
- Cards
- Icons
- Pipes
- Directives

Shared components should never contain business logic.

---

# Features

Every business capability lives inside its own feature.

Examples:

Catalog

Collection

Wishlist

Settings

Authentication

Each feature owns:

- Components
- Routing
- Services
- Models

Features should communicate through APIs, not through direct dependencies.

---

# Component Design

Components should remain focused.

Whenever possible:

Smart Components

- Fetch data.
- Coordinate child components.
- Handle navigation.

Presentational Components

- Display data.
- Emit events.
- Contain no business logic.

---

# State Management

Initially, the application will rely on:

- Signals
- RxJS
- Services

A global state library (NgRx or similar) will only be introduced if justified by application complexity.

Premature state management should be avoided.

---

# Communication

Frontend communication follows this flow:

```
Component

↓

Service

↓

HttpClient

↓

REST API

↓

NestJS
```

Components should never call HttpClient directly.

---

# Forms

Reactive Forms will be used throughout the application.

Validation should exist at two levels:

Frontend

- User experience.
- Immediate feedback.

Backend

- Business validation.
- Security.

Backend validation is always authoritative.

---

# Routing

The application will use lazy-loaded feature routes whenever appropriate.

Route Guards will protect authenticated areas.

Navigation should remain feature-oriented.

---

# Error Handling

Errors should be handled consistently.

Typical scenarios:

- Validation errors.
- Network failures.
- Authentication errors.
- Unexpected server errors.

Error messages should be understandable by collectors rather than developers.

---

# UI Philosophy

The interface should prioritize:

- Fast navigation.
- Minimal clicks.
- Clear hierarchy.
- Collector-oriented terminology.
- Responsive design.

The UI should help collectors identify collectibles quickly.

---

# Design System

Reusable UI components should follow a common design language.

Consistency is preferred over visual novelty.

Every reusable component should have a single responsibility.

---

# Future Architecture

Future versions may include:

- Offline support.
- Barcode scanning.
- Camera integration.
- AI-assisted identification.
- Progressive Web App capabilities.

---

# Design Principles

The frontend follows these principles:

- Feature-first organization.
- Reusable components.
- Reactive programming.
- Accessibility.
- Responsive design.
- Performance by default.
- User-centered design.

---

# Related Documents

- 001-system-overview.md
- 002-backend-architecture.md
- 005-api-guidelines.md
- ADR-007 – Backend Architecture