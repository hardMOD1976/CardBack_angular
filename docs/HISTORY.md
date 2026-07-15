# History

---

## 2026-07-14

### Domain Model Completed

Major decisions:

- Figure became the canonical collectible entity.
- Variant represents physical differences.
- Product Release represents commercial distribution.
- Owned Figure stores collector-specific information.
- Packaging never defines a Figure.

Infrastructure:

- Prisma installed.
- PostgreSQL database created.
- Initial migration executed.

---

## 2026-07-15

### Backend Foundation

Repository reorganized:

- backend/
- frontend/

NestJS created.

Prisma integrated with PostgreSQL.

First migration successfully applied.

Backend server running locally.

Next milestone:

Connect NestJS with Prisma and implement the first REST module.