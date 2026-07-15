# ADR-008 – Frontend Delivery Strategy

## Status

Accepted

---

## Context

FigureArchive is intended to serve collectors across desktop, tablet and mobile devices.

The project aims to maximize reach while minimizing maintenance effort during the MVP.

Several delivery strategies were considered:

- Native mobile applications
- Desktop application
- Responsive web application
- Progressive Web App (PWA)

---

## Decision

The MVP will be developed as a responsive Angular web application.

The application will support desktop, tablet and mobile browsers from day one.

After the MVP reaches functional maturity, the frontend will evolve into a Progressive Web App (PWA).

If future requirements justify native capabilities beyond those provided by modern web browsers, the existing Angular application may be packaged using Capacitor for Android and iOS.

No dedicated desktop application will be developed.

Desktop users will access FigureArchive through their web browser.

---

## Rationale

This approach provides several advantages:

- Single codebase.
- Lower development cost.
- Faster feature delivery.
- Easier maintenance.
- Excellent cross-platform support.
- Modern browser APIs provide access to camera, barcode scanning and other required capabilities.

The architecture remains flexible enough to support native packaging in the future without rewriting the frontend.

---

## Consequences

Positive

- One frontend for every platform.
- Faster MVP delivery.
- Reduced maintenance effort.
- Easier onboarding for contributors.
- Better long-term maintainability.

Negative

- Some advanced native capabilities may require additional work.
- Platform-specific optimizations may come later.

These trade-offs are acceptable for the MVP.

---

## Future Evolution

Potential future enhancements include:

- Progressive Web App (PWA)
- Offline support
- Push notifications
- Background synchronization
- Native Android package
- Native iOS package
- Barcode scanning improvements
- AI-assisted figure identification

These features should be introduced incrementally based on community feedback and real usage.

---

## Decision Date

2026-07

---

## Related Documents

- 003-frontend-architecture.md
- 004-deployment.md
- 005-api-guidelines.md