# Deployment

## Status

🟢 Active

---

# Purpose

This document describes how FigureArchive is deployed across different environments.

The objective is to keep deployment simple during the MVP while allowing the architecture to evolve as the application grows.

---

# Deployment Philosophy

FigureArchive is designed following a cloud-first approach.

Every deploy should be reproducible, automated and independent from local development environments.

Infrastructure should remain as simple as possible until real scalability requirements appear.

---

# Initial Deployment Architecture

```
                Internet
                     │
                     ▼
              Angular Frontend
             (Static Hosting)
                     │
          HTTPS REST API Calls
                     │
                     ▼
              NestJS Backend
                     │
                 Prisma ORM
                     │
                     ▼
             PostgreSQL Database
```

---

# Frontend

The Angular application is compiled into static assets.

Responsibilities:

- User Interface
- Routing
- API communication
- Authentication flow

Possible hosting providers:

- Vercel
- Netlify
- Cloudflare Pages

The frontend should remain completely stateless.

---

# Backend

The backend exposes a REST API.

Responsibilities:

- Business logic
- Authentication
- Authorization
- Validation
- Database access

Possible hosting providers:

- Railway
- Render
- Fly.io
- DigitalOcean
- AWS

---

# Database

The application uses PostgreSQL.

Current provider:

- Neon

Responsibilities:

- Catalog data
- User collections
- Authentication data
- Audit information

The database is the single source of truth.

---

# Environment Configuration

Configuration must never be hardcoded.

Examples:

- Database URL
- JWT secrets
- API keys
- Storage credentials

All sensitive values must be provided through environment variables.

---

# Environments

The project will support multiple environments.

Development

Used during local development.

Staging

Production-like environment used for testing.

Production

Public environment used by collectors.

Each environment should have its own database.

---

# Database Migrations

Schema changes are managed through Prisma Migrations.

Every structural change to the database must be version controlled.

Production databases should never be modified manually.

---

# Static Assets

Static resources include:

- Logos
- Images
- Icons
- Documentation assets

Large user-generated content should eventually be stored in object storage rather than inside the database.

---

# Logging

The backend should generate structured logs.

Typical events:

- Authentication
- API errors
- Validation failures
- Unexpected exceptions

Logs should help diagnose issues without exposing sensitive user information.

---

# Monitoring

Future versions may include:

- Health checks
- Performance metrics
- Error tracking
- Uptime monitoring

Monitoring should be added before scaling the platform.

---

# Backup Strategy

The database should be backed up automatically.

Backups should allow:

- Point-in-time recovery
- Disaster recovery
- Accidental deletion recovery

Backups should be tested periodically.

---

# Scalability

The MVP prioritizes simplicity.

Future scaling may include:

- CDN
- Object Storage
- Cache layer
- Background jobs
- Multiple backend instances
- Read replicas

Scalability should be driven by real usage rather than anticipated needs.

---

# Security

Deployment must enforce:

- HTTPS
- Secure environment variables
- Principle of least privilege
- Regular dependency updates
- Database access restrictions

Security is considered from the beginning rather than added later.

---

# Design Principles

Deployment follows these principles:

- Cloud-first
- Infrastructure as code (future)
- Immutable deployments
- Automated migrations
- Secure by default
- Keep it simple

---

# Related Documents

- 001-system-overview.md
- 002-backend-architecture.md
- 003-frontend-architecture.md
- 005-api-guidelines.md
- ADR-007 – Backend Architecture