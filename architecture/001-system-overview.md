# System Overview

## Status

🟢 Active

---

# Purpose

This document provides a high-level overview of the FigureArchive architecture.

It describes the major components of the system, how they interact, and the technologies used to build the platform.

Detailed implementation decisions are documented in dedicated Architecture and ADR documents.

---

# Vision

FigureArchive is a collector-oriented platform designed to catalog action figures and vehicles independently from any specific franchise or manufacturer.

The platform separates:

- Catalog data
- User collections
- Community contributions

This separation allows catalog information to remain authoritative while every collector manages their own personal collection.

FigureArchive is not designed around products. It is designed around how collectors understand collectibles.
---

# High-Level Architecture

```
                    Angular Frontend
                           │
                    REST API (HTTPS)
                           │
                    NestJS Backend
                           │
                      Prisma ORM
                           │
                 PostgreSQL Database
                           │
                        Neon Cloud
```

---

# System Components

## Frontend

Technology:

- Angular

Responsibilities:

- User Interface
- Collection management
- Catalog browsing
- Search
- Authentication
- Forms
- Image galleries

The frontend communicates exclusively through the REST API.

---

## Backend

Technology:

- NestJS

Responsibilities:

- Business logic
- Validation
- Authorization (future)
- Catalog management
- Collection management
- REST API

The backend contains no presentation logic.

---

## Persistence Layer

Technology:

- Prisma ORM

Responsibilities:

- Database mapping
- Migrations
- Query generation
- Type-safe database access

Prisma is the only component responsible for communicating with PostgreSQL.

---

## Database

Technology:

- PostgreSQL

Hosted on:

- Neon

Responsibilities:

- Persistent storage
- Relational integrity
- Constraints
- Indexes

---

# Current Domain

The current MVP supports the following catalog entities:

- Manufacturer
- Franchise
- Line
- Character
- Figure
- Variant
- Product Release
- Owned Figure

Future versions will extend the domain with additional collectible types.

---

# Design Principles

The system follows these principles:

- Domain-first development.
- Separation of concerns.
- Strongly typed models.
- API-first architecture.
- Modular design.
- Technology independence.

Business rules belong to the backend.

Presentation belongs to the frontend.

Persistence belongs to Prisma.

---

# Project Structure

```
FigureArchive/

├── docs/
│   ├── architecture/
│   ├── decisions/
│   ├── domain/
│   ├── roadmap/
│   └── ui/
│
├── prisma/
│
├── backend/        (future)
│
├── frontend/       (future)
│
└── diagrams/
```

---

# External Services

Current:

- Neon PostgreSQL

Planned:

- Image storage
- Barcode lookup
- Marketplace integrations
- AI-assisted identification

External services should remain isolated behind dedicated services.

---

# Development Workflow

The project follows a domain-driven workflow.

```
Business Idea

↓

Domain Documentation

↓

Architecture Decisions (ADR)

↓

Prisma Model

↓

Database Migration

↓

Backend

↓

Frontend

↓

Testing

↓

Deployment
```

Every implementation begins with the domain model before code is written.

---

# Related Documents

- ADR-006 – Prisma Conventions
- ADR-007 – Backend Architecture
- 002-backend-architecture.md
- 003-frontend-architecture.md
- 004-deployment.md
- 005-api-guidelines.md